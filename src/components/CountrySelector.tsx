'use client';

import { useEffect, useRef, useState } from 'react';
import { useCountries, type PhoneCountry } from '@/hooks/useCountries';

interface CountrySelectorProps {
	value?: string;
	defaultCountryCode?: string;
	onChange?: (dialCode: string) => void;
	onCountryChanged?: (country: PhoneCountry) => void;
}

export default function CountrySelector({ value = '+971', defaultCountryCode = 'AE', onChange, onCountryChanged }: CountrySelectorProps) {
	const { countries, fetchCountries, getCountryByCode } = useCountries();
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState<PhoneCountry | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => { fetchCountries(); }, [fetchCountries]);

	useEffect(() => {
		if (countries.length > 0 && !selected) {
			const country = getCountryByCode(defaultCountryCode) || countries[0];
			setSelected(country);
		}
	}, [countries, defaultCountryCode, getCountryByCode, selected]);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const filtered = countries.filter((c) =>
		c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search),
	);

	const selectCountry = (country: PhoneCountry) => {
		setSelected(country);
		onChange?.(country.dialCode);
		onCountryChanged?.(country);
		setIsOpen(false);
		setSearch('');
	};

	return (
		<div className="country-selector position-relative" ref={ref}>
			<button type="button" className="btn btn-light d-flex align-items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
				{selected?.flagUrl ? <img src={selected.flagUrl} alt="" width={20} /> : <span>{selected?.flag}</span>}
				<span>{value || selected?.dialCode}</span>
			</button>
			{isOpen && (
				<div className="dropdown-menu show p-2" style={{ minWidth: 280, maxHeight: 300, overflowY: 'auto' }}>
					<input type="text" className="form-control mb-2" placeholder="Search country..." value={search} onChange={(e) => setSearch(e.target.value)} />
					{filtered.map((country) => (
						<button key={country.code} type="button" className="dropdown-item d-flex align-items-center gap-2" onClick={() => selectCountry(country)}>
							{country.flagUrl ? <img src={country.flagUrl} alt="" width={20} /> : <span>{country.flag}</span>}
							<span>{country.name}</span>
							<span className="ms-auto text-muted">{country.dialCode}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
