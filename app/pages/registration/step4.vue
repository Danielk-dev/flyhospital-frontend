<template>
  <div class="registration-page">
    <div class="registration-container">
      <!-- ===== MAIN HEADER ===== -->
      <header class="page-header">
        <h1>Welcome to <br />ClickHospitals Partnership Registration!</h1>
        <p class="subhead">
          <i class="fas fa-clinic-medical"></i>
          Create an account to become our partner and list your clinic on
          ClickHospitals in 4 simple steps.
        </p>
      </header>

      <!-- ===== STEP INDICATOR ===== -->
      <div class="step-indicator">
        <span class="step-label">Step 4 of 5</span>
        <div class="step-bar">
          <div class="step-progress" style="width: 80%"></div>
        </div>
      </div>

      <!-- ===== UPLOAD PORTAL CONTENT ===== -->
      <div class="mp-upload-portal">
        <!-- Progress Header -->

        <!-- Main Card -->
        <div class="mp-content-panel">
          <!-- Business Logo -->
          <section class="mp-brand-section">
            <h2 class="mp-section-heading">Business Logo</h2>

            <div class="mp-brand-layout">
              <label
                class="mp-logo-upload-zone"
                :class="{ 'mp-logo-present': logoPreview }"
              >
                <input
                  ref="logoInput"
                  type="file"
                  accept="image/png,image/svg+xml"
                  class="mp-invisible-input"
                  @change="onLogoSelected"
                />
                <template v-if="!logoPreview">
                  <svg
                    class="mp-logo-upload-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 16.5V6.75C4 5.784 4.784 5 5.75 5h12.5c.966 0 1.75.784 1.75 1.75v9.75"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="10"
                      r="1.6"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M4 15.5 8.5 12l3 2.5L16 10l4 4.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5 3.5v4M15.5 5.5h4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span class="mp-logo-upload-label">Upload Logo</span>
                </template>
                <img
                  v-else
                  :src="logoPreview"
                  alt="Business logo preview"
                  class="mp-logo-preview-image"
                />
              </label>

              <div class="mp-logo-description">
                <p class="mp-logo-title">Business Logo</p>
                <p class="mp-logo-details">
                  Recommended: Square SVG or PNG with transparent background.<br />
                  Min 400&times;400px.
                </p>
              </div>
            </div>
          </section>

          <div class="mp-divider-line"></div>

          <!-- Service Photos -->
          <section class="mp-gallery-section">
            <div class="mp-gallery-header">
              <div>
                <h2 class="mp-section-heading">Service Photos</h2>
                <p class="mp-gallery-description">
                  Upload up to 10 high-quality photos of your Business<br />
                  (JPG, PNG, max 5MB)
                </p>
              </div>
              <div class="mp-image-counter">
                {{ photos.length }} / {{ maxPhotos }}<br />photos
              </div>
            </div>

            <div
              class="mp-file-drop-zone"
              :class="{ 'mp-drop-active': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDrop"
              @click="triggerFileSelect"
            >
              <input
                ref="photosInput"
                type="file"
                accept="image/jpeg,image/png"
                multiple
                class="mp-invisible-input"
                @change="onFilesSelected"
              />
              <div class="mp-drop-zone-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 16.5A4.5 4.5 0 0 1 6.2 7.6 5.5 5.5 0 0 1 17 8a4 4 0 0 1-.5 8H16"
                    stroke="#fff"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11v7M9 14l3-3 3 3"
                    stroke="#fff"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p class="mp-drop-zone-title">Drag and drop your files here</p>
              <p class="mp-drop-zone-subtext">
                or
                <button
                  type="button"
                  class="mp-browse-btn"
                  @click.stop="triggerFileSelect"
                >
                  browse files
                </button>
                from your computer
              </p>
            </div>

            <div class="mp-thumbnail-grid" v-if="photos.length">
              <div
                v-for="(photo, index) in photos"
                :key="photo.id"
                class="mp-thumbnail-item"
              >
                <img :src="photo.url" :alt="`Service photo ${index + 1}`" />
                <button
                  type="button"
                  class="mp-thumbnail-remove"
                  @click="removePhoto(index)"
                  aria-label="Remove photo"
                >
                  &times;
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="mp-error-message">
          {{ submitError }}
        </div>

        <!-- Footer -->
        <div class="mp-navigation-footer">
          <NuxtLink to="/registration/step3" class="mp-back-navigation">
            <span class="mp-back-arrow">&larr;</span> Back to Step 3
          </NuxtLink>
          <button
            type="button"
            class="mp-forward-button"
            :disabled="isSubmitting"
            @click="saveAndContinue"
          >
            {{ isSubmitting ? "Submitting..." : "Submit Form" }}
            <span class="mp-forward-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const maxPhotos = 10;
const progressPercent = 80; // Step 4 of 5

const logoInput = ref(null);
const logoFile = ref(null);
const logoPreview = ref(null);

const photosInput = ref(null);
const photos = ref([]);
const isDragging = ref(false);

function onLogoSelected(event) {
  const file = event.target.files[0];
  if (!file) return;
  logoFile.value = file;
  logoPreview.value = URL.createObjectURL(file);
}

function triggerFileSelect() {
  photosInput.value?.click();
}

function onFilesSelected(event) {
  addPhotos(Array.from(event.target.files || []));
  event.target.value = "";
}

function onDrop(event) {
  isDragging.value = false;
  addPhotos(Array.from(event.dataTransfer.files || []));
}

function addPhotos(files) {
  const room = maxPhotos - photos.value.length;
  if (room <= 0) return;

  const validFiles = files
    .filter((f) => f.type === "image/jpeg" || f.type === "image/png")
    .filter((f) => f.size <= 5 * 1024 * 1024)
    .slice(0, room);

  validFiles.forEach((file) => {
    photos.value.push({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      url: URL.createObjectURL(file),
    });
  });
}

function removePhoto(index) {
  photos.value.splice(index, 1);
}

       const config = useRuntimeConfig()
      const API_BASE = `${config.public.baseUrl}`
const registrationData = useState("registrationData");
const isSubmitting = ref(false);
const submitError = ref("");

async function saveAndContinue() {
  isSubmitting.value = true;
  submitError.value = "";

  try {
    const personal = registrationData.value.personalInfo || {};
    const facility = registrationData.value.facility || {};

    const formData = new FormData();
    formData.append("name", personal.fullName || "");
    formData.append("email", personal.email || "");
    formData.append("phone", personal.phone || "");
    formData.append("business_type", personal.businessType || "");
    formData.append("hospital_id", facility.hospital_id || "");

    if (logoFile.value) {
      formData.append("business_logo", logoFile.value);
    }

    photos.value.forEach((photo) => {
      formData.append("service_photos[]", photo.file);
    });

    const res = await fetch(`${API_BASE}/vendors`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      submitError.value = json.errors
        ? Object.values(json.errors).flat().join(", ")
        : (json.message || "Submission failed.");
      console.error(json);
      return;
    }

    await navigateTo("/registration/step6");
  } catch (e) {
    submitError.value = "Network error while submitting form";
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
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

/* ===== MAIN HEADER ===== */
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

/* ===== STEP INDICATOR ===== */
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

/* ===== UPLOAD PORTAL ===== */
.mp-upload-portal {
  max-width: 1180px;
  margin: 0 auto;
  color: #101828;
}

.mp-invisible-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

/* Progress Header */
.mp-progress-bar-area {
  padding: 0 0 18px 0;
}

.mp-progress-top-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.mp-step-indicator {
  font-size: 13.5px;
  font-weight: 700;
  color: #101828;
}

.mp-step-instruction {
  font-size: 12px;
  color: #667085;
}

.mp-progress-tracker {
  height: 2px;
  background: #eaecf0;
  border-radius: 2px;
  overflow: hidden;
}

.mp-progress-meter {
  height: 100%;
  background: #101828;
  border-radius: 2px;
}

/* Card */
.mp-content-panel {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 28px;
}

.mp-section-heading {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #101828;
}

/* Logo Section */
.mp-brand-layout {
  display: flex;
  align-items: center;
  gap: 20px;
}

.mp-logo-upload-zone {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  border: 1.5px dashed #d0d5dd;
  border-radius: 4px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.15s ease;
}

.mp-logo-upload-zone:hover {
  border-color: #98a2b3;
}

.mp-logo-upload-icon {
  width: 22px;
  height: 22px;
  color: #667085;
}

.mp-logo-upload-label {
  font-size: 11.5px;
  font-weight: 600;
  color: #344054;
}

.mp-logo-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mp-logo-present {
  border-style: solid;
  padding: 0;
}

.mp-logo-title {
  font-size: 13.5px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #101828;
}

.mp-logo-details {
  font-size: 12px;
  color: #667085;
  line-height: 1.5;
  margin: 0;
}

/* Divider */
.mp-divider-line {
  height: 1px;
  background: #eaecf0;
  margin: 26px 0;
}

/* Photos Section */
.mp-gallery-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.mp-gallery-description {
  font-size: 12px;
  color: #667085;
  line-height: 1.5;
  margin: 0 0 16px;
}

.mp-image-counter {
  background: #f2f4f7;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 11.5px;
  font-weight: 600;
  color: #344054;
  text-align: center;
  line-height: 1.4;
  white-space: nowrap;
}

/* Dropzone */
.mp-file-drop-zone {
  border: 1.5px dashed #d0d5dd;
  border-radius: 4px;
  background: #fafbfc;
  padding: 34px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.mp-file-drop-zone:hover,
.mp-drop-active {
  border-color: #16a37a;
  background: #f3faf7;
}

.mp-drop-zone-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #101a3d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.mp-drop-zone-icon svg {
  width: 18px;
  height: 18px;
}

.mp-drop-zone-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #101828;
  margin: 0 0 4px;
}

.mp-drop-zone-subtext {
  font-size: 12px;
  color: #667085;
  margin: 0;
}

.mp-browse-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: #2563eb;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

/* Thumbnails */
.mp-thumbnail-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 22px;
}

.mp-thumbnail-item {
  position: relative;
  width: 96px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eaecf0;
}

.mp-thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.mp-thumbnail-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: rgba(16, 24, 40, 0.65);
  color: #fff;
  font-size: 13px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.mp-thumbnail-item:hover .mp-thumbnail-remove {
  opacity: 1;
}

/* ===== ERROR MESSAGE ===== */
.mp-error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 13px;
}

/* ===== FOOTER ===== */
.mp-navigation-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eaecf0;
  margin-top: 24px;
  padding-top: 20px;
}

.mp-back-navigation {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
}

.mp-back-navigation:hover {
  color: #101828;
}

.mp-forward-button {
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

.mp-forward-button:hover {
  opacity: 0.92;
}

.mp-back-arrow,
.mp-forward-arrow {
  font-size: 14px;
  line-height: 1;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
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

  .mp-brand-layout {
    flex-direction: column;
    align-items: flex-start;
  }

  .mp-gallery-header {
    flex-direction: column;
  }

  .mp-navigation-footer {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }

  .mp-forward-button {
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

  .mp-content-panel {
    padding: 16px;
  }

  .mp-progress-top-row {
    flex-direction: column;
    gap: 4px;
  }

  .mp-thumbnail-item {
    width: 72px;
    height: 56px;
  }
}
</style>
