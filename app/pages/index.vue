<template>
    <div>
        <!--=============== HERO / BANNER  ===============-->
        <HeroSection />

        <!--=============== ABOUT  ===============-->
        <AboutSection />

        <!--=============== TREATMENT SERVICES ===============-->
        <TreatmentServices />

        <!--=============== HOW IT WORKS ===============-->
        <HowItWorks />

        <!--=============== TOP DESTINATIONS ===============-->
        <DestinationList />

        <!--=============== EXPLORE TREATMENT ===============-->
        <TreatmentList />

        <!--=============== POPULAR HOSPITALS ===============-->
        <HospitalSection />

        <!--=============== BLOGS =============== -->
        <BlogList />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AboutSection from '~/components/landingPage/AboutSection.vue';
import HeroSection from '~/components/landingPage/HeroSection.vue';
import HowItWorks from '~/components/landingPage/HowItWorks.vue';
import TreatmentServices from '~/components/landingPage/TreatmentServices.vue';
import { useGeneralStore } from '~/stores/general';

const generalStore = useGeneralStore()

// Error state
const error = ref<string | null>(null)

// ✅ Optimized: Centralized data fetching with parallel requests
// Uses isStale getter to check if data needs refreshing
// Prevents duplicate fetches by coordinating all requests
onMounted(async () => {
	// Check if we need to fetch any data
	// ✅ Consistent pattern: check if empty OR if stale
	const needsTreatments = 
		generalStore.treatments.length === 0 || 
		generalStore.isStale('treatments')
	
	const needsDestinations = 
		generalStore.destinations.length === 0 || 
		generalStore.isStale('destinations')
	
	const needsHospitals = 
		generalStore.hospitals.length === 0 || 
		generalStore.isStale('hospitals')
	
	const needsBlogs = 
		generalStore.blogs.length === 0 || 
		generalStore.isStale('blogs')

	// If no data needs fetching, return early
	if (!needsTreatments && !needsDestinations && !needsHospitals && !needsBlogs) {
		return
	}

	try {
		error.value = null

		// ✅ Parallel fetching for better performance
		const fetchPromises: Promise<any>[] = []

		if (needsTreatments) {
			fetchPromises.push(
				generalStore.fetchTreatments(generalStore.isStale('treatments'))
			)
		}

		if (needsDestinations) {
			fetchPromises.push(
				generalStore.fetchDestination(generalStore.isStale('destinations'))
			)
		}

		if (needsHospitals) {
			fetchPromises.push(
				generalStore.fetchHospitals(generalStore.isStale('hospitals'))
			)
		}

		if (needsBlogs) {
			fetchPromises.push(
				generalStore.fetchBlogs()
			)
		}

		// Wait for all fetches to complete in parallel
		await Promise.all(fetchPromises)
	} catch (err: any) {
		error.value = err?.message ?? 'Failed to fetch page data'
		console.error('Failed to fetch landing page data:', err)
	}
})
</script>
