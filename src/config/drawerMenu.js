/**
 * Side drawer navigation tree.
 *
 * Shape of an item:
 * {
 *   id: string            unique key, also used for :key in v-for
 *   label: string         Persian label shown in the drawer
 *   icon: string          Quasar icon name (bootstrap-icons, prefixed "bi-")
 *   to: string            route path — only for leaf items (no "children")
 *   children: Item[]      present (even if empty) => rendered as an
 *                         expandable group instead of a direct link
 * }
 *
 * This only reproduces the structure/labels visible in the screenshot.
 * Groups whose sub-items weren't visible are left with an empty
 * `children` array — fill them in as you build out each section.
 */
export const drawerMenu = [
  { id: 'home', label: 'صفحه اصلی', icon: 'fa fa-home', to: '/' },
  { id: 'chat', label: 'گفتگو', icon: 'fa fas fa-comment', to: '/chat' },
  { id: 'workbench', label: 'میز کار', icon: 'fa fa-money-check', children: [] },
  { id: 'permits', label: 'مجوزها', icon: 'fa fa-unlock-alt', children: [] },
  { id: 'business-intelligence', label: 'هوش تجاری (BI)', icon: 'fa fa-user-astronaut', children: [] },
  { id: 'smart-dashboard', label: 'داشبورد هوشمند', icon: 'fa fa-user-astronaut', children: [] },
  { id: 'cooperation', label: 'همکاری با ما', icon: 'fa fas fa-handshake', children: [] },
  { id: 'welfare-services', label: 'خدمات رفاهی', icon: 'eva-trending-up-outline', children: [] },
  {
    id: 'product-design',
    label: 'طراحی کالا',
    icon: 'fa fa-american-sign-language-interpreting',
    children: [
      { id: 'design-requests', label: 'لیست درخواست ها', to: '/product-design/requests' }
    ]
  },
  { id: 'shop', label: 'فروشگاه', icon: 'fa fa-solid fa-store', children: [] },
  { id: 'account-credit', label: 'اعتبار حساب', icon: 'fa fa-money-bill-alt', children: [] },
  { id: 'warping', label: 'چله کشی', icon: 'fas fa-industry', children: [] },
  { id: 'spinning', label: 'ریسندگی', icon: 'fas fa-industry', children: [] },
  { id: 'production', label: 'تولید', icon: 'fas fa-industry', children: [] },
  { id: 'finishing', label: 'تکمیل', icon: 'fas fa-industry', children: [] },
  { id: 'packaging', label: 'بسته بندی', icon: 'fas fa-industry', children: [] }
]
