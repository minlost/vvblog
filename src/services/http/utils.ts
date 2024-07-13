import { ENDPOINT_TAGS } from './constants'

export const getTagForEndpoint = (endpoint: string): string => {
    const baseEndpoint = endpoint.split('?')[0]
    const tag = ENDPOINT_TAGS[baseEndpoint as keyof typeof ENDPOINT_TAGS] || ''
    if (typeof tag !== 'string') {
        throw new Error(`Expected tag to be a string, but got ${typeof tag}`)
    }
    return tag
}

export function isJSONType(data: BodyInit | JSON | undefined): data is JSON {
    try {
        JSON.stringify(data)
    } catch (error) {
        return false
    }
    return true
}
