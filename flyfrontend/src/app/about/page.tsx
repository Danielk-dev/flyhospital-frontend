import MainLayout from '@/components/layouts/MainLayout';

export default function AboutPage() {
	return (
		<MainLayout>
			<main className="about-page container my-5">
				<section className="hero-about text-center py-5">
					<h1>About ClickHospitals</h1>
					<p className="lead">Your partner in trusted medical care worldwide.</p>
				</section>
				<section className="stats-section row text-center py-5">
					<div className="col-md-4"><h2>190+</h2><p>Countries</p></div>
					<div className="col-md-4"><h2>5248</h2><p>Reviews</p></div>
					<div className="col-md-4"><h2>9156</h2><p>Hospitals</p></div>
				</section>
				<section className="about-content py-5">
					<h2>Who We Are</h2>
					<p>ClickHospitals is an international platform for hospital search and treatment arrangement. We connect patients with trusted hospitals worldwide, making medical tourism simpler and more transparent.</p>
				</section>
				<section className="features-section row g-4 py-5">
					{['Global Search', 'Verified Hospitals', 'Easy Comparison', 'Direct Contact', 'Travel Planning', 'Trusted Reviews'].map((feature) => (
						<div key={feature} className="col-md-4">
							<div className="card p-4 h-100 text-center">
								<i className="bi bi-check-circle text-primary mb-3" style={{ fontSize: 32 }} />
								<h5>{feature}</h5>
							</div>
						</div>
					))}
				</section>
			</main>
		</MainLayout>
	);
}
