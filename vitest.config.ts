import { defineVitestConfig } from '@nuxt/test-utils/config'

const ignoreMessages = [
  '<Suspense> is an experimental feature and its API will likely change.',
]

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    onConsoleLog(log) {
      if (ignoreMessages.some(message => log.includes(message))) {
        return false
      }
    },
  },
})
