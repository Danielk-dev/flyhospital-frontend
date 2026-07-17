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
	const countryIdParam = searchParams.get('country_id') || '';
	const cityIdParam = searchParams.get('city_id') || '';
	const searchQueryParam = searchParams.get('search') || '';
	const loadCountries = useHospitalListStore((s) => s.loadCountries);
	const loadCities = useHospitalListStore((s) => s.loadCities);
	const list = useHospitalListStore((s) => s.list);
	const setFilter = useHospitalListStore((s) => s.setFilter);
	const search = useHospitalListStore((s) => s.search);
	const countries = useHospitalListStore((s) => s.countries);
	const cities = useHospitalListStore((s) => s.cities);
	const totalHospitals = useHospitalListStore((s) => s.totalHospitals);
	const hospitals = useHospitalListStore((s) => s.hospitals);
	const loader = useHospitalListStore((s) => s.loader);
	const currentPage = useHospitalListStore((s) => s.currentPage);
	const lastPage = useHospitalListStore((s) => s.lastPage);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');

	useEffect(() => {
		loadCountries();
		setFilter('country_id', countryIdParam);
		setFilter('city_id', cityIdParam);
		setFilter('search', searchQueryParam);
		setSelectedCountry(countryIdParam);
		setSelectedCity(cityIdParam);
		list(1);
	}, [countryIdParam, cityIdParam, searchQueryParam, loadCountries, setFilter, list]);

	useEffect(() => {
		if (selectedCountry) loadCities(selectedCountry);
	}, [selectedCountry, loadCities]);

	const locationText = useMemo(() => {
		const country = countries.find((c) => String(c.id) === selectedCountry);
		const city = cities.find((c) => String(c.id) === selectedCity);
		if (city && country) return `${city.name}, ${country.country_name}`;
		if (country) return country.country_name;
		return 'Worldwide';
	}, [countries, cities, selectedCountry, selectedCity]);

	const applyFilters = () => {
		setFilter('country_id', selectedCountry);
		setFilter('city_id', selectedCity);
		list(1);
	};

	return (
		<main className="container my-5">
			<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Hospitals', active: true }]} />
			<div className="filter-section mb-5">
				<div className="row g-3 align-items-center">
					<div className="col-lg-4">
						<div className="input-group">
							<span className="input-group-text bg-white"><i className="bi bi-search" /></span>
							<input type="text" className="form-control" value={search} onChange={(e) => setFilter('search', e.target.value)} placeholder="Enter Hospital Name" />
						</div>
					</div>
					<div className="col-lg-3">
						<select className="form-select" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(''); }}>
							<option value="">Select a country</option>
							{countries.map((c) => (
								<option key={c.id} value={String(c.id)}>{c.country_name}</option>
							))}
						</select>
					</div>
					<div className="col-lg-3">
						<select className="form-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedCountry}>
							<option value="">Select city</option>
							{cities.map((c) => (
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
				<h2><span>{totalHospitals}</span> Hospitals <span>in {locationText}</span></h2>
			</div>
			<div className="hospital-list">
				{loader && hospitals.length === 0 ? (
					<div className="text-center py-5"><Loader /></div>
				) : hospitals.length > 0 ? (
					hospitals.map((hospital) => <HospitalListCard key={hospital.id} hospital={hospital} />)
				) : (
					<div className="text-center text-muted py-5">No hospitals found.</div>
				)}
			</div>
			{hospitals.length > 0 && (
				<div className="text-center mt-5">
					<p className="text-muted mb-3">Showing {hospitals.length} of {totalHospitals} hospitals</p>
					<div className="d-flex justify-content-center gap-3">
						{currentPage > 1 && (
							<button onClick={() => list(currentPage - 1)} disabled={loader} className="btn btn-primary">Load Less</button>
						)}
						{currentPage < lastPage && (
							<button onClick={() => list(currentPage + 1)} disabled={loader} className="btn btn-primary">Load More Hospitals</button>
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
