'use client';

import Link from 'next/link';
import { useGeneralStore } from '@/stores/general';
import { useSlider } from '@/hooks/useSlider';
import { getImageUrl } from '@/lib/helpers';

export default function DestinationList() {
	const destinations = useGeneralStore((s) => s.destinations);
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(destinations.length);

	return (
		<section className="destinations-section">
			<div className="container">
				<div className="section-header">
					<h2>Top Medical Tourism Destinations</h2>
					<p>Discover the world&apos;s leading destinations for quality medical care. Trusted by thousands seeking expert procedures and peace of mind.</p>
				</div>
				<div className="slider-container">
					<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
					<div className="slider-wrapper">
						<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
							{destinations.map((destination, index) => (
								<div key={destination.id} className="destination-card" style={{ marginRight: index === destinations.length - 1 ? 0 : 10 }}>
									<img src={getImageUrl(destination.secondary_image || destination.image_url)} alt="Destination" loading="lazy" />
									<div className="card-content">
										<p className="card-subtitle">
											<span className="icon"><img src="/assets/img/Group.svg" alt="Group" className="icon-img" /></span>
											<span className="count">25+</span> Clinics
										</p>
										<div className="card-title-bar">
											<h3>
												<Link style={{ textDecoration: 'none', color: '#053862' }} href={`/hospitals?country_id=${destination.id}`}>
													{destination.country_name || destination.name}
												</Link>
											</h3>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<button className="slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
				</div>
				<Link href="/destinations" className="view-all-btn">View all Destination</Link>
			</div>
		</section>
	);
}
