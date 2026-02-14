declare class Resource {
    protected client: MPtripe;
    constructor(client: MPtripe);
}

declare class IntegrationsResource extends Resource {
    /**
     * List all integrations
     */
    list(): Promise<any[]>;
}
declare class ProductsResource extends Resource {
    /**
     * List all products for an integration
     */
    list(integrationId: string): Promise<any[]>;
}
declare class CheckoutResource extends Resource {
    /**
     * Create a checkout session
     */
    create(integrationId: string, data: any): Promise<any>;
}
declare class CustomersResource extends Resource {
    /**
     * List all customers for an integration
     */
    list(integrationId: string): Promise<any[]>;
}
declare class PaymentsResource extends Resource {
    /**
     * List all payments for an integration
     */
    list(integrationId: string): Promise<any[]>;
}
declare class SubscriptionsResource extends Resource {
    /**
     * Activate a free subscription
     */
    createFree(integrationId: string, data: any): Promise<any>;
}

declare class MPtripe {
    private apiKey;
    private baseUrl;
    integrations: IntegrationsResource;
    products: ProductsResource;
    checkout: CheckoutResource;
    customers: CustomersResource;
    payments: PaymentsResource;
    subscriptions: SubscriptionsResource;
    constructor(apiKey: string, options?: {
        baseUrl?: string;
    });
    /**
     * Internal request method
     */
    request<T>(path: string, options?: RequestInit): Promise<T>;
}

export { MPtripe };
