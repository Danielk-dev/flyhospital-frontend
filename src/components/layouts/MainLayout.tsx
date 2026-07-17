'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { useGeneralStore } from '@/stores/general';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const loading = useGeneralStore((s) => s.loading);

	return (
		<div>
			{/* {loading && (
				<div className="loading-overlay">
					<Loader />
				</div>
			)} */}
			<Header />
			{children}
			<Footer />
		</div>
	);
}
