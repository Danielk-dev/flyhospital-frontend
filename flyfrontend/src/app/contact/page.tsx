'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import CountrySelector from '@/components/CountrySelector';
import { useContactStore } from '@/stores/contact';

export default function ContactPage() {
	const contactStore = useContactStore();
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		phoneDialCode: '+971',
		subject: '',
		message: '',
		contact_category_id: '',
	});

	useEffect(() => {
		contactStore.fetchCategories();
	}, [contactStore]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await contactStore.submitContact({
			...form,
			phone: `${form.phoneDialCode}${form.phone}`,
			contact_category_id: form.contact_category_id,
		});
		if (contactStore.success) {
			setForm({ name: '', email: '', phone: '', phoneDialCode: '+971', subject: '', message: '', contact_category_id: '' });
			alert('Message sent successfully!');
		}
	};

	return (
		<MainLayout>
			<main className="contact-wrapper">
				<div className="container">
					<div className="row g-5 align-items-start">
						<div className="col-lg-5">
							<div className="row">
								<div className="col-md-6">
									<div className="contact-card">
										<i className="bi bi-envelope" />
										<div>
											<h6>Email</h6>
											<a href="mailto:contact@ClickHospitals.com">contact@ClickHospitals.com</a>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="contact-card">
										<i className="bi bi-telephone" />
										<div>
											<h6>Call us</h6>
											<a href="tel:+17344475890">+1(734)-447-5890</a>
										</div>
									</div>
								</div>
							</div>
							<img src="/assets/img/contact.png" alt="Patients at reception" className="contact-image mt-3" />
						</div>
						<div className="col-lg-7">
							<div className="contact-form-section">
								<h1>We&apos;re here to help you find your treatment worldwide</h1>
								<p>Have a question? We look forward to hearing from you.</p>
								<form onSubmit={handleSubmit}>
									<div className="row g-4">
										<div className="col-md-6">
											<label htmlFor="name" className="form-label">Name</label>
											<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" className="form-control" id="name" placeholder="Alex White" required />
										</div>
										<div className="col-md-6">
											<label htmlFor="email" className="form-label">Email</label>
											<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="form-control" id="email" placeholder="example@gmail.com" required />
										</div>
										<div className="col-md-6">
											<label htmlFor="phone" className="form-label">Phone</label>
											<div className="phone-input-wrapper-new d-flex gap-2">
												<CountrySelector value={form.phoneDialCode} onChange={(dialCode) => setForm({ ...form, phoneDialCode: dialCode })} />
												<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, '') })} type="text" className="form-control phone-input-field" id="phone" placeholder="Phone number" maxLength={15} />
											</div>
										</div>
										<div className="col-md-6">
											<label htmlFor="category" className="form-label">Category</label>
											<select value={form.contact_category_id} onChange={(e) => setForm({ ...form, contact_category_id: e.target.value })} className="form-select" id="category" required>
												<option value="">Select a category</option>
												{contactStore.categories.map((cat) => (
													<option key={cat.id} value={cat.id}>{cat.name}</option>
												))}
											</select>
										</div>
										<div className="col-12">
											<label htmlFor="subject" className="form-label">Subject</label>
											<input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} type="text" className="form-control" id="subject" placeholder="Type subject here" required />
										</div>
										<div className="col-12">
											<label htmlFor="message" className="form-label">Message</label>
											<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-control" id="message" placeholder="Type your message here..." required />
										</div>
										<div className="col-12 mt-5">
											<button type="submit" className="btn btn-primary submit-btn" disabled={contactStore.loading}>
												{contactStore.loading ? 'Submitting...' : 'Submit'}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</main>
		</MainLayout>
	);
}
