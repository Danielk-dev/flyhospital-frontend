<template>
  <section class="hero-section">
    <div class="hero-layout">
      <div class="hero-text">
        <h1>
          Find the Right Hospital Anywhere <span>in World.</span>
        </h1>
        <p>
          ClickHospitals helps you explore and connect with internationally accredited hospitals,
          based on your procedure needs, budget, and destination.
        </p>

        <!-- Search -->
        <div class="search-container">
          <h3>Search hospitals by name</h3>
          <div class="search-bar">
            <input type="text" v-model="store.search" placeholder="Search hospitals by name..." />
            <a href="#" @click.prevent="submitSearch" style="text-decoration: none !important;">Search</a>
          </div>

          <!-- Active Filters Chips -->
          <div class="active-filters" v-if="hasActiveFilters">
            <!-- Treatment -->
            <div class="filter-chip" v-if="store.treatment_id">
              {{ getTreatmentName(store.treatment_id) }}
              <button class="chip-close" @click="clearTreatment">×</button>
            </div>

            <!-- Category -->
            <div class="filter-chip" v-if="store.category_id">
              {{ getCategoryName(store.category_id) }}
              <button class="chip-close" @click="clearCategory">×</button>
            </div>

            <!-- Destination -->
            <div class="filter-chip" v-if="store.country_id || store.city_id">
              {{ getDestinationName(store.country_id, store.city_id) }}
              <button class="chip-close" @click="clearDestination">×</button>
            </div>
          </div>

          <!-- Filter buttons -->
          <div class="filters">
            <button class="filter-btn" @click="showTreatmentModal = true">
              <Icon name="streamline-pixel:interface-essential-setting-slide" /> Search by Procedure
            </button>
            <button class="filter-btn" @click="showDestinationModal = true">
              <Icon name="uiw:map" /> Search by Destination
            </button>
          </div>
        </div>
      </div>

      <div class="hero-image">
        <img src="~/assets/img/banner.jpg" alt="Patients at a hospital reception" class="rounded-left-bottom"
          loading="lazy" :class="{ 'image-loading': !imageLoaded }" @load="imageLoaded = true"
          @error="imageLoaded = true" />
      </div>
    </div>
  </section>

  <!-- ================= Treatment Modal ================= -->
  <div v-if="showTreatmentModal" class="modal-backdrop">
    <div class="modal-dialog modal-dialog-centered card herocard">
      <div class="modal-content card-body">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title">Search by Procedure</h5>
          <button type="button" class="btn-close" @click="showTreatmentModal = false"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row g-2 align-items-center mb-3">
            <div>
              <label>Procedure</label>
              <br>
              <select class="form-control" v-model="selectedCategoryId">
                <option value="">Select procedure</option>
                <option v-for="cat in categoryOptions" :key="cat.value" :value="cat.value">
                  {{ cat.label }}
                </option>
              </select>
            </div>
            <div v-if="selectedCategoryId && selectedCategoryId !== ''">
              <label>Procedure Type</label>
              <select class="form-control" v-model="selectedTreatmentId">
                <option value="">Select procedure type</option>
                <option v-for="tr in treatmentOptions" :key="tr.value" :value="String(tr.value)">
                  {{ tr.label }}
                </option>
              </select>
            </div>
          </div>
          <button type="button" class="btn btn-primary w-100" @click="applyTreatmentFilter">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= Destination Modal ================= -->
  <div v-if="showDestinationModal" class="modal-backdrop">
    <div class="modal-dialog modal-dialog-centered card herocard">
      <div class="modal-content card-body">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title mb-1">Search by Destination</h5>
          <button type="button" class="btn-close" @click="showDestinationModal = false"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row g-2 align-items-center mb-3">
            <div>
              <label>Country</label>
              <select class="form-control" v-model="selectedCountryId">
                <option value="">Select country</option>
                <option v-for="c in countryOptions" :key="c.value" :value="String(c.value)">
                  {{ c.label }}
                </option>
              </select>
            </div>
            <div v-if="selectedCountryId && selectedCountryId !== ''">
              <label>City</label>
              <select class="form-control" v-model="selectedCityId">
                <option value="">Select city</option>
                <option v-for="city in cityOptions" :key="city.value" :value="String(city.value)">
                  {{ city.label }}
                </option>
              </select>
            </div>
          </div>
          <button type="button" class="btn btn-primary w-100" @click="applyDestinationFilter">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useHospitalStore } from "~/stores/hospital";

const router = useRouter();
const store = useHospitalStore();

const showTreatmentModal = ref(false);
const showDestinationModal = ref(false);
const imageLoaded = ref(false);

// Treatment state (use only ID instead of object)
const selectedCategoryId = ref<string | number | "">("");
const selectedTreatmentId = ref<string | number | "">("");

// Destination state (use only ID instead of object)
const selectedCountryId = ref<string | number | "">("");
const selectedCityId = ref<string | number | "">("");

// ===== Country & City Options =====
// ✅ Load in background (non-blocking) - only if data doesn't exist
onMounted(() => {
  if (store.countries.length === 0) {
    store.loadCountries().catch(err => {
      console.error('Failed to load countries:', err);
    });
  }
  if (store.procedure.length === 0) {
    store.loadprocedure().catch(err => {
      console.error('Failed to load procedures:', err);
    });
  }
});

const countryOptions = computed(() =>
  store.countries.map((country) => ({ label: country.country_name, value: country.id }))
);

const cityOptions = computed(() =>
  store.cities.map((city) => ({ label: city.name, value: city.id }))
);

// ===== Category & Treatment Options =====
const categoryOptions = computed(() =>
  store.procedure.map((cat) => ({ label: cat.name, value: cat.id }))
);
const treatmentOptions = computed(() =>
  store.subprocedure.map((t) => ({ label: t.name, value: t.id }))
);

// ===== Watchers =====

// Country → Load Cities
watch(selectedCountryId, async (newVal) => {
  store.country_id = newVal || "";
  store.city_id = "";
  selectedCityId.value = "";
  if (newVal) await store.loadCities(newVal);
});

// City
watch(selectedCityId, (newVal) => {
  store.city_id = newVal || "";
});

// Category → Load Treatments
watch(selectedCategoryId, async (newVal) => {
  store.category_id = newVal || "";
  store.treatment_id = "";
  selectedTreatmentId.value = "";
  if (newVal) await store.loadSubprocedure(newVal);
});

// Treatment
watch(selectedTreatmentId, (newVal) => {
  store.treatment_id = newVal || "";
});

// ===== Apply Filters =====
const applyTreatmentFilter = () => {
  showTreatmentModal.value = false;

  // Get the selected values
  const treatmentIdValue = selectedTreatmentId.value;
  const categoryIdValue = selectedCategoryId.value;

  console.log('treatmentIdValue:', treatmentIdValue, 'categoryIdValue:', categoryIdValue);
  console.log('treatmentOptions:', treatmentOptions.value);

  // Check if a treatment is selected (not empty string, null, or undefined)
  if (treatmentIdValue !== '' && treatmentIdValue != null) {
    // Find the treatment name from options
    // Compare by converting both to strings since HTML select returns strings
    const treatment = treatmentOptions.value.find(t => {
      // Convert both to strings for comparison
      const match = String(t.value) === String(treatmentIdValue);
      console.log(`Comparing: ${String(t.value)} === ${String(treatmentIdValue)} = ${match}`);
      return match;
    });

    console.log('Found treatment:', treatment);

    if (treatment) {
      const treatmentName = treatment.label;

      // Create slug from treatment name (URL-encoded)
      const slug = encodeURIComponent(treatmentName);

      console.log('Navigating to:', `/all-procedure/${slug}`, 'with name:', treatmentName);

      // Navigate to all-procedure page with slug
      router.push({
        path: `/all-procedure/${slug}`
      });
    } else {
      console.log('Treatment not found in options');
    }
  } else if (categoryIdValue !== '' && categoryIdValue != null) {
    // If only category is selected, use category_id to navigate to subprocedure page
    console.log('Only category selected, using category_id:', categoryIdValue);

    // Find the category name from options
    const category = categoryOptions.value.find(c => {
      return String(c.value) === String(categoryIdValue);
    });

    if (category) {
      const categoryName = category.label;
      const categoryId = String(category.value);

      console.log('Navigating to:', `/subprocedure/${categoryId}?name=${encodeURIComponent(categoryName)}`);

      // Navigate to subprocedure page with category ID and name
      router.push({
        path: `/subprocedure/${categoryId}`,
        query: { name: categoryName }
      });
    } else {
      console.log('Category not found in options');
    }
  } else {
    console.log('No category or treatment selected');
  }
};

const applyDestinationFilter = () => {
  showDestinationModal.value = false;

  // Build query object with selected filters
  const query: Record<string, string> = {};

  if (selectedCountryId.value && selectedCountryId.value !== '') {
    query.country_id = String(selectedCountryId.value);
  }

  if (selectedCityId.value && selectedCityId.value !== '') {
    query.city_id = String(selectedCityId.value);
  }

  // Navigate to hospitals page with filters
  router.push({
    path: '/hospitals',
    query
  });
};

const clearTreatment = () => {
  store.treatment_id = null;
  selectedTreatmentId.value = "";
};
const clearCategory = () => {
  store.category_id = null;
  selectedCategoryId.value = "";
  selectedTreatmentId.value = "";
};
const clearDestination = () => {
  store.country_id = null;
  store.city_id = null;
  selectedCountryId.value = "";
  selectedCityId.value = "";
};

// ===== Helpers =====
const getTreatmentName = (id: string | null) => {
  const tr = treatmentOptions.value.find((t) => t.value == id);
  return tr ? tr.label : "Treatment";
};
const getCategoryName = (id: string | null) => {
  const cat = categoryOptions.value.find((c) => c.value == id);
  return cat ? cat.label : "Category";
};
const getDestinationName = (country: string | null, city: string | null) => {
  const c = countryOptions.value.find((cc) => cc.value == country);
  const ct = cityOptions.value.find((ci) => ci.value == city);
  if (c && ct) return `${ct.label}, ${c.label}`;
  if (c) return c.label;
  return "Destination";
};

const hasActiveFilters = computed(() => {
  return store.category_id || store.treatment_id || store.country_id || store.city_id;
});

// ===== Submit Search =====
const submitSearch = () => {
  const query: Record<string, any> = {};
  // Only search by name when clicking the search button
  if (store.search) query.search = store.search;

  router.push({ path: "/hospitals", query });
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.filter-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #f0f4f8;
  border-radius: 6px;
  font-size: 14px;
}

.chip-close {
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
}

.herocard {
  width: 40% !important;
}
</style>
