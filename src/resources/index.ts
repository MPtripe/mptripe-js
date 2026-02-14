
import { Resource } from '../resource';

export class IntegrationsResource extends Resource {
    /**
     * List all integrations
     */
    async list() {
        return this.client.request<any[]>('/integrations');
    }
}

export class ProductsResource extends Resource {
    /**
     * List all products for an integration
     */
    async list(integrationId: string) {
        return this.client.request<any[]>(`/integrations/${integrationId}/products/list`);
    }
}

export class CheckoutResource extends Resource {
    /**
     * Create a checkout session
     */
    async create(integrationId: string, data: any) {
        return this.client.request<any>(`/integrations/${integrationId}/checkout`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

export class CustomersResource extends Resource {
    /**
     * List all customers for an integration
     */
    async list(integrationId: string) {
        return this.client.request<any[]>(`/integrations/${integrationId}/customers`);
    }
}

export class PaymentsResource extends Resource {
    /**
     * List all payments for an integration
     */
    async list(integrationId: string) {
        return this.client.request<any[]>(`/integrations/${integrationId}/payments`);
    }
}

export class SubscriptionsResource extends Resource {
    /**
     * Activate a free subscription
     */
    async createFree(integrationId: string, data: any) {
        return this.client.request<any>(`/integrations/${integrationId}/subscriptions/free`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
