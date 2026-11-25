<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  /** @type {import('vue').PropType<import('@/config/navigation.js').NavigationItem>} */
  item: {
    type: Object,
    required: true,
  },
})

const route = useRoute()

const isGroup = computed(() => Array.isArray(props.item.children))

const hasActiveChild = computed(() =>
  (props.item.children ?? []).some((child) => child.to && route.path.startsWith(child.to)),
)

// Groups open automatically when one of their children is the current route
const isExpanded = ref(hasActiveChild.value)
</script>

<template>
  <q-expansion-item
    v-if="isGroup"
    v-model="isExpanded"
    group="drawer-navigation"
    :header-class="['drawer-item', { 'drawer-item--active': isExpanded || hasActiveChild }]"
    expand-icon-class="drawer-item__expand-icon"
  >
    <template #header>
      <q-item-section avatar>
        <q-icon :name="item.icon" size="16px" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </template>

    <q-list class="drawer-subitems">
      <q-item
        v-for="child in item.children"
        :key="child.id"
        v-ripple
        clickable
        :to="child.to"
        class="drawer-item drawer-item--child q-py-md"
      >
        <q-item-section>{{ child.label }}</q-item-section>
      </q-item>

      <div v-if="item.children.length === 0" class="drawer-subitems__empty">
        زیرمنویی ثبت نشده است
      </div>
    </q-list>
  </q-expansion-item>

  <q-item v-else v-ripple clickable :to="item.to" exact class="drawer-item">
    <q-item-section avatar>
      <q-icon :name="item.icon" size="16px" />
    </q-item-section>
    <q-item-section>{{ item.label }}</q-item-section>
  </q-item>
</template>

<style>
/*
 * Not scoped on purpose: these classes are applied both to this component's
 * root <q-item> and to elements rendered inside <q-expansion-item>, which
 * scoped/:deep selectors can't reach consistently. Class names are BEM-prefixed.
 */
.drawer-item {
  color: var(--sidebar-item-color);
  min-height: 48px;
}

.drawer-item .q-item__section--avatar {
  min-width: 34px;
  color: inherit;
}

.drawer-item:hover {
  background: var(--sidebar-item-bg-hover);
}

.drawer-item.q-router-link--active,
.drawer-item--active {
  background: var(--sidebar-item-bg-active);
  color: var(--sidebar-item-color-active);
  font-weight: 500;
  border-inline-start: 3px solid var(--sidebar-active-bar);
}

.drawer-item__expand-icon {
  color: inherit;
}

.drawer-subitems {
  background: var(--sidebar-subitem-bg);
}

.drawer-subitems .drawer-item--child {
  padding-inline-start: 48px;
  min-height: 40px;
  border-inline-start: 3px solid var(--sidebar-active-bar);
  font-size: 13px;
}

.drawer-subitems__empty {
  padding: 8px 48px;
  font-size: 12px;
  color: var(--sidebar-item-color);
  border-inline-start: 3px solid var(--sidebar-active-bar);
  opacity: 0.6;
}
</style>
