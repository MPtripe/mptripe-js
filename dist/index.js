"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MPtripe: () => MPtripe2,
  ProductsResource: () => ProductsResource,
  Resource: () => Resource
});
module.exports = __toCommonJS(index_exports);

// src/resources/index.ts
var PlansResource = class extends Resource {
  /**
   * List all plans
   */
  async list() {
    return this.client.request("/plans");
  }
  /**
   * Retrieve a specific plan
   */
  async retrieve(id) {
    return this.client.request(`/plans/${id}`);
  }
  /**
   * Search plans (e.g. by product)
   */
  async search(params) {
    const query = new URLSearchParams(params).toString();
    return this.client.request(`/plans/search?${query}`);
  }
};
var SubscriptionsResource = class extends Resource {
  /**
   * List all subscriptions
   */
  async list() {
    return this.client.request("/subscriptions");
  }
  /**
   * Retrieve a specific subscription
   */
  async retrieve(id) {
    return this.client.request(`/subscriptions/${id}`);
  }
  /**
   * Cancel a subscription
   */
  async cancel(id) {
    return this.client.request(`/subscriptions/${id}/cancel`, {
      method: "POST"
    });
  }
};

// src/config.ts
var CONFIG = {
  DEFAULT_BASE_URL: "https://api.mptripe.com/v1",
  VERSION: "0.0.1",
  USER_AGENT: "MPtripe-JS/0.0.1"
};

// src/index.ts
var MPtripe2 = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = CONFIG.DEFAULT_BASE_URL;
    if (!this.apiKey) {
      throw new Error("MPtripe: API Key is required");
    }
    this.products = new ProductsResource(this);
    this.plans = new PlansResource(this);
    this.subscriptions = new SubscriptionsResource(this);
  }
  /**
   * Internal request method
   */
  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": `MPtripe-JS/0.0.1`,
      ...options.headers
    };
    const response = await fetch(url, {
      ...options,
      headers
    });
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
      }
      throw new Error(`MPtripe Error: ${errorMessage}`);
    }
    return response.json();
  }
};
var Resource = class {
  constructor(client) {
    this.client = client;
  }
};
var ProductsResource = class extends Resource {
  /**
   * List all products
   */
  async list() {
    return this.client.request("/products");
  }
  /**
   * Retrieve a specific product
   */
  async retrieve(id) {
    return this.client.request(`/products/${id}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MPtripe,
  ProductsResource,
  Resource
});
