'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';
import { useGeneralStore } from '@/stores/general';
import { formatDate, getImageUrl, stripHtml } from '@/lib/helpers';
import type { Blog } from '@/lib/types';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const store = useGeneralStore();
	const [blog, setBlog] = useState<Blog | null>(null);

	useEffect(() => {
		store.fetchBlogById(id).then(setBlog);
		store.fetchBlogs(4);
	}, [id, store]);

	if (store.loading && !blog) {
		return <MainLayout><div className="text-center py-5"><Loader /></div></MainLayout>;
	}

	if (!blog) {
		return <MainLayout><div className="container py-5 text-center">Blog not found.</div></MainLayout>;
	}

	return (
		<MainLayout>
			<main className="container my-5">
				<Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Blogs', link: '/blogs' }, { label: blog.title, active: true }]} />
				<article>
					<div className="blog-hero mb-4">
						<img src={getImageUrl(blog.media?.[0]?.original_url || blog.image_url)} alt={blog.title} className="img-fluid rounded w-100" style={{ maxHeight: 400, objectFit: 'cover' }} />
					</div>
					<h1>{blog.title}</h1>
					<p className="text-muted">{formatDate(blog.created_at || new Date())}</p>
					<div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
				</article>
				{store.blogs.length > 0 && (
					<section className="mt-5">
						<h3>Related Blogs</h3>
						<div className="row g-4">
							{store.blogs.filter((b) => b.id !== blog.id).slice(0, 3).map((related) => (
								<div key={related.id} className="col-md-4">
									<Link href={`/blogs/${related.id}`} className="text-decoration-none">
										<div className="card">
											<img src={getImageUrl(related.image_url)} className="card-img-top" alt={related.title} />
											<div className="card-body">
												<h5 className="card-title">{related.title}</h5>
												<p className="small text-muted">{stripHtml(related.content).slice(0, 100)}...</p>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					</section>
				)}
			</main>
		</MainLayout>
	);
}
