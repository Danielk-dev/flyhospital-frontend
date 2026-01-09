<style>
    @media (max-width: 768px) {
    .hospital-card .location {
        line-height: 18px;
    }
}

</style>
<template>
    <div class="card hospital-card mb-4 p-4">
        <div class="row g-0">
            <!-- Image -->
            <div class="col-md-3 p-3">
                <img :src="hospital.image_urls[0]" :alt="title" class="img-fluid img-fit rounded" loading="lazy"
                    :class="{ 'image-loading': !imageLoaded }" @load="imageLoaded = true" @error="imageLoaded = true" />
            </div>

            <!-- Main Content -->
            <div class="col-md-6 card-body">
                <h5 class="card-title">
                    <NuxtLink :to="`/hospitals/${hospital.id}`" class="text-decoration-none" style="color: #053862;">
                        {{ title }}
                    </NuxtLink>
                </h5>

                <!-- Location -->
                <p class="card-text location mb-2">
                    <Icon name="material-symbols:location-on-outline"
                        style="color:#053862; margin-right:5px; font-size: 18px;" />
                    {{ shortAddress }}
                </p>

                <!-- Description -->
                <p class="card-text description">
                    {{ truncatedDescription }}
                    <span v-if="needsTruncate" @click.prevent="toggleDescription" class="text-primary cursor-pointer">
                        {{ showMore ? " Show less" : " ... Show more" }}
                    </span>
                </p>

                <!-- Info Buttons -->
                <div class="info-buttons d-flex gap-2 flex-wrap">
                    <NuxtLink :to="`tel:${hospital.phone}`" class="btn btn-sm btn-light">
                        <Icon name="bi:telephone" style="color:#053862; margin-right:5px; font-size: 18px;" />
                        Call
                    </NuxtLink>
                    <a :href="hospital.google_map_location" class="btn btn-sm btn-light">
                        <Icon name="material-symbols:location-on-outline"
                            style="color:#053862; margin-right:5px; font-size: 18px;" />
                        Google Map
                    </a>
                    <a :href="hospital.website_url" class="btn btn-sm btn-light">
                        <Icon name="streamline-plump:web-remix"
                            style="color:#053862; margin-right:5px; font-size: 18px;" />
                        Website
                    </a>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-2 col-md-6 col-sm-6 card-body border-start-md d-flex flex-column">
                <!-- Rating -->
                <div>
                    <div v-if="false" class="rating d-flex align-items-center mb-3">
                        <div class="stars text-warning">
                            <template v-for="i in 5" :key="i">
                                <!-- Full star -->
                                <Icon v-if="i <= Math.floor(hospital.average_rating)" name="carbon:star-filled" />

                                <!-- Half star -->
                                <Icon
                                    v-else-if="i === Math.floor(hospital.average_rating) + 1 && (hospital.average_rating % 1) >= 0.5"
                                    name="carbon:star-half" />

                                <!-- Empty star -->
                                <Icon v-else name="carbon:star" />
                            </template>
                        </div>

                        <span class="fw-bold ms-2 me-1 rating">{{ Number(hospital.average_rating).toFixed(1) }}</span>
                        <!-- <span class="text-muted review">{{ hospital.total_reviews }} reviews</span> -->
                    </div>

                    <h6 class="treatment-title">Procedure</h6>

                    <ul class="treatment-list list-unstyled mb-0">
                        <li v-for="treatment in displayedTreatments" :key="treatment.id">
                            <Icon name="material-symbols:check-rounded" class="bg-success" />
                            {{ treatment.name }}
                        </li>
                    </ul>
                    <button v-if="hasMoreTreatments" @click="toggleTreatments"
                        class="btn btn-link btn-sm p-0 text-primary text-decoration-none mt-0"
                        style="font-size: 14px; margin-top: 0 !important;">
                        {{ showAllTreatments ? "Show less" : "Show more" }}
                    </button>
                </div>

                <!-- Details Button pinned to bottom -->
                <NuxtLink :to="`/hospitals/${hospital.id}`" class="btn btn-primary w-100 mt-auto">
                    View Hospital Details
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useCapitalize, useTruncateText } from "~/composables/useHelpers"

const props = defineProps({
    hospital: {
        type: Object,
        required: true,
    },
})

const showMore = ref(false)
const showAllTreatments = ref(false)
const imageLoaded = ref(false)

// Helpers
const title = computed(() => useCapitalize(props.hospital?.title || ""))
const shortAddress = computed(() =>
    useTruncateText(props.hospital?.address || "", 75)
)

// Description logic
const needsTruncate = computed(
    () => props.hospital?.description?.length > 100
)

const truncatedDescription = computed(() => {
    if (showMore.value || !needsTruncate.value) {
        return props.hospital?.description || ""
    }
    return props.hospital?.description.slice(0, 100)
})

const toggleDescription = () => {
    showMore.value = !showMore.value
}

// Treatments logic
const treatments = computed(() => {
    return props.hospital?.treatments || []
})

const hasMoreTreatments = computed(() => {
    return treatments.value.length > 5
})

const displayedTreatments = computed(() => {
    if (showAllTreatments.value || !hasMoreTreatments.value) {
        return treatments.value
    }
    return treatments.value.slice(0, 5)
})

const toggleTreatments = () => {
    showAllTreatments.value = !showAllTreatments.value
}
</script>
