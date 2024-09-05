<script setup lang="ts">
import type { Population } from '~~/types/api'

const props = defineProps<{
  selectedPrefectures: number[]
  selectedPopulationType: string
}>()

const { selectedPrefectures, selectedPopulationType } = toRefs(props)

const populations = ref<Population[]>([])
const showPopulations = computed(() => {
  return populations.value.filter(population => selectedPrefectures.value.includes(population.prefCode))
})

const loading = defineModel('loading', {
  type: Boolean,
  default: false,
})

const populationsError = ref<Error | null>(null)

watchDebounced(selectedPrefectures, async (selected) => {
  loading.value = true
  const extraSelected = selected.filter(prefCode => !populations.value?.some(population => population.prefCode === prefCode))

  if (extraSelected.length) {
    const extraPopulations = await $fetch('/api/populations', {
      query: {
        prefCodes: extraSelected,
      },
    }).catch((error: Error) => {
      populationsError.value = error
      return []
    })
    populations.value.push(...extraPopulations)
  }
  loading.value = false
}, {
  debounce: 100,
  immediate: true,
})

const { data, options, ariaLabel } = usePopulationChart(showPopulations, selectedPopulationType)
</script>

<template>
  <div class="h-100 -ml-4" :aria-label="ariaLabel">
    <div v-if="populationsError" class="h-full flex flex-col items-center justify-center">
      <span class="i-ph-warning-circle mb-3 text-3xl text-red-500" />
      <p>サーバーからデータを取得できませんでした。</p>
    </div>
    <Chart v-else :data="data" :options="options" />
  </div>
</template>
