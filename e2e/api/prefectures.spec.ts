import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('/api/prefectures', async () => {
  await setup({
    // Require Nuxt dev server to be running
    host: 'http://localhost:3000',
  })

  it('should return a list of prefectures', async () => {
    const prefectures = await $fetch('/api/prefectures')
    expect(prefectures.length).toBe(47)
    expect(prefectures[0]).toEqual({ prefCode: 1, prefName: '北海道' })
  })
})
