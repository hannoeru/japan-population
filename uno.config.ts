import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'h1': 'text-center text-xl sm:text-3xl font-bold',
    'h2': 'text-center text-lg sm:text-2xl font-semibold',
    'btn': 'px-3 sm:px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 text-sm sm:text-md',
    'btn-secondary': 'px-3 sm:px-4 py-1 rounded inline-block bg-gray-600 text-white cursor-pointer hover:bg-gray-700 text-sm sm:text-md',
    'checkbox': 'h-5 w-5 border accent-teal-600',
    'select': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
