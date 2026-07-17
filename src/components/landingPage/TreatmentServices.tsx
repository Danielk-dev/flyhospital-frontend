'use client';

import Link from 'next/link';
import { useGeneralStore } from '@/stores/general';

export default function TreatmentServices() {
	const treatments = useGeneralStore((s) => s.treatments);
	const loading = useGeneralStore((s) => s.loading);
	const error = useGeneralStore((s) => s.error);

	return (
		<section className="treatment-services container">
			<div className="section-header">
				<h2>Explore {treatments.length}+ Procedure Services</h2>
				<p>From specialized surgeries to advanced therapies — browse our top medical departments offering expert care and proven results.</p>
			</div>
			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{!loading && !error && (
				<div className="treatments-grid">
					{treatments.slice(0, 30).map((treatment) => (
						<Link key={treatment.id} className="treatment-tag" style={{ textDecoration: 'none', color: '#053862' }} href={`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`}>
							{treatment.name}
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
