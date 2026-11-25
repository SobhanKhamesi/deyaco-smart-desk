/**
 * Application-wide constants.
 * Environment-specific values come from `.env*` files (see `.env.example`).
 */

export const APP_NAME = 'اسمارت دسک'

/** Shown in the header when the current route has no `meta.title`. */
export const COMPANY_NAME = 'شرکت رز رنگ نساج ایساتیس'

/** Heading of the login card. */
export const LOGIN_TITLE = 'سامانه حضور و غیاب دیاکو'

/** Credit line at the bottom of the auth pages. */
export const COPYRIGHT_TEXT = 'طراحی و تولید شرکت صنعتی دیاکو مهن آریا'

export const API_BASE_URL = import.meta.env.API_BASE_URL

export const DEFAULT_LOCALE = 'fa-IR'

/** Width of the side drawer in px (QDrawer expects a number). */
export const DRAWER_WIDTH = 265

/** Keys used in LocalStorage. Shared with the legacy ERP, so do not rename. */
export const STORAGE_KEYS = Object.freeze({
  auth: 'auth',
  token: 'token',
})
