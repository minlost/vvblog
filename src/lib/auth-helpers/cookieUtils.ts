export const getCookie = (
  cookies: string,
  name: string,
): string | undefined => {
  return cookies
    .split(';')
    .find((cookie: string) => cookie.trim().startsWith(`${name}=`))
    ?.split('=')[1]
}
