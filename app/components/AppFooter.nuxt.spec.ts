import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import AppFooter from './AppFooter.vue'

describe('appFooter', () => {
  it('matches snapshot', async () => {
    const component = mount(AppFooter)
    expect(component.html()).toMatchSnapshot()
  })
})
