<template>
  <section class="testimonials-section py-5 my-5">
    <div class="container text-center">
      
      <!-- Heading -->
      <h2 class="title">Testimonials</h2>
      <p class="subtitle">
        Kind words from patients who found healthcare made simple with ClickHospital
      </p>

      <div class="slider-wrapper">

        <!-- Left -->
        <button class="nav-btn left" @click="prevSlide">‹</button>

        <!-- Cards -->
        <div class="cards">
          <div
            v-for="(item, index) in visibleTestimonials"
            :key="index"
            class="card shadow-sm"
          >
            <div class="quote">“</div>

            <p class="text">{{ item.text }}</p>

            <img :src="item.image" class="avatar" />

            <h6 class="name">{{ item.name }}</h6>

            <div class="social">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-linkedin"></i>
            </div>
          </div>
        </div>

        <!-- Right -->
        <button class="nav-btn right" @click="nextSlide">›</button>

      </div>

      <button class="btn btn-light mt-4">Add Review</button>

    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const currentIndex = ref(0);
let interval = null;

// 👉 4+ cards
const testimonials = ref([
  {
    name: "Lora Smith",
    text: "It is a long established fact that a reader will be distracted.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Alex",
    text: "Readable content makes layout easier to understand.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara Khan",
    text: "Very helpful service and smooth experience.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "David Lee",
    text: "Highly recommended platform for patients.",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Ali Ahmed",
    text: "Amazing support and quick response.",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
]);

// 👉 always show 3 cards
const visibleTestimonials = computed(() => {
  return [
    testimonials.value[currentIndex.value % testimonials.value.length],
    testimonials.value[(currentIndex.value + 1) % testimonials.value.length],
    testimonials.value[(currentIndex.value + 2) % testimonials.value.length],
  ];
});

// 👉 next / prev
const nextSlide = () => {
  currentIndex.value =
    (currentIndex.value + 1) % testimonials.value.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.value.length) %
    testimonials.value.length;
};

// 👉 auto slide
onMounted(() => {
  interval = setInterval(() => {
    nextSlide();
  }, 3000); // 3 sec
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
<style scoped>
.testimonials-section {
  background: #0d4a73;
  color: #fff;
}

.title {
  font-size: 36px;
  font-weight: bold;
}

.subtitle {
  color: #cfd8dc;
  margin-bottom: 40px;
}

.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards {
  display: flex;
  gap: 20px;
}

.card {
  width: 280px;
  border-radius: 12px;
  padding: 25px 20px;
  background: #f5f5f5;
  color: #333;
}

.quote {
  font-size: 28px;
  color: #4caf50;
}

.text {
  font-size: 14px;
  margin: 15px 0;
}

.avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: 10px auto;
}

.name {
  margin-top: 10px;
  font-weight: 600;
}

.social i {
  margin: 0 6px;
  cursor: pointer;
}

/* arrows */
.nav-btn {
  position: absolute;
  background: #fff;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.nav-btn.left {
  left: -60px;
}

.nav-btn.right {
  right: -60px;
}
</style>