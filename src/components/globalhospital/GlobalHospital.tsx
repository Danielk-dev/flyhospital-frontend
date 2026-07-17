import Link from 'next/link';

export default function GlobalHospital() {
	return (
		<section className="global-section">
			<div className="container">
				<div className="global-card">
					<div className="image-wrapper">
						<img src="/assets/img/bg-removel.png" alt="Globe" />
					</div>
					<div className="global-content">
						<h2>Explore Global Hospitals</h2>
						<p>Access trusted hospitals across the world with one platform.</p>
						<Link href="/hospitals">
							<button type="button">Browse Hospitals</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
