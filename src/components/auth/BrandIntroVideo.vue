<script setup>
import { onMounted, ref } from 'vue'
import introVideoUrl from '@/assets/videos/deyaco-logo-intro.mp4'
import introPosterUrl from '@/assets/images/deyaco-logo-intro-poster.jpg'

/**
 * Deyaco logo animation. Plays once and stays on its last frame (the logo).
 * The poster is that same last frame, so users with "reduced motion"
 * enabled — or browsers that block autoplay — still see the final logo.
 *
 * Fills its parent; the parent decides the size.
 */
const videoRef = ref(null)

onMounted(() => {
  const video = videoRef.value
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!video || prefersReducedMotion) return

  // Set as a property too: some browsers ignore the attribute for autoplay
  video.muted = true
  video.play().catch(() => {
    // Autoplay blocked — the poster (final logo frame) stays visible
  })
})
</script>

<template>
  <div class="brand-intro" aria-hidden="true">
    <video
      ref="videoRef"
      class="brand-intro__video"
      :src="introVideoUrl"
      :poster="introPosterUrl"
      muted
      playsinline
      preload="auto"
      disablepictureinpicture
    />
  </div>
</template>

<style scoped>
.brand-intro {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  container-type: size;
}

/*
 * The video background is colour-matched to --auth-bg, so the frame edges are
 * invisible and the video can be sized freely inside its container:
 *   - at most as tall as the container (16:9 frame),
 *   - at most 1.75× the container width — the logo is ~45% of the frame width,
 *     so the whole logo (and the globe) always fits horizontally.
 * The logo's centre sits at 47.5% of the frame width; it is aligned to the container centre.
 */
.brand-intro__video {
  --video-width: min(100cqh * 16 / 9, 175cqw);

  position: absolute;
  top: 50%;
  /* physical offset inside the video frame — must not be mirrored for RTL */
  /* rtl:ignore */
  left: calc(50cqw - var(--video-width) * 0.475);
  width: var(--video-width);
  aspect-ratio: 16 / 9;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
