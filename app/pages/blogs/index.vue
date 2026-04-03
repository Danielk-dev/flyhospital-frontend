<template>
  <main class="blogs-page">
    <div class="container py-5">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">Blogs</li>
        </ol>
      </nav>

      <!-- Blog Header Section -->
      <div class="blog-header mb-5">
        <h1 class="display-5 fw-bold mb-3">Top Medical Related Blogs</h1>
        <p class="text-muted lead mb-0 max-w-800">
          The ClickHospitals is based on data science algorithms, providing a trusted, transparent, and objective comparison. 
          It takes into account patient demand, review scores (both positive and negative), the frequency of updates to procedure 
          options and prices, response speed, and clinic certifications.
        </p>
      </div>

      <!-- Latest Updated Section -->
      <div class="latest-section">
        <h2 class="h4 fw-bold mb-4">Latest Updated</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="row g-4">
          <div v-for="i in 8" :key="i" class="col-12 col-md-6 col-lg-3">
            <div class="skeleton-card">
              <div class="skeleton-img"></div>
              <div class="skeleton-text short mt-3"></div>
              <div class="skeleton-text long mt-2"></div>
              <div class="skeleton-text medium mt-2"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-5">
          <Icon name="mdi:alert-circle-outline" class="display-1 text-danger mb-3" />
          <p class="h5">{{ error }}</p>
          <button @click="store.fetchBlogs(1)" class="btn btn-primary mt-3 px-4">Try Again</button>
        </div>

        <!-- Blogs Grid -->
        <div v-else class="row g-4">
          <div v-for="blog in blogs" :key="blog.id" class="col-12 col-md-6 col-lg-3">
            <NuxtLink :to="`/blogs/${blog.id}`" class="blog-card-link text-decoration-none">
              <div class="blog-card h-100">
                <div class="blog-card-img-wrapper">
                  <img 
                    :src="blog.media?.[0]?.original_url || blog.image_url || 'https://placehold.co/600x400?text=No+Image'" 
                    :alt="blog.title"
                    class="blog-card-img"
                    @error="handleImageError"
                  >
                </div>
                <div class="blog-card-body p-3">
                  <div class="blog-category d-flex align-items-center mb-2">
                    <span class="category-dot" :style="{ backgroundColor: getCategoryColor(blog.tags) }"></span>
                    <span class="category-text text-uppercase small fw-bold text-muted">{{ blog.tags || 'General' }}</span>
                  </div>
                  <h3 class="blog-card-title h6 fw-bold mb-2 text-dark">{{ blog.title }}</h3>
                  <div class="blog-card-meta small text-muted">
                    <span>{{ formatDate(blog.created_at) }}</span>
                    <span class="mx-1">·</span>
                    <span>Estimated reading time: {{ calculateReadTime(blog.content) }} minutes</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Pagination (Optional but good) -->
        <div v-if="pagination.last_page > 1" class="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                <button class="page-link" @click="store.fetchBlogs(pagination.current_page - 1)">Previous</button>
              </li>
              <li v-for="page in pagination.last_page" :key="page" class="page-item" :class="{ active: pagination.current_page === page }">
                <button class="page-link" @click="store.fetchBlogs(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                <button class="page-link" @click="store.fetchBlogs(pagination.current_page + 1)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useGeneralStore } from "~/stores/general"

const store = useGeneralStore()

const blogs = computed(() => store.blogs)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)

onMounted(async () => {
  await store.fetchBlogs(1)
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = "https://placehold.co/600x400?text=No+Image"
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'Recently'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

const calculateReadTime = (content?: string) => {
  if (!content) return 5
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

const getCategoryColor = (tag?: string) => {
  const colors: Record<string, string> = {
    'Artificial Intelligence': '#4e73df',
    'Data Science': '#1cc88a',
    'Blockchain': '#36b9cc',
    'Machine Learning': '#f6c23e',
    'Health': '#e74a3b',
    'Medical': '#858796'
  }
  return colors[tag || ''] || '#5a5c69'
}
</script>

<style scoped>
.blogs-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.max-w-800 {
  max-width: 800px;
}

/* Breadcrumb Styling */
.breadcrumb-item a {
  color: #053862;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #6c757d;
}

/* Blog Card Styling */
.blog-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.blog-card-img-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.blog-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card-img {
  transform: scale(1.05);
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.blog-card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  height: 2.8em;
}

/* Skeleton Loading */
.skeleton-card {
  background: white;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.skeleton-img {
  aspect-ratio: 16 / 9;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin: 0 15px;
}

.skeleton-text.short { width: 40%; }
.skeleton-text.medium { width: 60%; }
.skeleton-text.long { width: 80%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Pagination Styling */
.pagination .page-link {
  color: #053862;
  border: none;
  margin: 0 5px;
  border-radius: 5px;
}

.pagination .page-item.active .page-link {
  background-color: #053862;
  color: white;
}

.blog-card-link {
  display: block;
  height: 100%;
}
</style>