'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-top">
					<div className="footer-about">
						<div className="footer-logo">
							<img
								src="/assets/img/logo.png"
								alt="ClickHospitals Logo"
								loading="eager"
								className={!imageLoaded ? 'image-loading' : ''}
								onLoad={() => setImageLoaded(true)}
								onError={() => setImageLoaded(true)}
							/>
							<span>ClickHospitals</span>
						</div>
						<p>Your partner in trusted medical care. Find hospitals by procedure & location.</p>
						<p>
							Call us: +1(734)-447-5890
							<br />
							Email: contact@ClickHospitals.com
						</p>
					</div>
					<div className="footer-links-container">
						<div className="link-column">
							<h4>Platform</h4>
							<ul>
								<li><Link href="#">Locations</Link></li>
								<li><Link href="/procedure">Procedure</Link></li>
								<li><Link href="/about">How It Works</Link></li>
								<li><Link href="/partner">Submit Hospital Listing</Link></li>
							</ul>
						</div>
						<div className="link-column">
							<h4>Quick links</h4>
							<ul>
								<li><Link href="#">Medical Tourism</Link></li>
								<li><Link href="#">Tourism Guide</Link></li>
								<li><Link href="#">Tourism Facts</Link></li>
								<li><Link href="/blogs">Blogs</Link></li>
							</ul>
						</div>
						<div className="link-column">
							<h4>Legal</h4>
							<ul>
								<li><Link href="#">Privacy Policy</Link></li>
								<li><Link href="#">Terms of Use</Link></li>
								<li><Link href="#">Disclaimer</Link></li>
								<li><Link href="#">Cookie Policy</Link></li>
							</ul>
						</div>
						<div className="link-column">
							<h4>Support</h4>
							<ul>
								<li><Link href="/contact">Contact Us</Link></li>
								<li><Link href="#">FAQs</Link></li>
								<li><Link href="#">Help Center</Link></li>
								<li><Link href="/partner">Partner With Us</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<p className="copyright">Copyrights © 2025 ClickHospitals</p>
					<div className="social-icons">
						<Link href="#" aria-label="Facebook"><i className="bi bi-facebook" /></Link>
						<Link href="#" aria-label="Twitter"><i className="bi bi-twitter-x" /></Link>
						<Link href="#" aria-label="LinkedIn"><i className="bi bi-linkedin" /></Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
