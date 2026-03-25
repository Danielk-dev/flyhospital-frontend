<template>
  <section class="blogs-section">
    <div class="container">
      <div class="section-header">
        <h2>Blogs</h2>
        <p>
          Explore our top-rated procedure in neurology, plastic surgery,
          dentistry, and oncology, delivered with precision for the best outcomes.
        </p>
      </div>

      <div v-if="loading">Loading blogs...</div>
      <div v-else-if="error">{{ error }}</div>

      <!-- Slider Container -->
      <div v-else class="slider-container">

        <!-- Prev Button -->
        <button
          class="slider-arrow prev-arrow"
          @click="prevSlide"
          :disabled="currentIndex === 0"
        >
          &#10094;
        </button>

        <!-- Slider Wrapper -->
        <div class="slider-wrapper">
          <div
            class="slider-track"
            :style="{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
            }"
          >
            <div
              v-for="blog in blogs"
              :key="blog.id"
              class="blog-slide"
            >
              <div class="blog-card">
                <img
                  :src="blog.media?.[0]?.original_url || blog.image_url"
                  :alt="blog.title"
                  loading="lazy"
                  @error="handleImageError"
                />

                <div class="blog-content">
                  <h3>{{ blog.title }}</h3>

                  <p class="truncate-lines">
                    {{ stripHtml(blog.content) }}
                  </p>

                  <NuxtLink :to="`/blogs/${blog.id}`">
                    Read More
                  </NuxtLink>
                </div>
              </div>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"
import { useGeneralStore } from "~/stores/general"

const store = useGeneralStore()

const blogs = computed(() => store.blogs.slice(0, 6))
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const currentIndex = ref(0)
const slidesPerView = ref(3)

const maxIndex = computed(() =>
  Math.max(0, blogs.value.length - slidesPerView.value)
)

/*
✅ Responsive Logic (Same as Treatment Slider)
*/
const updateSlidesPerView = () => {
  const width = window.innerWidth

  if (width >= 992) slidesPerView.value = 3
  else if (width >= 768) slidesPerView.value = 2
  else slidesPerView.value = 1

  if (currentIndex.value > maxIndex.value)
    currentIndex.value = maxIndex.value
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener("resize", updateSlidesPerView)
})

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

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = "https://placehold.co/600x400?text=No+Image"
}

const stripHtml = (html: string) => {
  if (!html) return ""
  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}
</script>

<style scoped>
.blogs-section {
  padding: 50px 0;
}

/* ===== Same Slider Design ===== */

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

.blog-slide {
  flex: 0 0 auto;
  width: calc(100% / 4);
  padding: 10px;
  box-sizing: border-box;
}

/* Tablet */
@media (max-width: 991.98px) {
  .blog-slide {
    width: calc(100% / 2);
  }
}

/* Mobile */
@media (max-width: 767.98px) {
  .blog-slide {
    width: 100%;
  }
}

/* ===== Card ===== */

.blog-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blog-content h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #053862;
  font-weight: 600;
}

.truncate-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
  flex-grow: 1;
}

/* ===== Same Arrow Design ===== */

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

.prev-arrow {
  margin-right: 10px;
}

.next-arrow {
  margin-left: 10px;
}
</style>