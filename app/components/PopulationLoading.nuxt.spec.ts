import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import PopulationLoading from './PopulationLoading.vue'

describe('populationLoading', () => {
  it('renders correctly', () => {
    const wrapper = mount(PopulationLoading)
    expect(wrapper.text()).toContain('読み込み中...')
  })
  it('matches snapshot', async () => {
    const component = mount(PopulationLoading)
    expect(component.html()).toMatchSnapshot()
  })
})
