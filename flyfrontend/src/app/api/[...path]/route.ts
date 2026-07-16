import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
	const path = params.path.join('/');
	const targetUrl = new URL(`${config.baseUrl}/${path}`);
	targetUrl.search = request.nextUrl.search;

	const headers = new Headers();
	const contentType = request.headers.get('content-type');
	if (contentType) headers.set('content-type', contentType);
	const accept = request.headers.get('accept');
	if (accept) headers.set('accept', accept);

	const init: RequestInit = {
		method: request.method,
		headers,
	};

	if (request.method !== 'GET' && request.method !== 'HEAD') {
		const body = await request.arrayBuffer();
		if (body.byteLength > 0) init.body = body;
	}

	const response = await fetch(targetUrl.toString(), init);
	const responseContentType = response.headers.get('content-type') || 'application/json';
	const data = await response.arrayBuffer();

	return new NextResponse(data, {
		status: response.status,
		headers: {
			'Content-Type': responseContentType,
		},
	});
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return proxyRequest(request, params);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return proxyRequest(request, params);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return proxyRequest(request, params);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return proxyRequest(request, params);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	const params = await context.params;
	return proxyRequest(request, params);
}

export function generateStaticParams() {
	return [];
}
