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

	return (
		<section id="how-to-get-there" className="my-5">
			<h3>{title}</h3>
			<p className="text-muted">{description}</p>
			<div className="slider-container">
				<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
				<div className="slider-wrapper">
					<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
						{items.map((item) => (
							<div key={item.id} className="card m-2">
								<div className="card-body">
									<h6>{truncateText(item.name || item.type || 'Transport', 40)}</h6>
									<p className="small text-muted">{item.description}</p>
									{item.distance && <span className="badge bg-secondary">{item.distance}</span>}
									{item.google_map_location && <a href={item.google_map_location} target="_blank" rel="noreferrer" className="btn btn-sm btn-light ms-2">Map</a>}
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
