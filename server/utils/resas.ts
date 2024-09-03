import type { H3Event } from 'h3'

let _resasClient: typeof $fetch

export function useResasClient(event: H3Event) {
  if (!_resasClient) {
    const config = useRuntimeConfig(event)
    _resasClient = $fetch.create({
      baseURL: 'https://opendata.resas-portal.go.jp',
      headers: {
        'X-API-KEY': config.resasApiKey,
      },
    })
  }
  return _resasClient
}
