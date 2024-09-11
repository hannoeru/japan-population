import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { Population } from '~~/types/api'
import { usePopulationChart } from './usePopulationChart'

describe('usePopulationChart', () => {
  let populations: Ref<Population[]>
  let selectedPopulationTarget: Ref<string>

  beforeEach(() => {
    populations = ref([
      {
        prefCode: 1,
        prefName: 'Hokkaido',
        data: [
          {
            label: 'Total Population',
            data: [
              { year: 2015, value: 5000 },
              { year: 2020, value: 5500 },
            ],
          },
        ],
      },
    ])

    selectedPopulationTarget = ref('Total Population')
  })

  it('should return correct chart data', () => {
    const { data } = usePopulationChart(populations, selectedPopulationTarget)

    expect(data.value).toEqual({
      labels: [2015, 2020],
      datasets: [
        {
          label: 'Hokkaido',
          data: [
            { x: 2015, y: 5000 },
            { x: 2020, y: 5500 },
          ],
        },
      ],
    })
  })

  it('should return correct options', () => {
    const { options } = usePopulationChart(populations, selectedPopulationTarget)

    expect(options).toMatchObject({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: '年（西暦）' } },
        y: { title: { display: true, text: '人口数' } },
      },
    })
  })

  it('should return correct ariaLabel', () => {
    const { ariaLabel } = usePopulationChart(populations, selectedPopulationTarget)

    expect(ariaLabel.value).toBe('Japan population in Hokkaido prefectures from 2015 to 2020')
  })
})
