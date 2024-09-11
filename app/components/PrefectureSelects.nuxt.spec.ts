import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PrefectureSelects from './PrefectureSelects.vue'

describe('prefectureSelects', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
    { prefCode: 3, prefName: '岩手県' },
  ]

  it('renders all prefecture checkboxes', () => {
    const wrapper = mount(PrefectureSelects, {
      props: {
        prefectures: mockPrefectures,
      },
    })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxes).toHaveLength(3)
    expect(wrapper.text()).toContain('北海道')
    expect(wrapper.text()).toContain('青森県')
    expect(wrapper.text()).toContain('岩手県')
  })

  it('updates the selected value when a checkbox is clicked', async () => {
    const wrapper = mount(PrefectureSelects, {
      props: {
        prefectures: mockPrefectures,
      },
    })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')

    await checkboxes[1]?.setValue(true)
    expect(wrapper.emitted('update:selected')?.[0]).toEqual([[2]])

    await checkboxes[2]?.setValue(true)
    expect(wrapper.emitted('update:selected')?.[1]).toEqual([[2, 3]])

    await checkboxes[1]?.setValue(false)
    expect(wrapper.emitted('update:selected')?.[2]).toEqual([[3]])
  })

  it('reflects the initial selected values', () => {
    const wrapper = mount(PrefectureSelects, {
      props: {
        prefectures: mockPrefectures,
        selected: [1, 3],
      },
    })
    const checkboxes = wrapper.findAll<HTMLInputElement>('input[type="checkbox"]')
    expect(checkboxes[0]?.element.checked).toBe(true)
    expect(checkboxes[1]?.element.checked).toBe(false)
    expect(checkboxes[2]?.element.checked).toBe(true)
  })
})
