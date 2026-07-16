import { create } from 'zustand';
import { apiFetch } from '@/lib/api';
import type { ApiResponse, Blog, Destination, Hospital, PaginatedResponse, Region, Treatments } from '@/lib/types';

type StaleKey = 'treatments' | 'regions' | 'destinations' | 'hospitals' | 'blogs' | 'subprocedures';
type FetchKey = StaleKey;

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
	fetchLandingData: () => Promise<void>;
	refreshAll: () => Promise<void>;
}

const oneHour = 60 * 60 * 1000;
const inFlight = new Map<FetchKey, Promise<void>>();

function trackFetch(key: FetchKey, task: () => Promise<void>): Promise<void> {
	const existing = inFlight.get(key);
	if (existing) return existing;

	const promise = task().finally(() => {
		inFlight.delete(key);
	});
	inFlight.set(key, promise);
	return promise;
}

function setLoading(get: () => GeneralState, set: (partial: Partial<GeneralState>) => void, active: boolean) {
	if (active) {
		set({ loading: true, error: null });
		return;
	}
	// Only clear global loading when no requests are still in flight
	if (inFlight.size === 0) {
		set({ loading: false });
	}
}

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

	fetchTreatments: (forceRefresh = false) =>
		trackFetch('treatments', async () => {
			if (!forceRefresh && get().treatments.length > 0) return;
			try {
				setLoading(get, set, true);
				const res = await apiFetch<{ status: boolean; data: Treatments[] }>('treatments');
				set({ treatments: res.data ?? [], lastFetched: { ...get().lastFetched, treatments: Date.now() } });
			} catch (err) {
				set({ error: err instanceof Error ? err.message : 'Failed to fetch treatments' });
			} finally {
				setLoading(get, set, false);
			}
		}),

	fetchRegions: (forceRefresh = false) =>
		trackFetch('regions', async () => {
			if (!forceRefresh && get().regions.length > 0) return;
			try {
				setLoading(get, set, true);
				const res = await apiFetch<{ data: Region[] }>('region');
				set({ regions: res.data ?? [], lastFetched: { ...get().lastFetched, regions: Date.now() } });
			} catch (err) {
				set({ error: err instanceof Error ? err.message : 'Failed to fetch regions' });
			} finally {
				setLoading(get, set, false);
			}
		}),

	fetchDestination: (forceRefresh = false) =>
		trackFetch('destinations', async () => {
			if (!forceRefresh && get().destinations.length > 0) return;
			try {
				setLoading(get, set, true);
				const res = await apiFetch<{ status?: boolean; data: Destination[] }>('destinations');
				set({ destinations: res.data ?? [], lastFetched: { ...get().lastFetched, destinations: Date.now() } });
			} catch (err) {
				set({ error: err instanceof Error ? err.message : 'Failed to fetch destinations' });
			} finally {
				setLoading(get, set, false);
			}
		}),

	fetchHospitals: (forceRefresh = false) =>
		trackFetch('hospitals', async () => {
			if (!forceRefresh && get().hospitals.length > 0) return;
			try {
				setLoading(get, set, true);
				const res = await apiFetch<{ status: boolean; data: Hospital[] }>('hospitals');
				set({ hospitals: res.data ?? [], lastFetched: { ...get().lastFetched, hospitals: Date.now() } });
			} catch (err) {
				set({ error: err instanceof Error ? err.message : 'Failed to fetch hospitals' });
			} finally {
				setLoading(get, set, false);
			}
		}),

	fetchBlogs: (page = 1) =>
		trackFetch('blogs', async () => {
			if (page === 1 && get().blogs.length > 0 && get().lastFetched.blogs) return;
			try {
				setLoading(get, set, true);
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
				setLoading(get, set, false);
			}
		}),

	fetchSubProcedures: (treatmentId) =>
		trackFetch('subprocedures', async () => {
			try {
				setLoading(get, set, true);
				const res = await apiFetch<{ status?: boolean; data: Treatments[] }>('sub-treatments', {
					params: { parent_id: treatmentId },
				});
				set({ subprocedures: res.data ?? [], lastFetched: { ...get().lastFetched, subprocedures: Date.now() } });
			} catch (err) {
				set({ error: err instanceof Error ? err.message : 'Failed to fetch subprocedures' });
			} finally {
				setLoading(get, set, false);
			}
		}),

	fetchBlogById: async (id) => {
		try {
			setLoading(get, set, true);
			const res = await apiFetch<{ status: boolean; data: Blog }>(`blogs/${id}`);
			return res.data;
		} catch (err) {
			set({ error: err instanceof Error ? err.message : 'Failed to fetch blog details' });
			return null;
		} finally {
			setLoading(get, set, false);
		}
	},

	fetchLandingData: async () => {
		await Promise.all([
			get().fetchTreatments(),
			get().fetchDestination(),
			get().fetchHospitals(),
			get().fetchBlogs(1),
		]);
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
