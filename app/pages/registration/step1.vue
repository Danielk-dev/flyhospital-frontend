<template>
  <div class="registration-page">
    <div class="registration-container">
      <!-- Header -->
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
        <span class="step-label">Step 1 of 5</span>
        <div class="step-bar">
          <div class="step-progress" style="width: 20%"></div>
        </div>
      </div>

      <!-- Main Form -->
      <div class="form-container">
        <!-- Create Account Button -->
        <div class="create-account-section">
          <p class="section-title">Create your account</p>
          <p class="account-note">
            These details will be used for your main point of contact and
            primary login credentials.
          </p>
        </div>

        <!-- Personal Information -->
        <div class="form-section">
          <h3 class="section-title">Personal Information</h3>

          <div class="form-row">
            <div class="form-group">
              <label>Full Name</label>
              <input
              type="text"
                v-model="form.fullName"
                placeholder="Dr. Sarah Johnson"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="form.email"
                placeholder="sarahjohnson@hotmail.com"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              v-model="form.phone"
              placeholder="+1 (555) 000-0000"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Choose Business Type</label>
            <select class="form-input" v-model="form.businessType">
              <option>Hospital</option>
              <option>Clinic</option>
              <option>Medical Center</option>
              <option>Laboratory</option>
            </select>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="terms-section">
          <label class="checkbox-container">
            <input type="checkbox" v-model="form.agreedToTerms" />
            <span class="checkmark"></span>
            <span class="agree-line"
              >I agree to the Terms of Service and Privacy Policy.
              <span class="governance-line"
                >I understand that <strong>ClickHospitals</strong>
                <br />maintains strict data governance for all clinical and
                administrative partnership data.</span
              ></span
            >
          </label>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-section">
          <!-- Back Button -->
          <NuxtLink to="/partner" class="btn-back">
            <span class="arrow-left">&larr;</span> Back to Become a
          </NuxtLink>

          <div class="nav-right">
            <a href="#" class="help-link">
              <i class="fas fa-question-circle"></i> Having trouble? Contact our
              vendor onboarding team
            </a>

            <!-- Continue Button -->
            <NuxtLink
              to="/registration/step3"
              class="btn-continue"
              @click="saveAndContinue"
            >
              Continue <i class="fas fa-arrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 setup
const registrationData = useState("registrationData");

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  businessType: "Hospital",
  agreedToTerms: false,
});

function saveAndContinue() {
  registrationData.value.personalInfo = { ...form };
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.registration-page {
  /* font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; */
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* min-height: 100vh; */
  padding: 2rem 1.5rem;
}

/* ============================================ */
/* CHANGED: width set to 80% */
/* ============================================ */
.registration-container {
  width: 80%;
  max-width: 1600px;
  /* box-shadow: 0 20px 60px -20px rgba(0, 20, 50, 0.12); */
  padding: 2.5rem 3rem;
}

/* Header */
.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0b2b4a;
  line-height: 1.2;
}

.page-header h1 .highlight {
  background: linear-gradient(145deg, #0a7e8c, #0b5f7a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

/* Step Indicator */
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

/* Form Container */
.form-container {
  margin-top: 0.5rem;
}

/* Create Account Button */
.create-account-section {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-create-account:hover {
  background: #086c79;
}

.account-note {
  font-size: 0.85rem;
  color: #5f7b94;
  margin-top: 0.8rem;
  text-align: left;
}

/* Form Sections */
.form-section {
  /* border: 1px solid rgb(124, 87, 87); */
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #eef3f9;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  /* padding: 40px; */
  color: #0b2b4a;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  /* border-bottom: 1px solid #eef3f9; */
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #3e5a70;
  margin-bottom: 0.3rem;
}

/* ============================================ */
/* FIXED: inputs were fixed at width: 50%, which
   made them look tiny inside a wider container.
   Now they fill their .form-group / grid cell. */
/* ============================================ */
.form-input {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  border: 1px solid #515458;
  border-radius: 2px;
  font-size: 0.75rem;
  color: #0b2b4a;
  background: #fafcff;
  transition: border-color 0.2s;
  font-family: inherit;
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: #0a7e8c;
  background: #ffffff;
}

.form-input[readonly],
.form-input[value] {
  background: #f5f8fc;
  cursor: default;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233e5a70' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Terms Section */
.terms-section {
  margin: 1.5rem 0 2rem;
  padding: 1.2rem;
  background: none;
  border: none;
  /* width: 70%; */
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  position: relative;
  padding-left: 0;
  font-size: 0.85rem;
  color: #1d3b53;
  line-height: 1.6;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  min-width: 18px;
  height: 18px;
  background: white;
  border: 2px solid #dce3ec;
  border-radius: 4px;
  display: inline-block;
  margin-top: 2px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-container input:checked ~ .checkmark {
  background: #0a7e8c;
  border-color: #0a7e8c;
}

.checkbox-container input:checked ~ .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-text {
  font-size: 0.85rem;
  color: #3e5a70;
}

/* Navigation */
.navigation-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eef3f9;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-left: auto; /* This pushes the nav-right to the right */
}

/* Back Button */
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.btn-back:hover {
  color: #101828;
  background: #eef3f9;
}

.btn-back svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* Continue Button */
.btn-continue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #16a37a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.btn-continue:hover {
  opacity: 0.92;
}

.btn-continue i {
  font-size: 0.9rem;
}

.help-link {
  color: #0a7e8c;
  font-size: 0.85rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.help-link:hover {
  background: #eef3f9;
}

/* Responsive */
@media (max-width: 768px) {
  .registration-container {
    width: 95%;
    padding: 1.8rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }

  .page-header .subhead {
    width: 90%;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .navigation-section {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-right {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
    margin-left: 0; /* Reset for mobile */
  }

  .btn-back {
    justify-content: center;
  }

  .help-link {
    justify-content: center;
    text-align: center;
  }

  .btn-continue {
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
    border-radius: 1rem;
  }

  .page-header h1 {
    font-size: 1.3rem;
  }

  .btn-create-account {
    width: 100%;
    justify-content: center;
  }
}
</style>
