<template>
  <main class="container blog-detail-page mt-4">

    <!-- Loader -->
    <div v-if="loading" class="text-center py-5">
      <Loader />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-5">
      <p>No blog found</p>
      <NuxtLink to="/" class="btn btn-primary mt-3">Go Home</NuxtLink>
    </div>

    <!-- Blog Detail -->
    <div v-else-if="blog">
      <!-- Breadcrumb -->
      <Breadcrumb
        class="hero-breadcrumb"
        :items="[
          { label: 'Home', link: '/' },
          { label: 'Blog', link: '/blogs' },
          { label: title, active: true }
        ]"
      />

      <!-- HERO IMAGE SECTION -->
      <div class="blog-hero mb-5">
        <img
          :src="blog.media?.[0]?.original_url || blog.image_url"
          :alt="blog.title"
          @error="handleImageError"
        />

        <!-- Overlay -->
        <div class="hero-overlay"></div>

        <!-- Content on Image -->
        <div class="hero-content">
          <span v-if="blog.tags" class="hero-tag">{{ blog.tags }}</span>
          <h1 class="hero-title">{{ blog.title }}</h1>
          <div class="hero-meta" v-if="blog.created_at">
            {{ formatDate(blog.created_at) }}
          </div>
        </div>
      </div>

      <!-- BLOG CONTENT -->
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="blog-content">
            <div v-html="blog.content"></div>
          </div>

          <!-- Share -->
          <div class="share-section mt-5 pt-4 border-top">
            <p class="fw-semibold mb-3">Share this article</p>
            <div class="d-flex gap-3">
              <a href="#" @click.prevent="shareOnFacebook" class="social-btn facebook">
                <Icon name="bi:facebook" />
              </a>
              <a href="#" @click.prevent="shareOnTwitter" class="social-btn twitter">
                <Icon name="bi:twitter-x" />
              </a>
              <a href="#" @click.prevent="shareOnLinkedIn" class="social-btn linkedin">
                <Icon name="bi:linkedin" />
              </a>
            </div>
          </div>

          <!-- Related Blogs -->
          <div class="mt-5 pt-4 border-top" v-if="relatedBlogs.length">
            <h5 class="mb-3">Related Blogs</h5>
            <div class="blogs-grid">
              <div v-for="item in relatedBlogs" :key="item.id" class="blog-card">
                <NuxtLink :to="`/blogs/${item.id}`" class="text-decoration-none">
                  <img
                    :src="item.media?.[0]?.original_url || item.image_url"
                    :alt="item.title"
                    loading="lazy"
                    @error="handleImageError"
                  />
                  <div class="blog-content">
                    <h3>{{ item.title }}</h3>
                    <p class="truncate-lines">{{ stripHtml(item.content) }}</p>
                    <span class="text-primary fw-medium">Read More</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGeneralStore } from '~/stores/general'
import type { Blog } from '~/stores/general'
import Loader from '~/components/Loader.vue'

const route = useRoute()
const store = useGeneralStore()
const id = route.params.id as string

const blog = ref<Blog | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const title = computed(() => blog.value?.title || 'Blog Details')

// Related Blogs (exclude current blog)
const relatedBlogs = ref<Blog[]>([])

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src =
    'https://placehold.co/600x400?text=No+Image'
}

const stripHtml = (html: string) => {
  if (!html) return ''

  if (process.server) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }

  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const getShareUrl = () =>
  process.client ? window.location.href : ''

const shareOnFacebook = () =>
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`, '_blank')

const shareOnTwitter = () =>
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(title.value)}`, '_blank')

const shareOnLinkedIn = () =>
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`, '_blank')

// Fetch blog and related blogs
onMounted(async () => {
  loading.value = true

  // Get current blog
  const existing = store.blogs.find(b => String(b.id) === String(id))
  blog.value = existing || await store.fetchBlogById(id)

  // Fetch more blogs if not enough
  if (store.blogs.length <= 1) {
    await store.fetchBlogs(4)
  }

  // Set related blogs after data is loaded
  relatedBlogs.value = store.blogs
    .filter(b => b.id !== blog.value?.id)
    .slice(0, 4)

  loading.value = false
})

// Optional: Update page title and meta
useHead({
  title: () => blog.value ? `${blog.value.title} - FlyHospital` : 'Blog Details',
  meta: [
    {
      name: 'description',
      content: () => blog.value?.content?.slice(0, 160) || ''
    }
  ]
})
</script>

<style scoped>
.blog-hero {
  position: relative;
  height: 525px;
  border-radius: 18px;
  overflow: hidden;
}

.blog-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44%;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}
@media (max-width: 992px) {
  .hero-overlay { height: 52%; }
}
@media (max-width: 768px) {
  .hero-overlay { height: 100%; backdrop-filter: blur(1px); }
}

.hero-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.hero-breadcrumb :deep(a),
.hero-breadcrumb :deep(span) {
  color: #e5e7eb !important;
}

.hero-tag {
  background: #0d2d52;
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  width: fit-content;
  margin-bottom: 10px;
}

.hero-title {
  font-size: 38px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
}

.hero-meta {
  font-size: 14px;
  color: #d1d5db;
}

.blog-content :deep(p) {
  font-size: 16px;
  line-height: 1.9;
  color: #374151;
  margin-bottom: 22px;
}

.blog-content :deep(img) {
  width: 100%;
  border-radius: 12px;
  margin: 25px 0;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
}
.social-btn:hover { transform: translateY(-3px); color: #fff; }
.social-btn.facebook:hover { background: #1877f2; }
.social-btn.twitter:hover { background: #000; }
.social-btn.linkedin:hover { background: #0077b5; }

/* Breadcrumb */
.hero-breadcrumb {
  background: whitesmoke;
  padding: 1px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: inline-block;
}
/* Breadcrumb text color */
.hero-breadcrumb :deep(a),
.hero-breadcrumb :deep(span) {
  color: #000 !important;
  font-size: 14px;
}

/* Optional: breadcrumb separator ( / ) */
.hero-breadcrumb :deep(li::before) {
  color: #000 !important;
}

/* Related Blogs grid - reuse Blog Card CSS */
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.blog-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}
.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.blog-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.blog-content {
  padding: 15px;
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
    line-height: 1.6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 20px;
    flex-grow: 1;
}
.blog-content span {
  margin-top: auto;
  font-weight: 500;
  color: #0d6efd;
}

/* Responsive */
@media (max-width: 992px) { .blogs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px) { .blogs-grid { grid-template-columns: 1fr; } }

</style>
