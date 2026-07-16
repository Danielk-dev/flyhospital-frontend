import { create } from 'zustand';
import { apiFetch } from '@/lib/api';
import type { ApiResponse, Blog, Destination, Hospital, PaginatedResponse, Region, Treatments } from '@/lib/types';

type StaleKey = 'treatments' | 'regions' | 'destinations' | 'hospitals' | 'blogs' | 'subprocedures';

interface GeneralState {
	treatments: Treatments[];
	destinations: Destination[];
	hospitals: Hospital[];
	blogs: Blog[];
	subprocedures: Treatments[];
	regions: Region[];
	loading: boolean;
	error: string | null;
	pagination: { current_page: number; last_page: number; total: number };
	lastFetched: Record<StaleKey, number | null>;
	isStale: (key: StaleKey) => boolean;
	fetchTreatments: (forceRefresh?: boolean) => Promise<void>;
	fetchRegions: (forceRefresh?: boolean) => Promise<void>;
	fetchDestination: (forceRefresh?: boolean) => Promise<void>;
	fetchHospitals: (forceRefresh?: boolean) => Promise<void>;
	fetchBlogs: (page?: number) => Promise<void>;
	fetchSubProcedures: (treatmentId: string | number) => Promise<void>;
	fetchBlogById: (id: string) => Promise<Blog | null>;
	refreshAll: () => Promise<void>;
}

const oneHour = 60 * 60 * 1000;

export const useGeneralStore = create<GeneralState>((set, get) => ({
	treatments: [],
	destinations: [],
	hospitals: [],
	blogs: [],
	subprocedures: [],
	regions: [],
	loading: false,
	error: null,
	pagination: { current_page: 1, last_page: 1, total: 0 },
	lastFetched: {
		treatments: null,
		destinations: null,
		regions: null,
		hospitals: null,
		blogs: null,
		subprocedures: null,
	},

	isStale: (key) => {
		const last = get().lastFetched[key];
		if (!last) return true;
		return Date.now() - last > oneHour;
	},

	fetchTreatments: async (forceRefresh = false) => {
		if (!forceRefresh && get().treatments.length > 0) return;
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ status: boolean; data: Treatments[] }>('treatments');
			set({ treatments: res.data ?? [], lastFetched: { ...get().lastFetched, treatments: Date.now() } });
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch treatments' });
		} finally {
			set({ loading: false });
		}
	},

	fetchRegions: async (forceRefresh = false) => {
		if (!forceRefresh && get().regions.length > 0) return;
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ data: Region[] }>('region');
			set({ regions: res.data ?? [] });
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch regions' });
		} finally {
			set({ loading: false });
		}
	},

	fetchDestination: async (forceRefresh = false) => {
		if (!forceRefresh && get().destinations.length > 0) return;
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ status?: boolean; data: Destination[] }>('destinations');
			set({ destinations: res.data ?? [], lastFetched: { ...get().lastFetched, destinations: Date.now() } });
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch destinations' });
		} finally {
			set({ loading: false });
		}
	},

	fetchHospitals: async (forceRefresh = false) => {
		if (!forceRefresh && get().hospitals.length > 0) return;
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ status: boolean; data: Hospital[] }>('hospitals');
			set({ hospitals: res.data ?? [], lastFetched: { ...get().lastFetched, hospitals: Date.now() } });
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch hospitals' });
		} finally {
			set({ loading: false });
		}
	},

	fetchBlogs: async (page = 1) => {
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<ApiResponse<PaginatedResponse<Blog>>>(`blogs?page=${page}`);
			set({
				blogs: res.data.data,
				pagination: {
					current_page: res.data.current_page,
					last_page: res.data.last_page,
					total: res.data.total,
				},
				lastFetched: { ...get().lastFetched, blogs: Date.now() },
			});
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch blogs' });
		} finally {
			set({ loading: false });
		}
	},

	fetchSubProcedures: async (treatmentId) => {
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ status?: boolean; data: Treatments[] }>('sub-treatments', {
				params: { parent_id: treatmentId },
			});
			set({ subprocedures: res.data ?? [], lastFetched: { ...get().lastFetched, subprocedures: Date.now() } });
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch subprocedures' });
		} finally {
			set({ loading: false });
		}
	},

	fetchBlogById: async (id) => {
		try {
			set({ loading: true, error: null });
			const res = await apiFetch<{ status: boolean; data: Blog }>(`blogs/${id}`);
			return res.data;
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch blog details' });
			return null;
		} finally {
			set({ loading: false });
		}
	},

	refreshAll: async () => {
		set({
			treatments: [],
			destinations: [],
			hospitals: [],
			blogs: [],
			subprocedures: [],
			lastFetched: {
				treatments: null,
				destinations: null,
				hospitals: null,
				blogs: null,
				subprocedures: null,
				regions: null,
			},
		});
		await Promise.all([
			get().fetchTreatments(true),
			get().fetchDestination(true),
			get().fetchHospitals(true),
			get().fetchBlogs(1),
		]);
	},
}));
