'use server'

import { getApi } from '@/services/api'

export const login = async (data: any) => {
  try {
    const response = await getApi().postLogin(data)
    console.log('response', response)
    return response
  } catch (error) {
    console.log(error, 'error')
  }
}
