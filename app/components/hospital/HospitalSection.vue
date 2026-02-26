<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGeneralStore } from '~/stores/general'

const props = defineProps({
  title: {
    type: String,
    default: "Explore Popular Hospitals and Clinics"
  },
  description: {
    type: String,
    default: "Discover our most sought-after procedure in neurology, plastic surgery, dentistry, and oncology expertly performed for optimal care and results."
  },
  viewAllLink: {
    type: String,
    default: "/hospitals"
  }
})

const store = useGeneralStore()

const hospitals = computed(() => store.hospitals)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const currentIndex = ref(0)
const slidesPerView = ref(4)

// 🔥 Responsive Breakpoints
const updateSlidesPerView = () => {
  const width = window.innerWidth

  if (width < 768) {
    slidesPerView.value = 1
  } else if (width < 1024) {
    slidesPerView.value = 2
  } else if (width < 1280) {
    slidesPerView.value = 3
  } else {
    slidesPerView.value = 4
  }

  // reset index if overflow
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
})

const slideWidth = computed(() => 100 / slidesPerView.value)

const maxIndex = computed(() =>
  Math.max(0, hospitals.value.length - slidesPerView.value)
)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideWidth.value}%)`
}))

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++
}

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
</script>