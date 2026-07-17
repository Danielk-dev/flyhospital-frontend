'use client';

import { useSlider } from '@/hooks/useSlider';
import { truncateText } from '@/lib/helpers';

interface TransportItem {
	id: number;
	name?: string;
	description?: string;
	distance?: string;
	type?: string;
	google_map_location?: string;
}

export default function TransportSection({ items, title = 'How to get there', description = 'Nearby transport options' }: {
	items: TransportItem[];
	title?: string;
	description?: string;
}) {
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(items.length, [
		{ minWidth: 0, slides: 4 },
	]);

	if (!items.length) return null;
 const taxiStandImage =  "https://admin.clickhospitals.com/assets/img/taxi-stand.jpg";
 const airportImage =  "https://admin.clickhospitals.com/assets/img/airport.jpg";
 const railwayImage =  "https://admin.clickhospitals.com/assets/img/railway-station.jpg";
 const fallbackImage =  "https://admin.clickhospitals.com/dumy.jpg";

	return (
		<section id="how-to-get-there" className="popular-hotels-section my-5">
			<div className="section-header">
			<h2>{title}</h2>
			<p className="text-muted">{description}</p>
		</div>
		
			<div className="slider-container">
				<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
				<div className="slider-wrapper">
					<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
						{items.map((item) => (
							<div key={item.id} className="card hotel-card m-2">
								<div className="card-body">
<img
  src={
    item.type === "Taxi Stand"
      ? taxiStandImage
      : item.type === "Airport"
      ? airportImage
      : item.type === "Railway Station"
      ? railwayImage
      : fallbackImage
  }
  alt={item.type}
/>
									<h6>{truncateText(item.name || item.type || 'Transport', 40)}</h6>
									<p className="small text-muted">{item.description}</p>
									{item.distance && <span className="badge bg-secondary">{item.distance} km away</span>}
									{item.google_map_location && <a href={item.google_map_location} target="_blank" rel="noreferrer" className="btn btn-sm btn-light ms-2"><i className="bi bi-map"></i> Map</a>}
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
