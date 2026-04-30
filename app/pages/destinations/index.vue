<template>
    <main class="container mt-4">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
            { label: 'Home', link: '/' },
            { label: 'Destinations', active: true }
        ]" />

        <!-- Hospital Listings -->
        <div class="listings-header mb-4">
            <h2>{{ filteredDestinations.length }} <span>Destinations </span> in {{ activeRegionName }}</h2>
            <p class="text-muted">
                The ClickHospitals is based on data science algorithms, providing a trusted, transparent, and objective
                comparison.
                It takes into account patient demand, review scores (both positive and negative), the frequency of
                updates to procedure options and prices,
                response speed, and clinic certifications.
            </p>
        </div>
 <!-- Filter Section -->
        <div class="mb-5">
            <div class="row g-3 align-items-center">
                <div class="col-lg-4">
                    <div class="input-group">
                        <span class="input-group-text bg-white">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;">
                                <path
                                    d="M42 42L33.028 33.012M38 21C38 25.5087 36.2089 29.8327 33.0208 33.0208C29.8327 36.2089 25.5087 38 21 38C16.4913 38 12.1673 36.2089 8.97919 33.0208C5.79107 29.8327 4 25.5087 4 21C4 16.4913 5.79107 12.1673 8.97919 8.97919C12.1673 5.79107 16.4913 4 21 4C25.5087 4 29.8327 5.79107 33.0208 8.97919C36.2089 12.1673 38 16.4913 38 21Z"
                                    stroke="#053862" stroke-width="4" stroke-linecap="round" />
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Enter Destination Name"
                            v-model="searchQuery">
                    </div>
                </div>
            </div>
        </div>

        <div class="region-tabs mb-4" v-if="regions.length">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="region in regions" :key="region.id">
                    <button
                        type="button"
                        class="nav-link"
                        :class="{ active: activeRegionId === region.id }"
                        @click="activeRegionId = region.id"
                    >
                        {{ region.name }}
                    </button>
                </li>
            </ul>
        </div>

       
        <Loader v-if="loading" />

        <div v-else class="hospital-list">
            <template v-if="filteredDestinations.length > 0">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    <div v-for="destination in filteredDestinations" :key="destination.id" class="col">
                        <div class="destination-card">
                            <NuxtLink :to="`/hospitals?country_id=${destination.id}`" class="text-decoration-none">
                                <div class="card card-custom">
                                    <img :src="destination.secondary_image"
                                        :alt="destination.country_name ? `${destination.country_name} Skyline` : 'Destination Image'"
                                        loading="lazy" :class="{ 'image-loading': !imageLoaded[destination.id] }"
                                        @load="imageLoaded[destination.id] = true"
                                        @error="(e) => { imageLoaded[destination.id] = true; (e.target as any).src = 'https://admin.clickhospitals.com/dumy.jpg' }">
                                </div>
                            </NuxtLink>
                            <div class="card-content">
                                <p class="paragraph text-muted mb-2">
                                    {{ destination.description || 'No description available.' }}
                                </p>
                                <div class="card-title-bar">
                                    <h3>
                                        <NuxtLink style="text-decoration: none;color: #053862;"
                                            :to="`/hospitals?country_id=${destination.id}`">
                                            {{ destination.country_name }}
                                        </NuxtLink>
                                    </h3>
                                    <span class="rating">
                                        <div class="hospital-count">Total Hospitals {{ destination.hospitals_count ?? 0 }}</div>
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <NuxtLink :to="`/hospitals?country_id=${destination.id}`" class="btn btn-sm btn-primary">
                                        Find Hospitals ({{ destination.hospitals_count ?? 0 }})
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="text-center text-muted py-5">
                No hospitals found.
            </div>
        </div>

        <!-- Load More Section -->
        <div class="text-center mt-5">
            <p class="text-muted">Total {{ filteredDestinations.length }} procedure</p>
        </div>

        <!--=============== BLOGS SECTION ===============-->
        <BlogList />
    </main>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref } from 'vue'
import { useGeneralStore } from '~/stores/general'

const store = useGeneralStore()

// Track image loading state for blur effect
const imageLoaded = reactive<Record<number, boolean>>({})

if (!(store.destinations?.length > 0)) {
    await useAsyncData('destinations', () => store.fetchDestination())
}
if (!(store.regions?.length > 0)) {
    await useAsyncData('regions', () => store.fetchRegions())
}

// ✅ State
const config = useRuntimeConfig()
const destinations = computed(() => store.destinations ?? [])
const regions = computed(() => store.regions ?? [])
const activeRegionId = ref<number | null>(null)
const loading = computed(() => store.loading)
const error = computed(() => store.error)



watch(regions, (regionList) => {
    if (regionList.length > 0 && activeRegionId.value === null) {
        activeRegionId.value = regionList[0].id
    }
}, { immediate: true })

const sortedDestinations = computed(() => {
    return [...destinations.value].sort((a, b) => {
        const aName = (a.country_name || a.name || "").toLowerCase()
        const bName = (b.country_name || b.name || "").toLowerCase()
        return aName.localeCompare(bName)
    })
})

const activeRegionName = computed(() => {
    const activeRegion = regions.value.find(r => r.id === activeRegionId.value)
    return activeRegion ? activeRegion.name : 'the World'
})

// Debug: Log destinations to see if they're loading
if (process.client) {
    watch(destinations, (newDestinations) => {
        if (newDestinations.length > 0) {
           
        }
    }, { immediate: true })
}

const searchQuery = ref("")

// Filtered results
const filteredDestinations = computed(() => {
    let list = sortedDestinations.value
    if (activeRegionId.value !== null) {
        list = list.filter(d => d.region_id === activeRegionId.value)
    }
    if (!searchQuery.value) return list
    return list.filter(d =>
        (d.country_name?.toLowerCase() || "").includes(searchQuery.value.toLowerCase()) ||
        (d.name?.toLowerCase() || "").includes(searchQuery.value.toLowerCase())
    )
})

</script>

<style scoped>
/* Make USelectMenu background white with black text */
:deep(.select-menu-white) {
    background-color: white !important;
    color: #000000 !important;
}

:deep(.select-menu-white button),
:deep(.select-menu-white [role="button"]) {
    background-color: white !important;
    color: #000000 !important;
}

:deep(.select-menu-white input) {
    background-color: white !important;
    color: #000000 !important;
}

:deep(.select-menu-white span),
:deep(.select-menu-white div) {
    color: #000000 !important;
}

:deep(.select-menu-white .text-gray-500),
:deep(.select-menu-white .text-gray-400) {
    color: #000000 !important;
}

/* Dropdown menu (options list) - White background with black text */
:deep(.select-menu-white [role="listbox"]),
:deep(.select-menu-white [role="menu"]),
:deep(.select-menu-white ul),
:deep(.select-menu-white [data-headlessui-state]),
:deep(.select-menu-white [data-popper-placement]),
:deep(.select-menu-white [data-radix-popper-content-wrapper]) {
    background-color: #ffffff !important;
    color: #000000 !important;
}

:deep(.select-menu-white [role="option"]),
:deep(.select-menu-white li),
:deep(.select-menu-white [data-headlessui-state] > *),
:deep(.select-menu-white [data-headlessui-state] button),
:deep(.select-menu-white [role="option"] span),
:deep(.select-menu-white [role="option"] div) {
    background-color: #ffffff !important;
    color: #000000 !important;
}

:deep(.select-menu-white [role="option"]:hover),
:deep(.select-menu-white li:hover),
:deep(.select-menu-white [data-headlessui-state] > *:hover),
:deep(.select-menu-white [role="option"][aria-selected="true"]) {
    background-color: #f5f5f5 !important;
    color: #000000 !important;
}

/* Target any dropdown container that appears outside the component */
:deep([data-headlessui-portal]),
:deep([data-radix-portal]) {
    background-color: #ffffff !important;
}

:deep([data-headlessui-portal] [role="option"]),
:deep([data-headlessui-portal] li),
:deep([data-headlessui-portal] button),
:deep([data-radix-portal] [role="option"]),
:deep([data-radix-portal] li) {
    background-color: #ffffff !important;
    color: #000000 !important;
}

:deep([data-headlessui-portal] [role="option"]:hover),
:deep([data-headlessui-portal] li:hover),
:deep([data-radix-portal] [role="option"]:hover) {
    background-color: #f5f5f5 !important;
    color: #000000 !important;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
        border-bottom: 1px solid;
    border-right: none;
    border-top: none;
    border-left: none;

}

.col {
    padding: 10px;
}

/* Card container */
.destination-card {
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    transition: all 0.3s ease;
    
    /* Default shadow */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Image styling */
.card-custom img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.4s ease;
}

/* Content area */
.card-content {
    padding: 12px 15px;
}

/* Title */
.card-title-bar h3 {
    font-size: 18px;
    margin: 5px 0;
}

/* Subtitle */
.card-subtitle {
    font-size: 13px;
    color: #777;
}

/* Hover effects */
.destination-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

/* Image zoom on hover */
.destination-card:hover img {
    transform: scale(1.05);
}
.paragraph{
     width: 100%;
    font-size: 12px;
    
    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 3;   /* number of lines */
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
}
</style>
