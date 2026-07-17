export default function FindPlan() {
	const steps = [
		{ step: '1', title: 'Search Our Directory', desc: 'Use the search bar at the top of the page to find the right hospital for your needs. Enter a hospital name, specialty, treatment, or location. You can also browse our directory to explore hospitals worldwide.' },
		{ step: '2', title: 'Visit the Hospital Page', desc: 'Click on a hospital to access complete details, including specialties, services offered, facility information, contact details, and helpful insights to guide your decision.' },
		{ step: '3', title: 'Explore Nearby Essentials', desc: 'Make your visit easier by browsing nearby hotels, restaurants, and transportation options. We provide convenient local recommendations to help you plan your stay with confidence and comfort.' },
	];

	return (
		<section className="find-plan-section">
			<div className="header">
				<h1>Find Your Plan: 3 Easy steps</h1>
				<p className="subtitle">A simple workflow to discover, compare, and connect with trusted healthcare providers worldwide.</p>
			</div>
			<div className="content">
				<div className="steps">
					{steps.map((item, index) => (
						<div key={item.step} className={index === 0 ? 'step-card1 step-card' : 'step-card'}>
							<div className="step-number">{item.step}</div>
							<div className="step-content">
								<h3>{item.title}</h3>
								<p>{item.desc}</p>
							</div>
						</div>
					))}
				</div>
				<div className="image-container">
					<img src="/assets/img/Mask-group.png" alt="Find plan" />
				</div>
			</div>
		</section>
	);
}
