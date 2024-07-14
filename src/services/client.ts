import { CoreHttpClient } from '@/services/http/coreHttpClient'
import { ApiRequestOptions } from '@/services/http/interface'

const apiUrl =
  process.env.NEXT_PUBLIC_NEXT_API_URL === undefined
    ? ''
    : process.env.NEXT_PUBLIC_NEXT_API_URL

CoreHttpClient.initialize(apiUrl)
export const httpClient = CoreHttpClient.getInstance()

export async function apiRequest<T>(params: ApiRequestOptions): Promise<T> {
  return httpClient.apiRequest(params)
}

export default httpClient
