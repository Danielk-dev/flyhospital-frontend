'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import HospitalListCard from '@/components/hospital/HospitalListCard';
import BlogList from '@/components/blog/BlogList';
import Loader from '@/components/Loader';
import { useHospitalListStore } from '@/stores/hospitalList';

function HospitalsContent() {
	const searchParams = useSearchParams();
	const store = useHospitalListStore();
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');

	useEffect(() => {
		store.loadCountries();
		const countryId = searchParams.get('country_id') || '';
		const cityId = searchParams.get('city_id') || '';
		const search = searchParams.get('search') || '';
		store.setFilter('country_id', countryId);
		store.setFilter('city_id', cityId);
		store.setFilter('search', search);
		setSelectedCountry(countryId);
		setSelectedCity(cityId);
		store.list(1);
	}, [searchParams]);

	useEffect(() => {
		if (selectedCountry) store.loadCities(selectedCountry);
	}, [selectedCountry, store]);

	const locationText = useMemo(() => {
		const country = store.countries.find((c) => String(c.id) === selectedCountry);
		const city = store.cities.find((c) => String(c.id) === selectedCity);
		if (city && country) return `${city.name}, ${country.country_name}`;
		if (country) return country.country_name;
		return 'Worldwide';
	}, [store.countries, store.cities, selectedCountry, selectedCity]);

	const applyFilters = () => {
		store.setFilter('country_id', selectedCountry);
		store.setFilter('city_id', selectedCity);
		store.list(1);
	};

	return (
		<main className="container my-5">
			<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Hospitals', active: true }]} />
			<div className="filter-section mb-5">
				<div className="row g-3 align-items-center">
					<div className="col-lg-4">
						<div className="input-group">
							<span className="input-group-text bg-white"><i className="bi bi-search" /></span>
							<input type="text" className="form-control" value={store.search} onChange={(e) => store.setFilter('search', e.target.value)} placeholder="Enter Hospital Name" />
						</div>
					</div>
					<div className="col-lg-3">
						<select className="form-select" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(''); }}>
							<option value="">Select a country</option>
							{store.countries.map((c) => (
								<option key={c.id} value={String(c.id)}>{c.country_name}</option>
							))}
						</select>
					</div>
					<div className="col-lg-3">
						<select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedCountry}>
							<option value="">Select city</option>
							{store.cities.map((c) => (
								<option key={c.id} value={String(c.id)}>{c.name}</option>
							))}
						</select>
					</div>
					<div className="col-lg-2">
						<button onClick={applyFilters} className="btn btn-primary w-100"><i className="bi bi-search me-2" />Search</button>
					</div>
				</div>
			</div>
			<div className="listings-header mb-4">
				<h2><span>{store.totalHospitals}</span> Hospitals <span>in {locationText}</span></h2>
			</div>
			<div className="hospital-list">
				{store.loader && store.hospitals.length === 0 ? (
					<div className="text-center py-5"><Loader /></div>
				) : store.hospitals.length > 0 ? (
					store.hospitals.map((hospital) => <HospitalListCard key={hospital.id} hospital={hospital} />)
				) : (
					<div className="text-center text-muted py-5">No hospitals found.</div>
				)}
			</div>
			{store.hospitals.length > 0 && (
				<div className="text-center mt-5">
					<p className="text-muted mb-3">Showing {store.hospitals.length} of {store.totalHospitals} hospitals</p>
					<div className="d-flex justify-content-center gap-3">
						{store.currentPage > 1 && (
							<button onClick={() => store.loadLess()} disabled={store.loader} className="btn btn-primary">Load Less</button>
						)}
						{store.currentPage < store.lastPage && (
							<button onClick={() => store.loadMore()} disabled={store.loader} className="btn btn-primary">Load More Hospitals</button>
						)}
					</div>
				</div>
			)}
			<BlogList />
		</main>
	);
}

export default function HospitalsPage() {
	return (
		<MainLayout>
			<Suspense fallback={<div className="text-center py-5"><Loader /></div>}>
				<HospitalsContent />
			</Suspense>
		</MainLayout>
	);
}
