import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS } from 'chart.js'
import Chart from './Chart.vue'

vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
    defaults: {
      color: '#000',
    },
  },
  CategoryScale: vi.fn(),
  LinearScale: vi.fn(),
  PointElement: vi.fn(),
  LineElement: vi.fn(),
  Title: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn(),
  Colors: vi.fn(),
}))

// Create a hoisted mock for useDark
const { useColorModeMock } = vi.hoisted(() => {
  return {
    useColorModeMock: vi.fn().mockImplementation(() => {
      return { preference: 'dark' }
    }),
  }
})

// Mock useDark composable using mockNuxtImport
mockNuxtImport('useColorMode', () => {
  return useColorModeMock
})

describe('chart', () => {
  const mockData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [10, 20, 30] }],
  }

  const mockOptions = {
    responsive: true,
  }

  it('renders the Line component', () => {
    const wrapper = mount(Chart, {
      props: {
        'aria-label': 'Test Chart',
        'data': mockData,
        'options': mockOptions,
      },
    })

    expect(wrapper.findComponent(Line).exists()).toBe(true)
  })

  it('passes correct props to Line component', () => {
    const wrapper = mount(Chart, {
      props: {
        data: mockData,
        options: mockOptions,
      },
    })

    const lineProps = wrapper.getComponent(Line).props()
    expect(lineProps.data).toEqual(mockData)
    expect(lineProps.options).toEqual(mockOptions)
  })

  it('updates key when data changes', async () => {
    const wrapper = mount(Chart, {
      props: {
        data: mockData,
        options: mockOptions,
      },
      global: {
        stubs: {
          Line: true,
        },
      },
    })

    const initialKey = wrapper.vm.key

    await wrapper.setProps({
      data: { ...mockData, labels: ['April', 'May', 'June'] },
    })

    const updatedKey = wrapper.vm.key
    expect(updatedKey).not.toBe(initialKey)
  })

  it('uses dark theme when useColorMode.preference is dark', () => {
    useColorModeMock.mockImplementation(() => {
      return {
        preference: 'dark',
      }
    })

    mount(Chart, {
      props: {
        data: mockData,
        options: mockOptions,
      },
      global: {
        stubs: {
          Line: true,
        },
      },
    })

    expect(ChartJS.defaults.color).toBe('#FFF')
  })

  it('uses light theme when useColorMode.preference is light', () => {
    useColorModeMock.mockImplementation(() => {
      return {
        preference: 'light',
      }
    })

    mount(Chart, {
      props: {
        data: mockData,
        options: mockOptions,
      },
      global: {
        stubs: {
          Line: true,
        },
      },
    })

    expect(ChartJS.defaults.color).toBe('#000')
  })
})
