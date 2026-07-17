import AuthLayout from '@/components/layouts/AuthLayout';

export default function FinishPage() {
	return (
		<AuthLayout>
			<main className="container py-5 text-center">
				<h2>Registration Complete</h2>
				<p className="text-muted">Your partner registration has been submitted successfully.</p>
			</main>
		</AuthLayout>
	);
}
