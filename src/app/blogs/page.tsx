'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import { useGeneralStore } from '@/stores/general';
import { formatDate, getImageUrl, stripHtml } from '@/lib/helpers';

export default function BlogsPage() {
	const store = useGeneralStore();
	const { blogs, loading, error, pagination } = store;

	useEffect(() => {
		store.fetchBlogs(1);
	}, [store]);

	const calculateReadTime = (content: string) => Math.max(1, Math.ceil(stripHtml(content).split(' ').length / 200));

	return (
		<MainLayout>
			<main className="blogs-page">
				<div className="container py-5">
					<nav aria-label="breadcrumb" className="mb-4">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link href="/">Home</Link></li>
							<li className="breadcrumb-item active">Blogs</li>
						</ol>
					</nav>
					<div className="blog-header mb-5">
						<h1 className="display-5 fw-bold mb-3">Top Medical Related Blogs</h1>
						<p className="text-muted lead">Trusted, transparent, and objective medical insights.</p>
					</div>
					{loading && <div className="text-center py-5">Loading blogs...</div>}
					{error && (
						<div className="text-center py-5">
							<p className="h5">{error}</p>
							<button onClick={() => store.fetchBlogs(1)} className="btn btn-primary mt-3">Try Again</button>
						</div>
					)}
					{!loading && !error && (
						<div className="row g-4">
							{blogs.map((blog) => (
								<div key={blog.id} className="col-12 col-md-6 col-lg-3">
									<Link href={`/blogs/${blog.id}`} className="text-decoration-none">
										<div className="blog-card h-100 card">
											<img src={getImageUrl(blog.media?.[0]?.original_url || blog.image_url)} alt={blog.title} className="card-img-top" />
											<div className="card-body">
												<span className="badge bg-secondary mb-2">{blog.tags || 'General'}</span>
												<h3 className="h6 fw-bold text-dark">{blog.title}</h3>
												<div className="small text-muted">
													{formatDate(blog.created_at || new Date())} · {calculateReadTime(blog.content)} min read
												</div>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					)}
					{pagination.last_page > 1 && (
						<div className="d-flex justify-content-center mt-5">
							<nav>
								<ul className="pagination">
									<li className={`page-item${pagination.current_page === 1 ? ' disabled' : ''}`}>
										<button className="page-link" onClick={() => store.fetchBlogs(pagination.current_page - 1)}>Previous</button>
									</li>
									<li className={`page-item${pagination.current_page >= pagination.last_page ? ' disabled' : ''}`}>
										<button className="page-link" onClick={() => store.fetchBlogs(pagination.current_page + 1)}>Next</button>
									</li>
								</ul>
							</nav>
						</div>
					)}
				</div>
			</main>
		</MainLayout>
	);
}
