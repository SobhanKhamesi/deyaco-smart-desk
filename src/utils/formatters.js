/**
 * Locale-aware formatting helpers (Persian digits, Jalali calendar).
 * Keep presentation logic here instead of storing pre-formatted strings in data.
 */

const LOCALE = 'fa-IR'

const numberFormatter = new Intl.NumberFormat(LOCALE)
const percentFormatter = new Intl.NumberFormat(LOCALE, { style: 'percent' })
const timeFormatter = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' })
const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const relativeTimeFormatter = new Intl.RelativeTimeFormat('fa', { numeric: 'always' })

const RELATIVE_TIME_UNITS = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
]

/** 54121504 → "۵۴٬۱۲۱٬۵۰۴" */
export function formatNumber(value) {
  return numberFormatter.format(Number(value) || 0)
}

/** 0.3 → "۳۰٪" */
export function formatPercent(ratio) {
  return percentFormatter.format(Number(ratio) || 0)
}

/** Date → "۱۴:۲۹" */
export function formatTime(date) {
  return timeFormatter.format(new Date(date))
}

/**
 * Date → "دوشنبه ۱۷ شهریور ۱۴۰۵"
 * Built from parts so the word order doesn't depend on the ICU build.
 */
export function formatLongDate(date) {
  const parts = Object.fromEntries(
    dateFormatter.formatToParts(new Date(date)).map(({ type, value }) => [type, value]),
  )
  return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year}`
}

/** Past date → "۲ ماه پیش" (empty string when no date is given). */
export function formatRelativeTime(date, now = new Date()) {
  if (!date) return ''

  const diffInSeconds = (new Date(date).getTime() - now.getTime()) / 1000

  for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
    if (Math.abs(diffInSeconds) >= secondsInUnit) {
      return relativeTimeFormatter.format(Math.round(diffInSeconds / secondsInUnit), unit)
    }
  }

  return 'لحظاتی پیش'
}

/**
 * Two-letter avatar text: first letter of the first and last words.
 * "اداری دفتر فرهنگیان یزد" → "ای"
 * A zero-width non-joiner keeps the letters from joining into a word.
 */
export function getInitials(title = '') {
  const words = title.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0].charAt(0)

  return `${words[0].charAt(0)}‌${words.at(-1).charAt(0)}`
}
