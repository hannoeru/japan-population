import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

describe('checkbox', () => {
  const defaultProps = {
    label: 'Test Checkbox',
    id: 'test-checkbox',
    value: 'test',
  }

  it('renders properly', () => {
    const wrapper = mount(Checkbox, { props: defaultProps })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Test Checkbox')
  })

  it('binds the id prop correctly', () => {
    const wrapper = mount(Checkbox, { props: defaultProps })
    const input = wrapper.find('input')
    const label = wrapper.find('label')
    expect(input.attributes('id')).toBe('test-checkbox')
    expect(label.attributes('for')).toBe('test-checkbox')
  })

  it('updates the model value when checkbox is clicked', async () => {
    const wrapper = mount(Checkbox, { props: defaultProps })
    const checkbox = wrapper.find('input[type="checkbox"]')

    await checkbox.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])

    await checkbox.setValue(false)
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])
  })
})
