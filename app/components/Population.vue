<script setup lang="ts">
import type { Prefecture } from '~~/types/resas'

defineProps<{
  prefectures: Prefecture[]
  selectedPrefectures: number[]
}>()

const populationOptions = ['総人口', '年少人口', '生産年齢人口', '老年人口']
const selectedPopulationTarget = useLocalStorage('app-selected-population-target', '総人口')

function handleSelect(value: string) {
  selectedPopulationTarget.value = value
}
</script>

<template>
  <section class="bg-light-4 p-6 pt-3 -mx-6 sm:rounded-2xl dark:bg-dark-8 sm:p-8 sm:pt-4">
    <header class="p-6">
      <h2 class="h2">
        総人口推移グラフ
      </h2>
    </header>
    <div class="sm:px-4">
      <div class="grid grid-cols-2 mb-6 gap-2">
        <button
          v-for="option of populationOptions" :key="option" :class="{
            'btn': selectedPopulationTarget === option,
            'btn-secondary': selectedPopulationTarget !== option,
          }" @click="handleSelect(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <PopulationChart :prefectures="prefectures" :selected-prefectures="selectedPrefectures" :selected-population-target="selectedPopulationTarget" />
  </section>
</template>
