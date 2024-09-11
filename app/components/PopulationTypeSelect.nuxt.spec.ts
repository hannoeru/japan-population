import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PopulationTypeSelect from './PopulationTypeSelect.vue'

describe('populationTypeSelect', () => {
  it('renders all population type buttons', () => {
    const wrapper = mount(PopulationTypeSelect)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)
    expect(buttons.at(0)?.text()).toBe('総人口')
    expect(buttons.at(1)?.text()).toBe('年少人口')
    expect(buttons.at(2)?.text()).toBe('生産年齢人口')
    expect(buttons.at(3)?.text()).toBe('老年人口')
  })

  it('sets the default selected value to 総人口', () => {
    const wrapper = mount(PopulationTypeSelect)
    const selectedButton = wrapper.find('button.btn')
    expect(selectedButton.text()).toBe('総人口')
  })

  it('updates the selected value when a button is clicked', async () => {
    const wrapper = mount(PopulationTypeSelect)
    const buttons = wrapper.findAll('button')

    await buttons[1]?.trigger('click')
    expect(wrapper.emitted('update:selected')?.[0]).toEqual(['年少人口'])

    const selectedButton = wrapper.find('button.btn')
    expect(selectedButton.text()).toBe('年少人口')
  })
})
