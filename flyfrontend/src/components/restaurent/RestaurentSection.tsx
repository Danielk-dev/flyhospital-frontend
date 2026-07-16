'use client';

import { useSlider } from '@/hooks/useSlider';
import { truncateText } from '@/lib/helpers';

interface NearbyItem {
	id: number;
	name?: string;
	title?: string;
	image_url?: string;
	google_map_location?: string;
}

export default function RestaurentSection({ restaurants }: { restaurants: NearbyItem[] }) {
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(restaurants.length, [
		{ minWidth: 992, slides: 5 },
		{ minWidth: 768, slides: 2 },
		{ minWidth: 0, slides: 1 },
	]);

	if (!restaurants.length) return null;

	return (
		<section id="restaurants" className="my-5">
			<h3>Explore Nearby Restaurants</h3>
			<div className="slider-container">
				<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
				<div className="slider-wrapper">
					<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
						{restaurants.map((item) => (
							<div key={item.id} className="card m-2">
								<img src={item.image_url || 'https://admin.clickhospitals.com/dumy.jpg'} className="card-img-top" alt={item.name || item.title} />
								<div className="card-body">
									<h6>{truncateText(item.name || item.title || 'Restaurant', 40)}</h6>
									{item.google_map_location && <a href={item.google_map_location} target="_blank" rel="noreferrer" className="btn btn-sm btn-light">Map</a>}
								</div>
							</div>
						))}
					</div>
				</div>
				<button className="slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
			</div>
		</section>
	);
}
