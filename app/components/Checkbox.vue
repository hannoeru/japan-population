<script setup lang="ts">
const props = defineProps<{
  label: string
  id: string
  value: number | string
  indeterminate: boolean
  disabled: boolean
}>()
const model = defineModel()
</script>

<template>
  <div class="relative flex items-center">
    <div class="h-5 flex items-center">
      <input :id="props.id" v-model="model" :value="props.value" type="checkbox" class="checkbox">
    </div>
    <div class="ms-3 flex flex-col">
      <label :for="props.id" class="text-md text-gray-700 font-medium dark:text-gray-200">
        {{ props.label }}
      </label>
    </div>
  </div>
</template>
