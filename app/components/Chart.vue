<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { CategoryScale, Chart as ChartJS, Colors, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  data: ChartData<'line'>
  options: ChartOptions<'line'>
}>()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
)

const colorMode = useColorMode()

ChartJS.defaults.borderColor = '#0d9488'
watch(() => colorMode.preference, () => {
  ChartJS.defaults.color = colorMode.preference === 'dark' ? '#FFF' : '#000'
}, {
  immediate: true,
})

const key = computed(() => `${JSON.stringify(props.data)}${colorMode.preference}`)
</script>

<template>
  <!-- pass data as key that force re-render chart.js to show correct chart colors -->
  <Line :key="key" :data="data" :options="options" />
</template>
