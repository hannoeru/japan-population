<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <footer class="flex items-center justify-center gap-3 p-6 pb-8 text-lg">
    <button title="Toggle Dark Mode" @click="toggleDark()">
      <span class="i-ph-sun-duotone dark:i-ph-moon-stars-duotone flex" />
    </button>
    <a href="https://github.com/hannoeru/japan-population" target="_blank" title="GitHub Source Code">
      <span class="i-ph-github-logo-duotone flex" />
    </a>
  </footer>
</template>
