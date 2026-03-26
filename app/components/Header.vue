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
        <div id="navbarCollapse" class="navbar-collapse" :class="{ show: isMenuOpen }">
          <ul class="navbar-nav mx-auto align-items-center">
            <!-- Destination Dropdown -->
            <li class="nav-item dropdown" v-if="countries.length">
              <div class="dropdown-wrapper">
                <button
                  class="dropdown-toggle d-flex align-items-center nav-link w-100 border-0 bg-transparent"
                  @click="toggleDropdown('destination')"
                >
                  Destination
                  <Icon :name="activeDropdown === 'destination' ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
                </button>
                <div v-if="activeDropdown === 'destination'" class="main-dropdown shadow-sm border rounded">
                  <div class="dropdown-grid">
                    <!-- Countries Column -->
                    <div class="countries-column">
                      <div class="dropdown-header">
                        <h3>Locations</h3>
                      </div>

                      <div class="countries-list">
                        <div
                          v-for="country in countries.slice(0, 5)"
                          :key="country.id"
                          class="country-item-wrapper"
                          @mouseenter="!isMobile && handleCountryHover(country.id)"
                          @mouseleave="!isMobile && handleCountryLeave()"
                        >
                          <div class="d-flex align-items-center justify-content-between w-100">
                            <NuxtLink
                              :to="`/hospitals?country_id=${country.id}`"
                              class="country-link flex-grow-1"
                              :class="{ active: activeCountry === country.id }"
                              @click="closeAllMenus"
                            >
                              <div class="country-flag">
                                <img
                                  :src="country.image_url || country.media?.[0]?.original_url"
                                  :alt="country.country_name"
                                  @error="handleImageError"
                                />
                              </div>
                              <div class="country-info">
                                <span class="country-name">{{ country.country_name }}</span>
                                <span class="hospital-count">{{ country.hospitals_count }} Hospitals</span>
                              </div>
                            </NuxtLink>
                            <button 
                              v-if="isMobile" 
                              class="btn btn-link p-2" 
                              @click.stop="handleCountryHover(country.id)"
                            >
                              <Icon :name="activeCountry === country.id ? 'carbon:chevron-up' : 'carbon:chevron-right'" />
                            </button>
                            <Icon v-else name="carbon:chevron-right" class="chevron-icon" />
                          </div>

                          <!-- Mobile Cities (inline) -->
                          <div v-if="isMobile && activeCountry === country.id" class="mobile-cities-list">
                            <ul class="list-unstyled ps-4">
                              <li v-for="city in citiesData[country.id]" :key="city.id" class="py-1">
                                <NuxtLink
                                  :to="`/hospitals?country_id=${country.id}&city_id=${city.id}`"
                                  class="text-decoration-none text-muted small"
                                  @click="closeAllMenus"
                                >
                                  {{ city.city_name || city.name }}
                                </NuxtLink>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <!-- Show More button -->
                        <div v-if="countries.length > 5" class="show-more-container">
                          <button @click="navigateToDestinations" class="show-more-btn">
                            Show More
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Cities Column (Desktop only) -->
                    <div
                      v-if="!isMobile && activeCountry !== null && citiesData[activeCountry]?.length"
                      class="cities-column simple-cities"
                      @mouseenter="keepCitiesOpen = true"
                      @mouseleave="handleCitiesLeave"
                    >
                      <ul class="cities-list-simple">
                        <li v-for="city in citiesData[activeCountry]" :key="city.id" class="cities-list-item">
                          <NuxtLink
                            :to="`/hospitals?country_id=${activeCountry}&city_id=${city.id}`"
                            class="city-link-simple"
                            @click="closeAllMenus"
                          >
                            {{ city.city_name || city.name }}
                            <span class="hospital-badge-small">
                              {{ city.hospitals_count ?? cityHospitalCounts[activeCountry ?? 0]?.[Number(city.id)] ?? 0 }}
                            </span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <!-- Procedure Dropdown -->
            <li class="nav-item dropdown" v-if="mainTreatments.length">
              <div class="dropdown-wrapper">
                <button
                  class="dropdown-toggle d-flex align-items-center nav-link w-100 border-0 bg-transparent"
                  @click="toggleDropdown('procedure')"
                >
                  Procedure
                  <Icon :name="activeDropdown === 'procedure' ? 'carbon:chevron-up' : 'carbon:chevron-down'" />
                </button>
                <div v-if="activeDropdown === 'procedure'" class="main-dropdown-menu shadow-sm border rounded">
                  <div class="procedure-container">
                    <ul class="main-treatment-list mb-0">
                      <li
                        v-for="treatment in mainTreatments.slice(0, 7)"
                        :key="treatment.id"
                        class="treatment-item"
                        @mouseenter="!isMobile && handleTreatmentHover(treatment.id)"
                        @mouseleave="!isMobile && handleTreatmentLeave()"
                      >
                        <div class="d-flex align-items-center justify-content-between w-100">
                          <NuxtLink
                            :to="`/hospitals?category_id=${treatment.id}`"
                            class="treatment-link flex-grow-1"
                            @click="closeAllMenus"
                          >
                            <span class="treatment-name">{{ treatment.name }}</span>
                          </NuxtLink>
                          <button 
                            v-if="hasSubTreatments(treatment.id)" 
                            class="btn btn-link p-2 text-muted" 
                            @click.stop="isMobile ? handleTreatmentHover(treatment.id) : null"
                          >
                            <Icon :name="activeTreatment === treatment.id ? 'carbon:chevron-up' : 'carbon:chevron-right'" />
                          </button>
                        </div>

                        <!-- Sub Treatments (Responsive) -->
                        <div
                          v-if="activeTreatment === treatment.id && subTreatmentsData[treatment.id]?.length"
                          :class="isMobile ? 'subtreatment-inline' : 'subtreatment-dropdown'"
                          @mouseenter="!isMobile && (keepSubtreatmentsOpen = true)"
                          @mouseleave="!isMobile && handleSubTreatmentLeave()"
                        >
                          <div class="subtreatment-menu">
                            <div v-if="!isMobile" class="subtreatment-header">
                              <h4>{{ getTreatmentName(treatment.id) }}</h4>
                            </div>
                            <ul class="subtreatment-list mb-0" :class="{ 'ps-4 small': isMobile }">
                              <li v-for="sub in subTreatmentsData[treatment.id].slice(0, 9)" :key="sub.id">
                                <NuxtLink
                                  :to="`/all-procedure/${encodeURIComponent(sub.name)}?category_id=${treatment.id}&treatment_id=${sub.id}`"
                                  class="subtreatment-link py-2 d-block"
                                  @click="closeAllMenus"
                                >
                                  {{ sub.name }}
                                </NuxtLink>
                              </li>
                              <li v-if="subTreatmentsData[treatment.id].length > 9" class="show-more-item mt-1">
                                <NuxtLink
                                  :to="`/procedure/${treatment.id}?name=${encodeURIComponent(getTreatmentName(treatment.id))}`"
                                  class="show-more-link small text-primary"
                                  @click="closeAllMenus"
                                >
                                  Show More ({{ subTreatmentsData[treatment.id].length - 9 }} more) →
                                </NuxtLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>

                      <!-- More / See All Link -->
                      <li class="see-all-item border-top mt-2">
                        <NuxtLink to="/procedure" class="see-all-link text-center py-2" @click="closeAllMenus">
                          {{ mainTreatments.length > 7 ? `More Procedures (${mainTreatments.length - 7} more) →` : 'See All Procedures →' }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <!-- Links -->
            <li class="nav-item">
              <NuxtLink
                to="/about"
                class="nav-link"
                exact-active-class="active"
              >
                About us
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/partner"
                class="nav-link"
                exact-active-class="active"
              >
                Become a Partner
              </NuxtLink>
            </li>
          </ul>

          <!-- Support & Contact -->
          <div
            class="d-flex flex-column flex-lg-row align-items-lg-center mt-3 mt-lg-0 supportandbtn"
          >
            <div class="support-info me-lg-3 text-lg-end mb-2 mb-lg-0">
              <span
                class="d-block p-2 mb-1"
                style="background: #f5f5f5; border-radius: 6px"
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
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { useGeneralStore } from "~/stores/general";
import { useHospitalStore } from "~/stores/hospital";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const hospitalStore = useHospitalStore();

const isMobile = ref(false);
const activeDropdown = ref<string | null>(null);

const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 992;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

router.afterEach(() => {
  closeAllMenus();
});

const closeAllMenus = () => {
  isMenuOpen.value = false;
  activeDropdown.value = null;
  activeCountry.value = null;
  activeTreatment.value = null;
};

const toggleDropdown = (type: string) => {
  if (activeDropdown.value === type) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = type;
  }
};

const store = useGeneralStore();
const imageLoaded = ref(false);
const isMenuOpen = ref(false);

// Fetch data
if (store.treatments.length === 0) {
  await useAsyncData("treatments", () => store.fetchTreatments());
}
if (store.destinations.length === 0) {
  await useAsyncData("destinations", () => store.fetchDestination());
}

const treatments = computed(() => store.treatments);
const destinations = computed(() => store.destinations);

const countryIdFromRoute = computed(() =>
  route.query.country_id ? String(route.query.country_id) : null,
);
const destinationCities = computed(() => hospitalStore.cities);

watch(
  countryIdFromRoute,
  async (newCountryId) => {
    if (newCountryId) {
      activeCountry.value = Number(newCountryId);
      await hospitalStore.loadCities(newCountryId);
      await fetchCitiesForCountry(newCountryId);
    }
  },
  { immediate: true },
);

// Toggle menu
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    activeDropdown.value = null;
  }
}

// Debug
if (process.client) {
  watch(
    destinations,
    (val) => {
      if (val.length) console.log("Destinations loaded:", val);
    },
    { immediate: true },
  );
}

// Country & City hover logic
interface CountryItem {
  id: number;
  country_name: string;
  image_url?: string;
  media?: any[];
  hospitals_count?: number;
  country_code?: string;
}
interface CityItem {
  id: number | string;
  name?: string;
  city_name?: string;
  hospitals_count?: number;
}

const countries = ref<CountryItem[]>([]);
const citiesData = ref<Record<number, CityItem[]>>({});
const cityHospitalCounts = ref<Record<number, Record<number, number>>>({});
const activeCountry = ref<number | null>(null);
const keepCitiesOpen = ref(false);
const hoverTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Fetch countries from API
const fetchCountries = async () => {
  try {
    loading.value = true;
    const response = await fetch("https://flyhospitals.dev/api/destinations");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = (await response.json()) as {
      status?: boolean;
      data?: any[];
    };

    if (result.status && Array.isArray(result.data)) {
      // Filter active countries
      countries.value = result.data
        .filter((country: any) => country.country_status === "1")
        .map((country: any) => ({
          id: Number(country.id),
          country_name: String(country.country_name),
          image_url: country.image_url,
          media: country.media,
          hospitals_count: Number(country.hospitals_count) || 0,
          country_code: country.country_code,
        }))
        .sort((a, b) => a.country_name.localeCompare(b.country_name));
    } else {
      throw new Error("Invalid data format");
    }
  } catch (err: unknown) {
    console.error("Error fetching countries:", err);
    if (err && typeof err === "object" && "message" in err) {
      error.value = (err as any).message;
    } else {
      error.value = "Failed to fetch countries";
    }
  } finally {
    loading.value = false;
  }
};

// Fetch cities for a specific country
const fetchCitiesForCountry = async (countryId: number | string) => {
  const countryKey = Number(countryId);

  // Skip if we already have cities for this country
  if (citiesData.value[countryKey] !== undefined) {
    return;
  }

  try {
    // Initialize as empty array to prevent multiple requests
    citiesData.value[countryKey] = [];

    // Try to fetch from API
    const response = await fetch(
      `https://flyhospitals.dev/api/countries/${countryKey}/cities`,
    );

    if (!response.ok) {
      // If endpoint doesn't exist, try alternative endpoint
      const altResponse = await fetch(
        `https://flyhospitals.dev/api/destinations/${countryKey}/cities`,
      );
      if (!altResponse.ok) {
        throw new Error("Cities endpoint not available");
      }
      const result = await altResponse.json();
      citiesData.value[countryKey] = (
        (result.data || result.cities || []) as any[]
      ).map((city: any) => ({
        id: city.id,
        name: city.name ?? city.city_name ?? "",
        city_name: city.city_name ?? city.name ?? "",
        hospitals_count: city.hospitals_count ?? city.hospital_count ?? 0,
      }));
    } else {
      const result = await response.json();
      citiesData.value[countryKey] = (
        (result.data || result.cities || []) as any[]
      ).map((city: any) => ({
        id: city.id,
        name: city.name ?? city.city_name ?? "",
        city_name: city.city_name ?? city.name ?? "",
        hospitals_count: city.hospitals_count ?? city.hospital_count ?? 0,
      }));
    }
  } catch (err: unknown) {
    console.error(`Error fetching cities for country ${countryKey}:`, err);
    // Set empty array to prevent repeated failed requests
    citiesData.value[countryKey] = [];
    cityHospitalCounts.value[countryKey] = {};
    return;
  }

  // Fetch hospital counts for city in this country (if not available via city API)
  try {
    const hospitalResponse = await fetch(
      `https://flyhospitals.dev/api/hospital-listing?country_id=${countryKey}&per_page=1000`,
    );
    if (hospitalResponse.ok) {
      const hospitalResult = await hospitalResponse.json();
      const hospitals = Array.isArray(hospitalResult.data)
        ? hospitalResult.data
        : [];
      const counts: Record<number, number> = {};
      hospitals.forEach((h: any) => {
        const cityId = Number(h.city_id);
        if (!Number.isNaN(cityId)) {
          counts[cityId] = (counts[cityId] || 0) + 1;
        }
      });
      cityHospitalCounts.value[countryKey] = counts;
    }
  } catch (err) {
    console.warn(
      `Error calculating city hospital counts for country ${countryKey}:`,
      err,
    );
    cityHospitalCounts.value[countryKey] = {};
  }
};

// Handle country hover
const handleCountryHover = async (countryId: number) => {
  // Clear any existing timeout
  if (hoverTimeout.value !== null) {
    clearTimeout(hoverTimeout.value);
  }

  // Set active country
  activeCountry.value = countryId;
  keepCitiesOpen.value = false;

  // Fetch cities for this country
  await fetchCitiesForCountry(countryId);
};

// Handle country leave
const handleCountryLeave = () => {
  // Set timeout before hiding cities column
  hoverTimeout.value = setTimeout(() => {
    if (!keepCitiesOpen.value) {
      activeCountry.value = null;
    }
  }, 200);
};

// Handle cities column leave
const handleCitiesLeave = () => {
  // Set timeout before hiding cities column
  hoverTimeout.value = setTimeout(() => {
    if (!keepCitiesOpen.value) {
      activeCountry.value = null;
    }
  }, 200);
};

// Get country name by ID
const getCountryName = (countryId: number | null) => {
  if (countryId === null) return "";
  const country = countries.value.find((c) => c.id === countryId);
  return country ? country.country_name : "";
};

// Navigate to destinations page
const navigateToDestinations = () => {
  router.push("/destinations");
};

// Handle image loading errors
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = "/images/default-flag.png";
    target.onerror = null;
  }
};

// Fetch data on mount
onMounted(() => {
  fetchCountries();
  fetchMainTreatments();
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Procedure dropdown logic
const mainTreatments = ref([]);
const subTreatmentsData = ref({});
const activeTreatment = ref(null);
const keepSubtreatmentsOpen = ref(false);

// Fetch all treatments (main treatments with parent_id = null)
const fetchMainTreatments = async () => {
  try {
    loading.value = true;
    const response = await fetch("https://flyhospitals.dev/api/sub-treatments");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && Array.isArray(result.data)) {
      // Filter main treatments (parent_id is null)
      mainTreatments.value = result.data
        .filter((treatment) => treatment.parent_id === null)
        .map((treatment) => ({
          id: treatment.id,
          name: treatment.name,
          image_url: treatment.image_url,
          media: treatment.media,
          description: treatment.description,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      throw new Error("Invalid data format");
    }
  } catch (err) {
    console.error("Error fetching treatments:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch sub-treatments for a specific treatment
const fetchSubTreatments = async (treatmentId) => {
  // Skip if we already have sub-treatments for this treatment
  if (subTreatmentsData.value[treatmentId] !== undefined) {
    return;
  }

  try {
    // Initialize as empty array to prevent multiple requests
    subTreatmentsData.value[treatmentId] = [];

    const response = await fetch(
      `https://flyhospitals.dev/api/sub-treatments?parent_id=${treatmentId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch sub-treatments for ID ${treatmentId}`);
    }

    const result = await response.json();

    if (result.status && Array.isArray(result.data)) {
      subTreatmentsData.value[treatmentId] = result.data.map((sub) => ({
        id: sub.id,
        name: sub.name,
        image_url: sub.image_url,
        media: sub.media,
        parent_id: sub.parent_id,
      }));
    } else {
      subTreatmentsData.value[treatmentId] = [];
    }
  } catch (err) {
    console.error(
      `Error fetching sub-treatments for treatment ${treatmentId}:`,
      err,
    );
    subTreatmentsData.value[treatmentId] = [];
  }
};

// Check if treatment has sub-treatments
const hasSubTreatments = (treatmentId) => {
  return (
    subTreatmentsData.value[treatmentId] &&
    subTreatmentsData.value[treatmentId].length > 0
  );
};

// Handle treatment hover
const handleTreatmentHover = async (treatmentId) => {
  // Clear any existing timeout
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }

  // Set active treatment
  activeTreatment.value = treatmentId;
  keepSubtreatmentsOpen.value = false;

  // Fetch sub-treatments for this treatment
  await fetchSubTreatments(treatmentId);
};

// Handle treatment leave
const handleTreatmentLeave = () => {
  // Set timeout before hiding sub-treatments column
  hoverTimeout.value = setTimeout(() => {
    if (!keepSubtreatmentsOpen.value) {
      activeTreatment.value = null;
    }
  }, 200);
};

// Handle sub-treatments column leave
const handleSubTreatmentLeave = () => {
  // Set timeout before hiding sub-treatments column
  hoverTimeout.value = setTimeout(() => {
    if (!keepSubtreatmentsOpen.value) {
      activeTreatment.value = null;
    }
  }, 200);
};

// Get treatment name by ID
const getTreatmentName = (treatmentId) => {
  const treatment = mainTreatments.value.find((t) => t.id === treatmentId);
  return treatment ? treatment.name : "";
};
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

/* Dropdown Styling */
.nav-item.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.dropdown-toggle:hover {
  color: #0066b3;
}

/* Main Dropdown Menu */
.main-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  min-width: 260px;
  width: auto;
}

.dropdown-grid {
  display: flex;
  min-width: 340px;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.02);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

/* Countries Column */
.countries-column {
  flex: 1;
  min-width: 190px;
  border-right: 1px solid #e5e7eb;
  background: white;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.dropdown-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.countries-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
}

.country-item-wrapper {
  position: relative;
}

.country-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
}

.country-link:hover,
.country-link.active {
  background-color: #f3f4f6;
}

.chevron-icon {
  margin-left: auto;
  opacity: 0;
  transition: all 0.2s ease;
  color: #9ca3af;
}

.country-link:hover .chevron-icon {
  opacity: 1;
  transform: translateX(4px);
}

/* Flag Styling */
.country-flag {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #f0f0f0;
  border: 1px solid #e5e7eb;
}

.country-flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Country Info */
.country-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.country-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.hospital-count {
  font-size: 11px;
  color: #6b7280;
}

.show-more-container {
  padding: 8px 0;
  text-align: center;
  border-top: 1px solid #e5e7eb;
}

.show-more-btn {
  background: none;
  border: none;
  color: #0066b3;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 12px;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.show-more-btn:hover {
  background-color: #f3f4f6;
  color: #0052a3;
}

/* Cities Column */
.cities-column {
  width: 190px;
  background: white;
  animation: slideIn 0.2s ease-out;
  padding: 8px 10px;
}

.simple-cities .cities-list-simple {
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.cities-list-item {
  margin: 0;
  padding: 4px 0;
}

.city-link-simple {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #1f2937;
  text-decoration: none;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.city-link-simple:hover {
  background-color: #f8f9fa;
}

.hospital-badge-small {
  font-size: 10px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0 4px;
  border-radius: 8px;
}

.city-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  text-decoration: none;
  color: #4b5563;
  font-size: 14px;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
}

.city-link:last-child {
  border-bottom: none;
}

.city-link:hover {
  color: #0066b3;
  transform: translateX(4px);
}

.hospital-badge {
  font-size: 11px;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 500;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scrollbar Styling */
.countries-list::-webkit-scrollbar,
.cities-list::-webkit-scrollbar {
  width: 6px;
}

.countries-list::-webkit-scrollbar-track,
.cities-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.countries-list::-webkit-scrollbar-thumb,
.cities-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.countries-list::-webkit-scrollbar-thumb:hover,
.cities-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .dropdown-grid {
    min-width: 500px;
  }

  .countries-column {
    min-width: 240px;
  }

  .cities-column {
    width: 240px;
  }

  .country-link {
    padding: 8px 16px;
  }

  .country-flag {
    width: 32px;
    height: 32px;
  }

  .country-name {
    font-size: 13px;
  }
}

/* Loading State */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #9ca3af;
}

/* Error State */
.error-message {
  padding: 20px;
  text-align: center;
  color: #ef4444;
  font-size: 14px;
}

/* Procedure Styling */

/* Simple styling - matching your original design */
/* Dropdown Styling */
.nav-item.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
}

.dropdown-toggle:hover {
  color: #0066b3;
}

/* Main Dropdown Menu */
.main-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  z-index: 1000;
}

.procedure-container {
  position: relative;
  min-width: 250px;
}

/* Main Treatment List */
.main-treatment-list {
  padding: 8px 0;
}

.treatment-item-wrapper {
  position: relative;
}

.treatment-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.treatment-link:hover {
  background-color: #f3f4f6;
  color: #0066b3;
}

.treatment-link.active {
  background-color: #f3f4f6;
  color: #0066b3;
}

.treatment-name {
  flex: 1;
}

.chevron-icon {
  font-size: 16px;
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.treatment-link:hover .chevron-icon {
  color: #0066b3;
  transform: translateX(2px);
}

/* See All Link */
.see-all-wrapper {
  border-top: 1px solid #e5e7eb;
  margin-top: 4px;
  padding-top: 8px;
}

.see-all-link {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #0066b3;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.see-all-link:hover {
  background-color: #f3f4f6;
  color: #0052a3;
}

/* Sub Treatment Dropdown (opens on right side) */
.subtreatment-dropdown {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 4px;
  z-index: 1001;
  animation: slideIn 0.2s ease-out;
}

.subtreatment-menu {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  max-width: 320px;
}

.subtreatment-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  border-radius: 8px 8px 0 0;
}

.subtreatment-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.subtreatment-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
}

.subtreatment-link {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #4b5563;
  font-size: 13px;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}

.subtreatment-link:hover {
  background-color: #f3f4f6;
  color: #0066b3;
  border-left-color: #0066b3;
  padding-left: 14px;
}

/* Show More Link */
.show-more-wrapper {
  border-top: 1px solid #e5e7eb;
  margin-top: 4px;
  padding: 8px 0 4px 0;
}

.show-more-link {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #0066b3;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
}

.show-more-link:hover {
  background-color: #eff6ff;
  color: #0052a3;
}

/* Animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scrollbar Styling */
.subtreatment-list::-webkit-scrollbar {
  width: 6px;
}

.subtreatment-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.subtreatment-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.subtreatment-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Collapsible Menu */
.navbar-collapse {
  transition: all 0.3s ease;
}

@media (min-width: 992px) {
  .navbar-collapse {
    display: flex !important;
  }
}

/* Responsive for mobile */
@media (max-width: 991.98px) {
  .navbar-collapse {
    display: none;
    width: 100%;
    padding: 1rem 0;
  }

  .navbar-collapse.show {
    display: block !important;
  }

  .navbar-nav {
    width: 100%;
    text-align: left;
    align-items: flex-start !important;
  }

  .nav-item {
    width: 100%;
  }

  .main-dropdown,
  .main-dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    width: 100%;
    margin-top: 0;
    min-width: 100%;
  }

  .dropdown-grid {
    flex-direction: column;
    min-width: 100%;
    max-width: 100%;
    box-shadow: none;
    border: none;
  }

  .countries-column {
    border-right: none;
    min-width: 100%;
  }

  .subtreatment-inline {
    width: 100%;
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  .subtreatment-menu {
    min-width: 100%;
    max-width: 100%;
    box-shadow: none;
    border: none;
    border-left: 2px solid #e5e7eb;
    margin-left: 0;
  }

  .subtreatment-list {
    max-height: none;
  }

  .supportandbtn {
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    text-align: left !important;
  }

  .support-info {
    text-align: left !important;
    margin-right: 0 !important;
    margin-bottom: 1rem !important;
  }

  .supportandbtn .btn {
    width: 100%;
  }
}
</style>
