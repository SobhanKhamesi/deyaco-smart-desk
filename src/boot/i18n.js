import { defineBoot } from '#q-app'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'
import { DEFAULT_LOCALE } from '@/config/app.js'

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    globalInjection: true,
    messages,
  })

  app.use(i18n)
})
