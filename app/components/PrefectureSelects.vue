<script setup lang="ts">
import type { Prefecture } from '~~/types/resas'

const props = defineProps<{
  prefectures: Prefecture[]
}>()

const selected = defineModel('selected', {
  type: Array,
  default: () => [],
})
</script>

<template>
  <section>
    <header class="p-6">
      <h2 class="h2">
        都道府県を選択：
      </h2>
    </header>
    <div class="grid grid-cols-3 gap-1 px-2 md:grid-cols-5 sm:px-4 sm:pl-8">
      <template v-for="prefecture of props.prefectures" :key="prefecture.prefCode">
        <Checkbox
          :id="`prefecture-${prefecture.prefCode}`"
          v-model="selected"
          :label="prefecture.prefName"
          :value="prefecture.prefCode"
          :indeterminate="false"
          :disabled="false"
        />
      </template>
    </div>
  </section>
</template>
