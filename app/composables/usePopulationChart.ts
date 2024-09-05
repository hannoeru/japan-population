import type { ChartData, ChartOptions } from 'chart.js'
import type { Population } from '~~/types/api'

export function usePopulationChart(
  populations: Ref<Population[] | undefined>,
  selectedPopulationType: Ref<string>,
) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: '年（西暦）',
        },
      },
      y: {
        title: {
          display: true,
          text: '人口数',
        },
      },
    },
  }

  const data = computed<ChartData<'line'>>(() => ({
    labels: populations.value?.[0]?.data[0]?.data?.map(data => data.year),
    datasets: populations.value?.map(population => ({
      label: population.prefName,
      data: population.data.find(data => selectedPopulationType.value.includes(data.label))?.data.map(data => ({
        x: data.year,
        y: data.value,
      })) || [],
    })) || [],
  }))

  const ariaLabel = computed(() => `Japan population in ${data.value.datasets.map(data => data.label).join(', ')} prefectures from ${data.value.labels?.[0]} to ${data.value.labels?.[data.value.labels?.length - 1]}`)

  return {
    data,
    options,
    ariaLabel,
  }
}
