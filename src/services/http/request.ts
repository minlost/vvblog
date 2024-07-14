import { DEFAULT_CACHE_DURATION } from './constants'
import { CustomRequestInit } from './interface'
import { getTagForEndpoint } from './utils'

export const request = async (
  url: string,
  options: CustomRequestInit,
  body?: BodyInit,
): Promise<Response> => {
  console.log('rigus')

  const tag = getTagForEndpoint(url)
  const mergedOptions: CustomRequestInit = {
    ...options,
    ...(body !== undefined && {
      body: typeof body === 'object' ? JSON.stringify(body) : body,
    }),
    headers: { ...options.headers },
    ...(tag !== '' && {
      next: {
        tags: [tag],
        revalidate: options.cacheDuration ?? DEFAULT_CACHE_DURATION,
      },
    }),
  }

  const response = await fetch(url, mergedOptions)

  return response
}
