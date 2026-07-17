export function truncateText(text: string, maxLength = 50): string {
	if (!text) return '';
	return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

export function capitalize(text: string): string {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export function stripHtml(html: string): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function getImageUrl(path?: string | null, fallback = 'https://admin.clickhospitals.com/dumy.jpg'): string {
	if (!path) return fallback;
	if (path.startsWith('http')) return path;
	return `https://admin.clickhospitals.com/${path.replace(/^\//, '')}`;
}
