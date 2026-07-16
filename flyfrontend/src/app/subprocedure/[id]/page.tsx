'use client';

import { Suspense, use, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import SubProcedureCard from '@/components/procedure/SubProcedureCard';
import BlogList from '@/components/blog/BlogList';
import { useGeneralStore } from '@/stores/general';

function SubProcedureContent({ id }: { id: string }) {
	const searchParams = useSearchParams();
	const store = useGeneralStore();
	const [searchQuery, setSearchQuery] = useState('');
	const name = searchParams.get('name') || 'Procedure';

	useEffect(() => {
		store.fetchSubProcedures(id);
	}, [id, store]);

	const filtered = useMemo(() => {
		if (!searchQuery) return store.subprocedures;
		return store.subprocedures.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
	}, [store.subprocedures, searchQuery]);

	return (
		<main className="container my-5">
			<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'All Procedure', link: '/procedure' }, { label: name, active: true }]} />
			<div className="listings-header mb-4">
				<h2>{name}</h2>
				<p className="text-muted">Browse sub-procedures under {name}.</p>
			</div>
			<div className="mb-5 col-lg-4">
				<input type="text" className="form-control" placeholder="Enter procedure Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
			</div>
			{store.loading ? (
				<div className="text-center py-5">Loading...</div>
			) : filtered.length > 0 ? (
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
					{filtered.map((treatment) => <SubProcedureCard key={treatment.id} treatment={treatment} />)}
				</div>
			) : (
				<div className="text-center text-muted py-5">No sub-procedures found.</div>
			)}
			<div className="text-center mt-5"><p className="text-muted">Total {store.subprocedures.length} procedure</p></div>
			<BlogList />
		</main>
	);
}

export default function SubProcedurePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	return (
		<MainLayout>
			<Suspense fallback={<div className="text-center py-5">Loading...</div>}>
				<SubProcedureContent id={id} />
			</Suspense>
		</MainLayout>
	);
}
