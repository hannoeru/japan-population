<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import { CategoryScale, Chart as ChartJS, Colors, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

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

// set default chart.js color
ChartJS.defaults.borderColor = '#0d9488'
// update chart.js default color based on color mode
watch(() => colorMode.preference, () => {
  ChartJS.defaults.color = colorMode.preference === 'dark' ? '#FFF' : '#000'
}, {
  immediate: true,
})

// force re-render chart.js to show correct chart colors
const key = computed(() => `${JSON.stringify(props.data)}${colorMode.preference}`)
</script>

<template>
  <!-- pass data as key that force re-render chart.js to show correct chart colors -->
  <Line :key="key" :data="data" :options="options" />
</template>
