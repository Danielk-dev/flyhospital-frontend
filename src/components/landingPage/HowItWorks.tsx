import Link from 'next/link';

export default function HowItWorks() {
	return (
		<section className="how-it-works-section" style={{ marginTop: 80, marginBottom: 180 }}>
			<div className="container">
				<div className="how-it-works-container">
					<div className="how-it-works-header">
						<div className="header-text">
							<h2>How ClickHospitals Works</h2>
							<p>Whether you&apos;re seeking affordable procedure, advanced medical care, or a specific specialty, ClickHospitals helps you find, compare, and connect with trusted hospitals around the world in just a few clicks.</p>
						</div>
						<Link href="/about" className="learn-more-btn">Learn More</Link>
					</div>
					<div className="process-grid">
						{[
							{ title: 'Search', desc: 'Use our smart filters to search by procedure, specialty, or destination. Easily explore hospitals based on what matters most to you.' },
							{ title: 'Compare', desc: 'View hospital profiles with complete details—services, accreditations, amenities, and more. Compare options side-by-side to make an informed decision.' },
							{ title: 'Connect', desc: "Get redirected to the hospital's website, map location, or contact info. Reach out directly or plan your medical journey." },
							{ title: 'Plan Your Visit', desc: 'See nearby hotels, restaurants, and travel options—all in one place. We make medical travel smoother and stress-free.' },
						].map((step) => (
							<div key={step.title} className="process-card">
								<div className="process-icon"><i className="bi bi-check-circle" style={{ fontSize: 48, color: '#053862' }} /></div>
								<h3>{step.title}</h3>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
