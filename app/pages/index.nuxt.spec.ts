import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import IndexPage from '~/pages/index.vue'

registerEndpoint('/api/prefectures', () => [
  { prefCode: 1, prefName: 'Tokyo' },
  { prefCode: 2, prefName: 'Osaka' },
])

describe('indexPage', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: {
          PrefectureSelects: true,
          Population: true,
        },
      },
    })

    // Check if the main title is rendered
    expect(wrapper.find('h1').text()).toBe('都道府県別人口推移グラフ')

    // Check if PrefectureSelects stub is rendered
    expect(wrapper.findComponent({ name: 'PrefectureSelects' }).exists()).toBe(true)

    // Check if Population stub is rendered
    expect(wrapper.findComponent({ name: 'Population' }).exists()).toBe(true)
  })

  it('passes correct props to child components', async () => {
    const wrapper = await mountSuspended(IndexPage, {
      global: {
        stubs: {
          PrefectureSelects: true,
          Population: true,
        },
      },
    })

    const prefectureSelects = wrapper.findComponent({ name: 'PrefectureSelects' })
    const population = wrapper.findComponent({ name: 'Population' })

    // Check props passed to PrefectureSelects
    expect(prefectureSelects.props('prefectures')).toEqual([
      { prefCode: 1, prefName: 'Tokyo' },
      { prefCode: 2, prefName: 'Osaka' },
    ])

    // Check props passed to Population
    expect(population.props('prefectures')).toEqual([
      { prefCode: 1, prefName: 'Tokyo' },
      { prefCode: 2, prefName: 'Osaka' },
    ])
    expect(population.props('selectedPrefectures')).toEqual([])
  })

  // Add more tests as needed
})
