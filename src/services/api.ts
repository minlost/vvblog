import { apiRequest } from '@/services/client'

interface LoginResponseData {
  success: boolean
}

interface TestResponseData {
  message: string
}

interface LoginData {
  username: string
  password: string
}

interface ApiResponse<T> {
  data: T
}

export const getApi = () => {
  const postLogin = async (requestData: LoginData) => {
    const response = await apiRequest<ApiResponse<LoginResponseData>>({
      url: '/api/public/login',
      method: 'POST',
      data: requestData,
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  }

  const test = async (): Promise<ApiResponse<TestResponseData>> => {
    const response = await apiRequest<ApiResponse<TestResponseData>>({
      url: '/api/private/test',
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
