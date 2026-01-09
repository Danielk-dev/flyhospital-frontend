<template>
  <section class="explore-treatment-section">
    <div class="container">
      <div class="section-header">
        <h2>Explore Procedure Type</h2>
        <p>
          Explore popular procedure and specialities across top hospitals.
          Find the right care tailored to your medical needs.
        </p>
      </div>

      <div class="slider-container">
        <!-- Prev Button -->
        <button class="slider-arrow prev-arrow" @click="prevSlide" :disabled="currentIndex === 0">
          &#10094;
        </button>

        <!-- Slider Wrapper -->
        <div class="slider-wrapper">
          <div
            class="slider-track"
            :style="{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }"
          >
            <div
              v-for="(treatment, index) in treatments"
              :key="treatment.id"
              class="treatment-card"
              :style="{ marginRight: (index === treatments.length -1 ? '0' : '10px') }"
            >
              <NuxtLink
                style="text-decoration: none; color: #053862;"
                :to="`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`"
              >
                <img 
                  :src="treatment.image_url ?? 'https://flyhospitals.dev/dumy.jpg'" 
                  alt="Treatment" 
                  loading="lazy"
                  :class="{ 'image-loading': !imageLoaded[treatment.id] }"
                  @load="imageLoaded[treatment.id] = true"
                  @error="imageLoaded[treatment.id] = true"
                />
                <div class="card-content">
                  <p class="location">
                    <Icon
                      name="material-symbols:location-on-outline"
                      style="color:#053862; margin-right:5px; font-size: 18px;"
                    />
                    Toronto, Canada
                  </p>
                  <div class="card-title-bar">
                    <h3>{{ treatment.name }}</h3>
                    <span class="rating">4.9<span class="star">★</span></span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Next Button -->
        <button
          class="slider-arrow next-arrow"
          @click="nextSlide"
          :disabled="currentIndex >= maxIndex"
        >
          &#10095;
        </button>
      </div>

      <NuxtLink :to="viewAllLink" class="view-all-btn">View all Procedure</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";
import { useGeneralStore } from "~/stores/general";

const store = useGeneralStore();
const viewAllLink = ref("/procedure");
const imageLoaded = reactive({})

const treatments = computed(() => store.treatments);
const currentIndex = ref(0);

// Responsive slides per view
const slidesPerView = ref(4); // default desktop

const maxIndex = computed(() => Math.max(0, treatments.value.length - slidesPerView.value));

// Update slides per view on window resize
const updateSlidesPerView = () => {
  const width = window.innerWidth;
  if (width >= 992) slidesPerView.value = 4;
  else if (width >= 768) slidesPerView.value = 2;
  else slidesPerView.value = 1;

  // prevent overflow
  if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value;
};

onMounted(() => {
  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);
});

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};
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

.treatment-card {
  flex: 0 0 auto;
  width: calc(100% / 4); /* desktop default */
}

@media (max-width: 991.98px) {
  .treatment-card {
    width: calc(100% / 2); /* tablet */
  }
}

@media (max-width: 767.98px) {
  .treatment-card {
    width: 100%; /* mobile */
    margin-right: 0 !important; /* single card, no margin */
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
