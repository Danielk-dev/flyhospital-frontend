<template>
    <section class="info-section">
        <div class="container info-content">
            <div class="info-icon">
                <img 
                    src="~/assets/img/globe.png" 
                    alt="Globe with heart icon"
                    loading="lazy"
                    :class="{ 'image-loading': !imageLoaded }"
                    @load="imageLoaded = true"
                    @error="imageLoaded = true"
                >
            </div>
            <div class="info-text">
                <h2><span>ClickHospitals</span> is an international platform for hospital search and treatment
                    arrangement
                </h2>
            </div>
            <div class="info-description">
                <p>We designed ClickHospitals to simplify global medical discovery. Whether you're seeking advanced
                    procedure, lower costs, or expert care in another country, our platform connects you with
                    verified
                    hospitals worldwide.</p>
                <a href="#">Learn More</a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const imageLoaded = ref(false)
</script>