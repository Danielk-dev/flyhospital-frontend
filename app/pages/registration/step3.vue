<template>
  <div class="registration-page">
    <div class="registration-container">
      <!-- Main Header -->
      <header class="page-header">
        <h1>Welcome to <br />ClickHospitals Partnership Registration!</h1>
        <p class="subhead">
          <i class="fas fa-clinic-medical"></i>
          Create an account to become our partner and list your clinic on
          ClickHospitals in 4 simple steps.
        </p>
      </header>

      <!-- Step Indicator -->
      <div class="step-indicator">
        <span class="step-label">Step 3 of 5</span>
        <div class="step-bar">
          <div class="step-progress" style="width: 60%"></div>
        </div>
      </div>

      <!-- Facility Selector Content -->
      <div class="rx-facility-selector">
        <!-- Inner Header -->
        <div class="rx-header-section">
          <div class="rx-header-top">
            <div class="rx-header-left">
              <h1>Select Hospital</h1>
              <p>Select the hospitals you serve.</p>
            </div>
            <div class="rx-search-field">
              <svg
                class="rx-search-icon"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="6.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="m17 17-3.8-3.8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Search hospitals"
              />
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="rx-primary-container">
          <div class="rx-layout-grid">
            <!-- Left: Service Reach -->
            <div class="rx-service-area">
              <h2>Service Reach</h2>
              <p>
                Select the maximum distance from your facility that you can
                comfortably serve. This determines which hospitals and
                patients can find you.
              </p>

              <div class="rx-distance-choices">
                <label
                  v-for="option in radiusOptions"
                  :key="option.value"
                  class="rx-distance-option"
                  :class="{ 'rx-active': selectedRadius === option.value }"
                >
                  <span
                    class="rx-radio-ring"
                    :class="{ 'rx-selected': selectedRadius === option.value }"
                  >
                    <span
                      v-if="selectedRadius === option.value"
                      class="rx-radio-core"
                    ></span>
                  </span>
                  <span class="rx-radio-label">{{ option.label }}</span>
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="selectedRadius"
                    class="rx-hidden-input"
                  />
                </label>
              </div>
            </div>

            <!-- Right: Radius Visualization -->
            <div class="rx-visual-display">
              <!-- 🔽 Hospital selection dropdown -->
              <div
                class="rx-hospital-select-wrapper"
                style="margin-bottom: 14px"
              >
                <label
                  style="
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #344054;
                    display: block;
                    margin-bottom: 6px;
                  "
                >
                  Select Hospital
                </label>
                <select
                  v-model="selectedHospitalId"
                  class="form-input"
                  :disabled="isLoadingHospitals || !hospitals.length"
                >
                  <option :value="null" disabled>
                    {{
                      isLoadingHospitals
                        ? "Loading hospitals..."
                        : hospitals.length
                          ? "Choose a hospital"
                          : "No hospitals found"
                    }}
                  </option>
                  <option v-for="h in hospitals" :key="h.id" :value="h.id">
                    {{ h.title }} ({{ Number(h.distance).toFixed(1) }} km
                    away)
                  </option>
                </select>
                <p
                  v-if="locationError"
                  style="color: #d92d20; font-size: 12px; margin-top: 6px"
                >
                  {{ locationError }}
                </p>
                <p
                  v-if="hospitalError"
                  style="color: #d92d20; font-size: 12px; margin-top: 6px"
                >
                  {{ hospitalError }}
                </p>
              </div>

              <div class="rx-display-header">
                <div>
                  <h3>Radius Visualization</h3>
                  <p>Based on your selected location: {{ locationLabel }}</p>
                </div>
                <div class="rx-facility-count">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8.5 10 3l7 5.5"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.5 8v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ hospitalsFound }} Hospitals found
                </div>
              </div>

              <div class="rx-map-container">
                <svg viewBox="0 0 360 190" class="rx-map-graphic">
                  <rect x="0" y="0" width="360" height="190" fill="#e5e7eb" />
                  <circle
                    cx="180"
                    cy="95"
                    r="60"
                    fill="#16a37a"
                    fill-opacity="0.18"
                  />
                  <g>
                    <circle cx="180" cy="95" r="20" rx="6" fill="#16a37a" />
                    <rect
                      x="171"
                      y="86"
                      width="18"
                      height="18"
                      rx="3"
                      fill="#16a37a"
                    />
                    <path
                      d="M180 91v8M176 95h8"
                      stroke="#fff"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </g>
                  <g>
                    <path
                      d="M115 132c0-6.6 5.4-12 12-12s12 5.4 12 12c0 8-12 18-12 18s-12-10-12-18Z"
                      fill="#2563eb"
                    />
                    <circle cx="127" cy="132" r="4" fill="#fff" />
                  </g>
                  <g>
                    <path
                      d="M228 100c0-6.6 5.4-12 12-12s12 5.4 12 12c0 8-12 18-12 18s-12-10-12-18Z"
                      fill="#2563eb"
                    />
                    <circle cx="240" cy="100" r="4" fill="#fff" />
                  </g>
                </svg>

                <div
                  class="rx-map-pin-label"
                  style="top: 128px; left: 72px"
                >
                  St. Jude Medical
                </div>
                <div
                  class="rx-map-pin-label"
                  style="top: 96px; left: 250px"
                >
                  Presbyterian Hub
                </div>

                <div class="rx-map-key">
                  <div class="rx-key-row">
                    <span
                      class="rx-key-dot"
                      style="background: #101828"
                    ></span>
                    Your Location
                  </div>
                  <div class="rx-key-row">
                    <span
                      class="rx-key-dot"
                      style="background: #2563eb"
                    ></span>
                    Partner Hospitals
                  </div>
                  <div class="rx-key-row">
                    <span class="rx-key-dot rx-key-radius">
                      <svg viewBox="0 0 12 12">
                        <circle
                          cx="6"
                          cy="6"
                          r="5"
                          fill="none"
                          stroke="#16a37a"
                          stroke-width="1.4"
                        />
                      </svg>
                    </span>
                    Service Radius
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="rx-action-footer">
          <NuxtLink to="/registration/step1" class="rx-nav-back">
            <span class="arrow-left">&larr;</span> Back to Step 1
          </NuxtLink>
          <NuxtLink
            to="/registration/step4"
            class="rx-proceed-btn"
            @click="saveAndContinue"
          >
            Continue <span class="arrow-right">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const API_BASE = "http://flyhospital.test/api"; // apna base URL yahan set karo

const search = ref("");
const selectedRadius = ref("5"); // ab numeric km value store hoga
const locationLabel = ref("Detecting your location...");
const hospitalsFound = ref(0);

const userLat = ref(null);
const userLng = ref(null);
const locationError = ref("");

const hospitals = ref([]);
const selectedHospitalId = ref(null);
const isLoadingHospitals = ref(false);
const hospitalError = ref("");

const radiusOptions = [
  { label: "Within 1 km", value: "1" },
  { label: "Within 3 km", value: "3" },
  { label: "Within 5 km", value: "5" },
  { label: "Within 20 km", value: "20" },
  { label: "Within 25 km", value: "25" },
];

const registrationData = useState("registrationData");

// 1. Get user's GPS location on mount
onMounted(() => {
  if (!navigator.geolocation) {
    locationError.value = "Geolocation not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLat.value = position.coords.latitude;
      userLng.value = position.coords.longitude;
      locationLabel.value = `Lat: ${userLat.value.toFixed(4)}, Lng: ${userLng.value.toFixed(4)}`;
      fetchNearbyHospitals();
    },
    (err) => {
      locationError.value =
        "Location access denied. Please enable location to continue.";
      console.error(err);
    },
    { enableHighAccuracy: true, timeout: 10000 },
  );
});

// 2. Whenever radius changes, refetch
watch(selectedRadius, () => {
  if (userLat.value && userLng.value) {
    fetchNearbyHospitals();
  }
});

// 3. Fetch nearby hospitals from backend
async function fetchNearbyHospitals() {
  isLoadingHospitals.value = true;
  hospitalError.value = "";
  selectedHospitalId.value = null;

  try {
    const params = new URLSearchParams({
      latitude: userLat.value,
      longitude: userLng.value,
      radius: selectedRadius.value,
    });

    const res = await fetch(`${API_BASE}/hospitals/nearby?${params}`);
    const json = await res.json();

    if (json.success) {
      hospitals.value = json.data;
      hospitalsFound.value = json.data.length;
    } else {
      hospitalError.value = json.message || "Failed to fetch hospitals";
    }
  } catch (e) {
    hospitalError.value = "Network error while fetching hospitals";
    console.error(e);
  } finally {
    isLoadingHospitals.value = false;
  }
}

function saveAndContinue() {
  const selectedHospital = hospitals.value.find(
    (h) => h.id === selectedHospitalId.value,
  );

  registrationData.value.facility = {
    hospital_id: selectedHospitalId.value,
    hospital_name: selectedHospital?.name ?? null,
    latitude: userLat.value,
    longitude: userLng.value,
    selectedRadius: selectedRadius.value,
    hospitalsFound: hospitalsFound.value,
  };
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.registration-page {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1.5rem;
}

.registration-container {
  width: 80%;
  max-width: 1600px;
  padding: 2.5rem 3rem;
}

/* ===== Main Header ===== */
.page-header {
  margin-bottom: 2rem;
  padding-left: 10px;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0b2b4a;
  line-height: 1.2;
}

.page-header .subhead {
  text-align: center;
  display: flex;
  margin: auto;
  font-size: 12px;
  width: 40%;
  color: #3e5a70;
  margin-top: 0.3rem;
}

.page-header .subhead i {
  color: #0a7e8c;
  margin-right: 0.4rem;
}

/* ===== Step Indicator ===== */
.step-indicator {
  margin: 1.5rem 0 2rem;
}

.step-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a7e8c;
  display: block;
  margin-bottom: 0.4rem;
}

.step-bar {
  width: 100%;
  height: 4px;
  background: #e4ebf3;
  border-radius: 4px;
  overflow: hidden;
}

.step-progress {
  height: 100%;
  background: #0a7e8c;
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* ===== Facility Selector ===== */
.rx-facility-selector {
  max-width: 1180px;
  margin: 0 auto;
  color: #101828;
}

.rx-hidden-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Inner Header */
.rx-header-section {
  margin: 0 0 20px 0;
}

.rx-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: #f7f8fa;
  padding: 20px;
  border-radius: 4px;
}

.rx-header-left h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #101828;
}

.rx-header-left p {
  font-size: 13px;
  color: #667085;
  margin: 4px 0 0;
}

.rx-search-field {
  flex: 1;
  max-width: 480px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  padding: 9px 14px;
}

.rx-search-icon {
  width: 16px;
  height: 16px;
  color: #98a2b3;
  flex-shrink: 0;
}

.rx-search-field input {
  border: none;
  outline: none;
  font-size: 13.5px;
  color: #101828;
  width: 100%;
}

.rx-search-field input::placeholder {
  color: #98a2b3;
}

/* Main Card */
.rx-primary-container {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 28px;
  width: 100%;
  margin-top: -20px;
}

.rx-layout-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
}

/* Service Reach */
.rx-service-area h2 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 6px;
}

.rx-service-area > p {
  font-size: 12.5px;
  color: #667085;
  line-height: 1.55;
  margin: 0 0 18px;
}

.rx-distance-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rx-distance-option {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  padding: 12px 14px;
  font-size: 13.5px;
  font-weight: 500;
  color: #344054;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.rx-distance-option:hover {
  border-color: #98a2b3;
}

.rx-distance-option.rx-active {
  border-color: #16a37a;
  background: #eefaf5;
  color: #101828;
}

.rx-radio-ring {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #d0d5dd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rx-radio-ring.rx-selected {
  border-color: #16a37a;
  background: #16a37a;
}

.rx-radio-core {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
}

/* Visualization */
.rx-visual-display {
  display: flex;
  flex-direction: column;
}

.rx-display-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.rx-display-header h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 4px;
}

.rx-display-header p {
  font-size: 12px;
  color: #667085;
  margin: 0;
}

.rx-facility-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #667085;
  white-space: nowrap;
  padding-top: 2px;
}

.rx-facility-count svg {
  width: 14px;
  height: 14px;
}

.rx-map-container {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #eaecf0;
}

.rx-map-graphic {
  display: block;
  width: 100%;
  height: auto;
}

.rx-map-pin-label {
  position: absolute;
  transform: translate(-50%, 0);
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 10.5px;
  font-weight: 500;
  color: #344054;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08);
}

.rx-map-key {
  position: absolute;
  left: 14px;
  bottom: 14px;
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.08);
}

.rx-key-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: #344054;
}

.rx-key-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
}

.rx-key-radius {
  background: none;
  width: 12px;
  height: 12px;
}

.rx-key-radius svg {
  width: 12px;
  height: 12px;
}

/* ===== Footer ===== */
.rx-action-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eaecf0;
  margin-top: 24px;
  padding-top: 20px;
}

.rx-nav-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
}

.rx-nav-back:hover {
  color: #101828;
}

.rx-proceed-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  background: #16a37a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
  margin-left: auto;
}

.rx-proceed-btn:hover {
  opacity: 0.92;
}

.arrow-left,
.arrow-right {
  font-size: 14px;
  line-height: 1;
}

/* ===== Responsive ===== */
@media (max-width: 860px) {
  .registration-container {
    width: 95%;
    padding: 1.8rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }

  .page-header .subhead {
    width: 60%;
  }

  .rx-header-top {
    flex-direction: column;
    align-items: stretch;
  }

  .rx-search-field {
    max-width: 100%;
  }

  .rx-layout-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .rx-action-footer {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }

  .rx-proceed-btn {
    justify-content: center;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .registration-page {
    padding: 1rem 0.8rem;
  }

  .registration-container {
    width: 95%;
    padding: 1.2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.3rem;
  }

  .page-header .subhead {
    width: 80%;
  }

  .rx-header-section {
    padding: 0;
  }

  .rx-header-top {
    padding: 16px;
  }

  .rx-primary-container {
    padding: 16px;
  }

  .rx-map-pin-label {
    font-size: 8px;
    padding: 2px 5px;
  }

  .rx-map-key {
    padding: 6px 10px;
    gap: 4px;
  }

  .rx-key-row {
    font-size: 9px;
  }
}
</style>