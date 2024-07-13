//@ts-nocheck

import { CoreHttpClient } from './CoreHttpClient'
import { ApiRequestOptions } from './interface'

export abstract class BaseService {
    protected httpClient: CoreHttpClient

    constructor() {
        this.httpClient = CoreHttpClient.getInstance()
    }

    abstract apiRequest<T>(params: ApiRequestOptions): Promise<T>
}
