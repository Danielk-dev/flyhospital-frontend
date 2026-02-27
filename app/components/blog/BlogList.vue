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

      <!-- Slider -->
      <div v-else class="slider-wrapper">
        
        <!-- Track -->
        <div
          class="slider-track"
          :style="{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
          }"
        >
          <div
            v-for="blog in blogs"
            :key="blog.id"
            class="slide"
            :style="{ flex: `0 0 ${100 / slidesPerView}%` }"
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

        <!-- Navigation -->
        <button class="nav prev" @click="prevSlide">‹</button>
        <button class="nav next" @click="nextSlide">›</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useGeneralStore } from "~/stores/general"

const store = useGeneralStore()

const blogs = computed(() => store.blogs.slice(0, 6))
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const currentIndex = ref(0)
const slidesPerView = ref(3)

const updateSlidesPerView = () => {
  const width = window.innerWidth

  let newSlidesPerView = 3

  if (width < 641) {
    newSlidesPerView = 1
  } else if (width < 1024) {
    newSlidesPerView = 2
  } else {
    newSlidesPerView = 3
  }

  // If slidesPerView changed → reset index
  if (slidesPerView.value !== newSlidesPerView) {
    slidesPerView.value = newSlidesPerView
    currentIndex.value = 0
  }
}

const nextSlide = () => {
  if (currentIndex.value < blogs.value.length - slidesPerView.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener("resize", updateSlidesPerView)
})

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView)
})

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

/* Slider */
.slider-wrapper {
  position: relative;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.4s ease;
}

.slide {
  padding: 10px;
  box-sizing: border-box;
}

/* Card */
.blog-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 100%;
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

.blog-content a {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
}

/* Navigation */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: whitesmoke;
  color: black;
  border: none;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
@media (min-width: 1024px) {
  .nav {
    display: none;
  }
}
</style>