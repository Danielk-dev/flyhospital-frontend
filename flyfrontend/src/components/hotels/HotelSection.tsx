'use client';

import { useSlider } from '@/hooks/useSlider';
import { truncateText } from '@/lib/helpers';

interface NearbyItem {
	id: number;
	name?: string;
	title?: string;
	image_url?: string;
	google_map_location?: string;
	average_rating?: string;
}

export default function HotelSection({ hotels }: { hotels: NearbyItem[] }) {
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(hotels.length, [
		{ minWidth: 992, slides: 4 },
		{ minWidth: 768, slides: 2 },
		{ minWidth: 0, slides: 1 },
	]);

	if (!hotels.length) return null;

	return (
		<section id="hotels" className="my-5">
			<h3>Explore Nearby Hotels</h3>
			<div className="slider-container">
				<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
				<div className="slider-wrapper">
					<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
						{hotels.map((hotel) => (
							<div key={hotel.id} className="card m-2">
								<img src={hotel.image_url || 'https://admin.clickhospitals.com/dumy.jpg'} className="card-img-top" alt={hotel.name || hotel.title} />
								<div className="card-body">
									<h6>{truncateText(hotel.name || hotel.title || 'Hotel', 40)}</h6>
									{hotel.google_map_location && <a href={hotel.google_map_location} target="_blank" rel="noreferrer" className="btn btn-sm btn-light">Map</a>}
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
