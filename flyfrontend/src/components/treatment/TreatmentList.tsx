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
				<div className="slider-container">
					<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
					<div className="slider-wrapper">
						<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
							{treatments.map((treatment) => (
								<div key={treatment.id} className="treatment-card">
									<img src={getImageUrl(treatment.image_url)} alt={treatment.name} loading="lazy" />
									<h3>
										<Link href={`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`}>{treatment.name}</Link>
									</h3>
									<p className="text-muted small">Toronto, Canada</p>
								</div>
							))}
						</div>
					</div>
					<button className="slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
				</div>
				<div className="text-center mt-4">
					<Link href="/procedure" className="view-all-btn">View all Procedures</Link>
				</div>
			</div>
		</section>
	);
}
