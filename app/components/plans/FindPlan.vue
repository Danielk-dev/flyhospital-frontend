<template>
  <section class="find-plan-section">
    <!-- Header -->
    <div class="header">
      <h1>Find Your Plan: 3 Easy steps</h1>
      <p class="subtitle">(steps copy here)</p>
    </div>

    <!-- Content -->
    <div class="content">
      
      <!-- Left Side Steps -->
      <div class="steps">

        <div class="step-card1">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Find Your Plan</h3>
            <p>
              To locate a hospital on our website, simply use the search bar
              at the top of the page. Enter the name of the hospital or your
              location, and hit search. You can also browse through our
              directory for a comprehensive list of facilities.
            </p>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Check Coverage Options</h3>
            <p>
              To understand your insurance coverage, review your policy
              documents or contact customer service. Our representatives are
              available to explain the benefits available to you and how they
              apply when visiting a hospital.
            </p>
          </div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Schedule an Appointment</h3>
            <p>
              Once you have selected a hospital, call the facility or use
              their online portal to schedule an appointment. Be sure to have
              your insurance information ready, as well as any necessary
              referrals from your primary care physician.
            </p>
          </div>
        </div>

      </div>

      <!-- Right Side Image -->
      
       <div class="image-container">
  <img src="@/assets/img/Mask-group.png" alt="Hospital reception" />
</div>

    </div>
  </section>
</template>

<script setup>
// No script needed for static component
</script>

<style scoped>
.find-plan-section {
  max-width: 1488px;          /* matches your Figma content width */
  width: 90%;
  margin: 0 auto;
  padding: 6rem 0;
  background-color: white;
  font-family: 'Inter', Arial, sans-serif;
}

/* ================= HEADER ================= */

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.header h1 {
  font-weight: 700;
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.2;
  color: #111;
  margin: 0;
}

.subtitle {
  color: #777;
  font-size: clamp(0.8rem, 1.2vw, 0.95rem);
  margin-top: 0.5rem;
}

/* ================= CONTENT LAYOUT ================= */

.content {
  display: flex;
  gap: 4rem;
  align-items: stretch; /* equal height columns */
}

/* ================= LEFT SIDE ================= */

.steps {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-card1,
.step-card {
  display: flex;
  gap: 1.25rem;
  background: #ffffff;
  padding: 1.75rem;
  border-radius: 0.75rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.step-card1 {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.step-number {
  background-color: #0f3d63;
  color: white;
  font-weight: 600;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step-content h3 {
  font-weight: 700;
  font-size: clamp(1.2rem, 2vw, 2rem);
  line-height: 1.4;
  color: #053862;
  margin: 0 0 0.5rem 0;
}

.step-content p {
  margin: 0;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 400;
  color: #333;
  line-height: 1.6;
}

/* ================= RIGHT SIDE IMAGE ================= */

.image-container {
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden; /* important */
  border-radius: 1.25rem;
}

.image-container img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;       /* fills container */
  object-position: center; /* keep image centered */
  transform: scale(0.9);   /* reduce zoom */
}

/* ================= LARGE SCREENS (1600px+) ================= */

@media (min-width: 1600px) {
  .content {
    gap: 6rem;
  }
}

/* ================= TABLET ================= */

@media (max-width: 992px) {
  .content {
    flex-direction: column;
    gap: 3rem;
  }

  .image-container {
    height: 400px; /* fixed nice proportion on tablet */
  }
}

/* ================= MOBILE ================= */

@media (max-width: 576px) {

  .find-plan-section {
    padding: 3rem 0;
  }

  .step-card1,
  .step-card {
    flex-direction: column;
    padding: 1.25rem;
  }

  .step-number {
    width: 3rem;
    height: 3rem;
  }

  .image-container {
    height: 280px;
  }
}
</style>