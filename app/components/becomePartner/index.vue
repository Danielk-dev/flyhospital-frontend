<template>
  <div class="registration-page">
    <div class="registration-card">
      <!-- Header -->
      <header class="page-header">
        <h1>
          Welcome to <br />
          ClickHospitals Partnership Registration!
        </h1>
        <span class="subhead">
          <i class="fas fa-clinic-medical"></i>
          Create an account to become our partner and list your clinic on
          ClickHospitals in 4 simple steps.
        </span>
      </header>

      <!-- Plans Grid -->
      <div class="plans-grid">
        <!-- Basic Plan -->
        <div class="plan-card basic">
          <div class="plan-header">
            <h2 class="plan-title">STARTER</h2>
            <p class="plan-subtitle">Basic Directory Listing</p>
            <div class="plan-price">
              <span class="price">$0</span>
              <span class="period">/year</span>
            </div>
            <p class="plan-description">
              Perfect for hospitals wanting an online presence.
            </p>
          </div>

          <ul class="feature-list">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Hospital profile page
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Contact information
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Specialties & treatments
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Photos & logo
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Website & social links
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Location on map
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Inquiry form
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Manage profile through dashboard
            </li>
          </ul>

          <!-- <NavLink class="btn btn-basic">
            <i class="fas fa-arrow-right"></i> Choose Basic
          </NavLink> -->
          <NuxtLink to="/registration/step1" class="btn btn-basic" @click="selectPlan('Basic', 0)">
            <i class="fas fa-arrow-right"></i> Choose Basic
          </NuxtLink>
        </div>

        <!-- Featured Plan -->
        <div class="plan-card featured">
          <div class="plan-header">
            <div class="badge">FEATURED PARTNER</div>
            <p class="plan-subtitle">Featured Hospital</p>
            <div class="plan-price">
              <span class="price">$499</span>
              <span class="period">/year</span>
            </div>
            <p class="plan-description">
              Everything in Basic, plus additional visibility across
              ClickHospitals
            </p>
          </div>

          <ul class="feature-list">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Featured badge
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Priority placement in search results
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Featured on country & city pages
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Homepage featured rotations
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Featured in specialty pages
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Premium profile layout
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="white"
                  stroke-width="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Priority support
            </li>
          </ul>
          <NuxtLink to="/registration/step1" class="btn btn-featured" @click="selectPlan('Featured', 499)">
            <i class="fas fa-arrow-right"></i> Choose Featured
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 setup – no additional logic needed for static template
// Global state jo poore registration flow mein share hoga
const registrationData = useState("registrationData", () => ({
  plan: null,
  personalInfo: {},
  emailVerification: {},
  facility: {},
  media: {},
  payment: {},
}));

function selectPlan(planName, price) {
  registrationData.value.plan = { name: planName, price };
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  padding-bottom: 5px;
}

svg {
  padding-right: 5px;
  padding-bottom: 2px;
  width: 22px;
  height: 22px;
}

.registration-page {
  letter-spacing: 1px;
  background: transparent;
  display: flex;
  border: none;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
}

.registration-card {
  text-align: center;
  width: 100%;
  background: none;
  padding: 2.8rem 3rem;
  transition: all 0.2s;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
  justify-content: center;
}

.page-header h1 {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0b2b4a;
  line-height: 1.2;
}

.subhead {
  margin: auto;
  margin-bottom: 80px;
}

.page-header .subhead {
  text-align: center;
  justify-content: center;
  display: flex;
  font-size: 12px;
  width: 40%;
  color: #3e5a70;
  font-weight: 400;
  margin-top: 0.4rem;
  max-width: 700px;
}

.page-header .subhead i {
  text-align: center;
  color: #0a7e8c;
  margin-right: 0.4rem;
  justify-content: center;
  display: flex;
}

.plans-grid {
  display: flex;
  justify-content: center;
  margin: 1.8rem 0 2.2rem;
}

.plan-card {
  background: none;
  border-radius: 5px;
  border: 1px solid #e4ebf3;
  padding: 2rem 2rem 2.2rem;
  flex-direction: column;
  transition:
    box-shadow 0.2s,
    border-color 0.2s,
    transform 0.15s;
  position: relative;
  width: 33%;
  padding: 2rem;
  margin-left: 20px;
}

.plan-card:hover {
  border-color: #cbd8e6;
  box-shadow: 0 16px 32px -8px rgba(10, 126, 140, 0.08);
  transform: translateY(-2px);
}

/* Card 2 - Featured */
.plan-card.featured {
  background-color: #012147;
  border-color: #012147;
  color: #ffffff;
}

.plan-card.featured .plan-title {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.plan-card.featured .plan-subtitle,
.plan-card.featured .price,
.plan-card.featured .period,
.plan-card.featured .plan-description,
.plan-card.featured .feature-list li {
  color: #ffffff;
}

.plan-card.featured .badge {
  background: #1f9479;
  color: white;
}

.plan-card.featured .btn-featured {
  background: #1f9479;
  color: #ffffff;
}

.plan-card.featured .btn-featured:hover {
  background: #166b57;
}

.plan-card.featured:hover {
  border-color: #012147;
  box-shadow: 0 20px 40px -10px rgba(1, 33, 71, 0.4);
}

.badge {
  text-align: right;
  background: #1f9479;
  color: white;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  padding: 8px 1rem;
  border-radius: 10px;
  display: flex;
  width: fit-content;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

.plan-header {
  margin-bottom: 1.5rem;
}

.plan-title {
  background-color: #e7e8e9;
  font-size: 10px;
  width: 70px;
  margin-bottom: 25px;
  border-radius: 8px;
  padding: 0.2rem 0.6rem;
  font-weight: 700;
  color: #585b62;
  text-align: left;
  letter-spacing: -0.01em;
}

.plan-subtitle {
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  color: #203d5e;
  margin-top: 0.1rem;
}

.plan-price {
  margin: 1rem 0 0.5rem;
  text-align: left;
}

.plan-price .price {
  font-size: 2.6rem;
  font-weight: 700;
  color: #0b2b4a;
  letter-spacing: -0.02em;
}

.plan-price .period {
  font-size: 1rem;
  font-weight: 500;
  color: #5f7b94;
  margin-left: 0.2rem;
}

.plan-description {
  font-size: 12px;
  display: flex;
  justify-content: left;
  text-align: left;
  color: #3e5a70;
  line-height: 1.5;
  margin-top: 1.2rem;
  border-bottom: 0.5px solid #555758;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #1d3b53;
}

.feature-list li:last-child {
  border-bottom: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-top: 0.5rem;
}

.btn-basic {
  background: #eef3f9;
  color: #0b2b4a;
}

.btn-basic:hover {
  background: #e2eaf3;
  transform: scale(1.01);
}

.btn-featured {
  background: #0a7e8c;
  color: white;
  box-shadow: 0 6px 16px rgba(10, 126, 140, 0.25);
}

.btn-featured:hover {
  background: #086c79;
  box-shadow: 0 8px 24px rgba(10, 126, 140, 0.35);
  transform: scale(1.01);
}

.btn i {
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .registration-card {
    padding: 2rem 1.8rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .registration-card {
    padding: 1.8rem 1.5rem;
  }

  .plans-grid {
    flex-direction: column;
    align-items: center;
    gap: 2.2rem;
  }

  .plan-card {
    width: 90%;
    margin-left: 0;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .page-header .subhead {
    font-size: 1rem;
  }

  .plan-card {
    padding: 1.8rem 1.5rem;
  }

  .plan-price .price {
    font-size: 2.2rem;
  }

  .badge {
    right: 1.2rem;
    top: -0.6rem;
    font-size: 0.65rem;
    padding: 0.2rem 1rem;
  }
}

@media (max-width: 480px) {
  .registration-page {
    padding: 1rem 0.8rem;
  }

  .registration-card {
    padding: 1.5rem 1rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header .subhead {
    font-size: 0.9rem;
  }

  .plan-title {
    font-size: 1.1rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
  }

  .feature-list li {
    font-size: 0.88rem;
  }
}
</style>
