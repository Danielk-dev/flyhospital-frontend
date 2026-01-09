<template>
    <div class="hospital-card">
        <img 
            :src="hospital.image_urls[0]" 
            :alt="title"
            loading="lazy"
            :class="{ 'image-loading': !imageLoaded }"
            @load="imageLoaded = true"
            @error="imageLoaded = true"
        >
        <div class="card-content">
            <h3>
                <NuxtLink :to="`/hospitals/${hospital.id}`" class="text-dark text-decoration-none  truncate-wordss">{{ truncateWords(hospital.title, 3) }}
                </NuxtLink>
                <span class="rating">{{ Number(hospital.average_rating).toFixed(1) }}<span class="star">★</span></span>
            </h3>
            <p class="location">
                <Icon name="material-symbols:location-on-outline" style="color:#053862; margin-right:5px; font-size: 18px;"/>
                {{ shortAddress }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCapitalize, useTruncateText } from '~/composables/useHelpers' // explicit import
 const config = useRuntimeConfig()
const props = defineProps({
    hospital: Object,
})

const imageLoaded = ref(false)

const title = computed(() => useCapitalize(props.hospital?.title || ''))
const shortAddress = computed(() => useTruncateText(props.hospital?.address, 20))
function truncateWords(str, num) {
  const words = str.split(" ");
  return words.length > num ? words.slice(0, num).join(" ") + "..." : str;
}
</script>

<style>
.truncate-wordss {
  display: inline-block;
  max-width: 20ch;   /* approx length of ~3 words */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
</style>
