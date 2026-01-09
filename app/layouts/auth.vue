<script setup lang="ts">
import AuthFooter from '~/components/AuthFooter.vue';

</script>

<template>
  <div>
    <Header />
    <slot />
    <AuthFooter />
  </div>
</template>