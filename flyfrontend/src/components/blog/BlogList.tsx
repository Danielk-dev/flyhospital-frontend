'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useGeneralStore } from '@/stores/general';
import { useSlider } from '@/hooks/useSlider';
import { getImageUrl, stripHtml, truncateText } from '@/lib/helpers';

export default function BlogList() {
	const blogs = useGeneralStore((s) => s.blogs);
	const previewBlogs = useMemo(() => blogs.slice(0, 6), [blogs]);
	const breakpoints = useMemo(() => [
		{ minWidth: 992, slides: 3 },
		{ minWidth: 768, slides: 2 },
		{ minWidth: 0, slides: 1 },
	], []);
	const loading = useGeneralStore((s) => s.loading);
	const error = useGeneralStore((s) => s.error);
	const { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide } = useSlider(previewBlogs.length, breakpoints);

	return (
		<section className="blogs-section">
			<div className="container">
				<div className="section-header">
					<h2>Blogs</h2>
					<p>Explore our top-rated procedure in neurology, plastic surgery, dentistry, and oncology.</p>
				</div>
				{loading && <div>Loading blogs...</div>}
				{error && <div>{error}</div>}
				{!loading && !error && (
					<div className="slider-container">
						<button className="slider-arrow prev-arrow" onClick={prevSlide} disabled={currentIndex === 0}>&#10094;</button>
						<div className="slider-wrapper">
							<div className="slider-track" style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}>
								{previewBlogs.map((blog) => (
									<div key={blog.id} className="blog-slide">
										<div className="blog-card">
											<img src={getImageUrl(blog.media?.[0]?.original_url || blog.image_url)} alt={blog.title} loading="lazy" />
											<div className="blog-content">
												<h3>{truncateText(blog.title, 60)}</h3>
												<p className="truncate-lines">{stripHtml(blog.content)}</p>
												<Link href={`/blogs/${blog.id}`}>Read More</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<button className="slider-arrow next-arrow" onClick={nextSlide} disabled={currentIndex >= maxIndex}>&#10095;</button>
					</div>
				)}
				<div className="view-all-container mt-5 text-center">
					<Link href="/blogs" className="btn btn-primary btn-lg px-5 py-3">Show Blogs</Link>
				</div>
			</div>
		</section>
	);
}
