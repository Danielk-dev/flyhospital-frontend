<template>
  <header class="container-fluid bg-white shadow-sm sticky-top">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <!-- Logo -->
        <NuxtLink to="/" class="navbar-brand" exact-active-class="active">
          <img
            src="~assets/img/logo.png"
            class="logo"
            alt="ClickHospitals Logo"
            loading="eager"
            :class="{ 'image-loading': !imageLoaded }"
            @load="imageLoaded = true"
            @error="imageLoaded = true"
          />
          <span>ClickHospitals</span>
        </NuxtLink>

        <!-- Navbar Toggler -->
        <button
          id="navbarToggler"
          class="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <!-- Hamburger -->
          <Icon v-if="!isMenuOpen" name="mdi:menu" size="28" />

          <!-- Close -->
          <Icon v-else name="mdi:close" size="28" />
        </button>

        <!-- Collapsible Menu -->
        <div id="navbarCollapse" class="navbar-collapse">
          <ul class="navbar-nav mx-auto align-items-center">
            <!-- Destination Dropdown -->
            <li class="nav-item dropdown" v-if="destinations.length">
              <Dropdown>
                <DropdownToggle class="dropdown-toggle d-flex align-items-center nav-link">
                  Destination
                  <Icon name="carbon:chevron-down" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    v-for="destination in destinations.slice(0,3)"
                    :key="destination.id"
                    as="div"
                  >
                    <NuxtLink :to="`/hospitals?country_id=${destination.id}`">
                      {{ destination.country_name || destination.name }}
                    </NuxtLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NuxtLink to="/destinations">See All</NuxtLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>

            <!-- Procedure Dropdown -->
            <li class="nav-item dropdown" v-if="treatments.length">
              <Dropdown>
                <DropdownToggle class="dropdown-toggle d-flex align-items-center nav-link">
                  Procedure
                  <Icon name="carbon:chevron-down" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    v-for="treatment in treatments.slice(0,3)"
                    :key="treatment.id"
                    as="div"
                  >
                    <NuxtLink
                      :to="`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`"
                    >
                      {{ treatment.name }}
                    </NuxtLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NuxtLink to="/procedure">See All</NuxtLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>

            <!-- Links -->
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link" exact-active-class="active">
                About us
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/partner" class="nav-link" exact-active-class="active">
                Become a Partner
              </NuxtLink>
            </li>
          </ul>

          <!-- Support & Contact -->
          <div class="d-flex flex-column flex-lg-row align-items-lg-center mt-3 mt-lg-0 supportandbtn">
            <div class="support-info me-lg-3 text-lg-end mb-2 mb-lg-0">
              <span
                class="d-block p-2 mb-1"
                style="background:#F5F5F5; border-radius:6px;"
              >
                Our 24/7 Support
                <Icon name="carbon:arrow-right" />
              </span>
              <a href="tel:+17344475890" class="text-decoration-none">
                +1(734)-447-5890
              </a>
            </div>
            <NuxtLink class="btn btn-primary" to="/contact">
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useGeneralStore } from '~/stores/general'
import { useRouter } from 'vue-router'

const router = useRouter()

router.afterEach(() => {
  isMenuOpen.value = false
  const collapse = document.getElementById('navbarCollapse')
  if (collapse) collapse.style.display = 'none'
})

const store = useGeneralStore()
const imageLoaded = ref(false)
const isMenuOpen = ref(false)

const treatments = computed(() => store.treatments)
const destinations = computed(() => store.destinations)

// Load nav dropdown data on client after initial render to avoid blocking SSR
onMounted(() => {
  if (store.treatments.length === 0) {
    store.fetchTreatments(false, false).catch((err) => {
      console.error('Failed to load treatments (header):', err)
    })
  }

  if (store.destinations.length === 0) {
    store.fetchDestination(false, false).catch((err) => {
      console.error('Failed to load destinations (header):', err)
    })
  }
})

// Toggle menu
function toggleMenu() {
  const collapse = document.getElementById('navbarCollapse')
  if (!collapse) return

  isMenuOpen.value = !isMenuOpen.value
  collapse.style.display = isMenuOpen.value ? 'block' : 'none'
}

// Mobile default
onMounted(() => {
  const collapse = document.getElementById('navbarCollapse')
  if (collapse && window.innerWidth < 992) {
    collapse.style.display = 'none'
    isMenuOpen.value = false
  }
})

// Debug
if (process.client) {
  watch(destinations, (val) => {
    if (val.length) console.log('Destinations loaded:', val)
  }, { immediate: true })
}
</script>

<style>
.logo {
  height: 40px;
}
.image-loading {
  opacity: 0.5;
}
.dropdown-item a {
  text-decoration: none !important;
  color: #0d2d52;
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
}
.dropdown-item a:hover {
  background-color: #f8f9fa;
}

/* Mobile collapse hidden */
@media (max-width: 991.98px) {
  #navbarCollapse {
    display: none;
  }
}
</style>
