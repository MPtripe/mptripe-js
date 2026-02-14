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
export {
  MPtripe2 as MPtripe,
  ProductsResource,
  Resource
};
