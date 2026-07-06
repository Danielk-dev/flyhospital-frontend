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
        <span class="step-label">Step 2 of 5</span>
        <div class="step-bar">
          <div class="step-progress" style="width: 40%"></div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="verify-page">
        <!-- Inner Header -->
        <div class="inner-header">
          <h1>Verify your email address</h1>
          <p>
            These details will be used for your main point of contact and
            primary login credentials.
          </p>
        </div>

        <!-- Hero panel -->
        <div class="hero-panel">
          <img
            class="hero-bg"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Modern healthcare / medical office building"
          />
          <div class="hero-overlay"></div>

          <!-- Left overlay copy -->
          <div class="hero-copy">
            <h2>Partner with<br />Trust</h2>
            <p>
              Join the world's most reliable network of healthcare providers and
              medical vendors. Your expertise deserves a global platform.
            </p>
          </div>

          <!-- Verification card -->
          <div class="verify-card">
            <div class="mail-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6.75C3 5.784 3.784 5 4.75 5h14.5c.966 0 1.75.784 1.75 1.75v10.5c0 .966-.784 1.75-1.75 1.75H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 6.5 12 13l8-6.5"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <h3>Verify your email address</h3>
            <p class="verify-sub">
              We've sent a code to your email. Please enter it below to
              continue.
            </p>

            <div class="code">
              <input
                v-for="(digit, i) in otpDigits"
                :key="i"
                v-model="otpDigits[i]"
                type="text"
                class="input-code"
                maxlength="1"
                inputmode="numeric"
              />
            </div>

            <button class="verify-btn">Verify &amp; Continue</button>

            <p class="resend">
              Didn't receive the code?
              <a href="#" @click.prevent="resend">Resend code</a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="page-footer">
          <NuxtLink to="/registration/step1" class="back-link">
            <span class="arrow-left">&larr;</span> Back to Step 1
          </NuxtLink>
          <NuxtLink
            to="/registration/step3"
            class="continue-btn"
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
// Nuxt 3 setup

import { ref } from "vue";

const registrationData = useState("registrationData");
const otpDigits = ref(["", "", "", "", "", ""]);

const resend = () => {
  // Resend logic (backend abhi nahi hai)
};

function saveAndContinue() {
  registrationData.value.emailVerification = {
    code: otpDigits.value.join(""),
    verified: true,
  };
}

// const resend = () => {
  // Resend logic
// };
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

/* ===== Main Header (Step 2 of 5) ===== */
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

/* ===== Verify Page ===== */
.verify-page {
  max-width: 1180px;
  margin: 0 auto;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  color: #101828;
}

/* Inner Header */
.inner-header {
  margin-bottom: 1.5rem;
}

.inner-header h1 {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #101828;
}

.inner-header p {
  font-size: 13.5px;
  color: #667085;
  margin: 0 0 24px;
  max-width: 520px;
  line-height: 1.5;
}

/* ===== Hero Panel ===== */
.hero-panel {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 420px;
  display: flex;
  align-items: center;
  isolation: isolate;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(10, 20, 35, 0.55) 0%,
    rgba(10, 20, 35, 0.25) 45%,
    rgba(10, 20, 35, 0.08) 62%
  );
  z-index: -1;
}

/* ===== Hero Copy ===== */
.hero-copy {
  padding: 40px 44px;
  max-width: 380px;
  color: #fff;
}

.hero-copy h2 {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 14px;
}

.hero-copy p {
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
  max-width: 300px;
}

/* ===== Verify Card ===== */
.verify-card {
  margin-left: auto;
  margin-right: 56px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 20px 45px rgba(16, 24, 40, 0.18);
  padding: 36px 40px 32px;
  width: 50%;
  text-align: center;
}

.mail-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #e7ecff;
  color: #3b4cca;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}

.mail-icon svg {
  width: 22px;
  height: 22px;
}

.verify-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #101828;
}

.verify-sub {
  font-size: 13px;
  color: #667085;
  line-height: 1.5;
  margin: 0 0 22px;
}

/* ===== OTP Input ===== */
.code {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 24px;
}

.input-code {
  width: 50px;
  height: 50px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.input-code:focus {
  border-color: #1d2b52;
  box-shadow: 0 0 0 3px rgba(29, 43, 82, 0.12);
}

/* ===== Buttons ===== */
.verify-btn {
  width: 100%;
  background: #101a3d;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.verify-btn:hover {
  opacity: 0.92;
}

.verify-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resend {
  margin: 16px 0 0;
  font-size: 12.5px;
  color: #667085;
}

.resend a {
  color: #3b4cca;
  font-weight: 600;
  text-decoration: none;
}

.resend a:hover {
  text-decoration: underline;
}

/* ===== Footer ===== */
.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eaecf0;
  margin-top: 24px;
  padding-top: 20px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
}

.back-link:hover {
  color: #101828;
}

.continue-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #16a37a;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
  text-decoration: none;
  margin-left: auto;
}

.continue-btn:hover {
  opacity: 0.92;
}

.continue-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-left,
.arrow-right {
  font-size: 14px;
  line-height: 1;
}
@media (max-width: 768px) {
  .registration-container {
    width: 95%;
    padding: 1.8rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }

  .page-header .subhead {
    width: 75%;
  }

  .hero-panel {
    min-height: auto;
    flex-direction: column;
  }

  .hero-copy {
    padding: 28px 24px 0;
    max-width: 100%;
  }

  .hero-copy h2 {
    font-size: 24px;
  }

  .verify-card {
    margin: 24px auto;
    width: calc(100% - 48px);
    padding: 28px 24px 24px;
  }

  .code {
    gap: 10px;
  }

  .input-code {
    width: 42px;
    height: 46px;
    font-size: 16px;
  }

  .page-footer {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }

  .continue-btn {
    justify-content: center;
    margin-left: 0;
  }

  .back-link {
    justify-content: center;
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
    width: 90%;
    font-size: 11px;
  }

  .inner-header h1 {
    font-size: 18px;
  }

  .inner-header p {
    font-size: 12.5px;
  }

  .hero-copy {
    padding: 20px 18px 0;
  }

  .hero-copy h2 {
    font-size: 20px;
  }

  .hero-copy p {
    font-size: 12.5px;
  }

  .verify-card {
    margin: 20px auto;
    width: calc(100% - 24px);
    padding: 24px 18px 20px;
  }

  .mail-icon {
    width: 38px;
    height: 38px;
  }

  .verify-card h3 {
    font-size: 17px;
  }

  .code {
    gap: 6px;
  }

  .input-code {
    width: 36px;
    height: 42px;
    font-size: 16px;
  }
}
@media (max-width: 360px) {
  .code {
    gap: 4px;
  }

  .input-code {
    width: 30px;
    height: 38px;
    font-size: 14px;
  }
}
</style>
