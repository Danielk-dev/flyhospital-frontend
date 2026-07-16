'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGeneralStore } from '@/stores/general';
import { useHospitalStore } from '@/stores/hospital';
import { apiFetch } from '@/lib/api';
import type { Treatments } from '@/lib/types';

export default function Header() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [citiesData, setCitiesData] = useState<Record<number, { id: number; name: string }[]>>({});
	const [activeCountry, setActiveCountry] = useState<number | null>(null);
	const [subTreatments, setSubTreatments] = useState<Record<number, Treatments[]>>({});
	const [activeTreatment, setActiveTreatment] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	const treatments = useGeneralStore((s) => s.treatments);
	const destinations = useGeneralStore((s) => s.destinations);
	const fetchTreatments = useGeneralStore((s) => s.fetchTreatments);
	const fetchDestination = useGeneralStore((s) => s.fetchDestination);
	const loadCountries = useHospitalStore((s) => s.loadCountries);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 992);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
		setActiveDropdown(null);
	}, [pathname]);

	useEffect(() => {
		void fetchTreatments();
		void fetchDestination();
		void loadCountries();
	}, [fetchTreatments, fetchDestination, loadCountries]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const toggleDropdown = (name: string) => setActiveDropdown(activeDropdown === name ? null : name);
	const closeAllMenus = () => {
		setIsMenuOpen(false);
		setActiveDropdown(null);
	};

	const handleCountryHover = async (countryId: number) => {
		setActiveCountry(countryId);
		if (!citiesData[countryId]) {
			try {
				const res = await apiFetch<{ data?: { id: number; name: string }[] }>(`countries/${countryId}/cities`);
				setCitiesData((prev) => ({ ...prev, [countryId]: res.data ?? [] }));
			} catch {
				setCitiesData((prev) => ({ ...prev, [countryId]: [] }));
			}
		}
	};

	const handleTreatmentHover = async (treatmentId: number) => {
		setActiveTreatment(treatmentId);
		if (!subTreatments[treatmentId]) {
			try {
				const res = await apiFetch<{ data?: Treatments[] }>('sub-treatments', { params: { parent_id: treatmentId } });
				setSubTreatments((prev) => ({ ...prev, [treatmentId]: res.data ?? [] }));
			} catch {
				setSubTreatments((prev) => ({ ...prev, [treatmentId]: [] }));
			}
		}
	};

	return (
		<header className="container-fluid bg-white shadow-sm sticky-top">
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<Link href="/" className="navbar-brand" onClick={closeAllMenus}>
						<img
							src="/assets/img/logo.png"
							className={`logo${!imageLoaded ? ' image-loading' : ''}`}
							alt="ClickHospitals Logo"
							onLoad={() => setImageLoaded(true)}
							onError={() => setImageLoaded(true)}
						/>
						<span>ClickHospitals</span>
					</Link>

					<button id="navbarToggler" className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleMenu}>
						<i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: 28 }} />
					</button>

					<div id="navbarCollapse" className={`navbar-collapse${isMenuOpen ? ' show' : ''}`}>
						<ul className="navbar-nav mx-auto align-items-center">
							<li className="nav-item dropdown">
								<div className="dropdown-wrapper">
									<button className="dropdown-toggle d-flex align-items-center nav-link w-100 border-0 bg-transparent" onClick={() => toggleDropdown('destination')}>
										Destination
										<i className={`bi ms-1 ${activeDropdown === 'destination' ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
									</button>
									{activeDropdown === 'destination' && destinations.length > 0 && (
										<div className="main-dropdown-menu shadow-sm border rounded">
											<div className="procedure-container">
												<ul className="main-treatment-list mb-0">
													{destinations.slice(0, 5).map((country) => (
														<li
															key={country.id}
															className="treatment-item"
															onMouseEnter={() => !isMobile && handleCountryHover(country.id)}
														>
															<div className="d-flex align-items-center justify-content-between w-100">
																<Link
																	href={`/hospitals?country_id=${country.id}`}
																	className={`treatment-link flex-grow-1${activeCountry === country.id ? ' active' : ''}`}
																	onClick={closeAllMenus}
																>
																	<div className="country-info">
																		<span className="treatment-name">{country.country_name || country.name}</span>
																	</div>
																	{isMobile ? (
																		<button className="btn btn-link p-2" onClick={(e) => { e.preventDefault(); handleCountryHover(country.id); }}>
																			<i className={`bi ${activeCountry === country.id ? 'bi-chevron-up' : 'bi-chevron-right'}`} />
																		</button>
																	) : (
																		<i className="bi bi-chevron-right chevron-icon" />
																	)}
																</Link>
															</div>
															{!isMobile && activeCountry === country.id && citiesData[country.id]?.length > 0 && (
																<div className="subtreatment-dropdown">
																	<ul className="subtreatment-list mb-0">
																		{citiesData[country.id].map((city) => (
																			<li key={city.id}>
																				<Link href={`/hospitals?country_id=${country.id}&city_id=${city.id}`} onClick={closeAllMenus}>
																					{city.name}
																				</Link>
																			</li>
																		))}
																	</ul>
																</div>
															)}
														</li>
													))}
												</ul>
											</div>
										</div>
									)}
								</div>
							</li>

							<li className="nav-item dropdown">
								<div className="dropdown-wrapper">
									<button className="dropdown-toggle d-flex align-items-center nav-link w-100 border-0 bg-transparent" onClick={() => toggleDropdown('procedure')}>
										Procedure
										<i className={`bi ms-1 ${activeDropdown === 'procedure' ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
									</button>
									{activeDropdown === 'procedure' && treatments.length > 0 && (
										<div className="main-dropdown-menu shadow-sm border rounded">
											<ul className="main-treatment-list mb-0">
												{treatments.slice(0, 8).map((treatment) => (
													<li
														key={treatment.id}
														className="treatment-item"
														onMouseEnter={() => !isMobile && handleTreatmentHover(treatment.id)}
													>
														<Link
															href={`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`}
															className="treatment-link"
															onClick={closeAllMenus}
														>
															{treatment.name}
															<i className="bi bi-chevron-right" />
														</Link>
														{!isMobile && activeTreatment === treatment.id && subTreatments[treatment.id]?.length > 0 && (
															<div className="subtreatment-dropdown">
																<ul className="subtreatment-list mb-0">
																	{subTreatments[treatment.id].map((sub) => (
																		<li key={sub.id}>
																			<Link href={`/all-procedure/${encodeURIComponent(sub.name)}`} onClick={closeAllMenus}>
																				{sub.name}
																			</Link>
																		</li>
																	))}
																</ul>
															</div>
														)}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</li>

							<li className="nav-item">
								<Link href="/about" className="nav-link" onClick={closeAllMenus}>About</Link>
							</li>
							<li className="nav-item">
								<Link href="/partner" className="nav-link" onClick={closeAllMenus}>Partner</Link>
							</li>
						</ul>

						<div className="d-flex align-items-center gap-3">
							<span className="d-none d-lg-inline text-muted small">
								<i className="bi bi-telephone me-1" /> +1(734)-447-5890
							</span>
							<Link href="/contact" className="btn btn-primary" onClick={closeAllMenus}>Contact</Link>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
