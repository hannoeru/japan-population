import { fetchTotalPopulation } from '../utils/resas';
import { Population } from '~~/types/api';
import { toArray } from '@antfu/eslint-config';

export default defineCachedEventHandler(async (event) => {
  const query = getQuery<{
    prefCode: string | string[]
  }>(event);

  if (!query.prefCode) {
    throw createError({
      statusCode: 400,
      statusMessage: "prefCode is required"
    })
  }

  const prefCode = toArray(query.prefCode)

  const results: Population[] = []

  for (const code of prefCode) {
    const totalPopulation = await fetchTotalPopulation(event, code)
    results.push({
      prefCode: code,
      data: totalPopulation
    })
  }

  return results
}, {
  group: 'api',
  name: 'populations',
  swr: true,
  maxAge: 60 * 60, // 1 hour
})
