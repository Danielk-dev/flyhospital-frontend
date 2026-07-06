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
        <span class="step-label">Step 5 of 5</span>
        <div class="step-bar">
          <div class="step-progress" style="width: 100%"></div>
        </div>
      </div>

      <!-- ===== CHECKOUT CONTENT ===== -->
      <div class="pm-checkout-wrapper">
        <div class="pm-two-column-layout">
          <!-- Left: Partnership Summary -->
          <div class="pm-order-summary-panel">
            <h2 class="pm-summary-heading">Partnership Summary</h2>

            <div class="pm-premium-badge">
              <span class="pm-badge-shield">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 2.5 16 4.5v4.4c0 4.1-2.6 7.4-6 8.6-3.4-1.2-6-4.5-6-8.6V4.5L10 2.5Z"
                    fill="#fff"
                  />
                  <path d="M7.3 10 9 11.7l3.6-3.9" stroke="#16a37a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              Featured Hospital
            </div>

            <div class="pm-cost-breakdown">
              <div class="pm-cost-item">
                <span class="pm-cost-label">Annual Subscription</span>
                <span class="pm-cost-amount">${{ annualSubscription.toFixed(2) }}</span>
              </div>
              <div class="pm-cost-item">
                <span class="pm-cost-label">Setup Fee</span>
                <span class="pm-cost-amount pm-waived">Free</span>
              </div>
              <div class="pm-cost-item">
                <span class="pm-cost-label">Taxes</span>
                <span class="pm-cost-amount">${{ taxes.toFixed(2) }}</span>
              </div>
            </div>

            <div class="pm-grand-total">
              <span class="pm-total-heading">Total Charges</span>
              <span class="pm-total-figure">${{ totalCharges.toFixed(2) }}</span>
            </div>

            <div class="pm-visual-asset">
              <img
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80"
                alt="Healthcare professional reviewing partnership details on a tablet"
              />
            </div>
          </div>

          <!-- Right: Payment Information -->
          <div class="pm-payment-details-panel">
            <div class="pm-payment-header">
              <h2 class="pm-payment-heading">Payment Information</h2>
              <div class="pm-gateway-label">
                Powered by <strong>Stripe</strong>
              </div>
            </div>

            <form class="pm-payment-form" @submit.prevent="submit">
              <div class="pm-form-group">
                <label class="pm-field-label" for="pm-cardholder">Cardholder Name</label>
                <input
                  id="pm-cardholder"
                  v-model="form.cardholderName"
                  type="text"
                  class="pm-text-input"
                  placeholder="John Doe"
                />
              </div>

              <div class="pm-form-group">
                <label class="pm-field-label" for="pm-card-number">Card Number</label>
                <div class="pm-input-with-icon">
                  <input
                    id="pm-card-number"
                    v-model="form.cardNumber"
                    type="text"
                    class="pm-text-input"
                    placeholder="4242 4242 4242 4242"
                    maxlength="19"
                    @input="formatCardNumber"
                  />
                  <svg class="pm-input-suffix-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4.5" width="16" height="11" rx="1.6" stroke="currentColor" stroke-width="1.3" />
                    <path d="M2 8h16" stroke="currentColor" stroke-width="1.3" />
                  </svg>
                </div>
              </div>

              <div class="pm-form-row">
                <div class="pm-form-group">
                  <label class="pm-field-label" for="pm-expiry">Expiry Date</label>
                  <div class="pm-input-with-icon">
                    <input
                      id="pm-expiry"
                      v-model="form.expiry"
                      type="text"
                      class="pm-text-input"
                      placeholder="MM / YY"
                      maxlength="7"
                      @input="formatExpiry"
                    />
                    <svg class="pm-input-suffix-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2.5" y="3.5" width="15" height="13.5" rx="1.6" stroke="currentColor" stroke-width="1.3" />
                      <path d="M2.5 7.5h15M6 2v3M14 2v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>

                <div class="pm-form-group">
                  <label class="pm-field-label" for="pm-cvc">CVC</label>
                  <div class="pm-input-with-icon">
                    <input
                      id="pm-cvc"
                      v-model="form.cvc"
                      type="text"
                      class="pm-text-input"
                      placeholder="123"
                      maxlength="4"
                      @input="formatCvc"
                    />
                    <svg class="pm-input-suffix-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="8.5" width="12" height="8.5" rx="1.6" stroke="currentColor" stroke-width="1.3" />
                      <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" stroke-width="1.3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="pm-security-badges">
                <span class="pm-security-item">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.5 13 3.5v3.7c0 3.4-2.1 6.1-5 7.1-2.9-1-5-3.7-5-7.1V3.5L8 1.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                  </svg>
                  SSL Secure
                </span>
                <span class="pm-security-item">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="12" height="8" rx="1.4" stroke="currentColor" stroke-width="1.2" />
                    <path d="M4.5 6V4.2A3.5 3.5 0 0 1 11.5 4.2V6" stroke="currentColor" stroke-width="1.2" />
                  </svg>
                  PCI Compliant
                </span>
                <span class="pm-security-item">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2" />
                    <path d="M8 5v3l2 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                  </svg>
                  Encrypted
                </span>
              </div>

              <p class="pm-legal-notice">
                By clicking "Pay &amp; Submit", you agree to our
                <a href="#" class="pm-legal-link">Terms of Service</a>
                and
                <a href="#" class="pm-legal-link">Refund Policy</a>.
              </p>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="pm-navigation-bar">
          <NuxtLink to="/registration/step4" class="pm-back-action">
            <span class="pm-left-arrow">&larr;</span> Back to Step 4
          </NuxtLink>
          <NuxtLink to="/registration/step6" class="pm-primary-action">
            Pay &amp; Submit Partnership <span class="pm-right-arrow">&rarr;</span>
          </NuxtLink>
          <!-- <button type="submit" class="pm-primary-action">
  Pay &amp; Submit Partnership <span class="pm-right-arrow">&rarr;</span>
</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const registrationData = useState('registrationData')

const annualSubscription = computed(() => registrationData.value.plan?.price || 99.0)
const setupFee = 0
const taxes = 0
const totalCharges = computed(() => annualSubscription.value + setupFee + taxes)

const form = reactive({
  cardholderName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
})

function formatCardNumber(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 16)
  form.cardNumber = digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
  form.expiry = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
}

function formatCvc(event) {
  form.cvc = event.target.value.replace(/\D/g, '').slice(0, 4)
}

async function submit() {
  registrationData.value.payment = { ...form, totalCharges: totalCharges.value }

  const finalPayload = { ...registrationData.value }
  console.log('Final Registration Payload:', finalPayload)

  // Backend ready hone par ye call use hoga:
  // const response = await $fetch('/api/registration/submit', {
  //   method: 'POST',
  //   body: finalPayload,
  // })

  navigateTo('/registration/step6')
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

/* ===== CHECKOUT WRAPPER ===== */
.pm-checkout-wrapper {
  max-width: 1180px;
  margin: 0 auto;
  color: #101828;
}

.pm-two-column-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}

/* ===== SUMMARY PANEL ===== */
.pm-order-summary-panel {
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 22px;
}

.pm-summary-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
}

.pm-premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: #344054;
  margin-bottom: 18px;
}

.pm-badge-shield {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #16a37a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-badge-shield svg {
  width: 13px;
  height: 13px;
}

.pm-cost-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eaecf0;
  margin-bottom: 14px;
}

.pm-cost-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
}

.pm-cost-label {
  color: #667085;
}

.pm-cost-amount {
  font-weight: 600;
  color: #101828;
}

.pm-waived {
  color: #2563eb;
}

.pm-grand-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.pm-total-heading {
  font-size: 13px;
  font-weight: 700;
  color: #101828;
}

.pm-total-figure {
  font-size: 19px;
  font-weight: 700;
  color: #101828;
}

.pm-visual-asset {
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.pm-visual-asset img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ===== PAYMENT PANEL ===== */
.pm-payment-details-panel {
  border: 1px solid #eaecf0;
  border-radius: 4px;
  padding: 28px;
}

.pm-payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.pm-payment-heading {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.pm-gateway-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #667085;
  background: #f9fafb;
  border: 1px solid #eaecf0;
  border-radius: 6px;
  padding: 5px 10px;
}

.pm-gateway-label strong {
  color: #635bff;
  font-weight: 700;
}

.pm-payment-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pm-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.pm-form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.pm-field-label {
  font-size: 12.5px;
  font-weight: 600;
  color: #344054;
}

.pm-text-input {
  width: 100%;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  padding: 11px 14px;
  font-size: 13.5px;
  color: #101828;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.pm-text-input::placeholder {
  color: #98a2b3;
}

.pm-text-input:focus {
  border-color: #101a3d;
  box-shadow: 0 0 0 3px rgba(16, 26, 61, 0.1);
}

.pm-input-with-icon {
  position: relative;
}

.pm-input-with-icon .pm-text-input {
  padding-right: 38px;
}

.pm-input-suffix-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  color: #98a2b3;
  pointer-events: none;
}

/* ===== SECURITY BADGES ===== */
.pm-security-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-top: 6px;
  border-top: 1px solid #eaecf0;
  margin-top: 4px;
  padding-top: 18px;
}

.pm-security-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #667085;
}

.pm-security-item svg {
  width: 14px;
  height: 14px;
}

.pm-legal-notice {
  text-align: center;
  font-size: 12px;
  color: #667085;
  margin: 4px 0 0;
  line-height: 1.6;
}

.pm-legal-link {
  color: #344054;
  font-weight: 600;
  text-decoration: underline;
}

/* ===== NAVIGATION FOOTER ===== */
.pm-navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eaecf0;
  margin-top: 24px;
  padding-top: 20px;
}

.pm-back-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
}

.pm-back-action:hover {
  color: #101828;
}

.pm-primary-action {
  display: inline-flex;
  text-decoration: none;
  align-items: center;
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

.pm-primary-action:hover {
  opacity: 0.92;
}

.pm-left-arrow,
.pm-right-arrow {
  font-size: 14px;
  line-height: 1;
}

/* ===== RESPONSIVE ===== */
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

  .pm-two-column-layout {
    grid-template-columns: 1fr;
  }

  .pm-form-row {
    grid-template-columns: 1fr;
  }

  .pm-navigation-bar {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }

  .pm-primary-action {
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

  .pm-payment-details-panel {
    padding: 18px;
  }

  .pm-security-badges {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>