'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';
import { apiFetch } from '@/lib/api';

export default function RegistrationStep3() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [radius, setRadius] = useState(5);
	const [hospitals, setHospitals] = useState<{ id: number; title?: string; name?: string }[]>([]);
	const [selectedHospital, setSelectedHospital] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchNearby = (lat: number, lng: number) => {
		setLoading(true);
		apiFetch<{ data?: { id: number; title?: string; name?: string }[] }>('hospitals/nearby', {
			params: { lat, lng, radius },
		}).then((res) => setHospitals(res.data ?? [])).catch(() => setHospitals([])).finally(() => setLoading(false));
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => fetchNearby(pos.coords.latitude, pos.coords.longitude),
				() => {},
			);
		}
	}, [radius]);

	const handleContinue = () => {
		setData({ facilitySelection: { hospital_id: selectedHospital, radius } });
		router.push('/registration/step4');
	};

	return (
		<MainLayout>
			<main className="container py-5">
				<h2>Select Facility - Step 3 of 5</h2>
				<div className="row mt-4">
					<div className="col-lg-6">
						<label className="form-label">Service Radius: {radius} km</label>
						<input type="range" min={1} max={25} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="form-range" />
						<label className="form-label mt-3">Select Hospital</label>
						<select className="form-select" value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
							<option value="">Select hospital</option>
							{hospitals.map((h) => <option key={h.id} value={String(h.id)}>{h.title || h.name}</option>)}
						</select>
						{loading && <p className="text-muted mt-2">Loading nearby hospitals...</p>}
					</div>
				</div>
				<div className="d-flex gap-3 mt-4">
					<Link href="/registration/step1" className="btn btn-outline-secondary">Back</Link>
					<button className="btn btn-primary" onClick={handleContinue} disabled={!selectedHospital}>Continue</button>
				</div>
			</main>
		</MainLayout>
	);
}
