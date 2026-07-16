import { create } from 'zustand';
import { apiFetch } from '@/lib/api';
import type { ContactCategory, ContactForm, Hospital } from '@/lib/types';

interface ContactState {
	categories: ContactCategory[];
	loading: boolean;
	error: string | null;
	success: boolean;
	fetchCategories: () => Promise<ContactCategory[] | null>;
	submitContact: (form: ContactForm) => Promise<unknown | null>;
}

export const useContactStore = create<ContactState>((set) => ({
	categories: [],
	loading: false,
	error: null,
	success: false,

	fetchCategories: async () => {
		set({ loading: true, error: null });
		try {
			const data = await apiFetch<{ data: ContactCategory[] }>('contact_categories');
			const categories = data.data ?? [];
			set({ categories });
			return categories;
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to load categories' });
			return null;
		} finally {
			set({ loading: false });
		}
	},

	submitContact: async (form) => {
		set({ loading: true, error: null, success: false });
		try {
			const res = await apiFetch('contact_us', { method: 'POST', body: JSON.stringify(form) });
			set({ success: true });
			return res;
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to submit form' });
			return null;
		} finally {
			set({ loading: false });
		}
	},
}));

interface FilterHospitalState {
	hospitals: Hospital[];
	totalHospitals: number;
	isLoading: boolean;
	error: string | null;
	fetchHospitals: (
		countryslug: string,
		slug: string,
		category_id?: string,
		treatment_id?: string,
		clearData?: boolean,
		appendData?: boolean,
	) => Promise<{ data: Hospital[]; total_hospitals: number } | undefined>;
	reset: () => void;
}

export const useFilterHospitalStore = create<FilterHospitalState>((set, get) => ({
	hospitals: [],
	totalHospitals: 0,
	isLoading: false,
	error: null,

	fetchHospitals: async (countryslug, slug, category_id, treatment_id, clearData = false, appendData = false) => {
		set({ isLoading: true, error: null });
		if (clearData) set({ hospitals: [] });

		try {
			const params: Record<string, string> = { countryslug, slug };
			if (category_id) params.category_id = category_id;
			if (treatment_id) params.treatment_id = treatment_id;

			const data = await apiFetch<{ success: boolean; data: Hospital[]; total_hospitals: number }>(
				'filter-hospitals',
				{ params },
			);

			if (data.success) {
				set({
					hospitals: appendData ? [...get().hospitals, ...data.data] : data.data,
					totalHospitals: data.total_hospitals,
				});
				return data;
			}
			throw new Error('API request failed');
		} catch (err) {
			const message = err instanceof Error ? err.message : 'An error occurred';
			set({ error: message });
			throw err;
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => set({ hospitals: [], totalHospitals: 0, error: null }),
}));

interface RegistrationData {
	personalInfo?: Record<string, unknown>;
	emailVerification?: Record<string, unknown>;
	facilitySelection?: Record<string, unknown>;
	businessInfo?: Record<string, unknown>;
	paymentInfo?: Record<string, unknown>;
	selectedPlan?: { name: string; price: number };
}

interface RegistrationState {
	data: RegistrationData;
	setData: (partial: Partial<RegistrationData>) => void;
	selectPlan: (name: string, price: number) => void;
	reset: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
	data: {},
	setData: (partial) => set({ data: { ...get().data, ...partial } }),
	selectPlan: (name, price) => set({ data: { ...get().data, selectedPlan: { name, price } } }),
	reset: () => set({ data: {} }),
}));
