'use client';

import { useState } from 'react';
import Link from 'next/link';
import { capitalize, truncateText } from '@/lib/helpers';
import type { Hospital } from '@/lib/types';

export default function HospitalListCard({ hospital }: { hospital: Hospital }) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [showMore, setShowMore] = useState(false);

	const title = capitalize(String(hospital.title || hospital.name || ''));
	const description = String(hospital.description || '');
	const needsTruncate = description.length > 200;
	const truncatedDescription = showMore ? description : truncateText(description, 200);
	const shortAddress = truncateText(String(hospital.address || ''), 80);
	const imageUrl = hospital.image_urls?.[0] || hospital.image_url || 'https://admin.clickhospitals.com/dumy.jpg';

	return (
		<div className="card hospital-card mb-4 p-4">
			<div className="row g-0">
				<div className="col-md-3 p-3">
					<img src={imageUrl} alt={title} className={`img-fluid img-fit rounded${!imageLoaded ? ' image-loading' : ''}`} loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
				</div>
				<div className="col-md-6 card-body">
					<h5 className="card-title">
						<Link href={`/hospitals/${hospital.id}`} className="text-decoration-none" style={{ color: '#053862' }}>{title}</Link>
					</h5>
					<p className="card-text location mb-2">
						<i className="bi bi-geo-alt" style={{ color: '#053862', marginRight: 5 }} />
						{shortAddress}
					</p>
					<p className="card-text description">
						{truncatedDescription}
						{needsTruncate && (
							<span onClick={() => setShowMore(!showMore)} className="text-primary cursor-pointer">
								{showMore ? ' Show less' : ' ... Show more'}
							</span>
						)}
					</p>
					<div className="info-buttons d-flex gap-2 flex-wrap">
						{hospital.phone && <Link href={`tel:${hospital.phone}`} className="btn btn-sm btn-light"><i className="bi bi-telephone me-1" />Call</Link>}
						{hospital.google_map_location && <a href={String(hospital.google_map_location)} className="btn btn-sm btn-light" target="_blank" rel="noreferrer"><i className="bi bi-geo-alt me-1" />Google Map</a>}
						{hospital.website_url && <a href={String(hospital.website_url)} className="btn btn-sm btn-light" target="_blank" rel="noreferrer"><i className="bi bi-globe me-1" />Website</a>}
					</div>
				</div>
				<div className="col-lg-2 col-md-6 col-sm-6 card-body border-start-md d-flex flex-column">
					{Array.isArray(hospital.treatments) && hospital.treatments.length > 0 && (
						<div className="procedure-list">
							<h6>Procedures</h6>
							<ul className="list-unstyled small">
								{hospital.treatments.slice(0, 3).map((t) => (
									<li key={t.id}>{t.name}</li>
								))}
							</ul>
						</div>
					)}
					<Link href={`/hospitals/${hospital.id}`} className="btn btn-primary mt-auto">View Hospital Details</Link>
				</div>
			</div>
		</div>
	);
}
