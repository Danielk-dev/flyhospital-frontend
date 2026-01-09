import { defineStore } from 'pinia'

export interface Treatments {
  id: number
  name: string
  description: string
  image_url: string
  price?: string
  created_at?: string
  updated_at?: string
  slug?: string // Added slug for potential dynamic routing
}

export interface Destination {
  id: number
  name: string
  country_name?: string // API may return country_name instead of name
  description: string
  image_url: string
  created_at?: string
  updated_at?: string
  slug?: string
}

export interface Hospital {
  id: number
  name: string
  image_url?: string
  description?: string
  title?: string
  average_rating?: string
  total_reviews?: number
}

export interface Media {
  id: number
  model_type: string
  model_id: number
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: any[]
  generated_conversions: any[]
  responsive_images: any[]
  order_column: number
  created_at: string
  updated_at: string
  original_url: string
  preview_url: string
}

export interface Blog {
  id: number
  title: string
  content: string
  image_url: string
  tags?: string
  created_at?: string
  updated_at?: string
  slug?: string
  media?: Media[]
}

export interface SubProcedure {
  id: number
  name: string
  description: string
  image_url: string
  price?: string
  created_at?: string
  updated_at?: string
  slug?: string
}

interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
  total: number
}

interface ApiResponse<T> {
  status: boolean
  data: PaginatedResponse<T>
}

interface GeneralState {
  blogs: Blog[]
  treatments: Treatments[]
  subprocedures: Treatments[]
  destinations: Destination[]
  hospitals: Hospital[]
  loading: boolean
  error: string | null
  pagination: {
    current_page: number
    last_page: number
    total: number
  }
  lastFetched: {
    blogs: number | null
    treatments: number | null
    destinations: number | null
    hospitals: number | null
    subprocedures: number | null
  }
}

export const useGeneralStore = defineStore('general', {
  state: (): GeneralState => ({
    treatments: [],
    destinations: [],
    hospitals: [],
    blogs: [],
    subprocedures: [],
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      total: 0,
    },
    lastFetched: {
      treatments: null,
      destinations: null,
      hospitals: null,
      blogs: null,
      subprocedures: null,
    },
  }),

  getters: {
    isStale: (state) => (key: 'treatments' | 'destinations' | 'hospitals' | 'blogs') => {
      if (!state.lastFetched[key]) return true
      // Consider data stale after 1 hour
      const oneHour = 60 * 60 * 1000
      return Date.now() - state.lastFetched[key]! > oneHour
    },
  },

  actions: {
    async fetchTreatments(forceRefresh = false): Promise<void> {
      // If data exists and not forcing refresh, skip
      // Data will only refresh on hard refresh (F5) which clears the store
      if (!forceRefresh && this.treatments.length > 0) {
        return
      }

      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/treatments`

        const res = await $fetch<{ status: boolean; data: Treatments[] }>(api)

        this.treatments = res.data ?? []
        this.lastFetched.treatments = Date.now()
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch treatments'
      } finally {
        this.loading = false
      }
    },

    async fetchDestination(forceRefresh = false): Promise<void> {
      // If data exists and not forcing refresh, skip
      // Data will only refresh on hard refresh (F5) which clears the store
      if (!forceRefresh && this.destinations.length > 0) {
        return
      }

      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/destinations`

        const res = await $fetch<{ status?: boolean; data: Destination[] }>(api)

        this.destinations = res.data ?? []
        this.lastFetched.destinations = Date.now()
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch destinations'
      } finally {
        this.loading = false
      }
    },

    async fetchHospitals(forceRefresh = false): Promise<void> {
      // If data exists and not forcing refresh, skip
      if (!forceRefresh && this.hospitals.length > 0) {
        return
      }

      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/hospitals`

        const res = await $fetch<{ status: boolean; data: Hospital[] }>(api)

        this.hospitals = res.data ?? []
        this.lastFetched.hospitals = Date.now()
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch hospitals'
      } finally {
        this.loading = false
      }
    },

    async fetchBlogs(page = 1): Promise<void> {
      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/blogs?page=${page}`

        const res = await $fetch<ApiResponse<Blog>>(api)

        console.log('Blogs fetched:', res)

        this.blogs = res.data.data
        this.pagination = {
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        }
        this.lastFetched.blogs = Date.now()
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch blogs'
      } finally {
        this.loading = false
      }
    },

    async fetchSubProcedures(treatmentId: string | number): Promise<void> {
      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/sub-treatments?parent_id=${treatmentId}`
        const res = await $fetch<{ status?: boolean; data: Treatments[] }>(api)

        this.subprocedures = res.data ?? []
        this.lastFetched.subprocedures = Date.now()
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch subprocedures'
      } finally {
        this.loading = false
      }
    },

    // Force refresh all data
    async refreshAll(): Promise<void> {
      this.treatments = []
      this.destinations = []
      this.hospitals = []
      this.blogs = []
      this.subprocedures = []
      this.lastFetched = {
        treatments: null,
        destinations: null,
        hospitals: null,
        blogs: null,
        subprocedures: null,
      }
      await Promise.all([
        this.fetchTreatments(true),
        this.fetchDestination(true),
        this.fetchHospitals(true),
        this.fetchBlogs(1),
        this.fetchSubProcedures(1),
      ])
    },

    async fetchBlogById(id: string): Promise<Blog | null> {
      try {
        this.loading = true
        this.error = null

        const config = useRuntimeConfig()
        const api = `${config.public.baseUrl}/blogs/${id}`

        const res = await $fetch<{ status: boolean; data: Blog }>(api)

        return res.data
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch blog details'
        return null
      } finally {
        this.loading = false
      }
    },
  },
})