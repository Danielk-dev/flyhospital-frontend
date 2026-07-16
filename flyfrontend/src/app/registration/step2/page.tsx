'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep2() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [otp, setOtp] = useState(['', '', '', '', '', '']);

	const handleContinue = () => {
		setData({ emailVerification: { code: otp.join('') } });
		router.push('/registration/step3');
	};

	return (
		<MainLayout>
			<main className="container py-5 text-center">
				<h2>Email Verification - Step 2 of 5</h2>
				<p className="text-muted">Enter the 6-digit code sent to your email.</p>
				<div className="d-flex justify-content-center gap-2 my-4">
					{otp.map((d, i) => (
						<input key={i} maxLength={1} className="form-control text-center" style={{ width: 50 }} value={d} onChange={(e) => { const n = [...otp]; n[i] = e.target.value.replace(/\D/g, ''); setOtp(n); }} />
					))}
				</div>
				<div className="d-flex justify-content-center gap-3">
					<Link href="/registration/step1" className="btn btn-outline-secondary">Back</Link>
					<button className="btn btn-primary" onClick={handleContinue}>Continue</button>
				</div>
			</main>
		</MainLayout>
	);
}
