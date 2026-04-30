<template>
    <main class="container mt-4">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
            { label: 'Home', link: '/' },
            { label: 'Hospitals', link: '/hospitals' },
            { label: title, active: true }
        ]" />

        <template v-if="pending || store.loader">
            <div class="text-center py-5" style="position: relative; min-height: 400px;">
                <Loader />
            </div>
        </template>

        <template v-else>
            <!-- Image Gallery -->
            <div class="image-gallery my-4">
                <div v-if="(hospital as any)?.image_urls?.length" class="main-image">
                    <img :src="(hospital as any).image_urls[0]" :alt="title" loading="lazy"
                        :class="{ 'image-loading': !imageLoaded.main }" @load="imageLoaded.main = true"
                        @error="imageLoaded.main = true" />
                </div>
                <!-- Thumbnails (all others) -->
                <div v-if="(hospital as any)?.image_urls?.length > 1" class="thumbnail-grid">
                    <img v-for="(img, index) in (hospital as any).image_urls.slice(1)" :key="index" :src="img"
                        :alt="`${title} thumbnail ${index + 1}`" loading="lazy"
                        :class="{ 'image-loading': !imageLoaded.thumbnails[index] }"
                        @load="imageLoaded.thumbnails[index] = true" @error="imageLoaded.thumbnails[index] = true" />
                </div>
            </div>

            <!-- Tabs -->
            <ul class="nav page-tabs mb-4">
                <li class="nav-item">
                    <NuxtLink class="nav-link active" to="#overview">Overview</NuxtLink>
                </li>
                <!-- <li class="nav-item">
                <NuxtLink class="nav-link" to="#facilities">Facility Services</NuxtLink>
            </li> -->
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="#procedures">Procedures</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="#medical-staff">Medical Staff</NuxtLink>
                </li>
                <!-- <li class="nav-item">
                <NuxtLink class="nav-link" to="#reviews">Reviews</NuxtLink>
            </li> -->
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="#hotels">Nearby Hotels</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="#restaurants">Nearby Restaurants</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="#how-to-get-there">How to get there</NuxtLink>
                </li>
            </ul>

            <div id="overview" class="row">
                <!-- Left Column: Details -->
                <div class="col-lg-8">
                    <!-- Title & Basic Info -->
                    <div class="mb-4 section-base">
                        <div class="hospital-location-section">
                            <Icon name="material-symbols:location-on-outline" style="color:#053862;" />
                            <p class="text-muted ms-0 ps-2">{{ (hospital as any)?.address || '' }}</p>
                        </div>
                        <div class="hospital-title-section">
                            <h2>{{ title }}</h2>
                        </div>
                    </div>

                    <div class="card card-body rating-summary-card mb-4">
                        <!-- Row 1: Rating + Reviews + Categories -->
                        <div class="row w-100 mb-3 g-2">
                            <!-- Left side: Rating + Reviews -->
                            <div class="col-12 col-md-2 align-items-center">
                                <!-- Rating -->
                                <div class="rating-item">
                                    <div class="value">{{ Number((hospital as any)?.rating || 0).toFixed(1) }}
                                    </div>
                                    <div class="stars text-warning">
                                        <template v-for="i in 5" :key="i">
                                            <!-- Full star -->
                                            <Icon v-if="i <= Math.floor((hospital as any)?.rating || 0)"
                                                name="carbon:star-filled" />

                                            <!-- Half star -->
                                            <Icon
                                                v-else-if="i === Math.floor((hospital as any)?.rating || 0) + 1 && ((hospital as any)?.rating % 1) >= 0.5"
                                                name="carbon:star-half" />

                                            <!-- Empty star -->
                                            <Icon v-else name="carbon:star" />
                                        </template>
                                    </div>
                                    <div>
                                        <span style="font-size: 13px;">Google Ratings</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Right side: Categories -->
                            <div
                                class="col-12 col-md-9 d-flex flex-wrap align-items-center category-card-wrapper gap-2 ml-4">
                                <span class="category-card">Doctor <span>{{ (hospital as any)?.staff_count || 0
                                }}</span></span>
                                <span class="category-card">Facilities <span>4.8</span></span>
                                <span class="category-card">Staff <span>4.9</span></span>
                                <span class="category-card">Language assistance <span>4.8</span></span>
                                <span class="category-card">Support <span>4.9</span></span>
                            </div>
                        </div>

                        <!-- Row 2: Contact Info -->
                        <div class="row w-100">
                            <div class="col-12">
                                <ul class="hospital-contact-info list-unstyled mb-0 d-flex flex-wrap gap-4">
                                    <li v-if="(hospital as any)?.phone">
                                        <NuxtLink :to="`tel:${(hospital as any).phone}`">
                                            <Icon name="bi:telephone"
                                                style="color:#053862; margin-right:5px; font-size: 18px;" />
                                            <span class="text-dark cursor-pointer">{{ (hospital as any).phone }}</span>
                                        </NuxtLink>
                                    </li>
                                    <li v-if="(hospital as any)?.address">
                                        <NuxtLink
                                            :to="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((hospital as any).location || (hospital as any).address)}`">
                                            <Icon name="material-symbols:location-on-outline"
                                                style="color:#053862; margin-right:5px; font-size: 18px;" />
                                            <span class="text-dark cursor-pointer">{{ (hospital as any).address
                                            }}</span>
                                        </NuxtLink>
                                    </li>
                                    <li v-if="(hospital as any)?.website_url">
                                        <NuxtLink :to="`${(hospital as any).website_url}`" target="_blank">
                                            <Icon name="streamline-plump:web-remix"
                                                style="color:#053862; margin-right:5px; font-size: 18px;" />
                                            <span class="text-dark cursor-pointer">Website</span>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- About -->
                    <div class="mb-5 pb-5 section-base">
                        <h3 class="section-title">About the hospital</h3>
                        <p class="about-text">
                            {{ truncatedDescription }}
                            <span v-if="needsTruncate" @click.prevent="toggleDescription"
                                class="text-primary cursor-pointer">
                                {{ showMore ? " Show less" : " ... Show more" }}
                            </span>
                        </p>

                        <ul class="list-unstyled">
                            <li class="info d-flex">
                                <svg width="20" height="20" viewBox="0 0 23 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.417 22.5H4.00033C3.38149 22.5 2.78799 22.2542 2.35041 21.8166C1.91282 21.379 1.66699 20.7855 1.66699 20.1667V6.16667C1.66699 5.54783 1.91282 4.95434 2.35041 4.51675C2.78799 4.07917 3.38149 3.83333 4.00033 3.83333H18.0003C18.6192 3.83333 19.2127 4.07917 19.6502 4.51675C20.0878 4.95434 20.3337 5.54783 20.3337 6.16667V13.1667M15.667 1.5V6.16667M6.33366 1.5V6.16667M1.66699 10.8333H20.3337M14.5003 20.1667L16.8337 22.5L21.5003 17.8333"
                                        stroke="#053862" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>

                                <span v-if="(hospital as any)?.foundation_year">
                                    {{ new Date().getFullYear() - new Date((hospital as
                                        any).foundation_year).getFullYear() }}'th Year
                                    of Foundation
                                </span>
                            </li>
                            <li class="info d-flex" v-if="(hospital as any)?.staff_count">
                                <svg width="20" height="20" viewBox="0 0 23 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.26673 12.0667C6.02905 12.0667 4.84207 11.575 3.9669 10.6998C3.09173 9.82466 2.60006 8.63768 2.60006 7.4V3.66667C2.60006 3.41913 2.6984 3.18174 2.87343 3.0067C3.04847 2.83167 3.28586 2.73334 3.5334 2.73334H4.46673C4.71427 2.73334 4.95166 2.635 5.1267 2.45997C5.30173 2.28493 5.40006 2.04754 5.40006 1.8C5.40006 1.55247 5.30173 1.31507 5.1267 1.14004C4.95166 0.965002 4.71427 0.866669 4.46673 0.866669H3.5334C2.79079 0.866669 2.0786 1.16167 1.5535 1.68677C1.0284 2.21187 0.733398 2.92406 0.733398 3.66667V7.4C0.734598 8.45442 0.991719 9.4928 1.48268 10.4259C1.97364 11.3591 2.68376 12.1591 3.55206 12.7573C4.38714 13.4921 5.06427 14.3889 5.54237 15.3932C6.02047 16.3976 6.28959 17.4885 6.3334 18.6C6.3334 20.3328 7.02173 21.9945 8.24697 23.2198C9.47221 24.445 11.134 25.1333 12.8667 25.1333C14.5995 25.1333 16.2613 24.445 17.4865 23.2198C18.7117 21.9945 19.4001 20.3328 19.4001 18.6V17.536C20.2799 17.3088 21.0466 16.7686 21.5566 16.0165C22.0666 15.2645 22.2848 14.3522 22.1703 13.4508C22.0558 12.5494 21.6165 11.7207 20.9347 11.12C20.2529 10.5193 19.3754 10.1879 18.4667 10.1879C17.5581 10.1879 16.6806 10.5193 15.9988 11.12C15.317 11.7207 14.8776 12.5494 14.7632 13.4508C14.6487 14.3522 14.8669 15.2645 15.3768 16.0165C15.8868 16.7686 16.6536 17.3088 17.5334 17.536V18.6C17.5334 19.8377 17.0417 21.0247 16.1666 21.8998C15.2914 22.775 14.1044 23.2667 12.8667 23.2667C11.6291 23.2667 10.4421 22.775 9.5669 21.8998C8.69173 21.0247 8.20006 19.8377 8.20006 18.6C8.24623 17.4872 8.51826 16.3953 8.99961 15.3909C9.48097 14.3865 10.1616 13.4905 11.0001 12.7573C11.8649 12.157 12.5714 11.3561 13.0591 10.4231C13.5467 9.49007 13.801 8.45277 13.8001 7.4V3.66667C13.8001 2.92406 13.5051 2.21187 12.98 1.68677C12.4549 1.16167 11.7427 0.866669 11.0001 0.866669H10.0667C9.8192 0.866669 9.5818 0.965002 9.40676 1.14004C9.23173 1.31507 9.1334 1.55247 9.1334 1.8C9.1334 2.04754 9.23173 2.28493 9.40676 2.45997C9.5818 2.635 9.8192 2.73334 10.0667 2.73334H11.0001C11.2476 2.73334 11.485 2.83167 11.66 3.0067C11.8351 3.18174 11.9334 3.41913 11.9334 3.66667V7.4C11.9334 8.01284 11.8127 8.61967 11.5782 9.18586C11.3436 9.75204 10.9999 10.2665 10.5666 10.6998C10.1332 11.1332 9.61877 11.4769 9.05259 11.7114C8.4864 11.946 7.87957 12.0667 7.26673 12.0667ZM18.4667 15.8C17.9717 15.8 17.4969 15.6033 17.1468 15.2533C16.7967 14.9032 16.6001 14.4284 16.6001 13.9333C16.6001 13.4383 16.7967 12.9635 17.1468 12.6134C17.4969 12.2633 17.9717 12.0667 18.4667 12.0667C18.9618 12.0667 19.4366 12.2633 19.7867 12.6134C20.1367 12.9635 20.3334 13.4383 20.3334 13.9333C20.3334 14.4284 20.1367 14.9032 19.7867 15.2533C19.4366 15.6033 18.9618 15.8 18.4667 15.8Z"
                                        fill="#053862" />
                                </svg>

                                <span>{{ (hospital as any).staff_count || 0 }} doctors</span>
                            </li>

                            <div id="procedures"></div>
                            <div id="medical-staff"></div>
                        </ul>
                    </div>


                    <!-- Procedures -->
                    <div class="mb-5 pb-5 section-base custom-collapse" v-if="(hospital as any)?.treatments?.length">
                        <h3 class="section-title">Departments</h3>

                        <Accordion parent v-for="treatment in (hospital as any).treatments" :key="treatment.id">
                            <AccordionSection :title="treatment.name" :key="treatment.id" :active="true">

                                <!-- Tabs -->
                                <ul class="nav nav-tabs mb-3" :key="treatment.id">
                                    <li class="nav-item tab">
                                        <a class="nav-link"
                                            :class="{ active: activeTab[treatment.id] === 'procedures' }" href="#"
                                            @click.prevent="activeTab[treatment.id] = 'procedures'">
                                            Procedures
                                        </a>
                                    </li>
                                    <li class="nav-item tab">
                                        <a class="nav-link" :class="{ active: activeTab[treatment.id] === 'staff' }"
                                            href="#" @click.prevent="activeTab[treatment.id] = 'staff'">
                                            Medical Staff
                                        </a>
                                    </li>
                                </ul>

                                <!-- Tab Content -->
                                <div v-show="activeTab[treatment.id] === 'procedures'" class="row mt-5 px-3">
                                    <div class="col-md-4 mb-3" v-for="subtreatment in treatment.children"
                                        :key="subtreatment.id">
                                        <span>{{ subtreatment.name }}</span>
                                    </div>
                                </div>

                                <div v-show="activeTab[treatment.id] === 'staff'" class="row mb-2">
                                    <div class="accordion-body">
                                        <div class="staff-member" v-for="staff in treatment?.staff || []"
                                            :key="staff?.id">
                                            <img :src="staff?.media?.[0]?.original_url || 'https://admin.clickhospitals.com/dumy.jpg'"
                                                :alt="staff?.name || 'Doctor'" loading="lazy"
                                                :class="{ 'image-loading': !imageLoaded.staff[staff?.id] }"
                                                @load="imageLoaded.staff[staff?.id] = true"
                                                @error="imageLoaded.staff[staff?.id] = true">
                                            <div class="staff-info">
                                                <h6>{{ staff?.name || 'Unknown' }}</h6>
                                                <p>
                                                <p v-for="ts in staff?.treatment || []" :key="ts?.id">
                                                    {{ ts?.name }}{{ staff?.description }}
                                                </p>
                                                </p>
                                                <p>{{ staff?.description || '' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionSection>
                        </Accordion>
                    </div>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="col-lg-4">
                    <div class="card card-body sidebar-card">
                        <div class="map-placeholder mb-3" v-if="(hospital as any)?.image_urls?.[0]">
                            <img :src="(hospital as any).image_urls[0]" :alt="title" loading="lazy"
                                :class="{ 'image-loading': !imageLoaded.sidebar }" @load="imageLoaded.sidebar = true"
                                @error="imageLoaded.sidebar = true" />
                        </div>
                        <div class="hospital-header d-flex align-items-center justify-content-between">
                            <h5 class="hospital-name text-truncate">
                                {{ title }}
                            </h5>
                            <div class="rating d-flex align-items-center ms-2">
                                <div class="rating-score">{{ Number((hospital as any)?.average_rating || 0).toFixed(1)
                                }}</div>
                                <Icon name="carbon:star-filled" class="stars text-warning" />
                            </div>
                        </div>
                        <div class="hospital-location-section">
                            <Icon name="material-symbols:location-on-outline" style="color:#053862;" />
                            <p class="text-muted ms-0 ps-2">{{ shortAddress }}</p>
                        </div>
                        <!-- Info Buttons -->
                        <div class="info-buttons d-flex gap-2 flex-wrap" style="margin-top: 10px;">
                            <NuxtLink v-if="(hospital as any)?.phone" :to="`tel:${(hospital as any).phone}`"
                                class="btn btn-sm btn-light">
                                <Icon name="bi:telephone" style="color:#053862; margin-right:5px; font-size: 18px;" />
                                Call
                            </NuxtLink>

                            <NuxtLink v-if="(hospital as any)?.website_url" :to="`${(hospital as any).website_url}`"
                                target="_blank" class="btn btn-sm btn-light">
                                <Icon name="streamline-plump:web-remix"
                                    style="color:#053862; margin-right:5px; font-size: 18px;" />
                                Website
                            </NuxtLink>
                            <a v-if="(hospital as any)?.google_map_location"
                                :href="(hospital as any).google_map_location" target="_blank"
                                class="btn btn-sm btn-light">
                                <Icon name="material-symbols:location-on-outline"
                                    style="color:#053862; margin-right:5px; font-size: 18px;" />
                                Google Map
                            </a>
                        </div>
                    </div>
                </div>

                <!--=============== POPULAR RESTAURENTS SECTION ===============-->
                <LazyRestaurentSection id="restaurants" v-if="(hospital as any)?.restaurants?.length > 0"
                    :restaurants="(hospital as any).restaurants" />

                <!--=============== POPULAR HOTELS SECTION ===============-->
                <HotelSection id="hotels" v-if="(hospital as any)?.hotels?.length > 0"
                    :hotels="(hospital as any).hotels" />

                <!--=============== POPULAR TRANSPORT SECTION ===============-->
                <TransportSection id="how-to-get-there" title="How to get there"
                    description="Get convenient transport near the hospital."
                    v-if="(hospital as any)?.transports?.length > 0" :items="hospital.transports" />
            </div>
        </template>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useHospitalListStore } from '~/stores/hospitallist'
import { useRoute } from 'vue-router'
import Loader from '~/components/Loader.vue'
import HotelSection from '~/components/hotels/HotelSection.vue'
import TransportSection from '~/components/transports/TransportSection.vue'

const route = useRoute()
const store = useHospitalListStore()

// ✅ SSR-friendly: Load hospital details
const hospitalId = route.params.id as string
const { pending } = await useAsyncData(`hospital-${hospitalId}`, async () => {
    await store.details(hospitalId)
}, {
    lazy: true,
    default: () => null,
    server: true
})

const { hospital } = storeToRefs(store)

// Type for active tabs
type TabType = "procedures" | "staff"

// Initialize active tabs - default to 'procedures' for each treatment
const activeTab = reactive<Record<number, TabType>>({})
const showMore = ref(false)

// Track image loading state for blur effect
const imageLoaded = reactive({
    main: false,
    thumbnails: {} as Record<number, boolean>,
    staff: {} as Record<number, boolean>,
    sidebar: false,
})

// ✅ Computed properties with safe access
const title = computed(() => {
    const hospitalData = hospital.value as any
    return useCapitalize(hospitalData?.title || "")
})

const shortAddress = computed(() => {
    const hospitalData = hospital.value as any
    return useTruncateText(hospitalData?.address || "", 40)
})

// Description logic
const needsTruncate = computed(() => {
    const hospitalData = hospital.value as any
    return (hospitalData?.description?.length || 0) > 500
})

const truncatedDescription = computed(() => {
    const hospitalData = hospital.value as any
    const description = hospitalData?.description || ""

    if (showMore.value || !needsTruncate.value) {
        return description
    }
    return description.slice(0, 100)
})

const toggleDescription = () => {
    showMore.value = !showMore.value
}

// Initialize active tabs when treatments are loaded
watch(() => (hospital.value as any)?.treatments, (treatments) => {
    if (treatments && Array.isArray(treatments)) {
        treatments.forEach((treatment: any) => {
            if (treatment?.id && !activeTab[treatment.id]) {
                activeTab[treatment.id] = 'procedures'
            }
        })
    }
}, { immediate: true })

</script>

<style scoped>
.circular-progress {
    width: 80px;
    height: 80px;
    transform: rotate(0deg);
}

.circle-bg {
    stroke: #f8f8f8;
}

.circle {
    stroke-linecap: round;
    transition: stroke-dasharray 0.3s ease;
}

.percentage-text {
    font-size: 0.5em;
    fill: #333;
    dominant-baseline: middle;
}

.review-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 21px;
}

.progress {
    flex: 1;
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: #053862;
}

.subtreatments-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* space between items */
}

.subtreatments-flex span {
    padding: 5px 10px;
    background: #f0f0f0;
    border-radius: 5px;
}

.tab .active {
    background-color: none !important;
    border-bottom: 1px solid;
    border-color: none !important;
}

/* Image loading blur effect */
.image-loading {
    filter: blur(10px);
    transition: filter 0.5s ease;
    background-color: #e0e0e0;
    background-image: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

img:not(.image-loading) {
    filter: blur(0);
    transition: filter 0.5s ease;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

</style>