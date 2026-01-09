<template>
  <section class="popular-section">
    <div class="container">
      <div class="section-header">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>

      <div class="slider-container">

        <!-- Prev -->
        <button class="slider-arrow prev-arrow" @click="prevSlide">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M18.75 23.75L10 15L18.75 6.25" stroke="#003D6F" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Dynamic Cards -->
        <div class="slider-grid">
          <div v-for="(item, index) in visibleItems" :key="index" class="popular-section-card">
            <img v-if="item.type == 'Taxi Stand'" :src="taxiStandImage || fallbackImage" :alt="item.image" />
            <img v-if="item.type == 'Airport'" :src="airportImage || fallbackImage" :alt="item.image" />
            <img v-if="item.type == 'Railway Station'" :src="railwayImage || fallbackImage" :alt="item.image" />

            <div class="card-content">
              <h3>
                <span v-if="item.type == 'Taxi Stand'">Taxi / Shared Rides</span>
                <span v-else>{{ item.name || item.type }}</span>

                <span class="rating">
                  4.5
                  <span class="star">★</span>
                </span>
              </h3>

              <h4 class="mt-2" style="font-size: 13px;">
                <span v-if="item.type == 'Taxi Stand'">multiple taxi / shared rides option availble</span>
                <span v-else>{{ item.description }}</span>
              </h4>

              <h3 class="mt-2" style="font-size: 13px;">
                {{ item.distance }} km away
              </h3>

              <!-- Google Map Button (optional) -->
              <a v-if="item.google_map_location" :href="item.google_map_location" target="_blank"
                class="btn btn-sm btn-light mt-2">
                <Icon name="material-symbols:location-on-outline"
                  style="color:#053862; margin-right:5px; font-size: 18px;" />
                Google Map
              </a>
            </div>
          </div>
        </div>

        <!-- Next -->
        <button class="slider-arrow next-arrow" @click="nextSlide">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M11.25 23.75L20 15L11.25 6.25" stroke="#003D6F" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  title: String,
  description: String,

  items: { type: Array, required: true },

  taxiStandImage: {
    type: String,
    default: "https://flyhospitals.dev/assets/img/taxi-stand.jpg"
  },

  airportImage: {
    type: String,
    default: "https://flyhospitals.dev/assets/img/airport.jpg"
  },

  railwayImage: {
    type: String,
    default: "https://flyhospitals.dev/assets/img/railway-station.jpg"
  },

  fallbackImage: {
    type: String,
    default: "https://flyhospitals.dev/dumy.jpg"
  }
})

const currentIndex = ref(0)
const itemsPerPage = 4

const visibleItems = computed(() =>
  props.items.slice(currentIndex.value, currentIndex.value + itemsPerPage)
)

function nextSlide() {
  if (currentIndex.value + itemsPerPage < props.items.length) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function truncate(text, limit) {
  return text?.length > limit ? text.substring(0, limit) + "..." : text
}
</script>
