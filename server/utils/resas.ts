import type { H3Event } from 'h3'
import type { PopulationCompositionResponse } from '~~/types/resas'

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

// Read more about caching functions https://hub.nuxt.com/docs/features/cache#server-functions-caching
export const fetchPopulation = defineCachedFunction(async (event: H3Event, prefCode: string) => {
  const resasClient = useResasClient(event)
  /**
   * 人口構成データを取得する
   * @see https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
   */
  const { result } = await resasClient<PopulationCompositionResponse>('/api/v1/population/composition/perYear', {
    query: {
      prefCode,
      // 「すべての市区町村」を選択する場合は「-」を送ります。
      cityCode: '-',
    },
  })

  return result.data
}, {
  maxAge: 60 * 60, // 1 hour
  swr: true,
  group: 'functions',
  name: 'fetchPopulation',
  getKey: (_event: H3Event, prefCode: string) => prefCode,
})
