<template>
  <div>
    <!-- Global loading overlay -->
    <div v-if="generalStore.loading" class="loading-overlay">
      <Loader />
    </div>

    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Loader from '~/components/Loader.vue'
import { useGeneralStore } from '~/stores/general'

const generalStore = useGeneralStore()
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>