declare class PlansResource extends Resource {
    /**
     * List all plans
     */
    list(): Promise<any[]>;
    /**
     * Retrieve a specific plan
     */
    retrieve(id: string): Promise<any>;
    /**
     * Search plans (e.g. by product)
     */
    search(params: {
        productId?: string;
    }): Promise<any[]>;
}
declare class SubscriptionsResource extends Resource {
    /**
     * List all subscriptions
     */
    list(): Promise<any[]>;
    /**
     * Retrieve a specific subscription
     */
    retrieve(id: string): Promise<any>;
    /**
     * Cancel a subscription
     */
    cancel(id: string): Promise<any>;
}

declare class MPtripe {
    private apiKey;
    private baseUrl;
    products: ProductsResource;
    plans: PlansResource;
    subscriptions: SubscriptionsResource;
    constructor(apiKey: string);
    /**
     * Internal request method
     */
    request<T>(path: string, options?: RequestInit): Promise<T>;
}
declare class Resource {
    protected client: MPtripe;
    constructor(client: MPtripe);
}
declare class ProductsResource extends Resource {
    /**
     * List all products
     */
    list(): Promise<any[]>;
    /**
     * Retrieve a specific product
     */
    retrieve(id: string): Promise<any>;
}

export { MPtripe, ProductsResource, Resource };
