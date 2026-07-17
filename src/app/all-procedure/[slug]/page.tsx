'use client';

import { Suspense, use, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import HospitalListCard from '@/components/hospital/HospitalListCard';
import BlogList from '@/components/blog/BlogList';
import Loader from '@/components/Loader';
import { useFilterHospitalStore } from '@/stores/contact';
import { useHospitalStore } from '@/stores/hospital';

function AllProcedureContent({ slug }: { slug: string }) {
	const searchParams = useSearchParams();
	const filterStore = useFilterHospitalStore();
	const hospitalStore = useHospitalStore();
	const [selectedCountry, setSelectedCountry] = useState('');

	const treatmentName = useMemo(() => {
		try { return decodeURIComponent(slug); } catch { return slug; }
	}, [slug]);
	const paramsKey = searchParams.toString();

	useEffect(() => {
		hospitalStore.loadCountries();
		const countryslug = searchParams.get('countryslug') || '';
		const categoryId = searchParams.get('category_id') || undefined;
		const treatmentId = searchParams.get('treatment_id') || undefined;
		void filterStore.fetchHospitals(countryslug || 'all', treatmentName, categoryId, treatmentId, true);
	}, [treatmentName, paramsKey]);

	const filteredHospitals = useMemo(() => {
		if (!selectedCountry) return filterStore.hospitals;
		return filterStore.hospitals.filter((h) => String(h.country_id) === selectedCountry);
	}, [filterStore.hospitals, selectedCountry]);

	return (
		<main className="container my-5">
			<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'All Procedure', link: '/procedure' }, { label: treatmentName, active: true }]} />
			<div className="listings-header mb-4">
				<h2>{treatmentName}</h2>
				<p className="text-muted">Find hospitals offering {treatmentName} worldwide.</p>
			</div>
			<div className="mb-5 col-lg-3">
				<select className="form-select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
					<option value="">All countries</option>
					{hospitalStore.countries.map((c) => (
						<option key={String(c.id)} value={String(c.id)}>{String(c.country_name)}</option>
					))}
				</select>
			</div>
			{filterStore.isLoading && filterStore.hospitals.length === 0 ? (
				<div className="text-center py-5"><Loader /></div>
			) : filteredHospitals.length === 0 ? (
				<div className="text-center text-muted py-5">No hospitals found for this treatment.</div>
			) : (
				filteredHospitals.map((hospital) => <HospitalListCard key={hospital.id} hospital={hospital} />)
			)}
			{filteredHospitals.length < filterStore.totalHospitals && (
				<div className="text-center mt-5">
					<button className="btn btn-primary" disabled={filterStore.isLoading} onClick={() => filterStore.fetchHospitals('', treatmentName, undefined, undefined, false, true)}>
						{filterStore.isLoading ? 'Loading...' : 'Load More'}
					</button>
				</div>
			)}
			<BlogList />
		</main>
	);
}

export default function AllProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = use(params);
	return (
		<MainLayout>
			<Suspense fallback={<div className="text-center py-5"><Loader /></div>}>
				<AllProcedureContent slug={slug} />
			</Suspense>
		</MainLayout>
	);
}
