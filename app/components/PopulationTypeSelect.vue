<script setup lang="ts">
const selected = defineModel('selected', {
  type: String,
  default: '総人口',
})

const populationTypes = ['総人口', '年少人口', '生産年齢人口', '老年人口']

function handleSelect(value: string) {
  selected.value = value
}
</script>

<template>
  <div class="sm:px-4">
    <div class="grid grid-cols-2 mb-6 gap-2">
      <button
        v-for="option of populationTypes"
        :key="option"
        :class="{
          'btn': selected === option,
          'btn-secondary': selected !== option,
        }"
        @click="handleSelect(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
