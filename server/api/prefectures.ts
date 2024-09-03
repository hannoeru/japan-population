import { PrefecturesResponse } from '~~/types/resas'

export default defineEventHandler(async (event) => {
  const resasClient = useResasClient(event)
  const { result } = await resasClient<PrefecturesResponse>('/api/v1/prefectures')

  return result
})
