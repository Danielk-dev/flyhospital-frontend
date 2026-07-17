import { create } from 'zustand';
import { apiFetch } from '@/lib/api';
import type { Hospital } from '@/lib/types';

interface HospitalStoreState {
	hospitals: Hospital[];
	totalHospitals: number;
	countries: Record<string, unknown>[];
	cities: Record<string, unknown>[];
	search: string;
	country_id: string | number | null;
	city_id: string | number | null;
	category_id: string | number | null;
	treatment_id: string | number | null;
	procedure: Record<string, unknown>[];
	subprocedure: Record<string, unknown>[];
	setSearch: (search: string) => void;
	setCountryId: (id: string | number | null) => void;
	setCityId: (id: string | number | null) => void;
	setCategoryId: (id: string | number | null) => void;
	setTreatmentId: (id: string | number | null) => void;
	index: () => Promise<void>;
	list: () => Promise<void>;
	loadCountries: () => Promise<void>;
	loadCities: (countryId: string | number) => Promise<void>;
	loadprocedure: () => Promise<void>;
	loadSubprocedure: (procedureId: string | number) => Promise<void>;
}

function buildQuery(state: HospitalStoreState): Record<string, string> {
	const query: Record<string, string> = {};
	if (state.search) query.search = state.search;
	if (state.country_id) query.country_id = String(state.country_id);
	if (state.city_id) query.city_id = String(state.city_id);
	if (state.category_id) query.procedure_id = String(state.category_id);
	if (state.treatment_id) query.treatment_id = String(state.treatment_id);
	return query;
}

export const useHospitalStore = create<HospitalStoreState>((set, get) => ({
	hospitals: [],
	totalHospitals: 0,
	countries: [],
	cities: [],
	search: '',
	country_id: null,
	city_id: null,
	category_id: null,
	treatment_id: null,
	procedure: [],
	subprocedure: [],

	setSearch: (search) => set({ search }),
	setCountryId: (country_id) => set({ country_id }),
	setCityId: (city_id) => set({ city_id }),
	setCategoryId: (category_id) => set({ category_id }),
	setTreatmentId: (treatment_id) => set({ treatment_id }),

	index: async () => {
		try {
			const data = await apiFetch<{ data?: Hospital[]; total_hospitals?: number }>('hospitals', {
				params: buildQuery(get()),
			});
			set({ hospitals: data.data ?? (data as unknown as Hospital[]), totalHospitals: data.total_hospitals ?? 0 });
		} catch (error) {
			console.error('API Error:', error);
		}
	},

	list: async () => {
		try {
			const data = await apiFetch<{ data?: Hospital[]; total_hospitals?: number }>('hospital-listing', {
				params: buildQuery(get()),
			});
			set({ hospitals: data.data ?? [], totalHospitals: data.total_hospitals ?? 0 });
		} catch (error) {
			console.error('API Error:', error);
		}
	},

	loadCountries: async () => {
		try {
			const data = await apiFetch<{ data?: Record<string, unknown>[] }>('countries');
			set({ countries: data.data ?? (data as unknown as Record<string, unknown>[]) });
		} catch (error) {
			console.error('API Error:', error);
		}
	},

	loadCities: async (countryId) => {
		if (!countryId) {
			set({ cities: [] });
			return;
		}
		try {
			const data = await apiFetch<{ data?: Record<string, unknown>[] }>(`countries/${countryId}/cities`);
			set({ cities: data.data ?? (data as unknown as Record<string, unknown>[]) });
		} catch (error) {
			console.error('API Error:', error);
		}
	},

	loadprocedure: async () => {
		try {
			const data = await apiFetch<{ data?: Record<string, unknown>[] }>('treatments');
			set({ procedure: data.data ?? (data as unknown as Record<string, unknown>[]) });
		} catch (error) {
			console.error('API Error:', error);
		}
	},

	loadSubprocedure: async (procedureId) => {
		if (!procedureId) {
			set({ subprocedure: [] });
			return;
		}
		try {
			const data = await apiFetch<{ data?: Record<string, unknown>[] }>('sub-treatments', {
				params: { parent_id: procedureId },
			});
			set({ subprocedure: data.data ?? (data as unknown as Record<string, unknown>[]) });
		} catch (error) {
			console.error('API Error:', error);
		}
	},
}));
