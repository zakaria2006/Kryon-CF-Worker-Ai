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

// src/index.ts
var DEFAULT_MODEL = "@cf/black-forest-labs/flux-1-schnell";
var DEFAULT_AUGMENT_MODEL = "@cf/runwayml/stable-diffusion-v1-5-img2img";
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return jsonResponse(
        {
          ok: true,
          service: "kryon-ai-worker",
          endpoint: "/v1/pbr/generate"
        },
        200
      );
    }
    if (request.method !== "POST" || url.pathname !== "/v1/pbr/generate") {
      return jsonResponse(
        {
          error: {
            code: "not_found",
            message: "Use POST /v1/pbr/generate"
          }
        },
        404
      );
    }
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
    const requestedModel = String(body.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;
    const resolvedModel = resolveModel(requestedModel, sourceImageBase64 !== "");
    const aiPlan = buildAiRunPlan(body, prompt, resolvedModel, sourceImageBase64);
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
      "content-type": "application/json"
    }
  });
}
__name(jsonResponse, "jsonResponse");
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
  return normalized.includes("img2img") || normalized.includes("inpainting");
}
__name(isImageToImageModel, "isImageToImageModel");
function resolveModel(requestedModel, hasSourceImage) {
  if (!hasSourceImage) {
    return isImageToImageModel(requestedModel) ? DEFAULT_MODEL : requestedModel;
  }
  if (isInpaintingModel(requestedModel)) {
    return DEFAULT_AUGMENT_MODEL;
  }
  if (isImageToImageModel(requestedModel)) {
    return requestedModel;
  }
  if (isFluxSchnell(requestedModel)) {
    return DEFAULT_AUGMENT_MODEL;
  }
  return requestedModel;
}
__name(resolveModel, "resolveModel");
function buildAiInput(body, prompt, model, sourceImageBase64, img2ImgEncoding = "base64") {
  const width = clampInt(body.width, 256, 2048, 1024);
  const height = clampInt(body.height, 256, 2048, 1024);
  const seed = typeof body.seed === "number" && Number.isFinite(body.seed) ? Math.floor(body.seed) : null;
  if (isFlux2Model(model)) {
    return buildFlux2MultipartInput(
      prompt,
      width,
      height,
      seed,
      sourceImageBase64,
      normalizeSourceMimeType(body.source_mime)
    );
  }
  if (isImageToImageModel(model) && sourceImageBase64) {
    const aiInput2 = {
      prompt,
      width,
      height,
      strength: clampFloat(body.strength, 0.05, 1, 0.72)
    };
    if (img2ImgEncoding === "bytes") {
      aiInput2.image = Array.from(base64ToBytes(sourceImageBase64));
    } else {
      aiInput2.image_b64 = sourceImageBase64;
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
function buildAiRunPlan(body, prompt, model, sourceImageBase64) {
  const primaryInput = buildAiInput(body, prompt, model, sourceImageBase64, "base64");
  if (!shouldUseAlternateImg2ImgInput(model, sourceImageBase64)) {
    return { primaryInput };
  }
  return {
    primaryInput,
    fallbackInput: buildAiInput(body, prompt, model, sourceImageBase64, "bytes")
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
function buildFlux2MultipartInput(prompt, width, height, seed, sourceImageBase64, sourceMimeType) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("width", String(width));
  form.append("height", String(height));
  if (seed !== null) {
    form.append("seed", String(seed));
  }
  if (sourceImageBase64) {
    const bytes = base64ToBytes(sourceImageBase64);
    form.append(
      "input_image_0",
      new Blob([bytes], { type: sourceMimeType }),
      sourceMimeType === "image/jpeg" ? "source.jpg" : sourceMimeType === "image/webp" ? "source.webp" : "source.png"
    );
  }
  const formResponse = new Response(form);
  return {
    multipart: {
      body: formResponse.body,
      contentType: formResponse.headers.get("content-type") || "multipart/form-data"
    }
  };
}
__name(buildFlux2MultipartInput, "buildFlux2MultipartInput");
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
//# sourceMappingURL=index.js.map
