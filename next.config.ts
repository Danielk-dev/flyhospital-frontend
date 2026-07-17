import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	turbopack: {
		root: __dirname,
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'admin.clickhospitals.com' },
			{ protocol: 'https', hostname: 'flagcdn.com' },
			{ protocol: 'https', hostname: 'randomuser.me' },
			{ protocol: 'https', hostname: 'placehold.co' },
		],
	},
};

export default nextConfig;
