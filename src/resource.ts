
import type { MPtripe } from './index';

export class Resource {
    protected client: MPtripe;
    constructor(client: MPtripe) {
        this.client = client;
    }
}
