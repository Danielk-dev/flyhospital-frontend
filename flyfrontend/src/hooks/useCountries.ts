'use client';

import { useCallback, useState } from 'react';

export interface PhoneCountry {
	name: string;
	code: string;
	dialCode: string;
	flag: string;
	flagUrl?: string;
}

const FALLBACK_COUNTRIES: PhoneCountry[] = [
	{ name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', flagUrl: 'https://flagcdn.com/ae.svg' },
	{ name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', flagUrl: 'https://flagcdn.com/sa.svg' },
	{ name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', flagUrl: 'https://flagcdn.com/us.svg' },
	{ name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', flagUrl: 'https://flagcdn.com/gb.svg' },
	{ name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', flagUrl: 'https://flagcdn.com/ca.svg' },
	{ name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', flagUrl: 'https://flagcdn.com/in.svg' },
	{ name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', flagUrl: 'https://flagcdn.com/pk.svg' },
	{ name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷', flagUrl: 'https://flagcdn.com/tr.svg' },
];

export function useCountries() {
	const [countries, setCountries] = useState<PhoneCountry[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchCountries = useCallback(async () => {
		if (countries.length > 0) return;
		setLoading(true);
		setError(null);
		try {
			const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags,flag');
			const data = await response.json();
			const mapped = data
				.map((country: { name: { common: string }; cca2: string; idd?: { root?: string; suffixes?: string[] }; flag?: string; flags?: { svg?: string; png?: string } }) => ({
					name: country.name.common,
					code: country.cca2,
					dialCode: country.idd?.root ? country.idd.root + (country.idd.suffixes?.[0] || '') : '',
					flag: country.flag || '🏳️',
					flagUrl: country.flags?.svg || country.flags?.png,
				}))
				.filter((c: PhoneCountry) => c.dialCode && c.code && c.dialCode.length <= 5)
				.sort((a: PhoneCountry, b: PhoneCountry) => a.name.localeCompare(b.name));
			setCountries(mapped);
		} catch {
			setError('Failed to fetch countries');
			setCountries(FALLBACK_COUNTRIES);
		} finally {
			setLoading(false);
		}
	}, [countries.length]);

	const getCountryByCode = useCallback(
		(code: string) => countries.find((c) => c.code === code),
		[countries],
	);

	const getCountryByDialCode = useCallback(
		(dialCode: string) => countries.find((c) => c.dialCode === dialCode),
		[countries],
	);

	return { countries, loading, error, fetchCountries, getCountryByCode, getCountryByDialCode };
}
