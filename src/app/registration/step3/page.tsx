'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';
import { apiFetch } from '@/lib/api';

interface Hospital {
	id: number;
	title?: string;
	name?: string;
	distance?: number;
}

export default function RegistrationStep3() {
	const router = useRouter();
	const setData = useRegistrationStore((s) => s.setData);

	const [search, setSearch] = useState('');
	const [selectedRadius, setSelectedRadius] = useState('5');
	const [locationLabel, setLocationLabel] = useState('Detecting your location...');
	const [hospitalsFound, setHospitalsFound] = useState(0);

	const [userLat, setUserLat] = useState<number | null>(null);
	const [userLng, setUserLng] = useState<number | null>(null);
	const [locationError, setLocationError] = useState('');

	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
	const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
	const [hospitalError, setHospitalError] = useState('');

	const radiusOptions = [
		{ label: 'Within 1 km', value: '1' },
		{ label: 'Within 3 km', value: '3' },
		{ label: 'Within 5 km', value: '5' },
		{ label: 'Within 20 km', value: '20' },
		{ label: 'Within 25 km', value: '25' },
	];

	// Get user's GPS location on mount
	useEffect(() => {
		if (!navigator.geolocation) {
			setLocationError('Geolocation not supported by your browser.');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				setUserLat(lat);
				setUserLng(lng);
				setLocationLabel(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
				fetchNearbyHospitals(lat, lng);
			},
			() => {
				setLocationError('Location access denied. Please enable location to continue.');
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	}, []);

	// Fetch nearby hospitals whenever radius changes
	useEffect(() => {
		if (userLat !== null && userLng !== null) {
			fetchNearbyHospitals(userLat, userLng);
		}
	}, [selectedRadius]);

	const fetchNearbyHospitals = async (lat: number, lng: number) => {
		setIsLoadingHospitals(true);
		setHospitalError('');
		setSelectedHospitalId(null);

		try {
			const res = await apiFetch<{ success?: boolean; data?: Hospital[]; message?: string }>(
				'hospitals/nearby',
				{
					params: { latitude: lat, longitude: lng, radius: selectedRadius },
				}
			);

			if (res.data) {
				setHospitals(res.data);
				setHospitalsFound(res.data.length);
			} else {
				setHospitalError('Failed to fetch hospitals');
			}
		} catch (e) {
			setHospitalError('Network error while fetching hospitals');
			console.error(e);
		} finally {
			setIsLoadingHospitals(false);
		}
	};

	const handleSaveAndContinue = () => {
		const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId);
		setData({
			facilitySelection: {
				hospital_id: selectedHospitalId,
				hospital_name: selectedHospital?.name || selectedHospital?.title || null,
				latitude: userLat,
				longitude: userLng,
				selectedRadius,
				hospitalsFound,
			},
		});
		router.push('/registration/step4');
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
						<span className="step-label">Step 3 of 5</span>
						<div className="step-bar">
							<div className="step-progress" style={{ width: '60%' }} />
						</div>
					</div>

					<div className="rx-facility-selector">
						<div className="rx-header-section">
							<div className="rx-header-top">
								<div className="rx-header-left">
									<h1>Select Hospital</h1>
									<p>Select the hospitals you serve.</p>
								</div>
								<div className="rx-search-field">
									<svg
										className="rx-search-icon"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
										<path
											d="m17 17-3.8-3.8"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
									</svg>
									<input
										type="text"
										placeholder="Search hospitals"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="rx-primary-container">
							<div className="rx-layout-grid">
								<div className="rx-service-area">
									<h2>Service Reach</h2>
									<p>
										Select the maximum distance from your facility that you can
										comfortably serve. This determines which hospitals and
										patients can find you.
									</p>

									<div className="rx-distance-choices">
										{radiusOptions.map((option) => (
											<label
												key={option.value}
												className={`rx-distance-option ${
													selectedRadius === option.value ? 'rx-active' : ''
												}`}
											>
												<span
													className={`rx-radio-ring ${
														selectedRadius === option.value ? 'rx-selected' : ''
													}`}
												>
													{selectedRadius === option.value && (
														<span className="rx-radio-core" />
													)}
												</span>
												<span className="rx-radio-label">{option.label}</span>
												<input
													type="radio"
													value={option.value}
													checked={selectedRadius === option.value}
													onChange={(e) => setSelectedRadius(e.target.value)}
													className="rx-hidden-input"
												/>
											</label>
										))}
									</div>
								</div>

								<div className="rx-visual-display">
									<div className="rx-hospital-select-wrapper" style={{ marginBottom: '14px' }}>
										<label className="rx-select-label">Select Hospital</label>
										<select
											className="form-input"
											value={selectedHospitalId || ''}
											onChange={(e) => setSelectedHospitalId(e.target.value ? Number(e.target.value) : null)}
											disabled={isLoadingHospitals || !hospitals.length}
										>
											<option value="">
												{isLoadingHospitals
													? 'Loading hospitals...'
													: hospitals.length
														? 'Choose a hospital'
														: 'No hospitals found'}
											</option>
											{hospitals.map((h) => (
												<option key={h.id} value={h.id}>
													{h.title || h.name} ({Number(h.distance || 0).toFixed(1)} km away)
												</option>
											))}
										</select>
										{locationError && <p className="rx-error-text">{locationError}</p>}
										{hospitalError && <p className="rx-error-text">{hospitalError}</p>}
									</div>

									<div className="rx-display-header">
										<div>
											<h3>Radius Visualization</h3>
											<p>Based on your selected location: {locationLabel}</p>
										</div>
										<div className="rx-facility-count">
											<svg
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M3 8.5 10 3l7 5.5"
													stroke="currentColor"
													strokeWidth="1.4"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M4.5 8v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8"
													stroke="currentColor"
													strokeWidth="1.4"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											{hospitalsFound} Hospitals found
										</div>
									</div>

									<div className="rx-map-container">
										<svg viewBox="0 0 360 190" className="rx-map-graphic">
											<rect x="0" y="0" width="360" height="190" fill="#e5e7eb" />
											<circle cx="180" cy="95" r="60" fill="#16a37a" fillOpacity="0.18" />
											<g>
												<circle cx="180" cy="95" r="20" rx="6" fill="#16a37a" />
												<rect
													x="171"
													y="86"
													width="18"
													height="18"
													rx="3"
													fill="#16a37a"
												/>
												<path
													d="M180 91v8M176 95h8"
													stroke="#fff"
													strokeWidth="1.8"
													strokeLinecap="round"
												/>
											</g>
											<g>
												<path
													d="M115 132c0-6.6 5.4-12 12-12s12 5.4 12 12c0 8-12 18-12 18s-12-10-12-18Z"
													fill="#2563eb"
												/>
												<circle cx="127" cy="132" r="4" fill="#fff" />
											</g>
											<g>
												<path
													d="M228 100c0-6.6 5.4-12 12-12s12 5.4 12 12c0 8-12 18-12 18s-12-10-12-18Z"
													fill="#2563eb"
												/>
												<circle cx="240" cy="100" r="4" fill="#fff" />
											</g>
										</svg>

										<div className="rx-map-pin-label" style={{ top: '128px', left: '72px' }}>
											St. Jude Medical
										</div>
										<div className="rx-map-pin-label" style={{ top: '96px', left: '250px' }}>
											Presbyterian Hub
										</div>

										<div className="rx-map-key">
											<div className="rx-key-row">
												<span className="rx-key-dot" style={{ background: '#101828' }} />
												Your Location
											</div>
											<div className="rx-key-row">
												<span className="rx-key-dot" style={{ background: '#2563eb' }} />
												Partner Hospitals
											</div>
											<div className="rx-key-row">
												<span className="rx-key-dot rx-key-radius">
													<svg viewBox="0 0 12 12">
														<circle
															cx="6"
															cy="6"
															r="5"
															fill="none"
															stroke="#16a37a"
															strokeWidth="1.4"
														/>
													</svg>
												</span>
												Service Radius
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="rx-action-footer">
							<Link href="/registration/step2" className="rx-nav-back">
								<span className="arrow-left">←</span> Back to Step 2
							</Link>
							<button
								onClick={handleSaveAndContinue}
								disabled={!selectedHospitalId}
								className="rx-proceed-btn"
							>
								Continue <span className="arrow-right">→</span>
							</button>
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

				.rx-facility-selector {
					max-width: 1180px;
					margin: 0 auto;
					color: #101828;
				}

				.rx-hidden-input {
					position: absolute;
					width: 1px;
					height: 1px;
					overflow: hidden;
					clip: rect(0 0 0 0);
					white-space: nowrap;
				}

				.rx-header-section {
					margin: 0 0 20px 0;
				}

				.rx-header-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 24px;
					background: #f7f8fa;
					padding: 20px;
					border-radius: 4px;
				}

				.rx-header-left h1 {
					font-size: 22px;
					font-weight: 700;
					margin: 0;
					color: #101828;
				}

				.rx-header-left p {
					font-size: 13px;
					color: #667085;
					margin: 4px 0 0;
				}

				.rx-search-field {
					flex: 1;
					max-width: 480px;
					display: flex;
					align-items: center;
					gap: 8px;
					background: #fff;
					border: 1px solid #d0d5dd;
					border-radius: 4px;
					padding: 9px 14px;
				}

				.rx-search-icon {
					width: 16px;
					height: 16px;
					color: #98a2b3;
					flex-shrink: 0;
				}

				.rx-search-field input {
					border: none;
					outline: none;
					font-size: 13.5px;
					color: #101828;
					width: 100%;
					font-family: inherit;
				}

				.rx-search-field input::placeholder {
					color: #98a2b3;
				}

				.rx-primary-container {
					background: #fff;
					border: 1px solid #eaecf0;
					border-radius: 4px;
					padding: 28px;
					width: 100%;
					margin-top: -20px;
				}

				.rx-layout-grid {
					display: grid;
					grid-template-columns: 320px 1fr;
					gap: 32px;
				}

				.rx-service-area h2 {
					font-size: 15px;
					font-weight: 700;
					margin: 0 0 6px;
				}

				.rx-service-area > p {
					font-size: 12.5px;
					color: #667085;
					line-height: 1.55;
					margin: 0 0 18px;
				}

				.rx-distance-choices {
					display: flex;
					flex-direction: column;
					gap: 10px;
				}

				.rx-distance-option {
					display: flex;
					align-items: center;
					gap: 10px;
					border: 1px solid #d0d5dd;
					border-radius: 4px;
					padding: 12px 14px;
					font-size: 13.5px;
					font-weight: 500;
					color: #344054;
					cursor: pointer;
					transition: border-color 0.15s ease, background 0.15s ease;
				}

				.rx-distance-option:hover {
					border-color: #98a2b3;
				}

				.rx-distance-option.rx-active {
					border-color: #16a37a;
					background: #eefaf5;
					color: #101828;
				}

				.rx-radio-ring {
					width: 18px;
					height: 18px;
					border-radius: 50%;
					border: 1.5px solid #d0d5dd;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
				}

				.rx-radio-ring.rx-selected {
					border-color: #16a37a;
					background: #16a37a;
				}

				.rx-radio-core {
					width: 7px;
					height: 7px;
					border-radius: 50%;
					background: #fff;
				}

				.rx-visual-display {
					display: flex;
					flex-direction: column;
				}

				.rx-hospital-select-wrapper {
					margin-bottom: 14px;
				}

				.rx-select-label {
					font-size: 12.5px;
					font-weight: 600;
					color: #344054;
					display: block;
					margin-bottom: 6px;
				}

				.form-input {
					width: 100%;
					padding: 10px 5px;
					border: 1px solid #515458;
					border-radius: 2px;
					font-size: 0.75rem;
					color: #0b2b4a;
					background: #fafcff;
					transition: border-color 0.2s;
					font-family: inherit;
				}

				.form-input:focus {
					outline: none;
					border-color: #0a7e8c;
					background: #ffffff;
				}

				.form-input:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

				.rx-error-text {
					color: #d92d20;
					font-size: 12px;
					margin-top: 6px;
				}

				.rx-display-header {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					gap: 16px;
					margin-bottom: 14px;
				}

				.rx-display-header h3 {
					font-size: 15px;
					font-weight: 700;
					margin: 0 0 4px;
				}

				.rx-display-header p {
					font-size: 12px;
					color: #667085;
					margin: 0;
				}

				.rx-facility-count {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 12px;
					color: #667085;
					white-space: nowrap;
					padding-top: 2px;
				}

				.rx-facility-count svg {
					width: 14px;
					height: 14px;
				}

				.rx-map-container {
					position: relative;
					border-radius: 4px;
					overflow: hidden;
					border: 1px solid #eaecf0;
				}

				.rx-map-graphic {
					display: block;
					width: 100%;
					height: auto;
				}

				.rx-map-pin-label {
					position: absolute;
					transform: translate(-50%, 0);
					background: #fff;
					border: 1px solid #eaecf0;
					border-radius: 4px;
					padding: 3px 8px;
					font-size: 10.5px;
					font-weight: 500;
					color: #344054;
					white-space: nowrap;
					box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08);
				}

				.rx-map-key {
					position: absolute;
					left: 14px;
					bottom: 14px;
					background: #fff;
					border: 1px solid #eaecf0;
					border-radius: 8px;
					padding: 10px 14px;
					display: flex;
					flex-direction: column;
					gap: 7px;
					box-shadow: 0 2px 6px rgba(16, 24, 40, 0.08);
				}

				.rx-key-row {
					display: flex;
					align-items: center;
					gap: 8px;
					font-size: 11.5px;
					color: #344054;
				}

				.rx-key-dot {
					width: 9px;
					height: 9px;
					border-radius: 50%;
					flex-shrink: 0;
					display: inline-block;
				}

				.rx-key-radius {
					background: none;
					width: 12px;
					height: 12px;
				}

				.rx-key-radius svg {
					width: 12px;
					height: 12px;
				}

				.rx-action-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid #eaecf0;
					margin-top: 24px;
					padding-top: 20px;
				}

				.rx-nav-back {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: #344054;
					font-size: 13.5px;
					font-weight: 500;
					text-decoration: none;
				}

				.rx-nav-back:hover {
					color: #101828;
				}

				.rx-proceed-btn {
					display: inline-flex;
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
					margin-left: auto;
				}

				.rx-proceed-btn:hover:not(:disabled) {
					opacity: 0.92;
				}

				.rx-proceed-btn:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				.arrow-left,
				.arrow-right {
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

					.subhead {
						width: 60%;
					}

					.rx-header-top {
						flex-direction: column;
						align-items: stretch;
					}

					.rx-search-field {
						max-width: 100%;
					}

					.rx-layout-grid {
						grid-template-columns: 1fr;
						gap: 24px;
					}

					.rx-action-footer {
						flex-direction: column;
						gap: 14px;
						align-items: stretch;
					}

					.rx-proceed-btn {
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

					.subhead {
						width: 80%;
					}

					.rx-header-section {
						padding: 0;
					}

					.rx-header-top {
						padding: 16px;
					}

					.rx-primary-container {
						padding: 16px;
					}

					.rx-map-pin-label {
						font-size: 8px;
						padding: 2px 5px;
					}

					.rx-map-key {
						padding: 6px 10px;
						gap: 4px;
					}

					.rx-key-row {
						font-size: 9px;
					}
				}
			`}</style>
		</MainLayout>
	);
}
