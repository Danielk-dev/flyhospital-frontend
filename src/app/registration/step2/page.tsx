'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep2() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
	const [isResending, setIsResending] = useState(false);

	const handleOtpChange = (index: number, value: string) => {
		const newValue = value.replace(/\D/g, '');
		if (newValue.length <= 1) {
			const newOtp = [...otpDigits];
			newOtp[index] = newValue;
			setOtpDigits(newOtp);

			// Auto-focus next input
			if (newValue && index < 5) {
				const nextInput = document.querySelector(
					`input[data-index="${index + 1}"]`
				) as HTMLInputElement;
				nextInput?.focus();
			}
		}
	};

	const handleResend = () => {
		setIsResending(true);
		// Resend OTP logic would go here
		setTimeout(() => {
			setIsResending(false);
		}, 2000);
	};

	const handleVerifyAndContinue = () => {
		const code = otpDigits.join('');
		if (code.length === 6) {
			setData({ emailVerification: { code, verified: true } });
			router.push('/registration/step3');
		}
	};

	const isOtpComplete = otpDigits.join('').length === 6;

	return (
		<MainLayout>
			<main className="registration-page">
				<div className="registration-container">
					<header className="page-header">
						<h1>
							Welcome to <br />ClickHospitals Partnership Registration!
						</h1>
						<p className="subhead">
							<span className="subhead-icon">⊕</span>
							Create an account to become our partner and list your clinic on
							ClickHospitals in 4 simple steps.
						</p>
					</header>

					<div className="step-indicator">
						<span className="step-label">Step 2 of 5</span>
						<div className="step-bar">
							<div className="step-progress" style={{ width: '40%' }} />
						</div>
					</div>

					<div className="verify-page">
						<div className="inner-header">
							<h1>Verify your email address</h1>
							<p>
								These details will be used for your main point of contact and
								primary login credentials.
							</p>
						</div>

						<div className="hero-panel">
							<img
								className="hero-bg"
								src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
								alt="Modern healthcare / medical office building"
							/>
							<div className="hero-overlay" />

							<div className="hero-copy">
								<h2>
									Partner with
									<br />
									Trust
								</h2>
								<p>
									Join the world's most reliable network of healthcare providers
									and medical vendors. Your expertise deserves a global platform.
								</p>
							</div>

							<div className="verify-card">
								<div className="mail-icon">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M3 6.75C3 5.784 3.784 5 4.75 5h14.5c.966 0 1.75.784 1.75 1.75v10.5c0 .966-.784 1.75-1.75 1.75H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
											stroke="currentColor"
											strokeWidth="1.6"
											strokeLinejoin="round"
										/>
										<path
											d="M4 6.5 12 13l8-6.5"
											stroke="currentColor"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>

								<h3>Verify your email address</h3>
								<p className="verify-sub">
									We've sent a code to your email. Please enter it below to
									continue.
								</p>

								<div className="code">
									{otpDigits.map((digit, i) => (
										<input
											key={i}
											data-index={i}
											type="text"
											className="input-code"
											maxLength={1}
											inputMode="numeric"
											value={digit}
											onChange={(e) => handleOtpChange(i, e.target.value)}
										/>
									))}
								</div>

								<button
									className="verify-btn"
									onClick={handleVerifyAndContinue}
									disabled={!isOtpComplete}
								>
									Verify &amp; Continue
								</button>

								<p className="resend">
									Didn't receive the code?
									<a href="#" onClick={(e) => {
										e.preventDefault();
										handleResend();
									}}>
										{isResending ? 'Sending...' : 'Resend code'}
									</a>
								</p>
							</div>
						</div>

						<div className="page-footer">
							<Link href="/registration/step1" className="back-link">
								<span className="arrow-left">←</span> Back to Step 1
							</Link>
							<Link
								href="/registration/step3"
								className="continue-btn"
								onClick={(e) => {
									if (!isOtpComplete) {
										e.preventDefault();
									}
								}}
							>
								Continue <span className="arrow-right">→</span>
							</Link>
						</div>
					</div>
				</div>
			</main>

			<style jsx>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				.registration-page {
					background: none;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 2rem 1.5rem;
				}

				.registration-container {
					width: 80%;
					max-width: 1600px;
					padding: 2.5rem 3rem;
				}

				.page-header {
					margin-bottom: 2rem;
					padding-left: 10px;
					text-align: center;
				}

				.page-header h1 {
					font-size: 2rem;
					font-weight: 700;
					color: #0b2b4a;
					line-height: 1.2;
				}

				.subhead {
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: auto;
					font-size: 12px;
					width: 40%;
					color: #3e5a70;
					margin-top: 0.3rem;
					gap: 0.4rem;
				}

				.subhead-icon {
					color: #0a7e8c;
					font-size: 14px;
				}

				.step-indicator {
					margin: 1.5rem 0 2rem;
				}

				.step-label {
					font-size: 0.85rem;
					font-weight: 600;
					color: #0a7e8c;
					display: block;
					margin-bottom: 0.4rem;
				}

				.step-bar {
					width: 100%;
					height: 4px;
					background: #e4ebf3;
					border-radius: 4px;
					overflow: hidden;
				}

				.step-progress {
					height: 100%;
					background: #0a7e8c;
					border-radius: 4px;
					transition: width 0.3s ease;
				}

				.verify-page {
					max-width: 1180px;
					margin: 0 auto;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
					color: #101828;
				}

				.inner-header {
					margin-bottom: 1.5rem;
				}

				.inner-header h1 {
					font-size: 22px;
					font-weight: 600;
					margin: 0 0 6px;
					color: #101828;
				}

				.inner-header p {
					font-size: 13.5px;
					color: #667085;
					margin: 0 0 24px;
					max-width: 520px;
					line-height: 1.5;
				}

				.hero-panel {
					position: relative;
					border-radius: 4px;
					overflow: hidden;
					min-height: 420px;
					display: flex;
					align-items: center;
					isolation: isolate;
				}

				.hero-bg {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
					z-index: -2;
				}

				.hero-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						100deg,
						rgba(10, 20, 35, 0.55) 0%,
						rgba(10, 20, 35, 0.25) 45%,
						rgba(10, 20, 35, 0.08) 62%
					);
					z-index: -1;
				}

				.hero-copy {
					padding: 40px 44px;
					max-width: 380px;
					color: #fff;
				}

				.hero-copy h2 {
					font-size: 30px;
					font-weight: 700;
					line-height: 1.15;
					margin: 0 0 14px;
				}

				.hero-copy p {
					font-size: 13.5px;
					line-height: 1.6;
					color: rgba(255, 255, 255, 0.88);
					margin: 0;
					max-width: 300px;
				}

				.verify-card {
					margin-left: auto;
					margin-right: 56px;
					background: #fff;
					border-radius: 4px;
					box-shadow: 0 20px 45px rgba(16, 24, 40, 0.18);
					padding: 36px 40px 32px;
					width: 50%;
					text-align: center;
				}

				.mail-icon {
					width: 44px;
					height: 44px;
					border-radius: 10px;
					background: #e7ecff;
					color: #3b4cca;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto 18px;
				}

				.mail-icon svg {
					width: 22px;
					height: 22px;
				}

				.verify-card h3 {
					font-size: 20px;
					font-weight: 700;
					margin: 0 0 8px;
					color: #101828;
				}

				.verify-sub {
					font-size: 13px;
					color: #667085;
					line-height: 1.5;
					margin: 0 0 22px;
				}

				.code {
					display: flex;
					justify-content: center;
					gap: 20px;
					margin-bottom: 24px;
				}

				.input-code {
					width: 50px;
					height: 50px;
					border: 1px solid #d0d5dd;
					border-radius: 8px;
					text-align: center;
					font-size: 18px;
					font-weight: 600;
					color: #101828;
					outline: none;
					transition: border-color 0.15s ease, box-shadow 0.15s ease;
					font-family: inherit;
				}

				.input-code:focus {
					border-color: #1d2b52;
					box-shadow: 0 0 0 3px rgba(29, 43, 82, 0.12);
				}

				.verify-btn {
					width: 100%;
					background: #101a3d;
					color: #fff;
					border: none;
					border-radius: 8px;
					padding: 12px 0;
					font-size: 14px;
					font-weight: 600;
					cursor: pointer;
					transition: opacity 0.15s ease;
				}

				.verify-btn:hover:not(:disabled) {
					opacity: 0.92;
				}

				.verify-btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				.resend {
					margin: 16px 0 0;
					font-size: 12.5px;
					color: #667085;
				}

				.resend a {
					color: #3b4cca;
					font-weight: 600;
					text-decoration: none;
					margin-left: 4px;
					cursor: pointer;
				}

				.resend a:hover {
					text-decoration: underline;
				}

				.page-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid #eaecf0;
					margin-top: 24px;
					padding-top: 20px;
				}

				.back-link {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: #344054;
					font-size: 13.5px;
					font-weight: 500;
					text-decoration: none;
				}

				.back-link:hover {
					color: #101828;
				}

				.continue-btn {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					background: #16a37a;
					color: #fff;
					border-radius: 8px;
					padding: 10px 20px;
					font-size: 13.5px;
					font-weight: 600;
					cursor: pointer;
					transition: opacity 0.15s ease;
					text-decoration: none;
					margin-left: auto;
				}

				.continue-btn:hover {
					opacity: 0.92;
				}

				.arrow-left,
				.arrow-right {
					font-size: 14px;
					line-height: 1;
				}

				@media (max-width: 768px) {
					.registration-container {
						width: 95%;
						padding: 1.8rem 1.5rem;
					}

					.page-header h1 {
						font-size: 1.6rem;
					}

					.subhead {
						width: 75%;
					}

					.hero-panel {
						min-height: auto;
						flex-direction: column;
					}

					.hero-copy {
						padding: 28px 24px 0;
						max-width: 100%;
					}

					.hero-copy h2 {
						font-size: 24px;
					}

					.verify-card {
						margin: 24px auto;
						width: calc(100% - 48px);
						padding: 28px 24px 24px;
					}

					.code {
						gap: 10px;
					}

					.input-code {
						width: 42px;
						height: 46px;
						font-size: 16px;
					}

					.page-footer {
						flex-direction: column;
						gap: 14px;
						align-items: stretch;
					}

					.continue-btn {
						justify-content: center;
						margin-left: 0;
					}

					.back-link {
						justify-content: center;
					}
				}

				@media (max-width: 480px) {
					.registration-page {
						padding: 1rem 0.8rem;
					}

					.registration-container {
						width: 95%;
						padding: 1.2rem 1rem;
					}

					.page-header h1 {
						font-size: 1.3rem;
					}

					.subhead {
						width: 90%;
						font-size: 11px;
					}

					.inner-header h1 {
						font-size: 18px;
					}

					.inner-header p {
						font-size: 12.5px;
					}

					.hero-copy {
						padding: 20px 18px 0;
					}

					.hero-copy h2 {
						font-size: 20px;
					}

					.hero-copy p {
						font-size: 12.5px;
					}

					.verify-card {
						margin: 20px auto;
						width: calc(100% - 24px);
						padding: 24px 18px 20px;
					}

					.mail-icon {
						width: 38px;
						height: 38px;
					}

					.verify-card h3 {
						font-size: 17px;
					}

					.code {
						gap: 6px;
					}

					.input-code {
						width: 36px;
						height: 42px;
						font-size: 16px;
					}
				}

				@media (max-width: 360px) {
					.code {
						gap: 4px;
					}

					.input-code {
						width: 30px;
						height: 38px;
						font-size: 14px;
					}
				}
			`}</style>
		</MainLayout>
	);
}
