//@ts-nocheck
import { ApiRequestOptions } from './interface'
import { revalidateTag } from './cache'
import { isJSONType } from './utils'
import { request } from '@/services/http/request'

class CoreHttpClient {
  private static instance: CoreHttpClient

  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl
  }

  static initialize(baseUrl: string): void {
    if (!CoreHttpClient.instance) {
      CoreHttpClient.instance = new CoreHttpClient(baseUrl)
      Object.freeze(this.instance)
    }
  }

  static getInstance(): CoreHttpClient {
    if (!CoreHttpClient.instance) {
      throw new Error(
        'CoreHttpClient is not initialized. Call initialize() first.',
      )
    }
    return CoreHttpClient.instance
  }

  async apiRequest<T>({
    url,
    method = 'POST',
    params,
    headers,
    data,
  }: ApiRequestOptions<T>): Promise<T> {
    let endpoint = `${this.baseUrl}${url}`
    if (params !== undefined) {
      endpoint += '?' + new URLSearchParams(params)
    }

    const body = isJSONType(data) ? JSON.stringify(data) : data

    const response = await request(
      endpoint,
      {
        method,
        headers,
      },
      body,
    )

    // if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
    //   revalidateTag(url)
    // }
    // if (response.headers.get('Content-Type') !== 'application/json') {
    //   return response
    // }
    return response

    // console.log(response, 'ttt')
    // return this._handleResponse(response) as T
  }

  private async _handleResponse<T>(res: Response): Promise<T> {
    const json = await res.json()
    if (!json) console.log(`Warning: No data returned from ${res.url}`)
    return json
  }
}

export { CoreHttpClient }
