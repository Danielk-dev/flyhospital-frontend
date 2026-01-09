<template>
  <section class="popular-hotels-section">
    <div class="container">
      <div class="section-header">
        <h2>Explore Nearby Hotels</h2>
        <p>
          Explore nearby hotels that offer comfort and convenience during
          your stay. Enjoy a restful retreat just minutes away from our
          premier medical facilities.
        </p>
      </div>

      <div class="slider-container">
        <!-- Prev Button -->
        <button class="slider-arrow prev-arrow" @click="prevSlide">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M18.75 23.75L10 15L18.75 6.25"
              stroke="#003D6F"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Dynamic Hotel Cards -->
        <div class="slider-grid">
          <div
            v-for="(hotel, index) in visibleHotels"
            :key="index"
            class="hotel-card"
          >
            <img :src="hotel.image_url ?? 'https://flyhospitals.dev/dumy.jpg'" :alt="hotel.name" />
            <div class="card-content">
              <h3>
                {{ useTruncateText(hotel?.name || '', 20) }}
                <span class="rating">
                  {{ hotel.rating }}<span class="star">★</span>
                </span>
              </h3>
              <a
                :href="hotel.google_map_location"
                class="btn btn-sm btn-light mt-2"
              >
                <Icon name="material-symbols:location-on-outline"
                      style="color:#053862; margin-right:5px; font-size: 18px;" />
                Google Map
              </a>
            </div>
          </div>
        </div>

        <!-- Next Button -->
        <button class="slider-arrow next-arrow" @click="nextSlide">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M11.25 23.75L20 15L11.25 6.25"
              stroke="#003D6F"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Props
const props = defineProps({
  hotels: {
    type: Array,
    required: true
  }
})

// Slider state
const currentIndex = ref(0)
const itemsPerPage = ref(4)

// ---------------- Dynamic items per page ----------------
function updateItemsPerPage() {
  const width = window.innerWidth
  if (width < 768) {
    // Mobile
    itemsPerPage.value = 1
  } else if (width < 1024) {
    // Tablet
    itemsPerPage.value = 2
  } else {
    // Desktop
    itemsPerPage.value = 4
  }
}

onMounted(() => {
  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsPerPage)
})

// ---------------- Compute visible hotels ----------------
const visibleHotels = computed(() => {
  return props.hotels.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage.value
  )
})

// ---------------- Slider navigation ----------------
function nextSlide() {
  if (currentIndex.value + itemsPerPage.value < props.hotels.length) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>
