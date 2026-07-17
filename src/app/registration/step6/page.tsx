import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';

export default function RegistrationStep6() {
	return (
		<MainLayout>
			<main className="container py-5 text-center">
				<div className="mb-4"><i className="bi bi-check-circle-fill text-success" style={{ fontSize: 64 }} /></div>
				<h2>Request Submitted Successfully!</h2>
				<p className="text-muted">Your partnership request is being processed. We will contact you shortly.</p>
				<div className="row g-4 mt-4 justify-content-center">
					<div className="col-md-4"><div className="card p-4"><i className="bi bi-envelope mb-2" style={{ fontSize: 32 }} /><p>Check your inbox for confirmation</p></div></div>
					<div className="col-md-4"><div className="card p-4"><i className="bi bi-file-earmark-text mb-2" style={{ fontSize: 32 }} /><p>Prepare your documentation</p></div></div>
				</div>
				<Link href="/" className="btn btn-primary mt-4">Back to Home</Link>
			</main>
		</MainLayout>
	);
}
