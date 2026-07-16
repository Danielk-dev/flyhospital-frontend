'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useHospitalListStore } from '@/stores/hospitalList';

export default function ServiceDetailsPage() {
	const store = useHospitalListStore();
	const [category, setCategory] = useState('hospital');
	const [countryId, setCountryId] = useState('');
	const [cityId, setCityId] = useState('');

	useEffect(() => { store.loadCountries(); }, [store]);
	useEffect(() => { if (countryId) store.loadCities(countryId); }, [countryId, store]);

	return (
		<AuthLayout>
			<main className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-8">
						<h2>Service Details - Step 2</h2>
						<div className="mt-4">
							<label className="form-label">Category</label>
							<select className="form-select mb-3" value={category} onChange={(e) => setCategory(e.target.value)}>
								<option value="hospital">Hospital</option>
								<option value="hotel">Hotel</option>
								<option value="restaurant">Restaurant</option>
							</select>
							{category === 'hospital' && (
								<>
									<label className="form-label">Country</label>
									<select className="form-select mb-3" value={countryId} onChange={(e) => { setCountryId(e.target.value); setCityId(''); }}>
										<option value="">Select country</option>
										{store.countries.map((c) => <option key={c.id} value={String(c.id)}>{c.country_name}</option>)}
									</select>
									<label className="form-label">City</label>
									<select className="form-select mb-3" value={cityId} onChange={(e) => setCityId(e.target.value)}>
										<option value="">Select city</option>
										{store.cities.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
									</select>
								</>
							)}
						</div>
						<div className="d-flex gap-3 mt-4">
							<Link href="/auth/signup" className="btn btn-outline-secondary">Back</Link>
							<Link href="/auth/otp" className="btn btn-primary">Continue</Link>
						</div>
					</div>
				</div>
			</main>
		</AuthLayout>
	);
}
