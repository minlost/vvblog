export const getApi = () => {
  const postLogin = async (data: any) => {
    return apiRequest({
      url: '/api/login',
      method: 'POST',
      data: data,
      headers: {},
    })
  }
}

const apiRequest = async (url: string, method: string, data: any) => {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
