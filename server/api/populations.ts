import { toArray } from '@antfu/eslint-config'
import { fetchPopulation } from '../utils/resas'
import type { Population } from '~~/types/api'

export default defineCachedEventHandler(async (event) => {
  const query = getQuery<{
    prefCodes: string | string[]
  }>(event)

  if (!query.prefCodes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'prefCode is required',
    })
  }

  const prefCodes = toArray(query.prefCodes)

  const results: Population[] = []

  for (const code of prefCodes) {
    const population = await fetchPopulation(event, code)
    results.push({
      prefCode: Number(code),
      data: population,
    })
  }

  return results
}, {
  group: 'api',
  name: 'populations',
  swr: true,
  maxAge: 60 * 60, // 1 hour
})
