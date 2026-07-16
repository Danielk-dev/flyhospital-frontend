'use client';

import { useEffect, useState } from 'react';
import { useSlider } from '@/hooks/useSlider';

const TESTIMONIALS = [
	{ name: 'Sarah Johnson', quote: 'ClickHospitals made finding the right hospital abroad so easy.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
	{ name: 'Michael Chen', quote: 'Excellent platform for comparing medical facilities worldwide.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
	{ name: 'Emma Williams', quote: 'Found a great hospital in Turkey through this service.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
	{ name: 'David Brown', quote: 'The search filters saved me hours of research.', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
	{ name: 'Lisa Garcia', quote: 'Highly recommend for medical tourism planning.', avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
];

export default function Testimonials() {
	const [autoIndex, setAutoIndex] = useState(0);
	const { currentIndex, prevSlide, nextSlide } = useSlider(TESTIMONIALS.length, [
		{ minWidth: 0, slides: 3 },
	]);

	useEffect(() => {
		const interval = setInterval(() => setAutoIndex((i) => (i + 1) % TESTIMONIALS.length), 3000);
		return () => clearInterval(interval);
	}, []);

	const visible = [
		TESTIMONIALS[(autoIndex) % TESTIMONIALS.length],
		TESTIMONIALS[(autoIndex + 1) % TESTIMONIALS.length],
		TESTIMONIALS[(autoIndex + 2) % TESTIMONIALS.length],
	];

	return (
		<section className="testimonials-section py-5">
			<div className="container">
				<div className="section-header text-center mb-4">
					<h2>What Our Users Say</h2>
				</div>
				<div className="row g-4">
					{visible.map((t) => (
						<div key={t.name} className="col-md-4">
							<div className="card p-4 h-100">
								<p>&ldquo;{t.quote}&rdquo;</p>
								<div className="d-flex align-items-center mt-3">
									<img src={t.avatar} alt={t.name} className="rounded-circle me-3" width={48} height={48} />
									<strong>{t.name}</strong>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="d-flex justify-content-center gap-3 mt-4">
					<button className="btn btn-outline-primary" onClick={prevSlide}>&#10094;</button>
					<button className="btn btn-outline-primary" onClick={nextSlide}>&#10095;</button>
				</div>
			</div>
		</section>
	);
}
