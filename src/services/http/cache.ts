import { getTagForEndpoint } from './utils'

export const revalidateCache = async (tag: string): Promise<void> => {
    const res = await fetch(`/api/clean-cache`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${process.env.NEXT_PUBLIC_NEXT_API_TOKEN}`,
        },
        body: JSON.stringify({ tag }),
    })

    if (res.ok === false) {
        throw new Error(res.statusText)
    }

    return await res.json()
}

export const revalidateTag = (url: string) => {
    const tag = getTagForEndpoint(url)

    if (tag !== '') {
        revalidateCache(tag)
    }
}
