'use client';

import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/landingPage/HeroSection';
import HowItWorks from '@/components/landingPage/HowItWorks';
import AboutSection from '@/components/landingPage/AboutSection';
import TreatmentServices from '@/components/landingPage/TreatmentServices';
import DestinationList from '@/components/destination/DestinationList';
import FindPlan from '@/components/plans/FindPlan';
import GlobalHospital from '@/components/globalhospital/GlobalHospital';
import TreatmentList from '@/components/treatment/TreatmentList';
import PopularHospitals from '@/components/PopularHospitals';
import Testimonials from '@/components/Testimonial';
import BlogList from '@/components/blog/BlogList';
import { useGeneralStore } from '@/stores/general';

export default function HomePage() {
	const store = useGeneralStore();

	useEffect(() => {
		const fetches: Promise<void>[] = [];
		if (store.treatments.length === 0 || store.isStale('treatments')) fetches.push(store.fetchTreatments(store.isStale('treatments')));
		if (store.destinations.length === 0 || store.isStale('destinations')) fetches.push(store.fetchDestination(store.isStale('destinations')));
		if (store.hospitals.length === 0 || store.isStale('hospitals')) fetches.push(store.fetchHospitals(store.isStale('hospitals')));
		if (store.blogs.length === 0 || store.isStale('blogs')) fetches.push(store.fetchBlogs());
		if (fetches.length) Promise.all(fetches).catch(console.error);
	}, [store]);

	return (
		<MainLayout>
			<HeroSection />
			<HowItWorks />
			<AboutSection />
			<TreatmentServices />
			<DestinationList />
			<FindPlan />
			<GlobalHospital />
			<TreatmentList />
			<PopularHospitals />
			<Testimonials />
			<BlogList />
		</MainLayout>
	);
}
