'use client';

import { useState } from 'react';

export default function AboutSection() {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<section className="info-section">
			<div className="container info-content">
				<div className="info-icon">
					<img src="/assets/img/globe.png" alt="Globe with heart icon" loading="lazy" className={!imageLoaded ? 'image-loading' : ''} onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
				</div>
				<div className="info-text">
					<h2><span>ClickHospitals</span> is an international platform for hospital search and treatment arrangement</h2>
				</div>
				<div className="info-description">
					<p>We designed ClickHospitals to simplify global medical discovery. Whether you&apos;re seeking advanced procedure, lower costs, or expert care in another country, our platform connects you with hospitals worldwide.</p>
					<a href="/about">Learn More</a>
				</div>
			</div>
		</section>
	);
}
