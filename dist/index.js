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
  MPtripe: () => MPtripe
});
module.exports = __toCommonJS(index_exports);

// src/resource.ts
var Resource = class {
  constructor(client) {
    this.client = client;
  }
};

// src/resources/index.ts
var IntegrationsResource = class extends Resource {
  /**
   * List all integrations
   */
  async list() {
    return this.client.request("/integrations");
  }
};
var ProductsResource = class extends Resource {
  /**
   * List all products for an integration
   */
  async list(integrationId) {
    return this.client.request(`/integrations/${integrationId}/products/list`);
  }
};
var CheckoutResource = class extends Resource {
  /**
   * Create a checkout session
   */
  async create(integrationId, data) {
    return this.client.request(`/integrations/${integrationId}/checkout`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};
var CustomersResource = class extends Resource {
  /**
   * List all customers for an integration
   */
  async list(integrationId) {
    return this.client.request(`/integrations/${integrationId}/customers`);
  }
};
var PaymentsResource = class extends Resource {
  /**
   * List all payments for an integration
   */
  async list(integrationId) {
    return this.client.request(`/integrations/${integrationId}/payments`);
  }
};
var SubscriptionsResource = class extends Resource {
  /**
   * Activate a free subscription
   */
  async createFree(integrationId, data) {
    return this.client.request(`/integrations/${integrationId}/subscriptions/free`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};

// src/config.ts
var CONFIG = {
  DEFAULT_BASE_URL: "https://www.mptripe.com/api",
  VERSION: "0.0.1",
  USER_AGENT: "MPtripe-JS/0.0.1"
};

// src/index.ts
var MPtripe = class {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || CONFIG.DEFAULT_BASE_URL;
    if (!this.apiKey) {
      throw new Error("MPtripe: API Key is required");
    }
    this.integrations = new IntegrationsResource(this);
    this.products = new ProductsResource(this);
    this.checkout = new CheckoutResource(this);
    this.customers = new CustomersResource(this);
    this.payments = new PaymentsResource(this);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MPtripe
});
