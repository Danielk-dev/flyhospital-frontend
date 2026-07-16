export const config = {
	baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.clickhospitals.com/api',
	imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || 'https://admin.clickhospitals.com/',
	webUrl: process.env.NEXT_PUBLIC_WEB_URL || 'https://clickhospitals.com/',
} as const;

export const internalApiBase = '/api';
