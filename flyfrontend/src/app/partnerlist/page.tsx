import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import BecomePartner from '@/components/becomePartner';

export default function PartnerListPage() {
	return (
		<MainLayout>
			<main>
				<BecomePartner />
				<section className="fly-hero-section">
					<div className="container">
						<div className="row align-items-center g-5">
							<div className="col-lg-6">
								<h1>Grow Global Reach with ClickHospitals</h1>
								<p>Showcase your hospital to international patients.</p>
								<Link href="/partner" className="btn btn-primary">Learn More</Link>
							</div>
							<div className="col-lg-6 text-center">
								<img src="/assets/img/map.png" alt="World map" className="img-fluid" />
							</div>
						</div>
					</div>
				</section>
			</main>
		</MainLayout>
	);
}
