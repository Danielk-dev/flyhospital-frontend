'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import CountrySelector from '@/components/CountrySelector';
import { useHospitalListStore } from '@/stores/hospitalList';

export default function SignupPage() {
	const store = useHospitalListStore();
	const [form, setForm] = useState({ name: '', email: '', country_id: '', city_id: '', phone: '', subject: '', message: '' });

	useEffect(() => { store.loadCountries(); }, [store]);
	useEffect(() => { if (form.country_id) store.loadCities(form.country_id); }, [form.country_id, store]);

	return (
		<AuthLayout>
			<main className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-8">
						<h2>Partner Registration - Step 1</h2>
						<form className="mt-4">
							<div className="row g-3">
								<div className="col-md-6">
									<label className="form-label">Name</label>
									<input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
								</div>
								<div className="col-md-6">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
								</div>
								<div className="col-md-6">
									<label className="form-label">Country</label>
									<select className="form-select" value={form.country_id} onChange={(e) => setForm({ ...form, country_id: e.target.value, city_id: '' })}>
										<option value="">Select country</option>
										{store.countries.map((c) => <option key={c.id} value={String(c.id)}>{c.country_name}</option>)}
									</select>
								</div>
								<div className="col-md-6">
									<label className="form-label">City</label>
									<select className="form-select" value={form.city_id} onChange={(e) => setForm({ ...form, city_id: e.target.value })}>
										<option value="">Select city</option>
										{store.cities.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
									</select>
								</div>
								<div className="col-md-6">
									<label className="form-label">Phone</label>
									<div className="d-flex gap-2">
										<CountrySelector />
										<input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
									</div>
								</div>
								<div className="col-12">
									<label className="form-label">Subject</label>
									<input className="form-control" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
								</div>
								<div className="col-12">
									<label className="form-label">Message</label>
									<textarea className="form-control" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
								</div>
							</div>
							<div className="d-flex gap-3 mt-4">
								<Link href="/partner" className="btn btn-outline-secondary">Back</Link>
								<Link href="/auth/otp" className="btn btn-primary">Continue</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</AuthLayout>
	);
}
