import { internalApiBase } from './config';

type FetchOptions = RequestInit & {
	params?: Record<string, string | number | undefined | null>;
};

function buildUrl(path: string, params?: FetchOptions['params']): string {
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const url = new URL(`${internalApiBase}/${cleanPath}`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				url.searchParams.set(key, String(value));
			}
		});
	}

	return url.pathname + url.search;
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
	const { params, ...init } = options;
	const url = buildUrl(path, params);
	const response = await fetch(url, {
		...init,
		headers: {
			Accept: 'application/json',
			...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
			...init.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.status} ${response.statusText}`);
	}

	return response.json() as Promise<T>;
}
