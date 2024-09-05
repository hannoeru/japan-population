<script setup lang="ts">
defineProps<{
  selectedPrefectures: number[]
}>()

const selectedPopulationType = useLocalStorage('app-selected-population-type', '総人口', {
  // prevent hydration mismatch error
  initOnMounted: true,
})
</script>

<template>
  <section class="bg-light-4 p-6 pt-3 -mx-6 sm:rounded-2xl dark:bg-dark-8 sm:p-8 sm:pt-4">
    <header class="p-6">
      <h2 class="h2">
        人口推移グラフ
      </h2>
    </header>
    <PopulationTypeSelect v-model:selected="selectedPopulationType" />
    <div
      v-if="!selectedPrefectures.length"
      class="h-100 flex flex-col items-center justify-center text-gray-4"
    >
      都道府県を選択してください
    </div>
    <Suspense v-else>
      <PopulationChart
        :selected-prefectures="selectedPrefectures"
        :selected-population-type="selectedPopulationType"
      />
      <template #fallback>
        <div class="h-100 flex flex-col items-center justify-center text-gray-4">
          <span class="i-ph-person-arms-spread mb-3 animate-bounce text-3xl" />
          <p data-testid="loading-text">
            読み込み中...
          </p>
        </div>
      </template>
    </Suspense>
  </section>
</template>
