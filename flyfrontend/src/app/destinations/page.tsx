'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import BlogList from '@/components/blog/BlogList';
import Loader from '@/components/Loader';
import { useGeneralStore } from '@/stores/general';
import { getImageUrl } from '@/lib/helpers';

export default function DestinationsPage() {
	const store = useGeneralStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeRegion, setActiveRegion] = useState<number | null>(null);

	useEffect(() => {
		store.fetchDestination();
		store.fetchRegions();
	}, [store]);

	const filtered = useMemo(() => {
		let list = store.destinations;
		if (activeRegion) list = list.filter((d) => d.region_id === activeRegion);
		if (searchQuery) list = list.filter((d) => (d.country_name || d.name).toLowerCase().includes(searchQuery.toLowerCase()));
		return list;
	}, [store.destinations, activeRegion, searchQuery]);

	return (
		<MainLayout>
			<main className="container my-5">
				<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Destinations', active: true }]} />
				<div className="listings-header mb-4">
					<h2>Medical Tourism Destinations</h2>
					<p className="text-muted">Discover leading destinations for quality medical care worldwide.</p>
				</div>
				{store.loading && store.destinations.length === 0 ? (
					<div className="text-center py-5"><Loader /></div>
				) : (
					<>
						<div className="mb-4 d-flex flex-wrap gap-2">
							<button className={`btn ${activeRegion === null ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveRegion(null)}>All</button>
							{store.regions.map((region) => (
								<button key={region.id} className={`btn ${activeRegion === region.id ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveRegion(region.id)}>{region.name}</button>
							))}
						</div>
						<div className="mb-4 col-lg-4">
							<input type="text" className="form-control" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
						</div>
						<div className="row g-4">
							{filtered.map((destination) => (
								<div key={destination.id} className="col-md-4">
									<div className="card h-100">
										<img src={getImageUrl(destination.image_url || destination.secondary_image)} className="card-img-top" alt={destination.country_name || destination.name} />
										<div className="card-body">
											<h5><Link href={`/hospitals?country_id=${destination.id}`} className="text-decoration-none">{destination.country_name || destination.name}</Link></h5>
											<p className="text-muted small">{destination.hospitals_count || '25+'} Hospitals</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}
				<BlogList />
			</main>
		</MainLayout>
	);
}
