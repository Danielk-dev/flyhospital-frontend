import MainLayout from '@/components/layouts/MainLayout';

export default function EmptyTestPage() {
	return (
		<MainLayout>
			<main className="container py-5"><p>Empty test page for baseline load-time testing.</p></main>
		</MainLayout>
	);
}
