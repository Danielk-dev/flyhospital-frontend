<template>
  <div class="hospitals-slider-section py-5">
    <div class="container">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">
          {{ description }}
        </p>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Slider -->
      <div v-else-if="hospitals.length > 0" class="position-relative overflow-hidden">
        <div class="slider-container">
          <div
            class="slider-track d-flex gap-4"
            :style="trackStyle"
          >
            <div
              v-for="hospital in hospitals"
              :key="hospital.id"
              class="hospital-card card h-100 shadow-sm"
              :style="{ minWidth: `calc(${slideWidth}% - 1.5rem)`, flex: `0 0 calc(${slideWidth}% - 1.5rem)` }"
            >
              <div class="card-img-top-wrapper position-relative">
                <img
                  :src="hospital.image_url || '/images/default-hospital.jpg'"
                  :alt="hospital.title || hospital.name"
                  class="card-img-top"
                  style="height: 200px; object-fit: cover;"
                />
                <div v-if="hospital.average_rating" class="rating-badge position-absolute top-0 end-0 m-2 bg-white px-2 py-1 rounded shadow-sm">
                  <span class="star text-warning">★</span> {{ hospital.average_rating }}
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title text-truncate">{{ hospital.title || hospital.name }}</h5>
                <p class="card-text text-muted small text-truncate-2">{{ hospital.description || hospital.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          v-if="currentIndex > 0"
          class="slider-nav prev-nav position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm"
          @click="prevSlide"
          aria-label="Previous slide"
        >
          <span>‹</span>
        </button>
        <button
          v-if="currentIndex < maxIndex"
          class="slider-nav next-nav position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm"
          @click="nextSlide"
          aria-label="Next slide"
        >
          <span>›</span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-5">
        <p class="text-muted">No hospitals found.</p>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-5">
        <NuxtLink :to="'/hospitals'" class="btn btn-outline-primary btn-view-all">
          View all Hospitals
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
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

const hospitals = computed(() => store.hospitals)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const currentIndex = ref(0)
const slidesPerView = ref(4)

// 🔥 Responsive Breakpoints
const updateSlidesPerView = () => {
  if (typeof window === 'undefined') return
  const width = window.innerWidth

  if (width < 768) {
    slidesPerView.value = 1
  } else if (width < 1024) {
    slidesPerView.value = 2
  } else if (width < 1280) {
    slidesPerView.value = 3
  } else {
    slidesPerView.value = 4
  }

  // reset index if overflow
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
})

const slideWidth = computed(() => 100 / slidesPerView.value)

const maxIndex = computed(() =>
  Math.max(0, hospitals.value.length - slidesPerView.value)
)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideWidth.value}%)`,
  transition: 'transform 0.3s ease-out'
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
  padding: 10px 0;
}
.slider-track {
  display: flex;
  will-change: transform;
}
.hospital-card {
  transition: transform 0.2s ease;
}
.hospital-card:hover {
  transform: translateY(-5px);
}
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.slider-nav {
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>
