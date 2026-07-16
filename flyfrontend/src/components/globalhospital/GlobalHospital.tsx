import Link from 'next/link';

export default function GlobalHospital() {
	return (
		<section className="global-hospital-section text-center py-5">
			<div className="container">
				<img src="/assets/img/Background.png" alt="Globe" className="img-fluid mb-4" style={{ maxWidth: 200 }} />
				<h2>Explore Global Hospitals</h2>
				<p className="mb-4">Access trusted hospitals across the world with one platform.</p>
				<Link href="/hospitals" className="btn btn-primary btn-lg">Browse Hospitals</Link>
			</div>
		</section>
	);
}
