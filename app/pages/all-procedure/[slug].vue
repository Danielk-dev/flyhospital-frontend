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
    <div class="hospital-list">
      <div v-if="Hotelstore.isLoading" class="text-center py-5">
        Loading hospitals...
      </div>
      <div v-else-if="Hotelstore.error" class="text-center text-danger py-5">
        {{ Hotelstore.error }}
      </div>
      <div v-else-if="filteredHospitals.length === 0" class="text-center text-muted py-5">
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

// Filter hospitals to only show those with the selected treatment
const filteredHospitals = computed(() => {
  let hospitals = Hotelstore.hospitals;

  if (treatmentName.value && hospitals.length) {
    const searchName = treatmentName.value.toLowerCase().trim();
    hospitals = hospitals.filter((hospital) => {
      // Check if hospital has treatments array
      if (!hospital.treatments || !Array.isArray(hospital.treatments)) {
        return false;
      }

      // Check if any treatment matches the slug (treatment name)
      return hospital.treatments.some((treatment) => {
        // Check treatment name (case-insensitive)
        if (treatment.name && treatment.name.toLowerCase().trim() === searchName) {
          return true;
        }

        // Also check children treatments recursively
        if (treatment.children && Array.isArray(treatment.children)) {
          return treatment.children.some((child) =>
            child.name && child.name.toLowerCase().trim() === searchName
          );
        }

        return false;
      });
    });
  }

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

// Fetch hospitals
const fetchHospitals = async () => {
  const countryslug =
    selectedCountry.value?.slug || route.query.countryslug || "";
  await Hotelstore.fetchHospitals(countryslug as string, slug.value);
};

// Initial fetch
await fetchHospitals();

// Watch for country changes
watch(selectedCountry, async (newVal) => {
  if (newVal?.value) {
    await store.loadCities(newVal.value);
  }
});

// Watch for slug changes (if user navigates to a different procedure)
watch(slug, async () => {
  await fetchHospitals();
});

// Reset store on unmount
onUnmounted(() => {
  Hotelstore.reset();
});

// Load more hospitals (pagination)
const loadMore = async () => {
  // Assuming API supports pagination with a page parameter
  const nextPage = Math.ceil(Hotelstore.hospitals.length / 10) + 1; // Adjust based on API pagination
  const countryslug =
    selectedCountry.value?.slug || route.query.countryslug || "";
  await Hotelstore.fetchHospitals(countryslug as string, slug.value);
};
</script>
