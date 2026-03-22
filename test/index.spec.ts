import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;
const transparentPngBase64 =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO6p8J0AAAAASUVORK5CYII=';
const transparentPngBytes = Uint8Array.from(atob(transparentPngBase64), (char) =>
	char.charCodeAt(0),
);

describe('kryon-ai-worker', () => {
	it('returns service metadata at GET / (unit style)', async () => {
		const request = new IncomingRequest('http://example.com/');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({
			ok: true,
			service: 'kryon-ai-worker',
			version: '0.1.0',
			endpoints: ['/v1/pbr/generate', '/v1/scene/materials', '/v1/scene/agree'],
		});
	});

	it('returns server_misconfigured when token is missing (integration style)', async () => {
		const response = await SELF.fetch('https://example.com/v1/pbr/generate', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				prompt: 'seamless concrete albedo texture',
			}),
		});

		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({
			error: {
				code: 'server_misconfigured',
				message: 'APP_AUTH_TOKEN is not configured in Worker secrets',
			},
		});
	});

	it('routes augment requests away from flux schnell and encodes binary outputs', async () => {
		let capturedModel = '';
		let capturedInput: Record<string, unknown> | null = null;
		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest('https://example.com/v1/pbr/generate', {
				method: 'POST',
				headers: {
					authorization: 'Bearer test-token',
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					prompt: 'make this brick texture more natural and seamless',
					model: '@cf/black-forest-labs/flux-1-schnell',
					source_image_base64: 'ZmFrZUJhc2U2NA==',
					source_mime: 'image/png',
				}),
			}),
			{
				...env,
				APP_AUTH_TOKEN: 'test-token',
				AI: {
					run: async (model, input) => {
						capturedModel = model;
						capturedInput = input;
						return new ReadableStream({
							start(controller) {
								controller.enqueue(transparentPngBytes);
								controller.close();
							},
						});
					},
				},
			},
			ctx,
		);

		await waitOnExecutionContext(ctx);
		expect(capturedModel).toBe('@cf/runwayml/stable-diffusion-v1-5-img2img');
		expect(capturedInput).toMatchObject({
			prompt: 'make this brick texture more natural and seamless',
			image_b64: 'ZmFrZUJhc2U2NA==',
		});
		expect((capturedInput as Record<string, unknown>).image).toBeUndefined();
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toMatchObject({
			image_base64: transparentPngBase64,
			model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
		});
	});

	it('passes FLUX.2 requests as multipart and preserves the source image', async () => {
		let capturedModel = '';
		let capturedInput: Record<string, unknown> | null = null;
		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest('https://example.com/v1/pbr/generate', {
				method: 'POST',
				headers: {
					authorization: 'Bearer test-token',
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					prompt: 'natural seamless red brick wall',
					model: '@cf/black-forest-labs/flux-2-klein-4b',
					source_image_base64: transparentPngBase64,
					source_mime: 'image/png',
					seed: 123,
				}),
			}),
			{
				...env,
				APP_AUTH_TOKEN: 'test-token',
				AI: {
					run: async (model, input) => {
						capturedModel = model;
						capturedInput = input;
						return {
							image: transparentPngBase64,
						};
					},
				},
			},
			ctx,
		);

		await waitOnExecutionContext(ctx);
		expect(capturedModel).toBe('@cf/black-forest-labs/flux-2-klein-4b');
		expect(capturedInput).not.toBeNull();
		const multipart = (capturedInput as Record<string, unknown>).multipart as Record<string, unknown>;
		expect(typeof multipart.contentType).toBe('string');
		const formData = await new Response(multipart.body as BodyInit, {
			headers: {
				'content-type': String(multipart.contentType),
			},
		}).formData();
		expect(formData.get('prompt')).toBe('natural seamless red brick wall');
		expect(formData.get('width')).toBe('1024');
		expect(formData.get('height')).toBe('1024');
		expect(formData.get('seed')).toBe('123');
		const uploaded = formData.get('input_image_0');
		expect(uploaded).toBeInstanceOf(File);
		expect((uploaded as File).type).toBe('image/png');
		expect(await (uploaded as File).text()).not.toBe('');
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toMatchObject({
			image_base64: transparentPngBase64,
			model: '@cf/black-forest-labs/flux-2-klein-4b',
		});
	});

	it('passes extra FLUX.2 reference images as additional multipart inputs', async () => {
		let capturedInput: Record<string, unknown> | null = null;
		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest('https://example.com/v1/pbr/generate', {
				method: 'POST',
				headers: {
					authorization: 'Bearer test-token',
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					prompt: 'keep image 0 as structure, use image 1 for lighting, use image 2 for materials',
					model: '@cf/black-forest-labs/flux-2-dev',
					source_image_base64: transparentPngBase64,
					source_mime: 'image/png',
					input_images: [
						{ image_base64: transparentPngBase64, mime: 'image/jpeg' },
						{ image_base64: transparentPngBase64, mime: 'image/webp' },
					],
				}),
			}),
			{
				...env,
				APP_AUTH_TOKEN: 'test-token',
				AI: {
					run: async (_model, input) => {
						capturedInput = input;
						return {
							image: transparentPngBase64,
						};
					},
				},
			},
			ctx,
		);

		await waitOnExecutionContext(ctx);
		expect(capturedInput).not.toBeNull();
		const multipart = (capturedInput as Record<string, unknown>).multipart as Record<string, unknown>;
		const formData = await new Response(multipart.body as BodyInit, {
			headers: {
				'content-type': String(multipart.contentType),
			},
		}).formData();
		expect(formData.get('input_image_0')).toBeInstanceOf(File);
		expect(formData.get('input_image_1')).toBeInstanceOf(File);
		expect(formData.get('input_image_2')).toBeInstanceOf(File);
		expect((formData.get('input_image_1') as File).type).toBe('image/jpeg');
		expect((formData.get('input_image_2') as File).type).toBe('image/webp');
		expect(response.status).toBe(200);
	});

	it('falls back from inpainting to img2img when no mask workflow is available', async () => {
		let capturedModel = '';
		let capturedInput: Record<string, unknown> | null = null;
		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest('https://example.com/v1/pbr/generate', {
				method: 'POST',
				headers: {
					authorization: 'Bearer test-token',
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					prompt: 'clean seamless ceramic tile',
					model: '@cf/runwayml/stable-diffusion-v1-5-inpainting',
					source_image_base64: transparentPngBase64,
					source_mime: 'image/png',
				}),
			}),
			{
				...env,
				APP_AUTH_TOKEN: 'test-token',
				AI: {
					run: async (model, input) => {
						capturedModel = model;
						capturedInput = input;
						return {
							image: transparentPngBase64,
						};
					},
				},
			},
			ctx,
		);

		await waitOnExecutionContext(ctx);
		expect(capturedModel).toBe('@cf/runwayml/stable-diffusion-v1-5-img2img');
		expect(capturedInput).toMatchObject({
			prompt: 'clean seamless ceramic tile',
			image_b64: transparentPngBase64,
		});
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toMatchObject({
			image_base64: transparentPngBase64,
			model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
		});
	});

	it('retries img2img requests with raw bytes when the base64 input path fails', async () => {
		let runCalls = 0;
		let firstInput: Record<string, unknown> | null = null;
		let secondInput: Record<string, unknown> | null = null;
		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest('https://example.com/v1/pbr/generate', {
				method: 'POST',
				headers: {
					authorization: 'Bearer test-token',
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					prompt: 'turn this crop into a seamless plaster texture',
					model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
					source_image_base64: transparentPngBase64,
					source_mime: 'image/png',
				}),
			}),
			{
				...env,
				APP_AUTH_TOKEN: 'test-token',
				AI: {
					run: async (_model, input) => {
						runCalls += 1;
						if (runCalls === 1) {
							firstInput = input;
							throw new Error("3043: Internal server error");
						}
						secondInput = input;
						return {
							image: transparentPngBase64,
						};
					},
				},
			},
			ctx,
		);

		await waitOnExecutionContext(ctx);
		expect(runCalls).toBe(2);
		expect(firstInput).toMatchObject({
			image_b64: transparentPngBase64,
		});
		expect(Array.isArray((secondInput as Record<string, unknown>).image)).toBe(true);
		expect((secondInput as Record<string, unknown>).image_b64).toBeUndefined();
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toMatchObject({
			image_base64: transparentPngBase64,
			model: '@cf/runwayml/stable-diffusion-v1-5-img2img',
		});
	});
});
