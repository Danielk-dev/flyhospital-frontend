'use client';

import { useEffect, useMemo, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import ProcedureCard from '@/components/procedure/ProcedureCard';
import BlogList from '@/components/blog/BlogList';
import { useGeneralStore } from '@/stores/general';

export default function ProcedurePage() {
	const store = useGeneralStore();
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		store.fetchTreatments();
	}, [store]);

	const filteredTreatments = useMemo(() => {
		if (!searchQuery) return store.treatments;
		return store.treatments.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
	}, [store.treatments, searchQuery]);

	return (
		<MainLayout>
			<main className="container my-5">
				<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Procedure', active: true }]} />
				<div className="listings-header mb-4">
					<h2><span>{store.treatments.length}</span> Procedure in the World</h2>
					<p className="text-muted">The ClickHospitals is based on data science algorithms, providing a trusted, transparent, and objective comparison.</p>
				</div>
				<div className="mb-5">
					<div className="row g-3">
						<div className="col-lg-4">
							<div className="input-group">
								<span className="input-group-text bg-white"><i className="bi bi-search" /></span>
								<input type="text" className="form-control" placeholder="Enter Procedure Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
							</div>
						</div>
					</div>
				</div>
				<div className="hospital-list">
					{filteredTreatments.length > 0 ? (
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
							{filteredTreatments.map((treatment) => (
								<ProcedureCard key={treatment.id} treatment={treatment} />
							))}
						</div>
					) : (
						<div className="text-center text-muted py-5">No procedures found.</div>
					)}
				</div>
				<div className="text-center mt-5">
					<p className="text-muted">Total {store.treatments.length} procedure</p>
				</div>
				<BlogList />
			</main>
		</MainLayout>
	);
}
