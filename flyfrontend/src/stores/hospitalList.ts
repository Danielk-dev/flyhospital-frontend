import { create } from 'zustand';
import { apiFetch } from '@/lib/api';
import type { City, Country, Hospital } from '@/lib/types';

interface HospitalListState {
	hospitals: Hospital[];
	totalHospitals: number;
	currentPage: number;
	lastPage: number;
	perPage: number;
	initialLoadCount: number;
	search: string;
	country_id: string;
	city_id: string;
	category_id: string;
	treatment_id: string;
	loader: boolean;
	countries: Country[];
	cities: City[];
	citiesCache: Record<string | number, City[]>;
	hospital: Hospital | Record<string, unknown>;
	setFilter: (key: 'search' | 'country_id' | 'city_id' | 'category_id' | 'treatment_id', value: string) => void;
	buildQuery: (page: number) => Record<string, string>;
	list: (page?: number, showLoader?: boolean) => Promise<void>;
	loadMore: () => Promise<void>;
	loadLess: () => Promise<void>;
	loadPrevious: () => Promise<void>;
	loadCountries: () => Promise<void>;
	loadCities: (countryId: string | number, forceRefresh?: boolean) => Promise<void>;
	details: (id: string | number) => Promise<void>;
}

function normalizeHospitalData(hospitalData: Record<string, unknown>): Record<string, unknown> {
	const data = { ...hospitalData };

	if (data.treatments && !Array.isArray(data.treatments)) {
		const treatments = data.treatments as { data?: unknown[] };
		data.treatments = Array.isArray(treatments.data) ? treatments.data : [];
	}

	for (const key of ['hotels', 'restaurants'] as const) {
		if (!Array.isArray(data[key])) {
			const section = data[key] as { data?: unknown[] } | undefined;
			if (section && typeof section === 'object' && 'data' in section) {
				data[key] = Array.isArray(section.data) ? section.data : [];
			} else if (!data[key] && Array.isArray(data.nearbies)) {
				const type = key === 'hotels' ? 'hotel' : 'restaurant';
				data[key] = (data.nearbies as { type?: string }[]).filter((item) => item?.type === type);
			} else {
				data[key] = [];
			}
		}
	}

	return data;
}

export const useHospitalListStore = create<HospitalListState>((set, get) => ({
	hospitals: [],
	totalHospitals: 0,
	currentPage: 1,
	lastPage: 1,
	perPage: 10,
	initialLoadCount: 0,
	search: '',
	country_id: '',
	city_id: '',
	category_id: '',
	treatment_id: '',
	loader: false,
	countries: [],
	cities: [],
	citiesCache: {},
	hospital: {},

	setFilter: (key, value) => set({ [key]: value }),

	buildQuery: (page) => {
		const state = get();
		const query: Record<string, string> = { page: String(page), per_page: String(state.perPage) };
		if (state.search) query.search = state.search;
		if (state.country_id) query.country_id = state.country_id;
		if (state.city_id) query.city_id = state.city_id;
		if (state.category_id) query.procedure_id = state.category_id;
		if (state.treatment_id) query.treatment_id = state.treatment_id;
		return query;
	},

	list: async (page = 1, showLoader = true) => {
		if (showLoader) set({ loader: true });
		try {
			const data = await apiFetch<{
				data?: Hospital[];
				total_hospitals?: number;
				current_page?: number;
				last_page?: number;
			}>('hospital-listing', { params: get().buildQuery(page) });

			set({
				hospitals: data.data ?? [],
				totalHospitals: data.total_hospitals ?? 0,
				currentPage: data.current_page ?? 1,
				lastPage: data.last_page ?? 1,
				initialLoadCount: page === 1 ? (data.data?.length ?? 0) : get().initialLoadCount,
			});
		} catch {
			set({ hospitals: [], totalHospitals: 0, initialLoadCount: 0 });
		} finally {
			if (showLoader) set({ loader: false });
		}
	},

	loadMore: async () => {
		const state = get();
		if (state.loader || state.currentPage >= state.lastPage) return;

		set({ loader: true });
		const nextPage = state.currentPage + 1;
		try {
			const data = await apiFetch<{ data?: Hospital[]; current_page?: number; last_page?: number }>(
				'hospital-listing',
				{ params: get().buildQuery(nextPage) },
			);
			const newHospitals = data.data ?? [];
			const existingIds = new Set(get().hospitals.map((h) => h.id));
			const uniqueNew = newHospitals.filter((h) => !existingIds.has(h.id));
			set({
				hospitals: [...get().hospitals, ...uniqueNew],
				currentPage: data.current_page ?? nextPage,
				lastPage: data.last_page ?? get().lastPage,
			});
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			set({ loader: false });
		}
	},

	loadLess: async () => {
		const state = get();
		if (state.hospitals.length <= state.initialLoadCount || state.currentPage <= 1) return;
		set({ loader: true });
		await new Promise((resolve) => setTimeout(resolve, 2000));
		set({
			hospitals: state.hospitals.slice(0, -state.perPage),
			currentPage: Math.max(1, state.currentPage - 1),
			loader: false,
		});
	},

	loadPrevious: async () => {
		const state = get();
		if (state.currentPage <= 1) return;
		set({ loader: true });
		const prevPage = state.currentPage - 1;
		try {
			const data = await apiFetch<{ data?: Hospital[]; current_page?: number }>('hospital-listing', {
				params: get().buildQuery(prevPage),
			});
			set({ hospitals: data.data ?? [], currentPage: data.current_page ?? prevPage });
		} catch (err) {
			console.error('API Error:', err);
		} finally {
			set({ loader: false });
		}
	},

	loadCountries: async () => {
		try {
			const response = await apiFetch<{ data?: Country[] } | Country[]>('countries');
			const countries = Array.isArray(response) ? response : (response.data ?? []);
			set({ countries });
		} catch (err) {
			console.error('Failed to load countries:', err);
		}
	},

	loadCities: async (countryId, forceRefresh = false) => {
		if (!countryId) {
			set({ cities: [] });
			return;
		}
		if (!forceRefresh && get().citiesCache[countryId]) {
			set({ cities: get().citiesCache[countryId] });
			return;
		}
		try {
			const response = await apiFetch<{ data?: City[] } | City[]>(`countries/${countryId}/cities`);
			const cities = Array.isArray(response) ? response : (response.data ?? []);
			set({ cities, citiesCache: { ...get().citiesCache, [countryId]: cities } });
		} catch {
			set({ cities: [] });
		}
	},

	details: async (id) => {
		if (!id) {
			set({ hospital: {} });
			return;
		}
		set({ loader: true });
		try {
			const response = await apiFetch<{ data?: Record<string, unknown> } | Record<string, unknown>>(
				`hospital/${id}`,
			);
			const raw = response && typeof response === 'object' && 'data' in response
				? ((response.data ?? {}) as Record<string, unknown>)
				: (response as Record<string, unknown>);
			set({ hospital: normalizeHospitalData(raw) as Hospital });
		} catch {
			set({ hospital: {} });
		} finally {
			set({ loader: false });
		}
	},
}));
