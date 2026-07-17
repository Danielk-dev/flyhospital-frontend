'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useGeneralStore } from '@/stores/general';
import { apiFetch } from '@/lib/api';

export default function SpeedTestPage() {
	const store = useGeneralStore();
	const [results, setResults] = useState<{ name: string; time: number; cached: boolean }[]>([]);

	const runTests = async () => {
		const tests = [
			{ name: 'Treatments', url: 'treatments', cached: store.treatments.length > 0 },
			{ name: 'Destinations', url: 'destinations', cached: store.destinations.length > 0 },
		];
		const out: typeof results = [];
		for (const test of tests) {
			const start = performance.now();
			try {
				await apiFetch(test.url);
				out.push({ name: test.name, time: Math.round(performance.now() - start), cached: test.cached });
			} catch {
				out.push({ name: test.name, time: -1, cached: test.cached });
			}
		}
		setResults(out);
	};

	useEffect(() => { runTests(); }, []);

	return (
		<MainLayout>
			<main className="container py-5">
				<h2>Speed Test</h2>
				<button className="btn btn-primary mb-4" onClick={runTests}>Refresh Tests</button>
				<table className="table">
					<thead><tr><th>API</th><th>Time (ms)</th><th>Cached</th></tr></thead>
					<tbody>
						{results.map((r) => (
							<tr key={r.name}>
								<td>{r.name}</td>
								<td>{r.time >= 0 ? r.time : 'Failed'}</td>
								<td>{r.cached ? 'Yes' : 'No'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</MainLayout>
	);
}
