<script setup lang="ts">
import type { Prefecture } from '~~/types/resas'

defineProps<{
  prefectures: Prefecture[]
}>()

const selected = defineModel('selected', {
  type: Array,
  default: () => [],
})
</script>

<template>
  <section>
    <div class="grid grid-cols-3 gap-1 px-2 md:grid-cols-5 sm:px-4 sm:pl-8">
      <template v-for="prefecture of prefectures" :key="prefecture.prefCode">
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
    <div class="flex justify-center p-4">
      <button class="btn" title="選択項目をクリア" :disabled="!selected.length" @click="selected = []">
        選択項目をクリア
      </button>
    </div>
  </section>
</template>
