<template>
    <div>
        <!--=============== HERO / BANNER  ===============-->
        <HeroSection />

		
        <!--=============== HOW IT WORKS ===============-->
        <HowItWorks />
        <!--=============== ABOUT  ===============-->
        <AboutSection />

        <!--=============== TREATMENT SERVICES ===============-->
        <TreatmentServices />


        <!--=============== TOP DESTINATIONS ===============-->
        <DestinationList />

         <!--=============== TOP FindPlan ===============-->
		<FindPlan />

		<!--=============== TOP GlobalHostpital ===============-->
	     <GlobalHospital />

        <!--=============== EXPLORE TREATMENT ===============-->
        <TreatmentList />

        <!--=============== POPULAR HOSPITALS ===============-->
        <HospitalSection />

		
        <!--=============== Popular Hospitals =============== -->
        <PopularHospitals />

        <!--=============== Testimonials =============== -->
        <Testimonials />

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
import FindPlan from '~/components/plans/FindPlan.vue';
import { useGeneralStore } from '~/stores/general';
import GlobalHospital from '~/components/globalhospital/GlobalHospital.vue';
import HospitalSection from '~/components/hospital/HospitalSection.vue';
import Testimonials from "@/components/Testimonial/index.vue";
import PopularHospitals from "@/components/PopularHospitals/index.vue";

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
