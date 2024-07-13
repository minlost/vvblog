import { apiRequest } from './client'

export const getApi = () => {
  const postLogin = async (data: any) => {
    const response = await apiRequest({
      url: '/api/login',
      method: 'POST',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  }

  const test = async () => {
    const response = await apiRequest({
      url: '/api/test',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  }

  return {
    postLogin,
    test,
  }
}
