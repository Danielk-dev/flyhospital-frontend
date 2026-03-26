<template>
  <main class="container my-5">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Home', link: '/' },
      { label: 'All Procedure', link: '/procedure' },
      { label: slug, active: true },
    ]" />

    <!-- Hospital Listings -->
    <div class="listings-header mb-4">
      <h2>{{ slug }}</h2>
      <p class="text-muted">
        The ClickHospitals is based on data science algorithms, providing a
        trusted, transparent, and objective comparison. It takes into account
        patient demand, review scores (both positive and negative), the
        frequency of updates to procedure options and prices, response speed,
        and clinic certifications.
      </p>
    </div>

    <!-- Filter Section -->
    <div class="mb-5">
      <div class="row g-3 align-items-center">
        <div class="col-lg-3">
          <USelectMenu v-model="selectedCountry" :items="countryOptions" placeholder="Select a country"
            class="w-full rounded h-12" />
        </div>
      </div>
    </div>

    <!-- Hospital List -->
    <div class="hospital-list position-relative">
      <!-- Loading Overlay -->
      <div v-if="pending" class="loading-overlay d-flex justify-content-center align-items-center"
        :class="{ 'overlay-background': Hotelstore.hospitals.length > 0 }">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="fetchError || Hotelstore.error" class="text-center text-danger py-5">
        {{ fetchError?.message || Hotelstore.error }}
      </div>
      <div v-else-if="!pending && filteredHospitals.length === 0" class="text-center text-muted py-5">
        No hospitals found for this treatment.
      </div>
      <div v-else>
        <HospitalListCard v-for="hospital in filteredHospitals" :key="hospital.id" :hospital="hospital" />
      </div>
    </div>

    <!-- Load More Section -->
    <div class="text-center mt-5">
      <button v-if="filteredHospitals.length < Hotelstore.totalHospitals" class="btn btn-primary mt-3 details-btn"
        style="max-width: 321px; width: 100%" @click="loadMore" :disabled="Hotelstore.isLoading">
        {{ Hotelstore.isLoading ? "Loading..." : "Load More" }}
      </button>
    </div>

    <!-- Blogs Section -->
    <BlogList />
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useHospitalStore } from "~/stores/hospital";
import { useFilterHospitalStore } from "~/stores/filterhospital";


// Route and stores
const route = useRoute();
const slug = computed(() => String(route.params.slug || ""));
const store = useHospitalStore();
const Hotelstore = useFilterHospitalStore();

// Decode slug to get treatment name
const treatmentName = computed(() => {
  try {
    return decodeURIComponent(slug.value);
  } catch {
    return slug.value;
  }
});

// Filter hospitals locally for the selected country (server already filters by treatment/category)
const filteredHospitals = computed(() => {
  let hospitals = Hotelstore.hospitals;

  // Local country filter
  if (selectedCountry.value?.value) {
    const countryId = String(selectedCountry.value.value);
    hospitals = hospitals.filter((hospital) => String(hospital.country_id) === countryId);
  }

  return hospitals;
});

// Country options
const countryOptions = computed(() =>
  store.countries.map((country) => ({
    label: country.country_name,
    value: country.id,
    slug: country.slug,
  }))
);

// Selected country
const selectedCountry = ref<{ label: string; value: string | number; slug?: string } | undefined>(
  undefined
);

// Fetch countries and initialize selectedCountry
await useAsyncData("countries", async () => {
  await store.loadCountries();
  // Preselect country if countryslug is in query
  const countryslug = route.query.countryslug as string;
  if (countryslug) {
    const country = store.countries.find(
      (c) => c.slug === countryslug || c.id === countryslug
    );
    if (country) {
      selectedCountry.value = {
        label: country.country_name,
        value: country.id,
        slug: country.slug,
      };
      store.country_id = country.id;
    }
  }
});

// Fetch hospitals with useAsyncData for SSR and hydration support
const { data: fetchResult, pending, error: fetchError } = await useAsyncData(
  `hospitals-${slug.value}-${route.query.category_id || 'none'}-${route.query.treatment_id || 'none'}-${selectedCountry.value?.slug || 'all'}`,
  async () => {
    const countryslug = selectedCountry.value?.slug || route.query.countryslug || "";
    const category_id = route.query.category_id as string;
    const treatment_id = route.query.treatment_id as string;
    
    // Determine if we should clear current results (only if the procedure changes)
    // For country filter changes, we keep existing results while loading
    const isNewProcedure = true; // For now, let's always clear when slug/IDs change
    
    return await Hotelstore.fetchHospitals(
      countryslug as string, 
      slug.value, 
      category_id, 
      treatment_id, 
      isNewProcedure, 
      false
    );
  },
  {
    // Watch for ANY parameter change (slug, IDs, or country filter)
    watch: [
      slug, 
      () => route.query.category_id, 
      () => route.query.treatment_id, 
      selectedCountry
    ],
    lazy: false,
    server: true
  }
);

// Sync to store on client-side (to handle hydration and route changes)
watch(fetchResult, (newResult) => {
  if (newResult && newResult.success) {
    Hotelstore.hospitals = newResult.data || [];
    Hotelstore.totalHospitals = newResult.total_hospitals || 0;
  }
}, { immediate: true });

// Reset store on unmount
onUnmounted(() => {
  Hotelstore.reset();
});

// Load more hospitals (pagination)
const loadMore = async () => {
  const countryslug =
    selectedCountry.value?.slug || route.query.countryslug || "";
  
  // Don't clear, but append the new results
  await Hotelstore.fetchHospitals(
    countryslug as string, 
    slug.value,
    route.query.category_id as string,
    route.query.treatment_id as string,
    false,
    true
  );
};
</script>

<style scoped>
.hospital-list {
  min-height: 200px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  padding: 50px 0;
}

.overlay-background {
  background: rgba(255, 255, 255, 0.6);
}

.details-btn {
  border-radius: 8px;
  height: 48px;
  font-weight: 600;
}
</style>
