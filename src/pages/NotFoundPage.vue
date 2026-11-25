<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="not-found__code">۴۰۴</div>
      <div class="text-h4 not-found__message">صفحه مورد نظر پیدا نشد</div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="بازگشت به صفحه اصلی"
      />
    </div>
  </div>
</template>

<style scoped>
.not-found__code {
  font-size: 30vh;
  line-height: 1;
}

.not-found__message {
  opacity: 0.6;
}
</style>
