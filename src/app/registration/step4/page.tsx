'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import { useRegistrationStore } from '@/stores/contact';

interface Photo {
	id: string;
	file: File;
	url: string;
}

export default function RegistrationStep4() {
	const router = useRouter();
	const registrationData = useRegistrationStore((s) => s.data);
	const setData = useRegistrationStore((s) => s.setData);

	const maxPhotos = 10;

	const logoInputRef = useRef<HTMLInputElement>(null);
	const photosInputRef = useRef<HTMLInputElement>(null);

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [logoPreview, setLogoPreview] = useState<string>('');
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState('');

	const handleLogoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setLogoFile(file);
		setLogoPreview(URL.createObjectURL(file));
	};

	const triggerFileSelect = () => {
		photosInputRef.current?.click();
	};

	const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		addPhotos(Array.from(e.target.files || []));
		e.target.value = '';
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		addPhotos(Array.from(e.dataTransfer.files || []));
	};

	const addPhotos = (files: File[]) => {
		const room = maxPhotos - photos.length;
		if (room <= 0) return;

		const validFiles = files
			.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png')
			.filter((f) => f.size <= 5 * 1024 * 1024)
			.slice(0, room);

		validFiles.forEach((file) => {
			setPhotos((prev) => [
				...prev,
				{
					id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
					file,
					url: URL.createObjectURL(file),
				},
			]);
		});
	};

	const removePhoto = (index: number) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		setSubmitError('');

		try {
			const personal = registrationData.personalInfo as Record<string, string> | undefined;
			const facility = registrationData.facilitySelection as Record<string, unknown> | undefined;

			const formData = new FormData();
			formData.append('name', personal?.fullName || '');
			formData.append('email', personal?.email || '');
			formData.append('phone', personal?.phone || '');
			formData.append('business_type', personal?.businessType || '');
			formData.append('hospital_id', String(facility?.hospital_id || ''));

			if (logoFile) {
				formData.append('business_logo', logoFile);
			}

			photos.forEach((photo) => {
				formData.append('service_photos[]', photo.file);
			});

			const res = await fetch('/api/vendors', {
				method: 'POST',
				body: formData,
				headers: { Accept: 'application/json' },
			});

			const json = await res.json();

			if (!res.ok || !json.success) {
				setSubmitError(
					json.errors
						? Object.values(json.errors).flat().join(', ')
						: json.message || 'Submission failed.'
				);
				return;
			}

			setData({ businessInfo: { logo: logoFile?.name, photos: photos.length } });
			router.push('/registration/step6');
		} catch (e) {
			setSubmitError('Network error while submitting form');
			console.error(e);
		} finally {
			setIsSubmitting(false);
		}
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
						<span className="step-label">Step 4 of 5</span>
						<div className="step-bar">
							<div className="step-progress" style={{ width: '80%' }} />
						</div>
					</div>

					<div className="mp-upload-portal">
						<div className="mp-content-panel">
							{/* Business Logo Section */}
							<section className="mp-brand-section">
								<h2 className="mp-section-heading">Business Logo</h2>

								<div className="mp-brand-layout">
									<label className={`mp-logo-upload-zone ${logoPreview ? 'mp-logo-present' : ''}`}>
										<input
											ref={logoInputRef}
											type="file"
											accept="image/png,image/svg+xml"
											className="mp-invisible-input"
											onChange={handleLogoSelected}
										/>
										{!logoPreview ? (
											<>
												<svg
													className="mp-logo-upload-icon"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M4 16.5V6.75C4 5.784 4.784 5 5.75 5h12.5c.966 0 1.75.784 1.75 1.75v9.75"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<circle
														cx="9"
														cy="10"
														r="1.6"
														stroke="currentColor"
														strokeWidth="1.5"
													/>
													<path
														d="M4 15.5 8.5 12l3 2.5L16 10l4 4.5"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M17.5 3.5v4M15.5 5.5h4"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
													/>
												</svg>
												<span className="mp-logo-upload-label">Upload Logo</span>
											</>
										) : (
											<img
												src={logoPreview}
												alt="Business logo preview"
												className="mp-logo-preview-image"
											/>
										)}
									</label>

									<div className="mp-logo-description">
										<p className="mp-logo-title">Business Logo</p>
										<p className="mp-logo-details">
											Recommended: Square SVG or PNG with transparent background.
											<br />
											Min 400×400px.
										</p>
									</div>
								</div>
							</section>

							<div className="mp-divider-line" />

							{/* Service Photos Section */}
							<section className="mp-gallery-section">
								<div className="mp-gallery-header">
									<div>
										<h2 className="mp-section-heading">Service Photos</h2>
										<p className="mp-gallery-description">
											Upload up to 10 high-quality photos of your Business
											<br />
											(JPG, PNG, max 5MB)
										</p>
									</div>
									<div className="mp-image-counter">
										{photos.length} / {maxPhotos}
										<br />
										photos
									</div>
								</div>

								<div
									className={`mp-file-drop-zone ${isDragging ? 'mp-drop-active' : ''}`}
									onDragOver={(e) => {
										e.preventDefault();
										setIsDragging(true);
									}}
									onDragLeave={() => setIsDragging(false)}
									onDrop={handleDrop}
									onClick={triggerFileSelect}
								>
									<input
										ref={photosInputRef}
										type="file"
										accept="image/jpeg,image/png"
										multiple
										className="mp-invisible-input"
										onChange={handleFilesSelected}
									/>
									<div className="mp-drop-zone-icon">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7 16.5A4.5 4.5 0 0 1 6.2 7.6 5.5 5.5 0 0 1 17 8a4 4 0 0 1-.5 8H16"
												stroke="#fff"
												strokeWidth="1.6"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M12 11v7M9 14l3-3 3 3"
												stroke="#fff"
												strokeWidth="1.6"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<p className="mp-drop-zone-title">Drag and drop your files here</p>
									<p className="mp-drop-zone-subtext">
										or{' '}
										<button
											type="button"
											className="mp-browse-btn"
											onClick={(e) => {
												e.stopPropagation();
												triggerFileSelect();
											}}
										>
											browse files
										</button>{' '}
										from your computer
									</p>
								</div>

								{photos.length > 0 && (
									<div className="mp-thumbnail-grid">
										{photos.map((photo, index) => (
											<div key={photo.id} className="mp-thumbnail-item">
												<img src={photo.url} alt={`Service photo ${index + 1}`} />
												<button
													type="button"
													className="mp-thumbnail-remove"
													onClick={() => removePhoto(index)}
													aria-label="Remove photo"
												>
													×
												</button>
											</div>
										))}
									</div>
								)}
							</section>
						</div>

						{submitError && <div className="mp-error-message">{submitError}</div>}

						<div className="mp-navigation-footer">
							<Link href="/registration/step3" className="mp-back-navigation">
								<span className="mp-back-arrow">←</span> Back to Step 3
							</Link>
							<button
								type="button"
								className="mp-forward-button"
								disabled={isSubmitting}
								onClick={handleSubmit}
							>
								{isSubmitting ? 'Submitting...' : 'Submit Form'}
								<span className="mp-forward-arrow">→</span>
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

				.mp-upload-portal {
					max-width: 1180px;
					margin: 0 auto;
					color: #101828;
				}

				.mp-invisible-input {
					position: absolute;
					width: 1px;
					height: 1px;
					overflow: hidden;
					opacity: 0;
					pointer-events: none;
				}

				.mp-content-panel {
					background: #fff;
					border: 1px solid #eaecf0;
					border-radius: 4px;
					padding: 28px;
				}

				.mp-section-heading {
					font-size: 15px;
					font-weight: 700;
					margin: 0 0 16px;
					color: #101828;
				}

				.mp-brand-layout {
					display: flex;
					align-items: center;
					gap: 20px;
				}

				.mp-logo-upload-zone {
					width: 96px;
					height: 96px;
					flex-shrink: 0;
					border: 1.5px dashed #d0d5dd;
					border-radius: 4px;
					background: #fafafa;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
					transition: border-color 0.15s ease;
				}

				.mp-logo-upload-zone:hover {
					border-color: #98a2b3;
				}

				.mp-logo-upload-icon {
					width: 22px;
					height: 22px;
					color: #667085;
				}

				.mp-logo-upload-label {
					font-size: 11.5px;
					font-weight: 600;
					color: #344054;
				}

				.mp-logo-preview-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.mp-logo-present {
					border-style: solid;
					padding: 0;
				}

				.mp-logo-title {
					font-size: 13.5px;
					font-weight: 700;
					margin: 0 0 4px;
					color: #101828;
				}

				.mp-logo-details {
					font-size: 12px;
					color: #667085;
					line-height: 1.5;
					margin: 0;
				}

				.mp-divider-line {
					height: 1px;
					background: #eaecf0;
					margin: 26px 0;
				}

				.mp-gallery-header {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					gap: 16px;
				}

				.mp-gallery-description {
					font-size: 12px;
					color: #667085;
					line-height: 1.5;
					margin: 0 0 16px;
				}

				.mp-image-counter {
					background: #f2f4f7;
					border-radius: 8px;
					padding: 8px 14px;
					font-size: 11.5px;
					font-weight: 600;
					color: #344054;
					text-align: center;
					line-height: 1.4;
					white-space: nowrap;
				}

				.mp-file-drop-zone {
					border: 1.5px dashed #d0d5dd;
					border-radius: 4px;
					background: #fafbfc;
					padding: 34px 20px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					position: relative;
					transition: border-color 0.15s ease, background 0.15s ease;
				}

				.mp-file-drop-zone:hover,
				.mp-drop-active {
					border-color: #16a37a;
					background: #f3faf7;
				}

				.mp-drop-zone-icon {
					width: 40px;
					height: 40px;
					border-radius: 10px;
					background: #101a3d;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12px;
				}

				.mp-drop-zone-icon svg {
					width: 18px;
					height: 18px;
				}

				.mp-drop-zone-title {
					font-size: 13.5px;
					font-weight: 700;
					color: #101828;
					margin: 0 0 4px;
				}

				.mp-drop-zone-subtext {
					font-size: 12px;
					color: #667085;
					margin: 0;
				}

				.mp-browse-btn {
					background: none;
					border: none;
					padding: 0;
					font: inherit;
					color: #2563eb;
					font-weight: 600;
					text-decoration: underline;
					cursor: pointer;
				}

				.mp-thumbnail-grid {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					gap: 14px;
					margin-top: 22px;
				}

				.mp-thumbnail-item {
					position: relative;
					width: 96px;
					height: 72px;
					border-radius: 8px;
					overflow: hidden;
					border: 1px solid #eaecf0;
				}

				.mp-thumbnail-item img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					display: block;
				}

				.mp-thumbnail-remove {
					position: absolute;
					top: 4px;
					right: 4px;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					border: none;
					background: rgba(16, 24, 40, 0.65);
					color: #fff;
					font-size: 13px;
					line-height: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					opacity: 0;
					transition: opacity 0.15s ease;
				}

				.mp-thumbnail-item:hover .mp-thumbnail-remove {
					opacity: 1;
				}

				.mp-error-message {
					background: #fef2f2;
					border: 1px solid #fecaca;
					color: #dc2626;
					padding: 12px 16px;
					border-radius: 6px;
					margin-top: 16px;
					font-size: 13px;
				}

				.mp-navigation-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid #eaecf0;
					margin-top: 24px;
					padding-top: 20px;
				}

				.mp-back-navigation {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					color: #344054;
					font-size: 13.5px;
					font-weight: 500;
					text-decoration: none;
				}

				.mp-back-navigation:hover {
					color: #101828;
				}

				.mp-forward-button {
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

				.mp-forward-button:hover:not(:disabled) {
					opacity: 0.92;
				}

				.mp-forward-button:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

				.mp-back-arrow,
				.mp-forward-arrow {
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
						width: 60%;
					}

					.mp-brand-layout {
						flex-direction: column;
						align-items: flex-start;
					}

					.mp-gallery-header {
						flex-direction: column;
					}

					.mp-navigation-footer {
						flex-direction: column;
						gap: 14px;
						align-items: stretch;
					}

					.mp-forward-button {
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

					.mp-content-panel {
						padding: 16px;
					}

					.mp-thumbnail-item {
						width: 72px;
						height: 56px;
					}
				}
			`}</style>
		</MainLayout>
	);
}
