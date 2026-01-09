<template>
  <section class="destinations-section">
    <div class="container">
      <div class="section-header">
        <h2>Top Medical Tourism Destinations</h2>
        <p>Discover the world's leading destinations for quality medical care. Trusted by thousands seeking
          expert procedures and peace of mind.</p>
      </div>

      <div class="slider-container">
        <!-- Prev Button -->
        <button class="slider-arrow prev-arrow" @click="prevSlide" :disabled="currentIndex === 0">
          &#10094;
        </button>

        <!-- Slider Wrapper -->
        <div class="slider-wrapper">
          <div class="slider-track" :style="{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }">
            <div
              v-for="(destination, index) in destinations"
              :key="destination.id"
              class="destination-card"
              :style="{ marginRight: (index === destinations.length -1 ? '0' : '10px') }"
            >
              <img :src="destination.image_url ?? 'https://flyhospitals.dev/dumy.jpg'" 
                   alt="Destination" 
                   loading="lazy"
                   :class="{ 'image-loading': !imageLoaded[destination.id] }"
                   @load="imageLoaded[destination.id] = true"
                   @error="imageLoaded[destination.id] = true">
              <div class="card-content">
                <p class="card-subtitle">Looking for medical in</p>
                <div class="card-title-bar">
                  <h3>
                    <NuxtLink style="text-decoration: none;color: #053862;"
                      :to="`/hospitals?country_id=${destination.id}`">
                      {{ destination.country_name }}
                    </NuxtLink>
                  </h3>
                  <span class="rating">4.5<span class="star">★</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Button -->
        <button class="slider-arrow next-arrow" @click="nextSlide" :disabled="currentIndex >= maxIndex">
          &#10095;
        </button>
      </div>

      <NuxtLink to="/destinations" class="view-all-btn">View all Destination</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue'
import { useGeneralStore } from '~/stores/general'

const store = useGeneralStore()
const imageLoaded = reactive({})
const destinations = computed(() => store.destinations)

const currentIndex = ref(0)
const slidesPerView = ref(4) // default desktop

const maxIndex = computed(() => Math.max(0, destinations.value.length - slidesPerView.value))

// Update slides per view on window resize
const updateSlidesPerView = () => {
  const width = window.innerWidth
  if (width >= 992) slidesPerView.value = 4
  else if (width >= 768) slidesPerView.value = 2
  else slidesPerView.value = 1

  // prevent overflow
  if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})

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
}

.destination-card {
  flex: 0 0 auto;
  width: calc(100% / 4); /* desktop default */
}

@media (max-width: 991.98px) {
  .destination-card {
    width: calc(100% / 2); /* tablet */
  }
}

@media (max-width: 767.98px) {
  .destination-card {
    width: 100%; /* mobile */
    margin-right: 0 !important; /* single card no margin */
  }
}

.slider-arrow {
  background: white;
  border: none;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  padding: 5px 10px;
}

.slider-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.image-loading {
  filter: blur(5px);
  transition: filter 0.3s;
}

.image-loading.loaded {
  filter: blur(0);
}
</style>
