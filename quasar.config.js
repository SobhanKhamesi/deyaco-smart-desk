// Quasar CLI configuration
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app'

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000/api/'

export default defineConfig((ctx) => {
  // `.env*` files are injected here as `import.meta.env.*` by Quasar CLI.
  const apiBaseUrl = import.meta.env.QCLI_API_BASE_URL || DEFAULT_API_BASE_URL

  return {
    boot: ['i18n', 'axios'],

    css: ['fonts.css', 'tokens.css', 'app.css'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    // material-icons is required by Quasar's own components (default icon set).
    extras: ['material-icons', 'bootstrap-icons', 'fontawesome-v7', 'eva-icons'],

    // Variables available inside index.html as <%= name %>
    htmlVariables: {
      apiOrigin: new URL(apiBaseUrl).origin,
    },

    build: {
      vueRouterMode: 'history',

      // https://quasar.dev/options/rtl-support
      rtl: true,

      // Resolved value (with fallback) exposed to app code as import.meta.env.API_BASE_URL
      defineEnv: {
        API_BASE_URL: apiBaseUrl,
      },

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.mode.ssr || ctx.mode.ssg,
            include: [ctx.appPaths.resolve.app('src/i18n')],
          },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      lang: 'fa-IR',

      config: {
        // Keep in sync with the colour tokens in src/css/tokens.css
        brand: {
          primary: '#04a9f5',
          secondary: '#3f4d67',
          accent: '#0850a5',
        },
        notify: {
          position: 'bottom',
          progress: true,
        },
      },

      plugins: ['AppFullscreen', 'LocalStorage', 'Notify'],
    },

    animations: [],
  }
})
