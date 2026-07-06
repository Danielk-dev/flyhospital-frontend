<template>
  <div class="all">
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
      </div>
    </div>

    <div class="cnf-status-container">
      <div class="cnf-main-panel">
        <div class="cnf-checkmark-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="8.5" stroke="#fff" stroke-width="1.8" />
            <path
              d="m8.2 12.2 2.6 2.6 5-5.2"
              stroke="#fff"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h1 class="cnf-headline">Your request is in process!</h1>

        <p class="cnf-description">
          Our team is reviewing your listing for quality and accuracy. You will
          receive an email once your profile is live. This typically takes 24-48
          business hours.
        </p>
      </div>

      <div class="cnf-information-grid">
        <div class="cnf-information-card">
          <div class="cnf-info-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="5.5"
                width="18"
                height="13"
                rx="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="cnf-info-content">
            <p class="cnf-info-heading">Check your inbox</p>
            <p class="cnf-info-text">
              We've sent a confirmation of your application to
              <span class="cnf-email-address">{{ confirmationEmail }}</span>
            </p>
          </div>
        </div>

        <div class="cnf-information-card">
          <div class="cnf-info-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M14 3.5V8h4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M9 12.5h6M9 15.5h6"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="cnf-info-content">
            <p class="cnf-info-heading">Prepare your documentation</p>
            <p class="cnf-info-text">
              While we review, ensure your medical licenses are ready for the
              final step.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 setup

defineProps({
  confirmationEmail: {
    type: String,
    default: "partner@hospital.com",
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.all{
  margin-bottom: 100px;
}

.registration-page {
  /* font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; */
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; */
  padding: 2rem 1.5rem;
}

.registration-container {
  /* margin-bottom: 200px; */
  max-width: 900px;
  width: 100%;
  /* box-shadow: 0 20px 60px -20px rgba(0, 20, 50, 0.12); */
  padding: 2.5rem 3rem;
}

/* Header */
.page-header {
  margin-bottom: 2rem;
  padding-left: 10px;
  text-align: center;
}
.code {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.input-code {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  text-align: center;
  border: 1px solid rgb(83, 75, 75);
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
svg {
  width: 40px;
  height: 40px;
}
/* Responsive */
@media (max-width: 768px) {
  .registration-container {
    padding: 1.8rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.6rem;
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
  }
}

@media (max-width: 480px) {
  .registration-page {
    padding: 1rem 0.8rem;
  }

  .registration-container {
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

/* page */

.cnf-status-container * {
  box-sizing: border-box;
}

.cnf-status-container {
  max-width: 550px;
  margin: 0 auto;
  margin-top: -80px;
  padding: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  color: #101828;
}

/* Main confirmation card */
.cnf-main-panel {
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 56px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cnf-checkmark-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: #16a37a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.cnf-checkmark-wrapper svg {
  width: 32px;
  height: 32px;
}

.cnf-headline {
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 14px;
  color: #101828;
}

.cnf-description {
  font-size: 12px;
  color: #667085;
  line-height: 1.65;
  max-width: 460px;
  margin: 0;
}

/* Info cards */
.cnf-information-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

.cnf-information-card {
  background: #f9fafb;
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.cnf-info-icon {
  width: 34px;
  height: 34px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #eaecf0;
  color: #344054;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cnf-info-icon svg {
  width: 17px;
  height: 17px;
}

.cnf-info-heading {
  font-size: 9px;
  font-weight: 700;
  color: #101828;
  margin: 0 0 4px;
}

.cnf-info-text {
  font-size: 9px;
  color: #667085;
  line-height: 1.55;
  margin: 0;
}

.cnf-email-address {
  color: #344054;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 640px) {
  .cnf-information-grid {
    grid-template-columns: 1fr;
  }
  .cnf-main-panel {
    padding: 40px 20px;
  }
  .cnf-headline {
    font-size: 21px;
  }
}
</style>
