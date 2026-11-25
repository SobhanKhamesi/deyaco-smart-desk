<script setup>
/**
 * Small flat button used for the two "chevron + something" controls in the
 * header (settings gear, session clock). Put whatever you want to show in
 * the dropdown in the default slot — falls back to a placeholder item.
 */
defineProps({
  icon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <q-btn flat dense no-caps class="header-dropdown-stat">
    <q-icon v-if="icon" :name="icon" size="18px" class="header-dropdown-stat__icon"/>
    <span v-if="text" class="header-dropdown-stat__text">{{ text }}</span>
    <q-icon name="bi-chevron-down" size="12px" class="header-dropdown-stat__chevron q-mx-xs"/>

    <q-menu v-if="icon" anchor="bottom end" self="top end" class="bg-transparent"
            style="box-shadow: rgba(69, 90, 100, 0.2) 1px 9px 10px 0px;">
      <div>
        <div style="padding: 0;">
          <div class="q-mt-md q-py-md q-pl-lg q-pr-md" style="background-color: #04a9f5;
            color: #ffffff;min-width: 17rem;
            border-radius: 0.2rem 0.2rem 0 0;
            font-size: 16px">
            <div class="row">
              <div class="col">کاربر 1</div>
              <div class="col-auto">
                <q-icon size="20px" name="eva-log-out-outline"/>
              </div>
            </div>
          </div>
          <div class="q-py-lg q-pl-lg q-gutter-y-sm" style="background-color: #ffffff;border-radius: 0 0 0.2rem 0.2rem">
            <div>
              <q-btn size="xs" dense flat style="color: #888;font-weight: 400;font-size: 13px">
                <q-icon name="eva-log-out-outline" class="q-mx-xs"/>
                خروج
              </q-btn>
            </div>
            <div>
              <q-btn size="xs" dense flat style="color: #888;font-weight: 400;font-size: 13px">
                <q-icon name="fa fa-key" size="14px" class="q-mx-xs"/>
                تغییر کلمه عبور
              </q-btn>
            </div>
            <div>
              <q-btn size="xs" dense flat style="color: #888;font-weight: 400;font-size: 13px">
                <q-icon name="fa fa-print" size="14px" class="q-mx-xs"/>
                تغییر پرینتر پیش فرض
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-menu>
    <q-menu v-else-if="text" anchor="bottom end" self="top end" class="bg-transparent"
            style="box-shadow: rgba(69, 90, 100, 0.2) 1px 9px 10px 0px;">
      <div>
        <div style="padding: 0;">
          <div class="q-mt-md q-py-md q-pl-lg q-pr-md" style="background-color: #04a9f5;
            color: #ffffff;min-width: 17rem;
            border-radius: 0.2rem;
            font-size: 16px">
            <div class="col">دوشنبه 17 شهریور 1405</div>
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.header-dropdown-stat {
  color: var(--header-title-color);
  font-size: 13px;
  padding-inline: 6px;
  gap: 6px;
}

.header-dropdown-stat__text {
  font-variant-numeric: tabular-nums;
}
</style>
