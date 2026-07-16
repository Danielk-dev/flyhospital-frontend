'use client';

import Header from '@/components/Header';
import AuthFooter from '@/components/AuthFooter';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
			<AuthFooter />
		</div>
	);
}
