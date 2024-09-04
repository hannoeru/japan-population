import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import PopulationChart from './PopulationChart.vue'

registerEndpoint('/api/populations', () => [
  {
    prefCode: 1,
    data: [{
      label: '総人口',
      data: [{
        year: 1980,
        value: 12817,
      }],
    }, {
      label: '年少人口',
      data: [{
        year: 1980,
        value: 2906,
        rate: 22.67,
      }],
    }, {
      label: '生産年齢人口',
      data: [{
        year: 1980,
        value: 8360,
        rate: 65.23,
      }],
    }, {
      label: '老年人口',
      data: [{
        year: 1980,
        value: 1550,
        rate: 12.09,
      }],
    }],
  },
])

describe('populationChart', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: 'Tokyo' },
    { prefCode: 2, prefName: 'Osaka' },
  ]

  it('renders correctly', async () => {
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: [1, 2],
        selectedPopulationType: 'total',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    // Check if the Chart component is rendered when there's no error
    expect(wrapper.findComponent({ name: 'Chart' }).exists()).toBe(true)

    // Check if error message is not displayed
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
  })

  it.todo('displays error message when fetch fails', async () => {
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: [1, 2],
        selectedPopulationType: 'total',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    // Check if error message is displayed
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
    expect(wrapper.text()).toContain('サーバーからデータを取得できませんでした。')
    expect(wrapper.text()).toContain('Server error')

    // Check if Chart component is not rendered when there's an error
    expect(wrapper.findComponent({ name: 'Chart' }).exists()).toBe(false)
  })

  it('passes correct props to Chart component', async () => {
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: [1, 2],
        selectedPopulationType: 'total',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    const chartComponent = wrapper.findComponent({ name: 'Chart' })
    expect(chartComponent.exists()).toBe(true)

    // Check if data and options props are passed to Chart component
    expect(chartComponent.props('data')).toBeDefined()
    expect(chartComponent.props('options')).toBeDefined()
  })

  // Add more tests as needed
})
