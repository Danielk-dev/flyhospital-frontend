<template>
  <main class="container my-5">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Home', link: '/' },
      { label: 'Hospitals', active: true }
    ]" />

    <!-- Filter Section -->
    <div class="filter-section mb-5">
      <div class="row g-3 align-items-center">
        <!-- Search -->
        <div class="col-lg-4">
          <div class="input-group">
            <span class="input-group-text bg-white">
              <Icon name="bi:search" class="text-[#053862] w-5 h-5" />
            </span>
            <input type="text" class="form-control" v-model="store.search" placeholder="Enter Hospital Name" />
          </div>
        </div>

        <!-- Country -->
        <div class="col-lg-3">
          <USelectMenu 
            :model-value="selectedCountry as any"
            @update:model-value="(val) => selectedCountry = val as any"
            :items="countryOptions" 
            placeholder="Select a country"
            class="w-full rounded h-12 select-menu-white" />
        </div>

        <!-- City -->
        <div class="col-lg-3">
          <USelectMenu 
            :model-value="selectedCity as any"
            @update:model-value="(val) => selectedCity = val as any"
            :items="cityOptions" 
            placeholder="Select city"
            class="w-full rounded h-12 select-menu-white" />
        </div>

        <!-- Search button -->
        <div class="col-lg-2">
          <button @click="applyFilters" class="search-btn-icon">
            <Icon name="bi:search" class="text-[#ffffff] w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>

    <!-- Hospital Listings -->
    <div class="listings-header mb-4">
      <h2>
        <span>{{ store.totalHospitals }} Verified</span> Hospitals in {{ locationText }}
      </h2>
      <p class="text-muted">
        ClickHospitals uses data science algorithms to deliver a trusted, transparent, and objective comparison.
      </p>
    </div>

    <div class="hospital-list">
      <!-- Show loader on first load OR when filters are changing -->
      <div v-if="(pending && isFirstLoad && store.hospitals.length === 0) || (isFilterChanging)" class="text-center py-5" style="position: relative; min-height: 200px;">
        <Loader />
      </div>
      <div v-else>
        <template v-if="store.hospitals.length > 0">
          <HospitalListCard v-for="hospital in store.hospitals" :key="hospital.id" :hospital="hospital" />
          
          <!-- Show loading indicator at bottom during pagination (not filter changes) -->
          <div v-if="store.loader && !isFilterChanging" class="text-center py-4" style="position: relative; min-height: 100px;">
            <Loader />
          </div>
        </template>
        <div v-else-if="!pending && !store.loader && !isFilterChanging" class="text-center text-muted py-5">
          No hospitals found.
        </div>
      </div>
    </div>

    <!-- Load More/Less Section -->
    <div class="text-center mt-5" v-if="store.hospitals.length > 0">
      <p class="text-muted mb-3">
        Showing {{ store.hospitals.length }} of {{ store.totalHospitals }} hospitals
      </p>

      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <!-- Load Less button (show if more than initial load) -->
        <button 
          v-if="store.currentPage > 1"
          @click="store.loadLess()" 
          :disabled="store.loader"
          class="btn btn-primary details-btn"
          style="min-width: 150px;">
          {{ store.loader ? 'Loading...' : 'Load Less' }}
        </button>

        <!-- Load More button (show if more pages available) -->
        <button 
          v-if="store.currentPage < store.lastPage"
          @click="store.loadMore()" 
          :disabled="store.loader"
          class="btn btn-primary details-btn"
          style="min-width: 200px;">
          {{ store.loader ? 'Loading...' : 'Load More Hospitals' }}
        </button>
      </div>

      <!-- Show message when all loaded -->
      <p v-if="store.currentPage >= store.lastPage" class="text-muted mt-3 mb-0">
        All hospitals loaded
      </p>
    </div>

    <!-- Blogs - Lazy loaded for better performance -->
    <LazyBlogList />
  </main>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useHospitalListStore } from '~/stores/hospitallist'
import { useRoute, useRouter } from '#imports'
import Loader from '~/components/Loader.vue'

const store = useHospitalListStore()
const route = useRoute()
const router = useRouter()

// ✅ Initialize filters from query params or defaults
store.country_id = route.query.country_id ? String(route.query.country_id) : ''
store.city_id = route.query.city_id ? String(route.query.city_id) : ''
store.search = route.query.search ? String(route.query.search) : ''
store.category_id = route.query.category_id ? String(route.query.category_id) : ''

// ✅ Optimized: Check cache first, then load in parallel
const needsCountries = store.countries.length === 0

// ✅ Load countries on client-side only (non-blocking, not critical for SEO)
// Use process.client for Nuxt 3 compatibility
if (process.client && needsCountries) {
  store.loadCountries().catch(() => {}) // Fire and forget
}

// ✅ Track if this is the very first load (not filter changes)
const isFirstLoad = ref(true)
const isFilterChanging = ref(false)

// ✅ SSR-friendly: Load hospitals with lazy option (doesn't block initial render)
// Use unique key based on filters for proper caching
const dataKey = `hospitals-${store.country_id || 'all'}-${store.city_id || 'all'}-${store.search || 'all'}-${store.category_id || 'all'}`
const { pending } = await useAsyncData(dataKey, async () => {
  // Don't show loader for initial load (we use pending state instead)
  await store.list(1, false)
  
  // Mark that we've completed the first load
  if (isFirstLoad.value) {
    isFirstLoad.value = false
  }
  
  // Reset filter changing flag after load completes
  isFilterChanging.value = false
  
  // Load cities asynchronously (non-blocking) - don't await
  if (store.country_id) {
    store.loadCities(store.country_id).catch(() => {
      // Silently fail - cities are optional
    })
  }
}, {
  lazy: true, // Don't block initial render - page shows immediately
  default: () => null, // Provide default to prevent blocking
  server: true // Still fetch on server for SEO
})

// ✅ Options with default "Select ... "
const countryOptions = computed(() => [
  { label: 'Select Country', value: '' },
  ...store.countries.map(c => ({ label: c.country_name, value: String(c.id) }))
])

const cityOptions = computed(() => [
  { label: 'Select City', value: '' },
  ...store.cities.map(city => ({ label: city.name, value: String(city.id) }))
])

// ✅ Select models - computed properties that sync with store
const selectedCountry = computed<{ label: string; value: string } | null>({
  get: () => {
    const found = countryOptions.value.find(c => c.value === store.country_id)
    return found ?? null
  },
  set: (val: { label: string; value: string } | null | undefined) => {
    store.country_id = val?.value ?? ''
  }
})

const selectedCity = computed<{ label: string; value: string } | null>({
  get: () => {
    const found = cityOptions.value.find(c => c.value === store.city_id)
    return found ?? null
  },
  set: (val: { label: string; value: string } | null | undefined) => {
    store.city_id = val?.value ?? ''
  }
})

// ✅ Dynamic location text based on selected filters
const locationText = computed(() => {
  if (selectedCountry.value && selectedCountry.value.value) {
    return selectedCountry.value.label
  }
  if (selectedCity.value && selectedCity.value.value) {
    return selectedCity.value.label
  }
  return 'the World'
})

// ✅ Apply filters -> sync with URL and reload hospitals
const applyFilters = async () => {
  isFilterChanging.value = true
  const query: Record<string, string> = {}
  if (store.country_id) query.country_id = store.country_id
  if (store.city_id) query.city_id = store.city_id
  if (store.search) query.search = store.search
  if (store.category_id) query.category_id = store.category_id

  await router.push({ path: '/hospitals', query })
  await store.list(1)
  isFilterChanging.value = false
}

// ✅ Watch for filter changes (search, country, city, category) to show loader
watch([() => store.search, () => store.country_id, () => store.city_id, () => store.category_id], ([newSearch, newCountry, newCity, newCategory], [oldSearch, oldCountry, oldCity, oldCategory]) => {
  // Only trigger if filters actually changed (not initial setup)
  if (isFirstLoad.value) return
  
  const searchChanged = newSearch !== oldSearch
  const countryChanged = newCountry !== oldCountry
  const cityChanged = newCity !== oldCity
  const categoryChanged = newCategory !== oldCategory
  
  if (searchChanged || countryChanged || cityChanged || categoryChanged) {
    isFilterChanging.value = true
    // Reload hospitals when filters change
    store.list(1).finally(() => {
      isFilterChanging.value = false
    })
  }
})

// ✅ Watch route query params and sync with store (for navigation from other pages)
watch(() => route.query, (newQuery) => {
  // Skip on initial load (handled by initialization above)
  if (isFirstLoad.value) return
  
  const newCountryId = newQuery.country_id ? String(newQuery.country_id) : ''
  const newCityId = newQuery.city_id ? String(newQuery.city_id) : ''
  const newSearch = newQuery.search ? String(newQuery.search) : ''
  const newCategoryId = newQuery.category_id ? String(newQuery.category_id) : ''
  
  // Check if any values actually changed
  const countryChanged = newCountryId !== store.country_id
  const cityChanged = newCityId !== store.city_id
  const searchChanged = newSearch !== store.search
  const categoryChanged = newCategoryId !== store.category_id
  
  // Only update and reload if something changed
  if (countryChanged || cityChanged || searchChanged || categoryChanged) {
    isFilterChanging.value = true
    
    // Update store values
    if (countryChanged) store.country_id = newCountryId
    if (cityChanged) store.city_id = newCityId
    if (searchChanged) store.search = newSearch
    if (categoryChanged) store.category_id = newCategoryId
    
    // Reload hospitals with new filters
    store.list(1).finally(() => {
      isFilterChanging.value = false
    })
  }
}, { deep: true, immediate: false })

// ✅ Watch country changes for loading cities
watch(() => store.country_id, (newCountryId, oldCountryId) => {
  // Reset city when country changes
  if (newCountryId !== oldCountryId) {
    store.city_id = ''
    selectedCity.value = null
  }
  
  // Load cities for new country (non-blocking)
  if (newCountryId) {
    store.loadCities(newCountryId).catch(err => {
      console.error('Failed to load cities:', err)
    })
  } else {
    store.cities = []
  }
})
</script>

<style scoped>
/* Make USelectMenu background white with black text */
:deep(.select-menu-white) {
  background-color: white !important;
  color: #000000 !important;
}

:deep(.select-menu-white button),
:deep(.select-menu-white [role="button"]) {
  background-color: white !important;
  color: #000000 !important;
}

:deep(.select-menu-white input) {
  background-color: white !important;
  color: #000000 !important;
}

:deep(.select-menu-white span),
:deep(.select-menu-white div) {
  color: #000000 !important;
}

:deep(.select-menu-white .text-gray-500),
:deep(.select-menu-white .text-gray-400) {
  color: #000000 !important;
}

/* Dropdown menu (options list) - White background with black text */
:deep(.select-menu-white [role="listbox"]),
:deep(.select-menu-white [role="menu"]),
:deep(.select-menu-white ul),
:deep(.select-menu-white [data-headlessui-state]),
:deep(.select-menu-white [data-popper-placement]),
:deep(.select-menu-white [data-radix-popper-content-wrapper]) {
  background-color: #ffffff !important;
  color: #000000 !important;
}

:deep(.select-menu-white [role="option"]),
:deep(.select-menu-white li),
:deep(.select-menu-white [data-headlessui-state] > *),
:deep(.select-menu-white [data-headlessui-state] button),
:deep(.select-menu-white [role="option"] span),
:deep(.select-menu-white [role="option"] div) {
  background-color: #ffffff !important;
  color: #000000 !important;
}

:deep(.select-menu-white [role="option"]:hover),
:deep(.select-menu-white li:hover),
:deep(.select-menu-white [data-headlessui-state] > *:hover),
:deep(.select-menu-white [role="option"][aria-selected="true"]) {
  background-color: #f5f5f5 !important;
  color: #000000 !important;
}

/* Target any dropdown container that appears outside the component */
:deep([data-headlessui-portal]),
:deep([data-radix-portal]) {
  background-color: #ffffff !important;
}

:deep([data-headlessui-portal] [role="option"]),
:deep([data-headlessui-portal] li),
:deep([data-headlessui-portal] button),
:deep([data-radix-portal] [role="option"]),
:deep([data-radix-portal] li) {
  background-color: #ffffff !important;
  color: #000000 !important;
}

:deep([data-headlessui-portal] [role="option"]:hover),
:deep([data-headlessui-portal] li:hover),
:deep([data-radix-portal] [role="option"]:hover) {
  background-color: #f5f5f5 !important;
  color: #000000 !important;
}
</style>
