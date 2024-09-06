import { toArray } from '@antfu/utils'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { EventHandler } from 'h3'
import { getQuery } from 'h3'
import { describe, expect, it, vi } from 'vitest'
import PopulationChart from './PopulationChart.vue'

const populationData = [
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
  {
    prefCode: 2,
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
]

const { populationApiHandler } = vi.hoisted(() => {
  return {
    populationApiHandler: vi.fn<EventHandler>().mockImplementation(() => {
      return populationData
    }),
  }
})

registerEndpoint('/api/populations', populationApiHandler)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('populationChart', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        selectedPrefectures: [1, 2],
        selectedPopulationType: 'total',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    // Check Chart component is not rendered on init
    expect(wrapper.findComponent({ name: 'Chart' }).exists()).not.toBe(true)

    // Check init text show
    expect(wrapper.text()).toContain('都道府県を選択してください')

    // Check if error message is not displayed
    expect(wrapper.text()).not.toContain('サーバーからデータを取得できませんでした。')
  })

  it('passes correct props to Chart component', async () => {
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        selectedPrefectures: [1, 2],
        selectedPopulationType: '総人口',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    await wait(120)

    const chartComponent = wrapper.findComponent({ name: 'Chart' })
    expect(chartComponent.exists()).toBe(true)

    // Check if data and options props are passed to Chart component
    expect(chartComponent.props('data')).toBeDefined()
    expect(chartComponent.props('options')).toBeDefined()
  })

  it('load extra data when selectedPrefectures changed', async () => {
    populationApiHandler.mockImplementation((event) => {
      const prefCodes = toArray(getQuery(event).prefCodes).map(Number) as number[]
      return populationData.filter(data => prefCodes.includes(data.prefCode))
    })
    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        selectedPrefectures: [1],
        selectedPopulationType: '総人口',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    // wait for debounce
    await wait(120)

    // @ts-expect-error mssing type for script setup
    expect(wrapper.vm.populations.value.length).toBe(1)
    // @ts-expect-error mssing type for script setup
    expect(wrapper.vm.showPopulations.length).toBe(1)

    wrapper.setProps({
      selectedPrefectures: [1, 2],
      selectedPopulationType: '総人口',
    })

    // wait for debounce
    await wait(120)

    // @ts-expect-error mssing type for script setup
    expect(wrapper.vm.populations.value.length).toBe(2)
    // @ts-expect-error mssing type for script setup
    expect(wrapper.vm.showPopulations.length).toBe(2)
  })

  it('displays error message when fetch fails', async () => {
    populationApiHandler.mockImplementation(() => {
      throw createError('Server error')
    })

    const wrapper = await mountSuspended(PopulationChart, {
      props: {
        selectedPrefectures: [1, 2],
        selectedPopulationType: 'total',
      },
      global: {
        stubs: {
          Chart: true,
        },
      },
    })

    // wait for debounce
    await wait(100)

    // Check if error message is displayed
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
    expect(wrapper.text()).toContain('サーバーからデータを取得できませんでした。')
    // Check if Chart component is not rendered when there's an error
    expect(wrapper.findComponent({ name: 'Chart' }).exists()).toBe(false)
  })
})
