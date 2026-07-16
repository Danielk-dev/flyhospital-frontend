'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep1() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '', terms: false });

	const handleContinue = () => {
		setData({ personalInfo: form });
		router.push('/registration/step3');
	};

	return (
		<MainLayout>
			<main className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-8">
						<h2>Registration - Step 1 of 5</h2>
						<div className="row g-3 mt-3">
							<div className="col-md-6"><label className="form-label">Full Name</label><input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
							<div className="col-md-6"><label className="form-label">Email</label><input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
							<div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
							<div className="col-md-6"><label className="form-label">Business Type</label><select className="form-select" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}><option value="">Select</option><option value="hospital">Hospital</option><option value="clinic">Clinic</option></select></div>
							<div className="col-12"><div className="form-check"><input type="checkbox" className="form-check-input" checked={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.checked })} /><label className="form-check-label">I agree to terms and conditions</label></div></div>
						</div>
						<div className="d-flex gap-3 mt-4">
							<Link href="/partner" className="btn btn-outline-secondary">Back</Link>
							<button className="btn btn-primary" onClick={handleContinue} disabled={!form.terms}>Continue</button>
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
}
