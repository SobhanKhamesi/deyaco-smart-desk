# اسمارت دسک (Smart Desk) — دیاکو

فرانت‌اند Vue 3 + Quasar برای سامانه ERP دیاکو. هدف، انتقال تدریجی ماژول‌های ERP به Vue و جدا کردن فرانت از بک‌اند است؛ اولین ماژول «اسمارت دسک» است.

## راه‌اندازی

```bash
npm install
cp .env.example .env   # آدرس API را تنظیم کنید
npm run dev
```

| دستور                  | کار                                 |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | اجرای محیط توسعه                    |
| `npm run build`        | بیلد نهایی در `dist/spa`            |
| `npm run lint`         | بررسی کد با ESLint                  |
| `npm run lint:fix`     | رفع خودکار خطاهای قابل اصلاح ESLint |
| `npm run format`       | مرتب‌سازی کد با Prettier            |
| `npm run format:check` | بررسی رعایت فرمت (مناسب CI)         |

### متغیرهای محیطی

| متغیر               | توضیح                                  | پیش‌فرض                      |
| ------------------- | -------------------------------------- | ---------------------------- |
| `QCLI_API_BASE_URL` | آدرس پایه API بک‌اند (با `/` در انتها) | `http://127.0.0.1:8000/api/` |

آدرس API به‌صورت خودکار در `connect-src` و `img-src` سیاست CSP فایل `index.html` هم قرار می‌گیرد.

## ساختار پوشه‌ها

```
src/
├── assets/
│   ├── fonts/             فونت‌ها (IRANSans)
│   ├── images/            تصاویر (پوستر ویدیوی لوگو)
│   └── videos/            ویدیوها (انیمیشن لوگوی صفحه ورود)
├── boot/                  فایل‌های boot کوازار (axios، i18n)
├── components/
│   ├── auth/              کامپوننت‌های صفحه ورود (کارت، فرم، ویدیوی لوگو)
│   ├── layout/            اجزای قالب اصلی
│   │   ├── drawer/        منوی کناری
│   │   └── header/        هدر و دکمه‌ها/منوهای آن
│   └── smart-desk/        کامپوننت‌های ماژول اسمارت دسک
├── composables/           منطق قابل استفاده مجدد (useXxx)
├── config/                ثابت‌های برنامه و ساختار منو
├── css/                   fonts.css، tokens.css (متغیرهای طراحی)، app.css
├── i18n/                  ترجمه‌ها (fa-IR)
├── layouts/               لایه‌های صفحه (MainLayout، AuthLayout)
├── mocks/                 داده‌های آزمایشی تا آماده شدن API
├── pages/                 صفحات (هر ماژول در زیرپوشه خودش)
├── router/                مسیرها
├── services/              ارتباط با API (هر ماژول در زیرپوشه خودش؛ auth/ برای ورود و نشست)
├── stores/                استورهای Pinia
└── utils/                 توابع کمکی بدون وابستگی به Vue (فرمت عدد/تاریخ و ...)
```

### افزودن یک ماژول جدید (مثلاً «گفتگو»)

1. صفحه: `src/pages/chat/ChatPage.vue`
2. کامپوننت‌ها: `src/components/chat/...`
3. ارتباط با API: `src/services/chat/chatService.js` — کامپوننت‌ها مستقیم axios صدا نمی‌زنند.
4. مسیر را در `src/router/routes.js` با `name` و `meta.title` اضافه کنید.
5. آیتم منو را در `src/config/navigation.js` اضافه/به‌روز کنید.

## صفحه ورود و احراز هویت

- مسیر `/login` با لایه `AuthLayout` (پس‌زمینه، ویدیوی لوگو، متن پایین صفحه) و صفحه `pages/auth/LoginPage.vue`.
- مسیرهای دارای `meta.requiresAuth` (همه صفحات داخل `MainLayout`) بدون نشست به `/login?redirect=...` هدایت می‌شوند و بعد از ورود به همان صفحه برمی‌گردند. مسیرهای `meta.guestOnly` (صفحه ورود) کاربر واردشده را به صفحه اصلی می‌برند.
- **قرارداد API** (در `services/auth/authService.js`؛ اگر بک‌اند متفاوت است فقط همین فایل تغییر می‌کند):
  `POST {QCLI_API_BASE_URL}login` با بدنه `{ username, password }` ← پاسخ `{ token, user? }`.
  توکن در کلید `token` و اطلاعات کاربر در کلید `auth` در LocalStorage ذخیره می‌شود (همان کلیدهای ERP قبلی).
- خطای ۴۰۱ در درخواست ورود پیام «نام کاربری یا رمز عبور اشتباه است» می‌دهد؛ در بقیه درخواست‌ها نشست پاک و کاربر به صفحه ورود هدایت می‌شود.
- خروج از منوی تنظیمات هدر (آیکون چرخ‌دنده ← خروج).
- متن عنوان کارت و متن پایین صفحه در `config/app.js` (`LOGIN_TITLE`، `COPYRIGHT_TEXT`).

**ویدیوی لوگو:** یک بار پخش می‌شود و روی فریم آخر (لوگو) می‌ماند؛ برای کاربرانی که «کاهش حرکت» را فعال کرده‌اند یا اگر مرورگر پخش خودکار را مسدود کند، همان فریم آخر به‌صورت پوستر نمایش داده می‌شود. رنگ پس‌زمینه ویدیو با `--auth-bg` یکسان‌سازی شده تا لبه‌ای دیده نشود؛ اگر ویدیو را عوض کردید، پس‌زمینه‌اش باید دقیقاً `#110859` باشد.

**توسعه بدون بک‌اند:** برای دیدن صفحات داخلی بدون endpoint ورود، در Console مرورگر اجرا کنید:
`localStorage.setItem('token', '__q_strn|dev')` و صفحه را رفرش کنید (پیشوند مربوط به فرمت LocalStorage کوازار است).

## قراردادهای کدنویسی

**نام‌گذاری**

- کامپوننت‌ها، صفحات و لایه‌ها: `PascalCase.vue` و حداقل دو کلمه‌ای (`ProjectCard.vue`، `SmartDeskPage.vue`). صفحات با پسوند `Page`.
- کامپوننت‌های قالب اصلی با پیشوند `App` یا نام بخش (`AppHeader`، `HeaderUserMenu`).
- فایل‌های JS: `camelCase.js` (`projectService.js`، `formatters.js`). کامپوزبل‌ها با `use` (`useNow.js`).
- پوشه‌ها: `kebab-case` (`smart-desk`).
- در تمپلیت، کامپوننت‌ها به‌صورت `kebab-case` (`<project-card>`)، رویدادها `kebab-case` (`toggle-drawer`) و props به‌صورت `camelCase`.
- متغیرهای Boolean با `is`/`has`/`show` (`isDrawerOpen`، `hasActiveChild`).
- کلاس‌های CSS به روش BEM (`project-card__avatar--default`).

**ساختار SFC**

- ترتیب بلاک‌ها: `<script setup>` ← `<template>` ← `<style scoped>`.
- ترتیب ماکروها: `defineProps` ← `defineEmits` ← `defineModel`.
- استایل inline ممنوع؛ رنگ و اندازه فقط از متغیرهای `src/css/tokens.css` یا رنگ‌های برند کوازار.
- برای فاصله‌های چپ/راست از ویژگی‌های منطقی CSS استفاده کنید (`margin-inline-start`، `padding-inline`) تا در RTL درست کار کند.
- `postcss-rtlcss` مقادیر فیزیکی مثل `left` و `object-position` را در RTL برعکس می‌کند؛ اگر مقدار نباید برعکس شود (مثلاً موقعیت داخل یک ویدیو/تصویر)، قبل از آن `/* rtl:ignore */` بگذارید.
- استایل فقط وقتی global (بدون scoped) باشد که المان خارج از scope کامپوننت رندر می‌شود (مثل `q-menu` که به body منتقل می‌شود) و نام کلاس‌ها حتماً پیشوند BEM داشته باشد.

**داده و منطق**

- داده‌ها خام (عدد/تاریخ ISO) نگهداری شوند و فرمت‌کردن با `src/utils/formatters.js` انجام شود (ارقام فارسی، تاریخ شمسی).
- پاسخ API در لایه سرویس از `snake_case` به مدل `camelCase` فرانت تبدیل می‌شود.
- آیکون‌ها: Font Awesome 7 (`fa-solid fa-…`)، Bootstrap Icons (`bi-…`)، Eva (`eva-…`) و Material (آیکون‌های پیش‌فرض کامپوننت‌های کوازار).

ESLint و Prettier این قواعد را تا حد ممکن بررسی می‌کنند؛ پیش از هر commit دستور `npm run lint` و `npm run format:check` را اجرا کنید.
