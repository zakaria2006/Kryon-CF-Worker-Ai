var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// worker.js
var DEFAULT_MODEL = "@cf/black-forest-labs/flux-1-schnell";
var DEFAULT_AUGMENT_MODEL = "@cf/runwayml/stable-diffusion-v1-5-img2img";
var DEFAULT_INPAINT_MODEL = "@cf/runwayml/stable-diffusion-v1-5-inpainting";
var DEFAULT_VISION_MODEL = "@cf/meta/llama-3.2-11b-vision-instruct";
var SCENE_MATERIALS_ENDPOINT = "/v1/scene/materials";
var SCENE_AGREE_ENDPOINT = "/v1/scene/agree";
var MAX_FLUX2_INPUT_IMAGES = 4;
var MATERIAL_TYPES = [
  "ceramic_tile",
  "stone_slab",
  "wood_planks",
  "plaster_wall",
  "concrete",
  "brick",
  "metal",
  "glass",
  "fabric"
];
var MATERIAL_TYPE_ALIASES = {
  tile: "ceramic_tile",
  ceramic: "ceramic_tile",
  wall_tile: "ceramic_tile",
  floor_tile: "ceramic_tile",
  stone: "stone_slab",
  marble: "stone_slab",
  granite: "stone_slab",
  wood: "wood_planks",
  wood_plank: "wood_planks",
  hardwood: "wood_planks",
  timber: "wood_planks",
  plaster: "plaster_wall",
  wall_plaster: "plaster_wall",
  concrete_wall: "concrete",
  concrete_floor: "concrete",
  brick_wall: "brick",
  metallic: "metal",
  metal_surface: "metal",
  glass_surface: "glass",
  textile: "fabric",
  sofa_fabric: "fabric",
  curtain: "fabric",
  rug: "fabric",
  carpet: "fabric"
};
var MIN_MATERIAL_AREA = 0.02;
var CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST,GET,OPTIONS",
  "access-control-allow-headers": "authorization,content-type",
  "access-control-max-age": "86400"
};
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method === "GET" && url.pathname === "/") {
      return jsonResponse(
        {
          ok: true,
          service: "kryon-ai-worker",
          endpoints: [
            "/v1/pbr/generate",
            SCENE_MATERIALS_ENDPOINT,
            SCENE_AGREE_ENDPOINT
          ]
        },
        200
      );
    }
    const isSceneMaterialsRequest = request.method === "POST" && url.pathname === SCENE_MATERIALS_ENDPOINT;
    const isSceneAgreeRequest = request.method === "POST" && url.pathname === SCENE_AGREE_ENDPOINT;
    const isPbrRequest = request.method === "POST" && url.pathname === "/v1/pbr/generate";
    if (!isSceneMaterialsRequest && !isSceneAgreeRequest && !isPbrRequest) {
      return jsonResponse(
        {
          error: {
            code: "not_found",
            message: `Use POST /v1/pbr/generate, ${SCENE_MATERIALS_ENDPOINT}, or ${SCENE_AGREE_ENDPOINT}`
          }
        },
        404
      );
    }
    const authError = authorizeRequest(request, env);
    if (authError) {
      return authError;
    }
    if (isSceneMaterialsRequest) {
      return handleSceneMaterialsRequest(request, env);
    }
    if (isSceneAgreeRequest) {
      return handleSceneAgreeRequest(env);
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(
        {
          error: {
            code: "bad_request",
            message: "Invalid JSON body"
          }
        },
        400
      );
    }
    const prompt = String(body.prompt || "").trim();
    if (!prompt) {
      return jsonResponse(
        {
          error: {
            code: "bad_request",
            message: "prompt is required"
          }
        },
        400
      );
    }
    const sourceImageBase64 = normalizeBase64(body.source_image_base64);
    const additionalInputImages = normalizeInputImages(body.input_images);
    const maskImageBase64 = normalizeBase64(
      body.mask_image_base64 || body.mask_base64 || body.mask_image
    );
    if (maskImageBase64 && !sourceImageBase64) {
      return jsonResponse(
        {
          error: {
            code: "bad_request",
            message: "source_image_base64 is required when mask_image_base64 is provided"
          }
        },
        400
      );
    }
    const requestedModel = String(body.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
    const resolvedModel = resolveModel(
      requestedModel,
      sourceImageBase64 !== "",
      maskImageBase64 !== ""
    );
    const aiPlan = buildAiRunPlan(
      body,
      prompt,
      resolvedModel,
      sourceImageBase64,
      additionalInputImages,
      maskImageBase64
    );
    try {
      const out = await runWorkersAI(env.AI, resolvedModel, aiPlan);
      const imageResult = await extractImageResult(out);
      if (!imageResult.imageBase64) {
        return jsonResponse(
          {
            error: {
              code: "upstream_error",
              message: "Workers AI returned no image"
            }
          },
          502
        );
      }
      return jsonResponse(
        {
          image_base64: imageResult.imageBase64,
          mime: imageResult.mime || "image/png",
          model: resolvedModel,
          request_id: request.headers.get("cf-ray") || ""
        },
        200
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return jsonResponse(
        {
          error: {
            code: "upstream_error",
            message
          }
        },
        502
      );
    }
  }
};
function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json",
      ...CORS_HEADERS
    }
  });
}
__name(jsonResponse, "jsonResponse");
function authorizeRequest(request, env) {
  const configuredToken = (env.APP_AUTH_TOKEN || "").trim();
  if (!configuredToken) {
    return jsonResponse(
      {
        error: {
          code: "server_misconfigured",
          message: "APP_AUTH_TOKEN is not configured in Worker secrets"
        }
      },
      500
    );
  }
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${configuredToken}`) {
    return jsonResponse(
      {
        error: {
          code: "unauthorized",
          message: "Invalid token"
        }
      },
      401
    );
  }
  return null;
}
__name(authorizeRequest, "authorizeRequest");
function clampInt(value, min, max, fallback) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  const v = Math.floor(value);
  if (v < min) return min;
  if (v > max) return max;
  return v;
}
__name(clampInt, "clampInt");
function clampFloat(value, min, max, fallback) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
__name(clampFloat, "clampFloat");
function normalizeBase64(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!trimmed.startsWith("data:")) return trimmed;
  const commaIndex = trimmed.indexOf(",");
  return commaIndex >= 0 ? trimmed.slice(commaIndex + 1).trim() : "";
}
__name(normalizeBase64, "normalizeBase64");
function isFluxSchnell(model) {
  return model.toLowerCase() === "@cf/black-forest-labs/flux-1-schnell";
}
__name(isFluxSchnell, "isFluxSchnell");
function isFlux2Model(model) {
  const normalized = model.toLowerCase();
  return normalized.startsWith("@cf/black-forest-labs/flux-2-");
}
__name(isFlux2Model, "isFlux2Model");
function isInpaintingModel(model) {
  return model.toLowerCase().includes("inpainting");
}
__name(isInpaintingModel, "isInpaintingModel");
function isImageToImageModel(model) {
  const normalized = model.toLowerCase();
  return normalized.includes("img2img") || normalized.includes("inpainting") || normalized.includes("dreamshaper-8-lcm");
}
__name(isImageToImageModel, "isImageToImageModel");
function isTextToImageOnlyModel(model) {
  const normalized = model.toLowerCase();
  return normalized.includes("phoenix-1.0") || isFluxSchnell(model);
}
__name(isTextToImageOnlyModel, "isTextToImageOnlyModel");
function resolveModel(requestedModel, hasSourceImage, hasMaskImage) {
  if (!hasSourceImage) {
    return isImageToImageModel(requestedModel) ? DEFAULT_MODEL : requestedModel;
  }
  if (isFlux2Model(requestedModel)) {
    return hasMaskImage ? DEFAULT_INPAINT_MODEL : DEFAULT_AUGMENT_MODEL;
  }
  if (hasMaskImage) {
    return isInpaintingModel(requestedModel) ? requestedModel : DEFAULT_INPAINT_MODEL;
  }
  if (isInpaintingModel(requestedModel)) {
    return DEFAULT_AUGMENT_MODEL;
  }
  if (isImageToImageModel(requestedModel)) {
    return requestedModel;
  }
  if (isTextToImageOnlyModel(requestedModel)) {
    return DEFAULT_AUGMENT_MODEL;
  }
  return requestedModel;
}
__name(resolveModel, "resolveModel");
function buildAiInput(body, prompt, model, sourceImageBase64, additionalInputImages, maskImageBase64, img2ImgEncoding = "base64") {
  const width = clampInt(body.width, 256, 2048, 1024);
  const height = clampInt(body.height, 256, 2048, 1024);
  const seed = typeof body.seed === "number" && Number.isFinite(body.seed) ? Math.floor(body.seed) : null;
  if (isFlux2Model(model)) {
    const flux2Images = [];
    if (sourceImageBase64) {
      flux2Images.push({
        base64: sourceImageBase64,
        mime: normalizeSourceMimeType(body.source_mime)
      });
    }
    flux2Images.push(...additionalInputImages);
    return buildFlux2MultipartInput(
      prompt,
      width,
      height,
      seed,
      flux2Images
    );
  }
  if (isInpaintingModel(model) && sourceImageBase64) {
    const aiInput2 = {
      prompt,
      strength: clampFloat(body.strength, 0.05, 1, 0.72)
    };
    if (maskImageBase64) {
      if (img2ImgEncoding === "bytes") {
        aiInput2.mask = Array.from(base64ToBytes(maskImageBase64));
      } else {
        aiInput2.mask = maskImageBase64;
      }
    }
    if (img2ImgEncoding === "bytes") {
      aiInput2.image = Array.from(base64ToBytes(sourceImageBase64));
    } else {
      aiInput2.image = sourceImageBase64;
    }
    if (seed !== null) {
      aiInput2.seed = seed;
    }
    return aiInput2;
  }
  if (isImageToImageModel(model) && sourceImageBase64) {
    const aiInput2 = {
      prompt,
      strength: clampFloat(body.strength, 0.05, 1, 0.72)
    };
    if (img2ImgEncoding === "bytes") {
      aiInput2.image = Array.from(base64ToBytes(sourceImageBase64));
    } else {
      aiInput2.image = sourceImageBase64;
    }
    if (seed !== null) {
      aiInput2.seed = seed;
    }
    return aiInput2;
  }
  if (isFluxSchnell(model)) {
    return {
      prompt
    };
  }
  const aiInput = {
    prompt,
    width,
    height
  };
  if (seed !== null) {
    aiInput.seed = seed;
  }
  return aiInput;
}
__name(buildAiInput, "buildAiInput");
function buildAiRunPlan(body, prompt, model, sourceImageBase64, additionalInputImages, maskImageBase64) {
  const shouldTryBytesFallback = shouldUseAlternateImg2ImgInput(model, sourceImageBase64);
  const primaryInput = buildAiInput(
    body,
    prompt,
    model,
    sourceImageBase64,
    additionalInputImages,
    maskImageBase64,
    "base64"
  );
  if (!shouldTryBytesFallback) {
    return { primaryInput };
  }
  return {
    primaryInput,
    fallbackInput: buildAiInput(
      body,
      prompt,
      model,
      sourceImageBase64,
      additionalInputImages,
      maskImageBase64,
      "bytes"
    )
  };
}
__name(buildAiRunPlan, "buildAiRunPlan");
function shouldUseAlternateImg2ImgInput(model, sourceImageBase64) {
  return isImageToImageModel(model) && !isFlux2Model(model) && sourceImageBase64 !== "";
}
__name(shouldUseAlternateImg2ImgInput, "shouldUseAlternateImg2ImgInput");
async function runWorkersAI(ai, model, plan) {
  try {
    return await ai.run(model, plan.primaryInput);
  } catch (primaryError) {
    if (!plan.fallbackInput || !shouldRetryWithAlternateImg2ImgInput(primaryError)) {
      throw primaryError;
    }
    try {
      return await ai.run(model, plan.fallbackInput);
    } catch (fallbackError) {
      throw new Error(
        `Workers AI img2img failed with both input formats. Primary: ${getErrorMessage(primaryError)}. Fallback: ${getErrorMessage(fallbackError)}.`
      );
    }
  }
}
__name(runWorkersAI, "runWorkersAI");
function shouldRetryWithAlternateImg2ImgInput(error) {
  void error;
  return true;
}
__name(shouldRetryWithAlternateImg2ImgInput, "shouldRetryWithAlternateImg2ImgInput");
function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return String(error);
}
__name(getErrorMessage, "getErrorMessage");
function normalizeSourceMimeType(value) {
  if (typeof value !== "string") {
    return "image/png";
  }
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "image/jpeg" || trimmed === "image/jpg") {
    return "image/jpeg";
  }
  if (trimmed === "image/webp") {
    return "image/webp";
  }
  return "image/png";
}
__name(normalizeSourceMimeType, "normalizeSourceMimeType");
function normalizeInputImages(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((entry) => {
    if (!entry || typeof entry !== "object") {
      return null;
    }
    const record = entry;
    const base64 = normalizeBase64(record.image_base64);
    if (!base64) {
      return null;
    }
    return {
      base64,
      mime: normalizeSourceMimeType(record.mime)
    };
  }).filter((entry) => entry !== null).slice(0, MAX_FLUX2_INPUT_IMAGES);
}
__name(normalizeInputImages, "normalizeInputImages");
function resolveSceneImageDataUrl(body) {
  const direct = typeof body.image_data_url === "string" ? body.image_data_url.trim() : "";
  if (direct.startsWith("data:image/")) {
    return direct;
  }
  const inline = typeof body.image === "string" ? body.image.trim() : "";
  if (inline.startsWith("data:image/")) {
    return inline;
  }
  const base64Value = normalizeBase64(
    body.image_base64 || body.image || body.image_data_url
  );
  if (!base64Value) return "";
  const mime = normalizeSourceMimeType(body.image_mime);
  return `data:${mime};base64,${base64Value}`;
}
__name(resolveSceneImageDataUrl, "resolveSceneImageDataUrl");
function buildSceneMaterialPrompt(maxMaterials) {
  return [
    "You are a vision system that extracts PBR-ready material regions from a single interior scene image.",
    "Return ONLY valid JSON with the schema:",
    '{"materials":[{"label":"Wall tile","type":"ceramic_tile","bbox":[0,0,1,1],"confidence":0.0}]}',
    "Rules:",
    `- Provide at most ${maxMaterials} materials.`,
    "- bbox is normalized [x1,y1,x2,y2] in 0..1 relative to image width/height.",
    "- bbox must have x1 < x2 and y1 < y2.",
    "- confidence is 0..1.",
    `- Use only these material types: ${MATERIAL_TYPES.join(", ")}.`,
    "- Prefer large planar architectural surfaces (floors, walls, ceilings, countertops).",
    "- Exclude furniture, decor, artwork, plants, or small objects.",
    "- Skip tiny, highly reflective, or ambiguous objects unless they are clear surface materials.",
    "- No extra keys and no markdown. JSON only."
  ].join("\n");
}
__name(buildSceneMaterialPrompt, "buildSceneMaterialPrompt");
async function handleSceneMaterialsRequest(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        error: {
          code: "bad_request",
          message: "Invalid JSON body"
        }
      },
      400
    );
  }
  const imageDataUrl = resolveSceneImageDataUrl(body);
  if (!imageDataUrl) {
    return jsonResponse(
      {
        error: {
          code: "bad_request",
          message: "image data is required"
        }
      },
      400
    );
  }
  const maxMaterials = clampInt(body.max_materials, 1, 12, 6);
  const resolvedModel = String(body.model || DEFAULT_VISION_MODEL).trim() || DEFAULT_VISION_MODEL;
  const messages = [
    {
      role: "system",
      content: "You are a precise vision assistant that returns structured JSON only."
    },
    {
      role: "user",
      content: buildSceneMaterialPrompt(maxMaterials)
    }
  ];
  const responseFormat = {
    type: "json_schema",
    json_schema: {
      type: "object",
      properties: {
        materials: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              type: { type: "string" },
              bbox: {
                type: "array",
                items: { type: "number" },
                minItems: 4,
                maxItems: 4
              },
              confidence: { type: "number" }
            },
            required: ["label", "type", "bbox"]
          }
        }
      },
      required: ["materials"]
    }
  };
  try {
    const out = await env.AI.run(resolvedModel, {
      messages,
      image: imageDataUrl,
      response_format: responseFormat,
      max_tokens: 512,
      temperature: 0.2
    });
    const parsed = parseSceneMaterialsFromOutput(out);
    if (!parsed) {
      return jsonResponse(
        {
          error: {
            code: "upstream_error",
            message: "Vision model did not return JSON materials."
          }
        },
        502
      );
    }
    const materials = sanitizeSceneMaterials(parsed, maxMaterials);
    return jsonResponse(
      {
        materials,
        model: resolvedModel,
        request_id: request.headers.get("cf-ray") || ""
      },
      200
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse(
      {
        error: {
          code: "upstream_error",
          message
        }
      },
      502
    );
  }
}
__name(handleSceneMaterialsRequest, "handleSceneMaterialsRequest");
async function handleSceneAgreeRequest(env) {
  try {
    await env.AI.run(DEFAULT_VISION_MODEL, {
      prompt: "agree"
    });
    return jsonResponse(
      {
        ok: true,
        model: DEFAULT_VISION_MODEL,
        message: "License accepted for llama-3.2-11b-vision-instruct."
      },
      200
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse(
      {
        error: {
          code: "upstream_error",
          message
        }
      },
      502
    );
  }
}
__name(handleSceneAgreeRequest, "handleSceneAgreeRequest");
function parseSceneMaterialsFromOutput(out) {
  if (out && typeof out === "object") {
    const record = out;
    if (Array.isArray(record.materials)) {
      return { materials: record.materials };
    }
    const response = record.response;
    if (response && typeof response === "object") {
      const nested = response;
      if (Array.isArray(nested.materials)) {
        return { materials: nested.materials };
      }
    }
    if (typeof record.result === "string") {
      return parseSceneMaterials(record.result);
    }
    if (typeof record.response === "string") {
      return parseSceneMaterials(record.response);
    }
    if (typeof record.text === "string") {
      return parseSceneMaterials(record.text);
    }
  }
  if (typeof out === "string") {
    return parseSceneMaterials(out);
  }
  return null;
}
__name(parseSceneMaterialsFromOutput, "parseSceneMaterialsFromOutput");
function parseSceneMaterials(text) {
  if (!text || typeof text !== "string") return null;
  const payload = extractJsonPayload(text);
  if (!payload || typeof payload !== "object") return null;
  const record = payload;
  if (!Array.isArray(record.materials)) return null;
  return { materials: record.materials };
}
__name(parseSceneMaterials, "parseSceneMaterials");
function extractJsonPayload(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const fenced = extractJsonFence(trimmed);
  const candidate = fenced ?? trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const slice = candidate.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    return null;
  }
}
__name(extractJsonPayload, "extractJsonPayload");
function extractJsonFence(text) {
  const fenceStart = text.indexOf("```");
  if (fenceStart === -1) return null;
  const fenceEnd = text.indexOf("```", fenceStart + 3);
  if (fenceEnd === -1) return null;
  return text.slice(fenceStart + 3, fenceEnd).replace(/^json/i, "").trim();
}
__name(extractJsonFence, "extractJsonFence");
function normalizeMaterialType(value) {
  if (typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!normalized) return "";
  if (MATERIAL_TYPES.includes(normalized)) {
    return normalized;
  }
  return MATERIAL_TYPE_ALIASES[normalized] || "";
}
__name(normalizeMaterialType, "normalizeMaterialType");
function bboxArea(bbox) {
  const width = Math.max(0, bbox[2] - bbox[0]);
  const height = Math.max(0, bbox[3] - bbox[1]);
  return width * height;
}
__name(bboxArea, "bboxArea");
function sanitizeSceneMaterials(input, maxMaterials) {
  const results = [];
  for (const entry of input.materials) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry;
    const label = typeof record.label === "string" ? record.label.trim() : "";
    const rawType = typeof record.type === "string" ? record.type.trim() : "";
    const type = normalizeMaterialType(rawType) || normalizeMaterialType(label);
    const bbox = normalizeBbox(record.bbox ?? record.bounds ?? record.box);
    if (!bbox || !type) continue;
    if (bboxArea(bbox) < MIN_MATERIAL_AREA) continue;
    const confidence = clampFloat(record.confidence, 0, 1, 0);
    results.push({
      label: label || type.replace(/_/g, " "),
      type,
      bbox,
      confidence
    });
    if (results.length >= maxMaterials) break;
  }
  return results;
}
__name(sanitizeSceneMaterials, "sanitizeSceneMaterials");
function normalizeBbox(value) {
  if (!Array.isArray(value) || value.length < 4) return null;
  const numbers = value.slice(0, 4).map((item) => {
    if (typeof item !== "number" || !Number.isFinite(item)) return 0;
    return Math.min(1, Math.max(0, item));
  });
  if (numbers[0] >= numbers[2] || numbers[1] >= numbers[3]) return null;
  return numbers;
}
__name(normalizeBbox, "normalizeBbox");
function buildFlux2MultipartInput(prompt, width, height, seed, inputImages) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("width", String(width));
  form.append("height", String(height));
  if (seed !== null) {
    form.append("seed", String(seed));
  }
  inputImages.slice(0, MAX_FLUX2_INPUT_IMAGES).forEach((image, index) => {
    appendFlux2InputImage(form, index, image);
  });
  const formResponse = new Response(form);
  return {
    multipart: {
      body: formResponse.body,
      contentType: formResponse.headers.get("content-type") || "multipart/form-data"
    }
  };
}
__name(buildFlux2MultipartInput, "buildFlux2MultipartInput");
function appendFlux2InputImage(form, index, image) {
  const bytes = base64ToBytes(image.base64);
  form.append(
    `input_image_${index}`,
    new Blob([bytes], { type: image.mime }),
    getFlux2InputFilename(index, image.mime)
  );
}
__name(appendFlux2InputImage, "appendFlux2InputImage");
function getFlux2InputFilename(index, mimeType) {
  if (mimeType === "image/jpeg") return `input-${index}.jpg`;
  if (mimeType === "image/webp") return `input-${index}.webp`;
  return `input-${index}.png`;
}
__name(getFlux2InputFilename, "getFlux2InputFilename");
async function extractImageResult(out) {
  const direct = extractDirectImageResult(out);
  if (direct.imageBase64) {
    return direct;
  }
  if (out instanceof Response || out instanceof ReadableStream || out instanceof Blob || out instanceof ArrayBuffer || ArrayBuffer.isView(out)) {
    return readBinaryImage(out);
  }
  return { imageBase64: "", mime: "" };
}
__name(extractImageResult, "extractImageResult");
function extractDirectImageResult(out) {
  if (!out || typeof out !== "object") {
    return { imageBase64: "", mime: "" };
  }
  const record = out;
  const directMime = typeof record.mime === "string" ? record.mime : "";
  if (typeof record.image === "string") {
    return { imageBase64: record.image, mime: directMime || "image/png" };
  }
  if (typeof record.base64 === "string") {
    return { imageBase64: record.base64, mime: directMime || "image/png" };
  }
  const result = record.result;
  if (result && typeof result === "object") {
    const nested = result;
    const nestedMime = typeof nested.mime === "string" ? nested.mime : directMime;
    if (typeof nested.image === "string") {
      return { imageBase64: nested.image, mime: nestedMime || "image/png" };
    }
    if (typeof nested.base64 === "string") {
      return { imageBase64: nested.base64, mime: nestedMime || "image/png" };
    }
  }
  return { imageBase64: "", mime: "" };
}
__name(extractDirectImageResult, "extractDirectImageResult");
async function readBinaryImage(out) {
  const response = out instanceof Response ? out : new Response(out);
  const buffer = await response.arrayBuffer();
  if (!buffer.byteLength) {
    return { imageBase64: "", mime: "" };
  }
  return {
    imageBase64: bytesToBase64(new Uint8Array(buffer)),
    mime: response.headers.get("content-type") || "image/png"
  };
}
__name(readBinaryImage, "readBinaryImage");
function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}
__name(bytesToBase64, "bytesToBase64");
function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(base64ToBytes, "base64ToBytes");
export {
  index_default as default
};
//# sourceMappingURL=worker.js.map
