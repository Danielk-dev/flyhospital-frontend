<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-about">
                    <div class="footer-logo">
                        <img 
                            src="~assets/img/logo.png" 
                            alt="ClickHospitals Logo"
                            loading="eager"
                            :class="{ 'image-loading': !imageLoaded }"
                            @load="imageLoaded = true"
                            @error="imageLoaded = true"
                        >
                        <span>ClickHospitals</span>
                    </div>
                    <p>Your partner in trusted medical care. Find hospitals by procedure & location.</p>
                    <p>
                        Call us: +1(734)-447-5890<br>
                        Email: contact@ClickHospitals.com
                    </p>
                </div>

                <div class="footer-links-container">
                    <div class="link-column">
                        <h4>Platform</h4>
                        <ul>
                            <li><NuxtLink to="#">Locations</NuxtLink></li>
                            <li><NuxtLink to="#">Procedure</NuxtLink></li>
                            <li><NuxtLink to="#">How It Works</NuxtLink></li>
                            <li><NuxtLink to="#">Submit Hospital Listing</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>Quick links</h4>
                        <ul>
                           <li><NuxtLink to="#">Medical Tourism</NuxtLink></li>
                                <li><NuxtLink to="#">Tourism Guide</NuxtLink></li>
                                <li><NuxtLink to="#">Tourism Facts</NuxtLink></li>
                                <li><NuxtLink to="#">Blogs</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>Legal</h4>
                        <ul>
                            <li><NuxtLink to="#">Privacy Policy</NuxtLink></li>
                            <li><NuxtLink to="#">Terms of Use</NuxtLink></li>
                            <li><NuxtLink to="#">Disclaimer</NuxtLink></li>
                            <li><NuxtLink to="#">Cookie Policy</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>Support</h4>
                        <ul>
                            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
                            <li><NuxtLink to="#">FAQs</NuxtLink></li>
                            <li><NuxtLink to="#">Help Center</NuxtLink></li>
                            <li><NuxtLink to="#">Partner With Us</NuxtLink></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">Copyrights © 2025 ClickHospitals</p>
                <div class="social-icons">
                   <NuxtLink to="#" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5a3.5
                            3.5 0 0 0-3.5 3.5V11h-2v3h2v7h3v-7h3v-3h-3V8.5A1.5 1.5 0 0 1 15.5 7H18V5z" />
                        </svg>
                    </NuxtLink>

                    <NuxtLink to="#" aria-label="Twitter">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                            d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                        </svg>
                    </NuxtLink>

                   <NuxtLink to="#" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-3.1v8.69h3.1v-4.35c0-.79.33-1.55 1.15-1.55.82 0 1.15.76 1.15 1.55v4.35h3.11M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m-1.39 2.04h2.77v8.69H5.49v-8.69z" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { ref } from 'vue'

const imageLoaded = ref(false)
</script>