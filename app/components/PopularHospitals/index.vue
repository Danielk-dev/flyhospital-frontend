<template>
  <div class="hospitals-slider-section py-5">
    <div class="container">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <h2 class="section-title">Explore Popular Hospitals and Clinics</h2>
        <p class="section-subtitle">
          Discover our most sought-after Procedure in neurology, plastic surgery, dentistry, and oncology
          expertly performed for optimal care and results.
        </p>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Slider -->
      <div v-else-if="hospitals.length > 0" class="position-relative">
        <div class="slider-container">
          <div
            class="slider-track d-flex gap-4"
            :style="trackStyle"
          >
            <div
              v-for="hospital in hospitals"
              :key="hospital.id"
              class="hospital-card card h-100 shadow-sm"
            >
              <div class="card-img-top-wrapper">
                <img
                  :src="getHospitalImage(hospital)"
                  :alt="hospital.title"
                  class="card-img-top"
                  @error="handleImageError"
                />
                <div class="rating-badge">
                  <span class="star">★</span> {{ formatRating(hospital.rating) }}
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ hospital.title }}</h5>
                <p class="card-text text-muted">{{ hospital.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          class="slider-nav prev-nav"
          @click="prevSlide"
          :disabled="currentIndex === 0"
          aria-label="Previous slide"
        >
          <span>‹</span>
        </button>
        <button
          class="slider-nav next-nav"
          @click="nextSlide"
          :disabled="currentIndex >= maxIndex"
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
         <NuxtLink :to="'/hospitals'" class="btn btn-outline-primary btn-view-all">View all Hospitals</NuxtLink>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const hospitals = ref([])
const loading = ref(true)
const currentIndex = ref(0)
const slidesToShow = ref(4)
let resizeObserver = null

// Computed
const maxIndex = computed(() => {
  return Math.max(0, hospitals.value.length - slidesToShow.value)
})

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / slidesToShow.value)}%)`,
  transition: 'transform 0.3s ease-in-out'
}))

// Methods
const fetchHospitals = async () => {
  try {
    loading.value = true
    const response = await fetch('https://admin.clickhospitals.com/api/hospitals')
    const data = await response.json()
    if (data.success) {
      hospitals.value = data.data
    }
  } catch (error) {
    console.error('Error fetching hospitals:', error)
  } finally {
    loading.value = false
  }
}

const getHospitalImage = (hospital) => {
  // Find the banner image or first image from media
  const bannerMedia = hospital.media?.find(m => m.custom_properties?.is_banner === true)
  if (bannerMedia) {
    return bannerMedia.original_url
  }
  if (hospital.image_urls && hospital.image_urls.length > 0) {
    return hospital.image_urls[0]
  }
  if (hospital.media && hospital.media.length > 0) {
    return hospital.media[0].original_url
  }
  return 'https://via.placeholder.com/400x250?text=No+Image'
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found'
}

const formatRating = (rating) => {
  const num = parseFloat(rating)
  return isNaN(num) ? 'N/A' : num.toFixed(1)
}

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const updateSlidesToShow = () => {
  const width = window.innerWidth
  if (width >= 1200) {
    slidesToShow.value = 4
  } else if (width >= 992) {
    slidesToShow.value = 3
  } else if (width >= 768) {
    slidesToShow.value = 2
  } else {
    slidesToShow.value = 1
  }
  // Reset index when slidesToShow changes
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = Math.max(0, maxIndex.value)
  }
}

// Lifecycle
onMounted(() => {
  fetchHospitals()
  updateSlidesToShow()
  window.addEventListener('resize', updateSlidesToShow)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesToShow)
})
</script>

<style scoped>
.hospitals-slider-section {
  background-color: #f8f9fa;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e2a3e;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Slider Styles */
.slider-container {
  overflow: hidden;
  margin: 0 40px;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
  will-change: transform;
}

.hospital-card {
  flex: 0 0 calc(100% / v-bind(slidesToShow) - 1rem);
  min-width: 0;
  border: none;
  border-radius: 12px;
  width: 87px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: none;
}

.hospital-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-img-top-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.hospital-card:hover .card-img-top {
  transform: scale(1.05);
}

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: #ffc107;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-badge .star {
  color: #ffc107;
  font-size: 0.9rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e2a3e;
}

.card-text {
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Navigation Buttons */
.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #1e2a3e;
  transition: all 0.2s ease;
  z-index: 10;
}

.slider-nav:hover:not(:disabled) {
  background: #1e2a3e;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.slider-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.prev-nav {
  left: 0;
}

.next-nav {
  right: 0;
}

/* View All Button */
.btn-view-all {
  padding: 10px 32px;
  border-radius: 30px;
  font-weight: 500;
  border-color: #1e2a3e;
  color: #1e2a3e;
  transition: all 0.2s ease;
}

.btn-view-all:hover {
  background-color: #1e2a3e;
  color: white;
}

/* Responsive */
@media (max-width: 992px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .slider-container {
    margin: 0 30px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  
  .slider-container {
    margin: 0 20px;
  }
  
  .slider-nav {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .card-img-top-wrapper {
    height: 180px;
  }
}
</style>