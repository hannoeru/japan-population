import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Population from './Population.vue'

mockNuxtImport('useLocalStorage', () => () => '総人口')

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
})
