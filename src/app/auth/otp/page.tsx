'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function OtpPage() {
	const [otp, setOtp] = useState(['', '', '', '']);

	const handleChange = (index: number, value: string) => {
		if (!/^\d?$/.test(value)) return;
		const next = [...otp];
		next[index] = value;
		setOtp(next);
	};

	return (
		<AuthLayout>
			<main className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-6 text-center">
						<h2>Verify OTP</h2>
						<p className="text-muted">Enter the 4-digit code sent to your email.</p>
						<div className="d-flex justify-content-center gap-3 my-4">
							{otp.map((digit, i) => (
								<input key={i} type="text" maxLength={1} className="form-control text-center" style={{ width: 60, fontSize: 24 }} value={digit} onChange={(e) => handleChange(i, e.target.value)} />
							))}
						</div>
						<p><a href="#">Resend code</a></p>
						<div className="d-flex justify-content-center gap-3 mt-4">
							<Link href="/auth/signup" className="btn btn-outline-secondary">Cancel</Link>
							<Link href="/auth/finish" className="btn btn-primary">Verify</Link>
						</div>
					</div>
				</div>
			</main>
		</AuthLayout>
	);
}
