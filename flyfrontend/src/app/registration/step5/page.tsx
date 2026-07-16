'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep5() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [form, setForm] = useState({ cardholder: '', cardNumber: '', expiry: '', cvc: '' });

	const handleSubmit = () => {
		setData({ paymentInfo: form });
		router.push('/registration/step6');
	};

	return (
		<MainLayout>
			<main className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-6">
						<h2>Payment - Step 5 of 5</h2>
						<p className="text-muted">Partnership subscription: $99/month</p>
						<div className="row g-3 mt-3">
							<div className="col-12"><label className="form-label">Cardholder Name</label><input className="form-control" value={form.cardholder} onChange={(e) => setForm({ ...form, cardholder: e.target.value })} /></div>
							<div className="col-12"><label className="form-label">Card Number</label><input className="form-control" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} /></div>
							<div className="col-6"><label className="form-label">Expiry</label><input className="form-control" placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} /></div>
							<div className="col-6"><label className="form-label">CVC</label><input className="form-control" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} /></div>
						</div>
						<div className="d-flex gap-3 mt-4">
							<Link href="/registration/step4" className="btn btn-outline-secondary">Back</Link>
							<button className="btn btn-primary" onClick={handleSubmit}>Pay & Submit</button>
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
}
