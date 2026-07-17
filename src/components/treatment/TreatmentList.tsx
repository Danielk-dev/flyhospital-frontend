'use client';

import Link from 'next/link';
import { useGeneralStore } from '@/stores/general';
import { useSlider } from '@/hooks/useSlider';
import { getImageUrl } from '@/lib/helpers';

export default function TreatmentList() {
	const treatments = useGeneralStore((s) => s.treatments);
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(treatments.length);

	return (
		<section className="treatment-list-section">
			<div className="container">
				<div className="section-header">
					<h2>Explore Procedure Type</h2>
					<p>Browse top medical procedures and find the right care for your needs.</p>
				</div>
				<div className="treatment-list-slider-container">
					<button className="treatment-list-slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
					<div className="treatment-list-slider-wrapper">
					<div className="treatment-list-slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
						{treatments.map((treatment) => (
							<div key={treatment.id} className="treatment-list-card">
									<img src={getImageUrl(treatment.image_url)} alt={treatment.name} loading="lazy" />
									<p className="text-muted small treatment-list-location">Toronto, Canada</p>
								   <div className="treatment-list-card-title-bar">
									<h3>
										<Link href={`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`}>{treatment.name}</Link>
									</h3>
									 <span className="rating">4.9<span className="star">★</span></span>
									</div>
								</div>
							))}
						</div>
					</div>
					<button className="treatment-list-slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
				</div>
				<div className="text-center mt-4">
					<Link href="/procedure" className="view-all-btn">View all Procedures</Link>
				</div>
			</div>
		</section>
	);
}
