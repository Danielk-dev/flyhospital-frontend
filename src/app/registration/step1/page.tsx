'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

export default function RegistrationStep1() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);
	const [form, setForm] = useState({
		fullName: '',
		email: '',
		phone: '',
		businessType: 'Hospital',
		agreedToTerms: false,
	});

	const handleContinue = () => {
		setData({ personalInfo: { ...form } });
		router.push('/registration/step3');
	};

	const updateField = (field: keyof typeof form, value: string | boolean) => {
		setForm((prev) => ({ ...prev, [field]: value }));
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
							<span className="subhead-icon">✚</span>
							Create an account to become our partner and list your clinic on ClickHospitals in 4 simple steps.
						</p>
					</header>

					<div className="step-indicator">
						<span className="step-label">Step 1 of 5</span>
						<div className="step-bar">
							<div className="step-progress" style={{ width: '20%' }} />
						</div>
					</div>

					<div className="form-container">
						<div className="create-account-section">
							<p className="section-title">Create your account</p>
							<p className="account-note">
								These details will be used for your main point of contact and primary login credentials.
							</p>
						</div>

						<div className="form-section">
							<h3 className="section-title">Personal Information</h3>

							<div className="form-row">
								<div className="form-group">
									<label>Full Name</label>
									<input
										type="text"
										value={form.fullName}
										onChange={(e) => updateField('fullName', e.target.value)}
										placeholder="Dr. Sarah Johnson"
										className="form-input"
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										type="email"
										value={form.email}
										onChange={(e) => updateField('email', e.target.value)}
										placeholder="sarahjohnson@hotmail.com"
										className="form-input"
									/>
								</div>
							</div>

							<div className="form-group">
								<label>Phone Number</label>
								<input
									type="text"
									value={form.phone}
									onChange={(e) => updateField('phone', e.target.value)}
									placeholder="+1 (555) 000-0000"
									className="form-input"
								/>
							</div>

							<div className="form-group">
								<label>Choose Business Type</label>
								<select
									className="form-input"
									value={form.businessType}
									onChange={(e) => updateField('businessType', e.target.value)}
								>
									<option value="Hospital">Hospital</option>
									<option value="Clinic">Clinic</option>
									<option value="Medical Center">Medical Center</option>
									<option value="Laboratory">Laboratory</option>
								</select>
							</div>
						</div>

						<div className="terms-section">
							<label className="checkbox-container">
								<input
									type="checkbox"
									checked={form.agreedToTerms}
									onChange={(e) => updateField('agreedToTerms', e.target.checked)}
								/>
								<span className="checkmark" />
								<span className="agree-line">
									I agree to the Terms of Service and Privacy Policy.
									<span className="governance-line">
										I understand that <strong>ClickHospitals</strong>
										<br />maintains strict data governance for all clinical and administrative partnership data.
									</span>
								</span>
							</label>
						</div>

						<div className="navigation-section">
							<Link href="/partner" className="btn-back">
								<span className="arrow-left">←</span> Back to Become a
							</Link>

							<div className="nav-right">
								<a href="#" className="help-link">
									<span className="help-icon">?</span> Having trouble? Contact our vendor onboarding team
								</a>
								<button type="button" className="btn-continue" onClick={handleContinue} disabled={!form.fullName || !form.email || !form.phone || !form.agreedToTerms}>
									Continue <span className="arrow-right">→</span>
								</button>
							</div>
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
					width: 100%;
					padding: 2rem 1.5rem;
				}

				.registration-container {
					width: 80%;
					max-width: 1600px;
					padding: 2.5rem 3rem;
				}

				.page-header {
					margin-bottom: 2rem;
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

				.form-container {
					margin-top: 0.5rem;
				}

				.create-account-section {
					text-align: center;
					margin-bottom: 2rem;
				}

				.account-note {
					font-size: 0.85rem;
					color: #5f7b94;
					margin-top: 0.8rem;
					text-align: left;
				}

				.form-section {
					margin-bottom: 2rem;
					padding: 1.5rem;
					border: 1px solid #eef3f9;
				}

				.section-title {
					font-size: 1.4rem;
					font-weight: 600;
					color: #0b2b4a;
					margin-bottom: 1.2rem;
					padding-bottom: 0.5rem;
					text-align: left;
				}

				.form-row {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1.5rem;
					margin-bottom: 1rem;
				}

				.form-group {
					display: flex;
					margin-top: 20px;
					flex-direction: column;
				}

				.form-group label {
					font-size: 0.8rem;
					font-weight: 500;
					color: #3e5a70;
					margin-bottom: 0.3rem;
				}

				.form-input {
					padding: 10px 5px;
					border: 1px solid #515458;
					border-radius: 2px;
					font-size: 0.75rem;
					color: #0b2b4a;
					background: #fafcff;
					transition: border-color 0.2s;
					font-family: inherit;
					width: 100%;
				}

				.form-input:focus {
					outline: none;
					border-color: #0a7e8c;
					background: #ffffff;
				}

				select.form-input {
					appearance: none;
					background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233e5a70' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
					background-repeat: no-repeat;
					background-position: right 1rem center;
					padding-right: 2.5rem;
				}

				.terms-section {
					margin: 1.5rem 0 2rem;
					padding: 1.2rem;
				}

				.checkbox-container {
					display: flex;
					align-items: flex-start;
					gap: 0.8rem;
					cursor: pointer;
					position: relative;
					font-size: 0.85rem;
					color: #1d3b53;
					line-height: 1.6;
				}

				.checkbox-container input {
					position: absolute;
					opacity: 0;
					cursor: pointer;
					height: 0;
					width: 0;
				}

				.checkmark {
					min-width: 18px;
					height: 18px;
					background: white;
					border: 2px solid #dce3ec;
					border-radius: 4px;
					display: inline-block;
					margin-top: 2px;
					transition: all 0.2s;
					flex-shrink: 0;
					position: relative;
				}

				.checkbox-container input:checked ~ .checkmark {
					background: #0a7e8c;
					border-color: #0a7e8c;
				}

				.checkbox-container input:checked ~ .checkmark::after {
					content: "";
					position: absolute;
					left: 6px;
					top: 2px;
					width: 6px;
					height: 10px;
					border: solid white;
					border-width: 0 2px 2px 0;
					transform: rotate(45deg);
				}

				.navigation-section {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 1rem;
					margin-top: 1.5rem;
					padding-top: 1.5rem;
					border-top: 1px solid #eef3f9;
				}

				.nav-right {
					display: flex;
					align-items: center;
					gap: 1.5rem;
					flex-wrap: wrap;
					margin-left: auto;
				}

				.btn-back {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: #344054;
					font-size: 13.5px;
					font-weight: 500;
					text-decoration: none;
					padding: 0.4rem 0.8rem;
					border-radius: 6px;
					transition: all 0.2s ease;
				}

				.btn-back:hover {
					color: #101828;
					background: #eef3f9;
				}

				.btn-continue {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					background: #16a37a;
					color: #ffffff;
					border: none;
					border-radius: 8px;
					padding: 10px 20px;
					font-size: 13.5px;
					font-weight: 600;
					cursor: pointer;
					text-decoration: none;
					transition: opacity 0.15s ease;
				}

				.btn-continue:hover {
					opacity: 0.92;
				}

				.btn-continue:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

				.help-link {
					color: #0a7e8c;
					font-size: 0.85rem;
					text-decoration: none;
					display: inline-flex;
					align-items: center;
					gap: 0.4rem;
					padding: 0.4rem 0.8rem;
					border-radius: 6px;
					transition: background 0.2s;
				}

				.help-link:hover {
					background: #eef3f9;
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
						width: 90%;
					}

					.form-row {
						grid-template-columns: 1fr;
						gap: 1rem;
					}

					.navigation-section {
						flex-direction: column;
						align-items: stretch;
					}

					.nav-right {
						flex-direction: column;
						align-items: stretch;
						gap: 0.8rem;
						margin-left: 0;
					}

					.btn-back {
						justify-content: center;
					}

					.help-link {
						justify-content: center;
						text-align: center;
					}

					.btn-continue {
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
				}
			`}</style>
		</MainLayout>
	);
}
