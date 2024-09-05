import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Population from './Population.vue'

// Mock the useLocalStorage composable
vi.mock('#imports', () => ({
  useLocalStorage: vi.fn(() => ({ value: '総人口' })),
}))

// Stub global components
const globalComponentStubs = {
  PopulationTypeSelect: true,
  PopulationChart: true,
  Suspense: true,
}

describe('population', () => {
  it('renders correctly with selected prefectures', () => {
    const wrapper = mount(Population, {
      props: {
        selectedPrefectures: [1],
      },
      global: {
        stubs: globalComponentStubs,
      },
    })

    expect(wrapper.find('h2').text()).toBe('人口推移グラフ')
    expect(wrapper.findComponent({ name: 'PopulationTypeSelect' }).exists()).toBe(true)
    expect(wrapper.text()).not.toContain('都道府県を選択してください')
  })

  it('shows message when no prefectures are selected', () => {
    const wrapper = mount(Population, {
      props: {
        prefectures: [],
        selectedPrefectures: [],
      },
      global: {
        stubs: globalComponentStubs,
      },
    })

    expect(wrapper.find('h2').text()).toBe('人口推移グラフ')
    expect(wrapper.text()).toContain('都道府県を選択してください')
    expect(wrapper.findComponent({ name: 'PopulationChart' }).exists()).toBe(false)
  })
})
