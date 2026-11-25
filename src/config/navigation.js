/**
 * Side drawer navigation tree.
 *
 * @typedef {object} NavigationItem
 * @property {string} id                  Unique key (also used as the v-for key)
 * @property {string} label               Persian label shown in the drawer
 * @property {string} [icon]              Quasar icon name (Font Awesome 7: "fa-solid fa-…", Eva: "eva-…")
 * @property {string} [to]                Route path — only for leaf items
 * @property {NavigationItem[]} [children] When present (even empty) the item is
 *                                         rendered as an expandable group
 *
 * Groups with an empty `children` array are placeholders for ERP sections
 * that haven't been migrated yet.
 *
 * @type {NavigationItem[]}
 */
export const navigationItems = [
  { id: 'home', label: 'صفحه اصلی', icon: 'fa-solid fa-house', to: '/' },
  { id: 'chat', label: 'گفتگو', icon: 'fa-solid fa-comment', to: '/chat' },
  { id: 'workbench', label: 'میز کار', icon: 'fa-solid fa-money-check', children: [] },
  { id: 'permits', label: 'مجوزها', icon: 'fa-solid fa-unlock-keyhole', children: [] },
  {
    id: 'business-intelligence',
    label: 'هوش تجاری (BI)',
    icon: 'fa-solid fa-user-astronaut',
    children: [],
  },
  {
    id: 'smart-dashboard',
    label: 'داشبورد هوشمند',
    icon: 'fa-solid fa-user-astronaut',
    children: [],
  },
  { id: 'cooperation', label: 'همکاری با ما', icon: 'fa-solid fa-handshake', children: [] },
  {
    id: 'welfare-services',
    label: 'خدمات رفاهی',
    icon: 'eva-trending-up-outline',
    children: [],
  },
  {
    id: 'product-design',
    label: 'طراحی کالا',
    icon: 'fa-solid fa-hands-asl-interpreting',
    children: [{ id: 'design-requests', label: 'لیست درخواست‌ها', to: '/product-design/requests' }],
  },
  { id: 'shop', label: 'فروشگاه', icon: 'fa-solid fa-store', children: [] },
  { id: 'account-credit', label: 'اعتبار حساب', icon: 'fa-solid fa-money-bill-1', children: [] },
  { id: 'warping', label: 'چله کشی', icon: 'fa-solid fa-industry', children: [] },
  { id: 'spinning', label: 'ریسندگی', icon: 'fa-solid fa-industry', children: [] },
  { id: 'production', label: 'تولید', icon: 'fa-solid fa-industry', children: [] },
  { id: 'finishing', label: 'تکمیل', icon: 'fa-solid fa-industry', children: [] },
  { id: 'packaging', label: 'بسته بندی', icon: 'fa-solid fa-industry', children: [] },
]
