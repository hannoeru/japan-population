import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { mount } from '@vue/test-utils'
import Population from './Population.vue'

describe('population', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: 'Hokkaido' },
    { prefCode: 2, prefName: 'Aomori' },
  ]
  const mockSelectedPrefectures = [1]

  it('renders correctly', async () => {
    const wrapper = await mountSuspended(Population, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: mockSelectedPrefectures,
      },
      global: {
        stubs: {
          PopulationChart: true,
        },
      },
    })

    expect(wrapper.html()).toContain('総人口推移グラフ')
    expect(wrapper.findAll('button')).toHaveLength(4)
  })

  it('displays all population options', async () => {
    const wrapper = await mountSuspended(Population, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: mockSelectedPrefectures,
      },
      global: {
        stubs: {
          PopulationChart: true,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0]?.text()).toBe('総人口')
    expect(buttons[1]?.text()).toBe('年少人口')
    expect(buttons[2]?.text()).toBe('生産年齢人口')
    expect(buttons[3]?.text()).toBe('老年人口')
  })

  it('selects the correct population target', async () => {
    const wrapper = await mountSuspended(Population, {
      props: {
        prefectures: mockPrefectures,
        selectedPrefectures: mockSelectedPrefectures,
      },
      global: {
        stubs: {
          PopulationChart: true,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1]?.trigger('click')

    // @ts-expect-error missing types on close method
    expect(wrapper.vm.selectedPopulationTarget.value).toBe('年少人口')
  })
})
