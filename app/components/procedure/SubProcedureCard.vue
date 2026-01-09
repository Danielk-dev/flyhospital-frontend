<template>
        <div class="col">
          <NuxtLink :to="`/all-procedure/${encodeURIComponent(treatment.name)}`">

            <div>
                <div class="card card-custom">
                    <img 
                        :src="treatment.image_url" 
                        class="card-img-top card-img-top-custom" 
                        alt="Knee Replacement"
                        loading="lazy"
                        :class="{ 'image-loading': !imageLoaded }"
                        @load="imageLoaded = true"
                        @error="imageLoaded = true"
                    >
                </div>
                <div class="card-body card-body-custom">
                    <p class="card-text">{{ treatment.name }}</p>
                </div>
            </div>
            </NuxtLink>
        </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCapitalize, useTruncateText } from "~/composables/useHelpers"
 const config = useRuntimeConfig()
const props = defineProps({
    treatment: {
        type: Object,
        required: true,
    },
})

const imageLoaded = ref(false)
</script>

<style>
    .card-custom img{
        width: 100%;
        height: 173px;
    }

    .card-custom {
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #dee2e6; /* Light border */
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Subtle shadow */
        transition: transform 0.2s ease-in-out;
        height: 100%; /* Ensure cards in a row have equal height */
    }

    .card-custom:hover {
        transform: translateY(-5px); /* Slight lift on hover */
    }

    .card-img-top-custom {
        width: 100%;
        height: 100%; /* Fixed height for image consistency */
        object-fit: cover; /* Cover the area, cropping if necessary */
    }

    .card-body-custom {
        padding: 1rem;
       
        font-weight: bold;
        color: #0d2d52;
    }

    /* Responsive adjustments */
    @media (max-width: 767.98px) {
        .card-img-top-custom {
            height: 180px; /* Slightly taller on small screens */
        }
    }
</style>