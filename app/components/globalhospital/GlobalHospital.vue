<template>
  <section class="global-section">
    <div class="container">

      <div class="card">

        <!-- Globe Image -->
        <div class="image-wrapper">
          <img src="@/assets/img/bg-removel.png" alt="Globe" />
        </div>

        <!-- Content -->
        <div class="content">
          <h2>Explore The Global Hospital</h2>
          <p>
            Discover top-notch hospitals around the globe offering exceptional medical treatments.<br />
            Explore your options for world-class healthcare wherever you are!
          </p>
          <button>View All Procedure</button>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

/* ===== SECTION ===== */
.global-section {
  background: white;
  padding: 180px 0 80px;
}

/* ===== CONTAINER ===== */
.container {
  max-width: 1488px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== CARD ===== */
.card {
  position: relative;
  background: #053862;
  border-radius: 50px;
  padding: 220px 40px 80px; /* space for image */
  text-align: center;
  overflow: visible; 
  
}

.card::before {
  content: "";
  position: absolute;
  top: -220px;          /* move it higher to enlarge curve */
  left: 50%;
  transform: translateX(-50%);
  width: 500px;         /* wider curve */
  height: 420px;        /* taller curve */
  background: rgb(255, 255, 255); 
  border-bottom-left-radius: 250px;   
  border-bottom-right-radius: 250px;  
  z-index: 1;
  
}

.card::before {
  background:white; /* same as card */
}
/* ===== IMAGE WRAPPER ===== */
.image-wrapper {
  position: absolute;
  top: -180px;   
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 350px;
  z-index: 2;
   border-radius: 50%;  
  overflow: hidden;    /* hide anything outside */
  background:white; /* same as card */
}

/* ===== IMAGE ===== */
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
   box-shadow: 0px 44px 84px 0px #01020266; 
   animation: rotateGlobe 30s linear infinite;
  transform-origin: center;
  will-change: transform;
}
/* Rotation Animation */
@keyframes rotateGlobe {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* ===== CONTENT ===== */
.content h2 {
  font-size: 60px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 10px;
  margin-top: 35px;
}

.content p {
  max-width: 750px;
  margin: 0 auto 40px;
  font-size: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.content button {
  padding: 14px 32px;
  background: #ffffff;
  color: #053862;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.content button:hover {
  background: #e6e6e6;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {

  .card {
    padding: 130px 20px 60px;
  }

  .card::before {
    width: 240px;
    height: 150px;
    border-bottom-left-radius: 120px;
    border-bottom-right-radius: 120px;
  }

  .image-wrapper {
    width: 200px;
    height: 200px;
    top: -100px;
  }

  .content h2 {
    font-size: 28px;
  }

  .content p {
    font-size: 16px;
  }
}

</style>