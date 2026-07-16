'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';
import HotelSection from '@/components/hotels/HotelSection';
import RestaurentSection from '@/components/restaurent/RestaurentSection';
import TransportSection from '@/components/transports/TransportSection';
import { useHospitalListStore } from '@/stores/hospitalList';
import { capitalize, truncateText } from '@/lib/helpers';

export default function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const store = useHospitalListStore();
	const hospital = store.hospital as Record<string, unknown>;
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		store.details(id);
	}, [id, store]);

	const title = capitalize(String(hospital.title || hospital.name || ''));
	const description = String(hospital.description || '');
	const phone = String(hospital.phone || '');
	const websiteUrl = String(hospital.website_url || '');
	const mapUrl = String(hospital.google_map_location || '');
	const imageUrls = (hospital.image_urls as string[]) || [];
	const treatments = (hospital.treatments as { id: number; name: string }[]) || [];
	const staff = (hospital.staff as { id: number; name: string; description?: string; image_url?: string }[]) || [];
	const hotels = (hospital.hotels as Record<string, unknown>[]) || [];
	const restaurants = (hospital.restaurants as Record<string, unknown>[]) || [];
	const transports = (hospital.transports as Record<string, unknown>[]) || [];

	if (store.loader && !title) {
		return <MainLayout><div className="text-center py-5"><Loader /></div></MainLayout>;
	}

	return (
		<MainLayout>
			<main className="container mt-4">
				<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Hospitals', link: '/hospitals' }, { label: title, active: true }]} />

				{imageUrls.length > 0 && (
					<div className="image-gallery my-4">
						<div className="main-image">
							<img src={imageUrls[0]} alt={title} className="img-fluid rounded" />
						</div>
						{imageUrls.length > 1 && (
							<div className="thumbnail-grid d-flex gap-2 mt-2">
								{imageUrls.slice(1, 5).map((img, i) => (
									<img key={i} src={img} alt={`${title} ${i + 1}`} className="img-thumbnail" style={{ width: 100, height: 80, objectFit: 'cover' }} />
								))}
							</div>
						)}
					</div>
				)}

				<ul className="nav page-tabs mb-4">
					{['overview', 'procedures', 'medical-staff', 'hotels', 'restaurants', 'how-to-get-there'].map((tab) => (
						<li key={tab} className="nav-item">
							<a className="nav-link" href={`#${tab}`}>{tab.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</a>
						</li>
					))}
				</ul>

				<div id="overview" className="row">
					<div className="col-lg-8">
						<div className="mb-4">
							<p className="text-muted"><i className="bi bi-geo-alt me-2" />{String(hospital.address || '')}</p>
							<h2>{title}</h2>
						</div>

						<div className="card card-body rating-summary-card mb-4">
							<div className="d-flex gap-4 flex-wrap">
								{phone && (
									<Link href={`tel:${phone}`}><i className="bi bi-telephone me-1" />{phone}</Link>
								)}
								{websiteUrl && (
									<a href={websiteUrl} target="_blank" rel="noreferrer"><i className="bi bi-globe me-1" />Website</a>
								)}
								{mapUrl && (
									<a href={mapUrl} target="_blank" rel="noreferrer"><i className="bi bi-map me-1" />Map</a>
								)}
							</div>
						</div>

						<div className="mb-5">
							<h4>About</h4>
							<p>{showMore ? description : truncateText(description, 300)}</p>
							{description.length > 300 && (
								<button className="btn btn-link p-0" onClick={() => setShowMore(!showMore)}>
									{showMore ? 'Show less' : 'Show more'}
								</button>
							)}
						</div>

						<div id="procedures" className="mb-5">
							<h4>Procedures</h4>
							{treatments.length > 0 ? (
								<div className="row g-3">
									{treatments.map((t) => (
										<div key={t.id} className="col-md-6">
											<div className="card p-3">{t.name}</div>
										</div>
									))}
								</div>
							) : <p className="text-muted">No procedures listed.</p>}
						</div>

						<div id="medical-staff" className="mb-5">
							<h4>Medical Staff</h4>
							{staff.length > 0 ? (
								<div className="row g-3">
									{staff.map((s) => (
										<div key={s.id} className="col-md-4">
											<div className="card p-3 text-center">
												{s.image_url && <img src={s.image_url} alt={s.name} className="rounded-circle mx-auto mb-2" width={80} height={80} />}
												<h6>{s.name}</h6>
												<p className="small text-muted">{s.description}</p>
											</div>
										</div>
									))}
								</div>
							) : <p className="text-muted">No staff listed.</p>}
						</div>

						<HotelSection hotels={hotels as unknown as Parameters<typeof HotelSection>[0]['hotels']} />
						<RestaurentSection restaurants={restaurants as unknown as Parameters<typeof RestaurentSection>[0]['restaurants']} />
						<TransportSection items={transports as unknown as Parameters<typeof TransportSection>[0]['items']} />
					</div>

					<div className="col-lg-4">
						<div className="card p-4 sticky-top" style={{ top: 100 }}>
							<h5>Contact Hospital</h5>
							{phone && <Link href={`tel:${phone}`} className="btn btn-primary w-100 mb-2">Call Now</Link>}
							{websiteUrl && <a href={websiteUrl} target="_blank" rel="noreferrer" className="btn btn-outline-primary w-100">Visit Website</a>}
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
}
