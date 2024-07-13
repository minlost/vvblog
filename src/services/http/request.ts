import { DEFAULT_CACHE_DURATION } from './constants'
import { CustomRequestInit } from './interface'
import { getTagForEndpoint } from './utils'
import { redirect } from 'next/navigation'
import Errors from '@/services/http/errors'
import { setCookie } from 'cookies-next'

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

  // Set cookie after fetching the response

  // if (!response.ok) {
  //   if (response.status === 500) {
  //     throw new Error(Errors.Internal)
  //   } else if (response.status === 401) {
  //     if (isRetry) {
  //       throw new Error(
  //         'Authorization failed after retry. Token fetching returned 401 again.',
  //       )
  //     }
  //     // Handle retry logic or token refresh here if needed
  //   }
  // }

  return response
}
