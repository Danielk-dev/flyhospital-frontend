<template>
  <section class="hero-section">
    <div class="hero-layout">
      <div class="hero-text">
        <h1>Find the Right Hospital Anywhere <span>in World.</span></h1>
        <p>
          ClickHospitals helps you explore and connect with internationally
          accredited hospitals, based on your procedure needs, budget, and
          destination.
        </p>

        <!-- Search -->
        <div class="search-container">
          <div class="container">
            <h3>Search hospitals by name</h3>
            <div class="text-primary float-end d-flex align-items-center gap-1 cursor-pointer" @click="showAdvancedModal = true">
              Advance Search
              <Icon v-if="hasActiveFilters" name="material-symbols:check-circle" class="text-primary" />
            </div>
            <br />
            <br />
          </div>
          <div class="search-bar">
            <input
              type="text"
              v-model="store.search"
              placeholder="Search hospitals by name..."
            />
            <a
              href="#"
              @click.prevent="submitSearch"
              style="text-decoration: none !important"
              >Search</a
            >
          </div>

          <!-- Active Filters Chips -->
          <div class="active-filters" v-if="hasActiveFilters">
            <!-- Treatment/Category -->
            <div class="filter-chip" v-if="store.treatment_id">
              <Icon name="material-symbols:check-circle" class="text-primary me-1" />
              {{ getTreatmentName(store.treatment_id) }}
              <button class="chip-close" @click="clearTreatment">×</button>
            </div>
            <div class="filter-chip" v-else-if="store.category_id">
              <Icon name="material-symbols:check-circle" class="text-primary me-1" />
              {{ getCategoryName(store.category_id) }}
              <button class="chip-close" @click="clearCategory">×</button>
            </div>

            <!-- Destination -->
            <div class="filter-chip" v-if="store.country_id || store.city_id">
              <Icon name="material-symbols:check-circle" class="text-primary me-1" />
              {{ getDestinationName(store.country_id, store.city_id) }}
              <button class="chip-close" @click="clearDestination">×</button>
            </div>
          </div>

          <!-- Filter buttons (Disabled as per user request) -->
          <!-- <div class="filters">
            <button class="filter-btn" @click="showTreatmentModal = true">
              <Icon name="streamline-pixel:interface-essential-setting-slide" />
              Search by Procedure
            </button>
            <button class="filter-btn" @click="showDestinationModal = true">
              <Icon name="uiw:map" /> Search by Destination
            </button>
          </div> -->
        </div>
      </div>

      <div class="hero-image">
        <img
          src="~/assets/img/banner.jpg"
          alt="Patients at a hospital reception"
          class="rounded-left-bottom"
          loading="lazy"
          :class="{ 'image-loading': !imageLoaded }"
          @load="imageLoaded = true"
          @error="imageLoaded = true"
        />
      </div>
    </div>
  </section>

  <!-- ================= Advanced Search Modal ================= -->
  <div v-if="showAdvancedModal" class="modal-backdrop">
    <div class="modal-dialog modal-dialog-centered card herocard shadow-lg" style="max-width: 600px; width: 90%;">
      <div class="modal-content card-body">
        <div class="modal-header border-0 pb-3">
          <h5 class="modal-title fw-bold">Advanced Search</h5>
          <button
            type="button"
            class="btn-close"
            @click="showAdvancedModal = false"
          ></button>
        </div>
        <div class="modal-body pt-0">
          <div class="row g-4">
            <!-- Procedure Section -->
            <div class="col-md-6 border-end">
              <h6 class="fw-bold mb-3 d-flex align-items-center justify-content-between">
                <span class="d-flex align-items-center gap-2">
                  <Icon name="streamline-pixel:interface-essential-setting-slide" class="text-primary" />
                  Procedure
                </span>
                <Icon v-if="selectedCategoryId || selectedTreatmentId" name="material-symbols:check-circle" class="text-primary" />
              </h6>
              <div class="mb-3">
                <label class="form-label small text-muted">Category</label>
                <select class="form-select" v-model="selectedCategoryId">
                  <option value="">Select category</option>
                  <option
                    v-for="cat in categoryOptions"
                    :key="cat.value"
                    :value="cat.value"
                  >
                    {{ cat.label }}
                  </option>
                </select>
              </div>
              <div v-if="selectedCategoryId && selectedCategoryId !== ''">
                <label class="form-label small text-muted">Procedure Type</label>
                <select class="form-select" v-model="selectedTreatmentId">
                  <option value="">Select procedure type</option>
                  <option
                    v-for="tr in treatmentOptions"
                    :key="tr.value"
                    :value="String(tr.value)"
                  >
                    {{ tr.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Destination Section -->
            <div class="col-md-6">
              <h6 class="fw-bold mb-3 d-flex align-items-center justify-content-between">
                <span class="d-flex align-items-center gap-2">
                  <Icon name="uiw:map" class="text-primary" />
                  Destination
                </span>
                <Icon v-if="selectedCountryId || selectedCityId" name="material-symbols:check-circle" class="text-primary" />
              </h6>
              <div class="mb-3">
                <label class="form-label small text-muted">Country</label>
                <select class="form-select" v-model="selectedCountryId">
                  <option value="">Select country</option>
                  <option
                    v-for="c in countryOptions"
                    :key="c.value"
                    :value="String(c.value)"
                  >
                    {{ c.label }}
                  </option>
                </select>
              </div>
              <div v-if="selectedCountryId && selectedCountryId !== ''">
                <label class="form-label small text-muted">City</label>
                <select class="form-select" v-model="selectedCityId">
                  <option value="">Select city</option>
                  <option
                    v-for="city in cityOptions"
                    :key="city.value"
                    :value="String(city.value)"
                  >
                    {{ city.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-top d-flex gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary w-50"
              @click="clearAllFilters"
            >
              Reset
            </button>
            <button
              type="button"
              class="btn btn-primary w-50"
              @click="applyAdvancedFilter"
            >
              Search Now
            </button>
          </div>
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

const showAdvancedModal = ref(false);
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
    store.loadCountries().catch((err) => {
      console.error("Failed to load countries:", err);
    });
  }
  if (store.procedure.length === 0) {
    store.loadprocedure().catch((err) => {
      console.error("Failed to load procedures:", err);
    });
  }
});

const countryOptions = computed(() =>
  store.countries.map((country) => ({
    label: country.country_name,
    value: country.id,
  })),
);

const cityOptions = computed(() =>
  store.cities.map((city) => ({ label: city.name, value: city.id })),
);

// ===== Category & Treatment Options =====
const categoryOptions = computed(() =>
  store.procedure.map((cat) => ({ label: cat.name, value: cat.id })),
);
const treatmentOptions = computed(() =>
  store.subprocedure.map((t) => ({ label: t.name, value: t.id })),
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
const applyAdvancedFilter = () => {
  showAdvancedModal.value = false;
  submitSearch();
};

const clearAllFilters = () => {
  store.search = "";
  store.category_id = null;
  store.treatment_id = null;
  store.country_id = null;
  store.city_id = null;
  selectedCategoryId.value = "";
  selectedTreatmentId.value = "";
  selectedCountryId.value = "";
  selectedCityId.value = "";
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
  return (
    store.category_id || store.treatment_id || store.country_id || store.city_id
  );
});

// ===== Submit Search =====
const submitSearch = () => {
  const query: Record<string, any> = {};

  // Merge search name
  if (store.search) query.search = store.search;

  // Merge advanced filters from store
  if (store.country_id) query.country_id = String(store.country_id);
  if (store.city_id) query.city_id = String(store.city_id);
  if (store.category_id) query.category_id = String(store.category_id);
  if (store.treatment_id) query.treatment_id = String(store.treatment_id);

  // If ONLY category or treatment is selected (no search, no destination),
  // we can still use the special routes if preferred, but for combined search,
  // /hospitals is the correct destination.
  // To satisfy the "it's not working correctly" feedback,
  // we ensure everything is sent to /hospitals.

  router.push({ path: "/hospitals", query });
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

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
