'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useSlider(itemCount: number, breakpoints: { minWidth: number; slides: number }[] = [
	{ minWidth: 992, slides: 4 },
	{ minWidth: 768, slides: 2 },
	{ minWidth: 0, slides: 1 },
]) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(4);
	const breakpointsRef = useRef(breakpoints);

	useEffect(() => {
		breakpointsRef.current = breakpoints;
	}, [breakpoints]);

	useEffect(() => {
		const updateSlides = () => {
			if (typeof window === 'undefined') return;

			const width = window.innerWidth;
			const match = breakpointsRef.current.find((bp) => width >= bp.minWidth);
			const nextSlides = match?.slides ?? 1;
			setSlidesPerView((current) => (current === nextSlides ? current : nextSlides));
		};

		updateSlides();
		const handleResize = () => updateSlides();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const maxIndex = Math.max(0, itemCount - slidesPerView);

	const prevSlide = useCallback(() => {
		setCurrentIndex((i) => Math.max(0, i - 1));
	}, []);

	const nextSlide = useCallback(() => {
		setCurrentIndex((i) => Math.min(maxIndex, i + 1));
	}, [maxIndex]);

	useEffect(() => {
		setCurrentIndex((i) => Math.min(i, maxIndex));
	}, [maxIndex]);

	return { currentIndex, slidesPerView, maxIndex, prevSlide, nextSlide };
}
