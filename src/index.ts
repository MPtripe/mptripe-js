

import {
    IntegrationsResource,
    ProductsResource,
    CheckoutResource,
    CustomersResource,
    PaymentsResource,
    SubscriptionsResource
} from './resources';

import { CONFIG } from './config';

export class MPtripe {
    private apiKey: string;
    private baseUrl: string;

    public integrations: IntegrationsResource;
    public products: ProductsResource;
    public checkout: CheckoutResource;
    public customers: CustomersResource;
    public payments: PaymentsResource;
    public subscriptions: SubscriptionsResource;

    constructor(apiKey: string, options: { baseUrl?: string } = {}) {
        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || CONFIG.DEFAULT_BASE_URL;

        if (!this.apiKey) {
            throw new Error('MPtripe: API Key is required');
        }

        // Initialize Resources
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
    public async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': `MPtripe-JS/0.0.1`,
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            // Try to parse error message from JSON
            let errorMessage = `Request failed with status ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) { /* ignore json parse error */ }

            throw new Error(`MPtripe Error: ${errorMessage}`);
        }

        return response.json() as Promise<T>;
    }
}


