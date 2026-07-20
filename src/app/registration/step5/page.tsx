'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep5() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const registrationData = useRegistrationStore((s) => s.data);

	const [form, setForm] = useState({
		cardholderName: '',
		cardNumber: '',
		expiry: '',
		cvc: '',
	});

	const annualSubscription = 99.0;
	const setupFee = 0;
	const taxes = 0;
	const totalCharges = useMemo(
		() => annualSubscription + setupFee + taxes,
		[]
	);

	const formatCardNumber = (value: string) => {
		const digits = value.replace(/\D/g, '').slice(0, 16);
		return digits.replace(/(.{4})/g, '$1 ').trim();
	};

	const formatExpiry = (value: string) => {
		const digits = value.replace(/\D/g, '').slice(0, 4);
		return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
	};

	const formatCvc = (value: string) => {
		return value.replace(/\D/g, '').slice(0, 4);
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, cardNumber: formatCardNumber(e.target.value) });
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, expiry: formatExpiry(e.target.value) });
	};

	const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, cvc: formatCvc(e.target.value) });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setData({ paymentInfo: { ...form, totalCharges } });
		router.push('/registration/step6');
	};

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
						<span className="step-label">Step 5 of 5</span>
						<div className="step-bar">
							<div className="step-progress" style={{ width: '100%' }} />
						</div>
					</div>

					<div className="pm-checkout-wrapper">
						<div className="pm-two-column-layout">
							{/* Left: Partnership Summary */}
							<div className="pm-order-summary-panel">
								<h2 className="pm-summary-heading">Partnership Summary</h2>

								<div className="pm-premium-badge">
									<span className="pm-badge-shield">
										<svg
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10 2.5 16 4.5v4.4c0 4.1-2.6 7.4-6 8.6-3.4-1.2-6-4.5-6-8.6V4.5L10 2.5Z"
												fill="#fff"
											/>
											<path
												d="M7.3 10 9 11.7l3.6-3.9"
												stroke="#16a37a"
												strokeWidth="1.4"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
									Featured Hospital
								</div>

								<div className="pm-cost-breakdown">
									<div className="pm-cost-item">
										<span className="pm-cost-label">Annual Subscription</span>
										<span className="pm-cost-amount">
											${annualSubscription.toFixed(2)}
										</span>
									</div>
									<div className="pm-cost-item">
										<span className="pm-cost-label">Setup Fee</span>
										<span className="pm-cost-amount pm-waived">Free</span>
									</div>
									<div className="pm-cost-item">
										<span className="pm-cost-label">Taxes</span>
										<span className="pm-cost-amount">${taxes.toFixed(2)}</span>
									</div>
								</div>

								<div className="pm-grand-total">
									<span className="pm-total-heading">Total Charges</span>
									<span className="pm-total-figure">
										${totalCharges.toFixed(2)}
									</span>
								</div>

								<div className="pm-visual-asset">
									<img
										src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80"
										alt="Healthcare professional reviewing partnership details on a tablet"
									/>
								</div>
							</div>

							{/* Right: Payment Information */}
							<div className="pm-payment-details-panel">
								<div className="pm-payment-header">
									<h2 className="pm-payment-heading">Payment Information</h2>
									<div className="pm-gateway-label">
										Powered by <strong>Stripe</strong>
									</div>
								</div>

								<form className="pm-payment-form" onSubmit={handleSubmit}>
									<div className="pm-form-group">
										<label className="pm-field-label" htmlFor="pm-cardholder">
											Cardholder Name
										</label>
										<input
											id="pm-cardholder"
											type="text"
											className="pm-text-input"
											placeholder="John Doe"
											value={form.cardholderName}
											onChange={(e) =>
												setForm({ ...form, cardholderName: e.target.value })
											}
										/>
									</div>

									<div className="pm-form-group">
										<label className="pm-field-label" htmlFor="pm-card-number">
											Card Number
										</label>
										<div className="pm-input-with-icon">
											<input
												id="pm-card-number"
												type="text"
												className="pm-text-input"
												placeholder="4242 4242 4242 4242"
												maxLength={19}
												value={form.cardNumber}
												onChange={handleCardNumberChange}
											/>
											<svg
												className="pm-input-suffix-icon"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<rect
													x="2"
													y="4.5"
													width="16"
													height="11"
													rx="1.6"
													stroke="currentColor"
													strokeWidth="1.3"
												/>
												<path
													d="M2 8h16"
													stroke="currentColor"
													strokeWidth="1.3"
												/>
											</svg>
										</div>
									</div>

									<div className="pm-form-row">
										<div className="pm-form-group">
											<label className="pm-field-label" htmlFor="pm-expiry">
												Expiry Date
											</label>
											<div className="pm-input-with-icon">
												<input
													id="pm-expiry"
													type="text"
													className="pm-text-input"
													placeholder="MM / YY"
													maxLength={7}
													value={form.expiry}
													onChange={handleExpiryChange}
												/>
												<svg
													className="pm-input-suffix-icon"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<rect
														x="2.5"
														y="3.5"
														width="15"
														height="13.5"
														rx="1.6"
														stroke="currentColor"
														strokeWidth="1.3"
													/>
													<path
														d="M2.5 7.5h15M6 2v3M14 2v3"
														stroke="currentColor"
														strokeWidth="1.3"
														strokeLinecap="round"
													/>
												</svg>
											</div>
										</div>

										<div className="pm-form-group">
											<label className="pm-field-label" htmlFor="pm-cvc">
												CVC
											</label>
											<div className="pm-input-with-icon">
												<input
													id="pm-cvc"
													type="text"
													className="pm-text-input"
													placeholder="123"
													maxLength={4}
													value={form.cvc}
													onChange={handleCvcChange}
												/>
												<svg
													className="pm-input-suffix-icon"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<rect
														x="4"
														y="8.5"
														width="12"
														height="8.5"
														rx="1.6"
														stroke="currentColor"
														strokeWidth="1.3"
													/>
													<path
														d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5"
														stroke="currentColor"
														strokeWidth="1.3"
													/>
												</svg>
											</div>
										</div>
									</div>

									<div className="pm-security-badges">
										<span className="pm-security-item">
											<svg
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M8 1.5 13 3.5v3.7c0 3.4-2.1 6.1-5 7.1-2.9-1-5-3.7-5-7.1V3.5L8 1.5Z"
													stroke="currentColor"
													strokeWidth="1.2"
													strokeLinejoin="round"
												/>
											</svg>
											SSL Secure
										</span>
										<span className="pm-security-item">
											<svg
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<rect
													x="2"
													y="6"
													width="12"
													height="8"
													rx="1.4"
													stroke="currentColor"
													strokeWidth="1.2"
												/>
												<path
													d="M4.5 6V4.2A3.5 3.5 0 0 1 11.5 4.2V6"
													stroke="currentColor"
													strokeWidth="1.2"
												/>
											</svg>
											PCI Compliant
										</span>
										<span className="pm-security-item">
											<svg
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle
													cx="8"
													cy="8"
													r="6"
													stroke="currentColor"
													strokeWidth="1.2"
												/>
												<path
													d="M8 5v3l2 1.5"
													stroke="currentColor"
													strokeWidth="1.2"
													strokeLinecap="round"
												/>
											</svg>
											Encrypted
										</span>
									</div>

									<p className="pm-legal-notice">
										By clicking "Pay &amp; Submit", you agree to our
										<a href="#" className="pm-legal-link">
											Terms of Service
										</a>
										and
										<a href="#" className="pm-legal-link">
											Refund Policy
										</a>
										.
									</p>

									<button type="submit" className="pm-primary-action" style={{ width: '100%', justifyContent: 'center', marginLeft: 0, marginTop: '16px' }}>
										Pay &amp; Submit Partnership{' '}
										<span className="pm-right-arrow">→</span>
									</button>
								</form>
							</div>
						</div>

						{/* Footer */}
						<div className="pm-navigation-bar">
							<Link href="/registration/step4" className="pm-back-action">
								<span className="pm-left-arrow">←</span> Back to Step 4
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

				.pm-checkout-wrapper {
					max-width: 1180px;
					margin: 0 auto;
					color: #101828;
				}

				.pm-two-column-layout {
					display: grid;
					grid-template-columns: 260px 1fr;
					gap: 24px;
					align-items: start;
				}

				.pm-order-summary-panel {
					border: 1px solid #eaecf0;
					border-radius: 4px;
					padding: 22px;
				}

				.pm-summary-heading {
					font-size: 16px;
					font-weight: 700;
					margin: 0 0 16px;
				}

				.pm-premium-badge {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 12.5px;
					font-weight: 600;
					color: #344054;
					margin-bottom: 18px;
				}

				.pm-badge-shield {
					width: 22px;
					height: 22px;
					border-radius: 6px;
					background: #16a37a;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
				}

				.pm-badge-shield svg {
					width: 13px;
					height: 13px;
				}

				.pm-cost-breakdown {
					display: flex;
					flex-direction: column;
					gap: 10px;
					padding-bottom: 16px;
					border-bottom: 1px solid #eaecf0;
					margin-bottom: 14px;
				}

				.pm-cost-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 12.5px;
				}

				.pm-cost-label {
					color: #667085;
				}

				.pm-cost-amount {
					font-weight: 600;
					color: #101828;
				}

				.pm-waived {
					color: #2563eb;
				}

				.pm-grand-total {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20px;
				}

				.pm-total-heading {
					font-size: 13px;
					font-weight: 700;
					color: #101828;
				}

				.pm-total-figure {
					font-size: 19px;
					font-weight: 700;
					color: #101828;
				}

				.pm-visual-asset {
					border-radius: 10px;
					overflow: hidden;
					aspect-ratio: 4 / 3;
				}

				.pm-visual-asset img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					display: block;
				}

				.pm-payment-details-panel {
					border: 1px solid #eaecf0;
					border-radius: 4px;
					padding: 28px;
				}

				.pm-payment-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 24px;
				}

				.pm-payment-heading {
					font-size: 18px;
					font-weight: 700;
					margin: 0;
				}

				.pm-gateway-label {
					display: flex;
					align-items: center;
					gap: 4px;
					font-size: 11.5px;
					color: #667085;
					background: #f9fafb;
					border: 1px solid #eaecf0;
					border-radius: 6px;
					padding: 5px 10px;
				}

				.pm-gateway-label strong {
					color: #635bff;
					font-weight: 700;
				}

				.pm-payment-form {
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.pm-form-row {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 18px;
				}

				.pm-form-group {
					display: flex;
					flex-direction: column;
					gap: 7px;
				}

				.pm-field-label {
					font-size: 12.5px;
					font-weight: 600;
					color: #344054;
				}

				.pm-text-input {
					width: 100%;
					border: 1px solid #d0d5dd;
					border-radius: 4px;
					padding: 11px 14px;
					font-size: 13.5px;
					color: #101828;
					outline: none;
					transition: border-color 0.15s ease, box-shadow 0.15s ease;
					font-family: inherit;
				}

				.pm-text-input::placeholder {
					color: #98a2b3;
				}

				.pm-text-input:focus {
					border-color: #101a3d;
					box-shadow: 0 0 0 3px rgba(16, 26, 61, 0.1);
				}

				.pm-input-with-icon {
					position: relative;
				}

				.pm-input-with-icon .pm-text-input {
					padding-right: 38px;
				}

				.pm-input-suffix-icon {
					position: absolute;
					right: 12px;
					top: 50%;
					transform: translateY(-50%);
					width: 17px;
					height: 17px;
					color: #98a2b3;
					pointer-events: none;
				}

				.pm-security-badges {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 24px;
					padding-top: 6px;
					border-top: 1px solid #eaecf0;
					margin-top: 4px;
					padding-top: 18px;
				}

				.pm-security-item {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 11.5px;
					color: #667085;
				}

				.pm-security-item svg {
					width: 14px;
					height: 14px;
				}

				.pm-legal-notice {
					text-align: center;
					font-size: 12px;
					color: #667085;
					margin: 4px 0 0;
					line-height: 1.6;
				}

				.pm-legal-link {
					color: #344054;
					font-weight: 600;
					text-decoration: underline;
					margin: 0 4px;
				}

				.pm-navigation-bar {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid #eaecf0;
					margin-top: 24px;
					padding-top: 20px;
				}

				.pm-back-action {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: #344054;
					font-size: 13.5px;
					font-weight: 500;
					text-decoration: none;
				}

				.pm-back-action:hover {
					color: #101828;
				}

				.pm-primary-action {
					display: inline-flex;
					text-decoration: none;
					align-items: center;
					gap: 8px;
					background: #16a37a;
					color: #fff;
					border: none;
					border-radius: 8px;
					padding: 10px 20px;
					font-size: 13.5px;
					font-weight: 600;
					cursor: pointer;
					transition: opacity 0.15s ease;
				}

				.pm-primary-action:hover {
					opacity: 0.92;
				}

				.pm-left-arrow,
				.pm-right-arrow {
					font-size: 14px;
					line-height: 1;
				}

				@media (max-width: 860px) {
					.registration-container {
						width: 95%;
						padding: 1.8rem 1.5rem;
					}

					.page-header h1 {
						font-size: 1.6rem;
					}

					.page-header .subhead {
						width: 60%;
					}

					.pm-two-column-layout {
						grid-template-columns: 1fr;
					}

					.pm-form-row {
						grid-template-columns: 1fr;
					}

					.pm-navigation-bar {
						flex-direction: column;
						gap: 14px;
						align-items: stretch;
					}

					.pm-primary-action {
						justify-content: center;
						margin-left: 0;
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

					.page-header .subhead {
						width: 80%;
					}

					.pm-payment-details-panel {
						padding: 18px;
					}

					.pm-security-badges {
						flex-wrap: wrap;
						gap: 12px;
					}
				}
			`}</style>
		</MainLayout>
	);
}
