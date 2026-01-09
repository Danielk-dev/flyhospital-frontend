<template>
  <section class="popular-hospitals-section">
    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>

      <!-- Loading/Error States -->
      <div v-if="loading" class="text-center py-5">Loading hospitals...</div>
      <div v-else-if="error" class="text-center text-danger py-5">{{ error }}</div>
      
      <!-- Slider -->
      <div v-else-if="hospitals.length > 0" class="slider-container">
        <button 
          class="slider-arrow prev-arrow" 
          aria-label="Previous slide" 
          @click="prevSlide"
          :disabled="currentIndex === 0"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M18.75 23.75L10 15L18.75 6.25" stroke="#003D6F" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="slider-wrapper">
          <div class="slider-track" :style="trackStyle">
            <div 
              v-for="hospital in hospitals" 
              :key="hospital.id" 
              class="slide"
            >
              <HospitalSectionCard :hospital="hospital" />
            </div>
          </div>
        </div>

        <button 
          class="slider-arrow next-arrow" 
          aria-label="Next slide"  
          @click="nextSlide"
          :disabled="currentIndex >= maxIndex"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M11.25 23.75L20 15L11.25 6.25" stroke="#003D6F" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      
      <div v-else class="text-center text-muted py-5">No hospitals available.</div>

      <!-- View all link -->
      <NuxtLink :to="viewAllLink" class="view-all-btn">View all Hospitals</NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useGeneralStore } from '~/stores/general'

const props = defineProps({
  title: {
    type: String,
    default: "Explore Popular Hospitals and Clinics"
  },
  description: {
    type: String,
    default: "Discover our most sought-after procedure in neurology, plastic surgery, dentistry, and oncology expertly performed for optimal care and results."
  },
  viewAllLink: {
    type: String,
    default: "/hospitals"
  }
})

const store = useGeneralStore()

// ✅ Data is fetched centrally in index page
// This component just displays the data from the store
// No need to fetch here to avoid duplicate requests
const hospitals = computed(() => store.hospitals)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const currentIndex = ref(0)
const slidesPerView = 4 // can be dynamic based on screen width
const slideWidth = 100 / slidesPerView

// Max index to prevent sliding too far
const maxIndex = computed(() =>
  Math.max(0, hospitals.value.length - slidesPerView)
)

// Track style computed for cleaner template
const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideWidth}%)`
}))

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++
}

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
</script>

<style scoped>
.slider-container {
  position: relative;
  display: flex;
  align-items: center;
}

.slider-wrapper {
  overflow: hidden;
  flex: 1;
}

.slider-track {
  display: flex;
  transition: transform 0.4s ease-in-out;
  gap: 10px;
}

.slide {
  flex: 0 0 calc(100% / 4); /* matches slidesPerView */
}

/* Make responsive */
@media (max-width: 1024px) {
  .slide {
    flex: 0 0 calc(100% / 2);
  }
}
@media (max-width: 768px) {
  .slide {
    flex: 0 0 100%;
  }
}

.slider-arrow {
  background: white;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.slider-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
