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
	const fetchLandingData = useGeneralStore((s) => s.fetchLandingData);

	useEffect(() => {
		void fetchLandingData();
	}, [fetchLandingData]);

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
