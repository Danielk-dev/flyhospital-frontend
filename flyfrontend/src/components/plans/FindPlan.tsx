export default function FindPlan() {
	return (
		<section className="find-plan-section container my-5">
			<div className="row align-items-center">
				<div className="col-lg-7">
					<h2>Find Your Plan: 3 Easy steps</h2>
					<div className="row mt-4">
						{[
							{ step: '1', title: 'Search', desc: 'Find hospitals by procedure or destination.' },
							{ step: '2', title: 'Compare', desc: 'Review profiles, ratings, and services.' },
							{ step: '3', title: 'Connect', desc: 'Reach out and plan your medical journey.' },
						].map((item) => (
							<div key={item.step} className="col-md-4 mb-3">
								<div className="card p-3 h-100">
									<span className="badge bg-primary mb-2">{item.step}</span>
									<h5>{item.title}</h5>
									<p className="mb-0">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-lg-5 text-center">
					<img src="/assets/img/Mask-group.png" alt="Find plan" className="img-fluid" />
				</div>
			</div>
		</section>
	);
}
