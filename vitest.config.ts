import { defineVitestConfig } from '@nuxt/test-utils/config'

const ignoreMessages = [
  '<Suspense> is an experimental feature and its API will likely change.',
]

export default defineVitestConfig({
  test: {
    clearMocks: true,
    onConsoleLog(log) {
      if (ignoreMessages.some(message => log.includes(message))) {
        return false
      }
    },
    coverage: {
      reportsDirectory: '../coverage',
    },
  },
})
