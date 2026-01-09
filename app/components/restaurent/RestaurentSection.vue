<template>
  <section class="popular-hotels-section">
    <div class="container">
      <div class="section-header">
        <h2>Explore Nearby Restaurants</h2>
        <p>
          Discover the best dining spots just around the corner. Savor local
          flavors and unique cuisines that await you!
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

        <!-- Dynamic Restaurant Cards section -->
        <div class="slider-grid">
          <div
            v-for="(restaurant, index) in visibleRestaurants"
            :key="index"
            class="hotel-card"
          >
            <img 
              :src="restaurant.image_url ?? 'https://flyhospitals.dev/dumy.jpg'" 
              :alt="restaurant.name" 
              loading="lazy"
              :class="{ 'image-loading': !imageLoaded[restaurant.id] }"
              @load="imageLoaded[restaurant.id] = true"
              @error="imageLoaded[restaurant.id] = true"
            />
            <div class="card-content">
              <h3>
                {{ useTruncateText(restaurant?.name || "", 20) }}
                <span class="rating">
                  {{ restaurant.rating }}
                  <span class="star">★</span>
                </span>
              </h3>
              <a
                :href="restaurant.google_map_location"
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
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue"

// Props
const props = defineProps({
  restaurants: {
    type: Array,
    required: true
  }
})

// Current index of slider
const currentIndex = ref(0)

// Track image loading for blur effect
const imageLoaded = reactive({})

// ---------------- Dynamic items per page ----------------
const itemsPerPage = ref(5)

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
    itemsPerPage.value = 5
  }

  // Ensure currentIndex is valid after resizing
  if (currentIndex.value + itemsPerPage.value > props.restaurants.length) {
    currentIndex.value = Math.max(0, props.restaurants.length - itemsPerPage.value)
  }
}

// Call on mounted and listen for resize
onMounted(() => {
  updateItemsPerPage()
  window.addEventListener("resize", updateItemsPerPage)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerPage)
})

// ---------------- Compute visible restaurants ----------------
const visibleRestaurants = computed(() => {
  return props.restaurants.slice(
    currentIndex.value,
    currentIndex.value + itemsPerPage.value
  )
})

// ---------------- Slider navigation ----------------
function nextSlide() {
  if (currentIndex.value + itemsPerPage.value < props.restaurants.length) {
    currentIndex.value++
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>
