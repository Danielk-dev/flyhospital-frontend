'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHospitalStore } from '@/stores/hospital';

export default function HeroSection() {
	const router = useRouter();
	const loadCountries = useHospitalStore((s) => s.loadCountries);
	const loadprocedure = useHospitalStore((s) => s.loadprocedure);
	const loadCities = useHospitalStore((s) => s.loadCities);
	const loadSubprocedure = useHospitalStore((s) => s.loadSubprocedure);
	const countries = useHospitalStore((s) => s.countries);
	const cities = useHospitalStore((s) => s.cities);
	const procedure = useHospitalStore((s) => s.procedure);
	const subprocedure = useHospitalStore((s) => s.subprocedure);
	const search = useHospitalStore((s) => s.search);
	const country_id = useHospitalStore((s) => s.country_id);
	const city_id = useHospitalStore((s) => s.city_id);
	const category_id = useHospitalStore((s) => s.category_id);
	const treatment_id = useHospitalStore((s) => s.treatment_id);
	const setSearch = useHospitalStore((s) => s.setSearch);
	const setCountryId = useHospitalStore((s) => s.setCountryId);
	const setCityId = useHospitalStore((s) => s.setCityId);
	const setCategoryId = useHospitalStore((s) => s.setCategoryId);
	const setTreatmentId = useHospitalStore((s) => s.setTreatmentId);
	const [showTreatmentModal, setShowTreatmentModal] = useState(false);
	const [showDestinationModal, setShowDestinationModal] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
	const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
	const [selectedCountryId, setSelectedCountryId] = useState<string>('');
	const [selectedCityId, setSelectedCityId] = useState<string>('');

	useEffect(() => {
		if (store.countries.length === 0) store.loadCountries();
		if (store.procedure.length === 0) store.loadprocedure();
	}, [store]);

	useEffect(() => {
		if (selectedCountryId) store.loadCities(selectedCountryId);
	}, [selectedCountryId, store]);

	useEffect(() => {
		if (selectedCategoryId) store.loadSubprocedure(selectedCategoryId);
	}, [selectedCategoryId, store]);

	const hasActiveFilters = store.treatment_id || store.category_id || store.country_id || store.city_id;

	const submitSearch = () => {
		const params = new URLSearchParams();
		if (store.search) params.set('search', store.search);
		if (store.country_id) params.set('country_id', String(store.country_id));
		if (store.city_id) params.set('city_id', String(store.city_id));
		if (store.category_id) params.set('category_id', String(store.category_id));
		if (store.treatment_id) params.set('treatment_id', String(store.treatment_id));
		router.push(`/hospitals?${params.toString()}`);
	};

	const applyTreatmentFilter = () => {
		store.setCategoryId(selectedCategoryId || null);
		store.setTreatmentId(selectedTreatmentId || null);
		setShowTreatmentModal(false);
		if (selectedTreatmentId) {
			const treatment = store.subprocedure.find((t) => String(t.id) === selectedTreatmentId) as { name?: string } | undefined;
			if (treatment?.name) router.push(`/all-procedure/${encodeURIComponent(treatment.name)}`);
		} else if (selectedCategoryId) {
			router.push(`/subprocedure/${selectedCategoryId}`);
		}
	};

	const applyDestinationFilter = () => {
		store.setCountryId(selectedCountryId || null);
		store.setCityId(selectedCityId || null);
		setShowDestinationModal(false);
		const params = new URLSearchParams();
		if (selectedCountryId) params.set('country_id', selectedCountryId);
		if (selectedCityId) params.set('city_id', selectedCityId);
		router.push(`/hospitals?${params.toString()}`);
	};

	return (
		<section className="hero-section">
			<div className="hero-layout">
				<div className="hero-text">
					<h1>Quickly Find the Right Hospital, Wherever You Are <span>in the World.</span></h1>
					<div className="search-container">
						<h3>Search hospitals by name</h3>
						<div className="search-bar">
							<input type="text" value={store.search} onChange={(e) => store.setSearch(e.target.value)} placeholder="Search hospitals by name..." />
							<a href="#" onClick={(e) => { e.preventDefault(); submitSearch(); }} style={{ textDecoration: 'none' }}>Search</a>
						</div>
						{hasActiveFilters && (
							<div className="active-filters">
								{store.treatment_id && (
									<div className="filter-chip">
										Procedure selected
										<button className="chip-close" onClick={() => store.setTreatmentId(null)}>×</button>
									</div>
								)}
								{(store.country_id || store.city_id) && (
									<div className="filter-chip">
										Destination selected
										<button className="chip-close" onClick={() => { store.setCountryId(null); store.setCityId(null); }}>×</button>
									</div>
								)}
							</div>
						)}
						<div className="filters">
							<button className="filter-btn" onClick={() => setShowTreatmentModal(true)}>
								<i className="bi bi-sliders me-2" /> Search by Procedure
							</button>
							<button className="filter-btn" onClick={() => setShowDestinationModal(true)}>
								<i className="bi bi-map me-2" /> Search by Destination
							</button>
						</div>
					</div>
				</div>
				<div className="hero-image">
					<img src="/assets/img/banner.jpg" alt="Patients at a hospital reception" className={`rounded-left-bottom${!imageLoaded ? ' image-loading' : ''}`} onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
				</div>
			</div>

			{showTreatmentModal && (
				<div className="modal-backdrop-custom">
					<div className="modal-dialog modal-dialog-centered card herocard">
						<div className="modal-content card-body">
							<div className="modal-header border-0 pb-0">
								<h5 className="modal-title">Search by Procedure</h5>
								<button type="button" className="btn-close" onClick={() => setShowTreatmentModal(false)} />
							</div>
							<div className="modal-body pt-0">
								<label>Procedure</label>
								<select className="form-control mb-3" value={selectedCategoryId} onChange={(e) => { setSelectedCategoryId(e.target.value); setSelectedTreatmentId(''); }}>
									<option value="">Select procedure</option>
									{store.procedure.map((cat) => (
										<option key={String(cat.id)} value={String(cat.id)}>{String(cat.name)}</option>
									))}
								</select>
								{selectedCategoryId && (
									<>
										<label>Procedure Type</label>
										<select className="form-control mb-3" value={selectedTreatmentId} onChange={(e) => setSelectedTreatmentId(e.target.value)}>
											<option value="">Select procedure type</option>
											{store.subprocedure.map((tr) => (
												<option key={String(tr.id)} value={String(tr.id)}>{String(tr.name)}</option>
											))}
										</select>
									</>
								)}
								<button type="button" className="btn btn-primary w-100" onClick={applyTreatmentFilter}>Apply</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showDestinationModal && (
				<div className="modal-backdrop-custom">
					<div className="modal-dialog modal-dialog-centered card herocard">
						<div className="modal-content card-body">
							<div className="modal-header border-0 pb-0">
								<h5 className="modal-title mb-1">Search by Destination</h5>
								<button type="button" className="btn-close" onClick={() => setShowDestinationModal(false)} />
							</div>
							<div className="modal-body pt-0">
								<label>Country</label>
								<select className="form-control mb-3" value={selectedCountryId} onChange={(e) => { setSelectedCountryId(e.target.value); setSelectedCityId(''); }}>
									<option value="">Select country</option>
									{store.countries.map((c) => (
										<option key={String(c.id)} value={String(c.id)}>{String(c.country_name)}</option>
									))}
								</select>
								{selectedCountryId && (
									<>
										<label>City</label>
										<select className="form-control mb-3" value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)}>
											<option value="">Select city</option>
											{store.cities.map((city) => (
												<option key={String(city.id)} value={String(city.id)}>{String(city.name)}</option>
											))}
										</select>
									</>
								)}
								<button type="button" className="btn btn-primary w-100" onClick={applyDestinationFilter}>Apply</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
