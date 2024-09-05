<script setup lang="ts">
const config = useRuntimeConfig().public
useSeoMeta({
  title: '都道府県別人口推移グラフ',
  description: '都道府県別の人口推移グラフを表示するサイトです',
  ogTitle: '都道府県別人口推移グラフ',
  ogDescription: '都道府県別の人口推移グラフを表示するサイトです',
  ogImage: '/og-image.png',
  ogUrl: config.siteUrl,
  twitterTitle: '都道府県別人口推移グラフ',
  twitterDescription: '都道府県別の人口推移グラフを表示するサイトです',
  twitterImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

const { data: prefectures } = await useFetch('/api/prefectures')

if (!prefectures.value) {
  throw createError('Failed to fetch prefectures')
}

const appSelectedPrefectures = useLocalStorage<{
  selected: number[]
}>('app-selected-prefectures', {
  selected: [],
}, {
  // prevent hydration mismatch error
  initOnMounted: true,
})

/**
 * When using array in root level of useLocalStorage it will become unstable, so I wrap it with object and computed.
 */
const selectedPrefectures = computed<number[]>({
  get: () => appSelectedPrefectures.value.selected,
  set: (value) => {
    appSelectedPrefectures.value.selected = value
  },
})
</script>

<template>
  <main class="mx-auto max-w-3xl p-6 pt-10 space-y-6 md:p-8">
    <header>
      <h1 class="h1">
        都道府県別人口推移グラフ
      </h1>
    </header>
    <PrefectureSelects v-model:selected="selectedPrefectures" :prefectures="prefectures!" />
    <Population :selected-prefectures="selectedPrefectures" />
  </main>
</template>
