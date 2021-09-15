class BaseService {

    protected client: typeof fetch;

    constructor(client: typeof fetch) {
        this.client = client;
    }
}

export default BaseService