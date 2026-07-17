import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import BecomePartner from '@/components/becomePartner';

export default function PartnerPage() {
	return (
		<MainLayout>
			<main>
				<BecomePartner />
				<section className="fly-hero-section">
					<div className="container">
						<div className="row align-items-center g-5">
							<div className="col-lg-6">
								<div className="fly-hero-content">
									<h1>Grow Global Reach with ClickHospitals</h1>
									<p>Showcase your hospital to thousands of international patients actively seeking care.</p>
									<Link href="/auth/signup" className="btn btn-primary fly-btn-primary">Get Started</Link>
								</div>
							</div>
							<div className="col-lg-6 text-center">
								<img src="/assets/img/map.png" alt="World map" className="img-fluid" />
							</div>
						</div>
					</div>
				</section>
				<section className="fly-partners-section py-5">
					<div className="container text-center">
						<h3>Join the world&apos;s best hospitals network</h3>
						<div className="fly-logo-grid d-flex flex-wrap justify-content-center gap-4 mt-4">
							{['logo1', 'logo2', 'logo3', 'logo4', 'logo5'].map((logo) => (
								<img key={logo} src={`/assets/img/${logo}.png`} alt={logo} style={{ height: 40 }} />
							))}
						</div>
					</div>
				</section>
				<section className="fly-features-section container py-5">
					<h2 className="text-center mb-5">How to start partnership</h2>
					<div className="row g-4">
						{[
							{ title: 'Online visibility', desc: 'Access international patients from 210+ countries.' },
							{ title: 'Patient bookings', desc: 'Get validated requests with 12-32% conversion rate.' },
							{ title: 'Profile management', desc: 'Manage your hospital profile and services easily.' },
							{ title: 'Analytics', desc: 'Track views, inquiries, and patient engagement.' },
							{ title: 'Support', desc: 'Dedicated support team to help you succeed.' },
							{ title: 'Global reach', desc: 'Connect with patients seeking care abroad.' },
						].map((f) => (
							<div key={f.title} className="col-md-4">
								<div className="fly-feature-card card p-4 h-100">
									<h5>{f.title}</h5>
									<p className="mb-0">{f.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</MainLayout>
	);
}
