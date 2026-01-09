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

      <div v-else class="blogs-grid">
        <div v-for="blog in blogs" :key="blog.id" class="blog-card">
          <img :src="blog.media?.[0]?.original_url || blog.image_url" :alt="blog.title" loading="lazy"
            @error="handleImageError" />
          <div class="blog-content">
            <h3>{{ blog.title }}</h3>
            <p class="truncate-lines">{{ stripHtml(blog.content) }}</p>
            <NuxtLink :to="`/blogs/${blog.id}`">Read More</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useGeneralStore } from '~/stores/general'

const store = useGeneralStore()
const config = useRuntimeConfig()

// Track image loading state for blur effect
const imageLoaded = reactive({})

// ✅ Data is fetched centrally in index page
// This component just displays the data from the store
// No need to fetch here to avoid duplicate requests

const blogs = computed(() => store.blogs.slice(0, 4))
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://placehold.co/600x400?text=No+Image'
  // mark as loaded to remove blur
  // We can't easy access blog.id here without passing it, 
  // but the @load/error handler in template handles the state
}

const stripHtml = (html: string) => {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}
</script>

<style scoped>
.blogs-section {
  padding: 50px 0;
}

.blog-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #053862;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  /* number of lines */
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
  display: inline-block;
}

.blog-content a:hover {
  text-decoration: underline;
}

/* Image loading blur effect */
.image-loading {
  filter: blur(10px);
  transition: filter 0.5s ease;
  background-color: #e0e0e0;
}
</style>