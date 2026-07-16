import type { Metadata } from 'next';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const metadata: Metadata = {
	title: 'ClickHospitals',
	description: 'Find hospitals by procedure and location worldwide',
	robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
				<link rel="stylesheet" href="/assets/css/style.css" />
				<link rel="stylesheet" href="/assets/css/start.css" />
				<link rel="stylesheet" href="/assets/css/partner.css" />
				<link rel="stylesheet" href="/assets/css/otp.css" />
				<link rel="stylesheet" href="/assets/css/modal.css" />
				<link rel="stylesheet" href="/assets/css/list.css" />
				<link rel="stylesheet" href="/assets/css/header.css" />
				<link rel="stylesheet" href="/assets/css/footer.css" />
				<link rel="stylesheet" href="/assets/css/details.css" />
				<link rel="stylesheet" href="/assets/css/contact.css" />
				<link rel="stylesheet" href="/assets/css/about.css" />
				<link rel="stylesheet" href="/assets/css/main.css" />
			</head>
			<body>{children}</body>
		</html>
	);
}
