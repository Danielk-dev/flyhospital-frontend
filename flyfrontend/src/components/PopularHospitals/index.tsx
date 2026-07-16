'use client';

import Link from 'next/link';
import { useGeneralStore } from '@/stores/general';
import { useSlider } from '@/hooks/useSlider';
import { getImageUrl } from '@/lib/helpers';

export default function PopularHospitals() {
	const hospitals = useGeneralStore((s) => s.hospitals);
	const loading = useGeneralStore((s) => s.loading);
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(hospitals.length);

	return (
		<section className="popular-hospitals-section">
			<div className="container">
				<div className="section-header">
					<h2>Popular Hospitals</h2>
					<p>Top-rated hospitals trusted by patients worldwide.</p>
				</div>
				{loading && hospitals.length === 0 ? (
					<div className="text-center py-4">Loading...</div>
				) : (
					<div className="slider-container">
						<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
						<div className="slider-wrapper">
							<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
								{hospitals.map((hospital) => (
									<div key={hospital.id} className="hospital-slide-card">
										<img src={getImageUrl(hospital.image_url || hospital.image_urls?.[0])} alt={hospital.name || hospital.title || 'Hospital'} />
										<h3><Link href={`/hospitals/${hospital.id}`}>{hospital.name || hospital.title}</Link></h3>
										{hospital.average_rating && <span className="badge bg-warning text-dark">{hospital.average_rating} ★</span>}
									</div>
								))}
							</div>
						</div>
						<button className="slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
					</div>
				)}
				<Link href="/hospitals" className="view-all-btn">View all Hospitals</Link>
			</div>
		</section>
	);
}
