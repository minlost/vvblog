/**
 * This extends the type definition to accept custom next property for Next.js 13 usage.
 */
export interface CustomRequestInit extends RequestInit {
    cacheDuration?: number
    contentType?: 'application/json' | 'multipart/form-data'
    next?:
        | {
              tags?: string[]
              revalidate?: number | false
          }
        | undefined
}

export interface ApiRequestOptions<T> {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    params?: any
    headers?: HeadersInit
    data?: T
    responseType?: string
}
