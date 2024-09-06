<script setup lang="ts">
defineProps<{
  selectedPrefectures: number[]
}>()

const selectedPopulationType = useLocalStorage('app-selected-population-type', '総人口', {
  // prevent hydration mismatch error
  initOnMounted: true,
})

const loading = ref(false)
</script>

<template>
  <section class="bg-light-4 p-6 pt-3 -mx-6 sm:rounded-2xl dark:bg-dark-8 sm:p-8 sm:pt-4">
    <header class="flex items-center justify-center gap-2 p-6">
      <span
        class="i-ph-person-arms-spread text-xl" :class="{
          'animate-spin': loading,
        }"
      />
      <h2 class="h2">
        人口推移グラフ
      </h2>
    </header>
    <PopulationTypeSelect v-model:selected="selectedPopulationType" />
    <PopulationChart
      v-model:loading="loading"
      :selected-prefectures="selectedPrefectures"
      :selected-population-type="selectedPopulationType"
    />
  </section>
</template>
