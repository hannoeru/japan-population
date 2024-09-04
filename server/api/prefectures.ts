import type { H3Event } from 'h3'
import type { PrefecturesResponse } from '~~/types/resas'

export default defineCachedEventHandler(async (event) => {
  const resasClient = useResasClient(event)
  /**
   * 都道府県一覧を取得する
   * @see https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
   */
  const { result } = await resasClient<PrefecturesResponse>('/api/v1/prefectures')
  return result
}, {
  group: 'api',
  name: 'prefectures',
  maxAge: 60 * 60, // 1 hour
  getKey: (event: H3Event) => JSON.stringify(getQuery(event)),
})
