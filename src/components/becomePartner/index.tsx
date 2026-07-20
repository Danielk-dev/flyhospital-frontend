'use client';

import Link from 'next/link';
import { useRegistrationStore } from '@/stores/contact';

export default function BecomePartner() {
	const selectPlan = useRegistrationStore((s) => s.selectPlan);

	return (
		<section className="registration-page container">
			 <div className="registration-card">
        <header className="page-header">
        <h1>
          Welcome to <br />
          ClickHospitals Partnership Registration!
        </h1>
        <span className="subhead">
          <i className="fas fa-clinic-medical"></i>
          Create an account to become our partner and list your clinic on
          ClickHospitals in 4 simple steps.
        </span>
      </header>

			<div className="plans-grid  row">
				<div className="col-md-6">
					<div className="card basic">
			     <div className="plan-header">
            <h2 className="plan-title">STARTER</h2>
            <p className="plan-subtitle">Basic Directory Listing</p>
            <div className="plan-price">
              <span className="price">$0</span>
              <span className="period">/year</span>
            </div>
            <p className="plan-description">
              Perfect for hospitals wanting an online presence.
            </p>
          </div>
              		 <ul className="feature-list">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Hospital profile page
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Contact information
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Specialties & treatments
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Photos & logo
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Website & social links
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Location on map
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Inquiry form
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Manage profile through dashboard
            </li>
          </ul>
						<Link href="/registration/step1" className="btn btn-outline-primary" onClick={() => selectPlan('STARTER', 0)}>Get Started</Link>
					
							</div>
				</div>
				<div className="col-md-6">
					<div className="card featured">
             <div className="plan-header">
						<div className="badge">FEATURED PARTNER</div>
            <p className="plan-subtitle">Featured Hospital</p>
						<div className="plan-price">
              <span className="price">$499</span>
              <span className="period">/year</span>
            </div>
               <p className="plan-description">
              Everything in Basic, plus additional visibility across
              ClickHospitals
            </p>
          </div>

						<ul className="feature-list">
            <li>
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Featured badge
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Priority placement in search results
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Featured on country & city pages
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Homepage featured rotations
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Featured in specialty pages
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Premium profile layout
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="black"
                  strokeWidth="4"
                />
                <path
                  d="M23 32L30 39L42 25"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Priority support
            </li>
          </ul>
						<Link href="/registration/step1" className="btn btn-primary" onClick={() => selectPlan('FEATURED', 499)}>Get Started</Link>
					</div>
				</div>
			</div>
      </div>
		</section>
	);
}
