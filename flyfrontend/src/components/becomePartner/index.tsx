'use client';

import Link from 'next/link';
import { useRegistrationStore } from '@/stores/contact';

export default function BecomePartner() {
	const selectPlan = useRegistrationStore((s) => s.selectPlan);

	return (
		<section className="become-partner-section container py-5">
			<div className="text-center mb-5">
				<h2>Choose Your Partnership Plan</h2>
				<p>Select the plan that best fits your hospital&apos;s needs.</p>
			</div>
			<div className="row g-4 justify-content-center">
				<div className="col-md-5">
					<div className="card h-100 p-4 text-center">
						<h3>STARTER</h3>
						<h2 className="text-primary">$0</h2>
						<ul className="list-unstyled text-start my-4">
							<li><i className="bi bi-check-circle text-success me-2" />Basic hospital listing</li>
							<li><i className="bi bi-check-circle text-success me-2" />Contact information display</li>
							<li><i className="bi bi-check-circle text-success me-2" />Standard search visibility</li>
						</ul>
						<Link href="/registration/step1" className="btn btn-outline-primary" onClick={() => selectPlan('STARTER', 0)}>Get Started</Link>
					</div>
				</div>
				<div className="col-md-5">
					<div className="card h-100 p-4 text-center border-primary">
						<span className="badge bg-primary mb-2">Recommended</span>
						<h3>FEATURED</h3>
						<h2 className="text-primary">$499</h2>
						<ul className="list-unstyled text-start my-4">
							<li><i className="bi bi-check-circle text-success me-2" />Featured placement</li>
							<li><i className="bi bi-check-circle text-success me-2" />Priority search ranking</li>
							<li><i className="bi bi-check-circle text-success me-2" />Enhanced profile with photos</li>
							<li><i className="bi bi-check-circle text-success me-2" />Analytics dashboard</li>
						</ul>
						<Link href="/registration/step1" className="btn btn-primary" onClick={() => selectPlan('FEATURED', 499)}>Get Started</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
