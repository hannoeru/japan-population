<script setup lang="ts">
import type { Prefecture } from '~~/types/resas'

const props = defineProps<{
  prefectures: Prefecture[]
  selectedPrefectures: number[]
  selectedPopulationType: string
}>()

const { selectedPrefectures, selectedPopulationType, prefectures } = toRefs(props)

const { data: populations, error: populationsError } = await useFetch('/api/populations', {
  query: {
    prefCodes: selectedPrefectures,
  },
})

const { data, options, ariaLabel } = usePopulationChart(populations, prefectures, selectedPopulationType)
</script>

<template>
  <div class="h-100" :aria-label="ariaLabel">
    <div v-if="populationsError" class="h-full flex flex-col items-center justify-center">
      <span class="i-ph-warning-circle mb-3 text-3xl text-red-500" />
      <p>サーバーからデータを取得できませんでした。</p>
      <p v-if="populationsError.message">
        {{ populationsError.message }}
      </p>
    </div>
    <Chart v-else :data="data" :options="options" />
  </div>
</template>
