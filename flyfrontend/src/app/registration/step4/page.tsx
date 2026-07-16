'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';
export default function RegistrationStep4() {
	const router = useRouter();
	const registrationData = useRegistrationStore((s) => s.data);
	const setData = useRegistrationStore((s) => s.setData);
	const [logo, setLogo] = useState<File | null>(null);
	const [photos, setPhotos] = useState<File[]>([]);
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async () => {
		setSubmitting(true);
		const formData = new FormData();
		const personal = registrationData.personalInfo as Record<string, string> | undefined;
		if (personal?.name) formData.append('name', personal.name);
		if (personal?.email) formData.append('email', personal.email);
		if (personal?.phone) formData.append('phone', personal.phone);
		const facility = registrationData.facilitySelection as { hospital_id?: string } | undefined;
		if (facility?.hospital_id) formData.append('hospital_id', facility.hospital_id);
		if (logo) formData.append('logo', logo);
		photos.forEach((photo, i) => formData.append(`service_photos[${i}]`, photo));

		try {
			await fetch(`/api/vendors`, { method: 'POST', body: formData });
			setData({ businessInfo: { logo: logo?.name, photos: photos.length } });
			router.push('/registration/step6');
		} catch {
			alert('Submission failed. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<MainLayout>
			<main className="container py-5">
				<h2>Business Details - Step 4 of 5</h2>
				<div className="row mt-4 col-lg-8">
					<div className="mb-3">
						<label className="form-label">Business Logo</label>
						<input type="file" accept="image/*" className="form-control" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
					</div>
					<div className="mb-3">
						<label className="form-label">Service Photos (max 10)</label>
						<input type="file" accept="image/*" multiple className="form-control" onChange={(e) => setPhotos(Array.from(e.target.files || []).slice(0, 10))} />
					</div>
				</div>
				<div className="d-flex gap-3 mt-4">
					<Link href="/registration/step3" className="btn btn-outline-secondary">Back</Link>
					<button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit & Continue'}</button>
				</div>
			</main>
		</MainLayout>
	);
}
