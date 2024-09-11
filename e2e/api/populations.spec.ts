import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('/api/populations', async () => {
  await setup({
    // Require Nuxt dev server to be running
    host: 'http://localhost:3000',
  })

  it('should return a list of populations', async () => {
    const populations = await $fetch('/api/populations', {
      query: {
        prefCodes: [1, 2, 3],
      },
    })
    expect(populations.length).toBe(3)
    expect(populations[0]?.prefCode).toBe(1)
    expect(populations[0]?.prefName).toBe('北海道')
    // Should return 4 types of population data
    expect(populations[0]?.data.length).toBe(4)
    expect(populations[0]?.data).toMatchSnapshot()
  })
})
