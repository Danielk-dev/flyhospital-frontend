import { defineStore } from 'pinia'

/**
 * Category type from API
 */
interface Category {
  id: number
  name: string
}

/**
 * Contact form payload
 */
interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  contact_category_id: number | string
}

/**
 * Store state
 */
interface ContactState {
  categories: Category[]
  loading: boolean
  error: string | null
  success: boolean
}

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({
    categories: [],
    loading: false,
    error: null,
    success: false,
  }),

  actions: {
    // ✅ Fetch categories
    async fetchCategories(): Promise<Category[] | null> {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      const api = `${config.public.baseUrl}/contact_categories`

      try {
        const data: { data: Category[] } = await $fetch(api)
        this.categories = data.data ?? []
        return this.categories
      } catch (err: any) {
        this.error = err.message || 'Failed to load categories'
        return null
      } finally {
        this.loading = false
      }
    },

    // ✅ Submit contact form
    async submitContact(form: ContactForm): Promise<any | null> {
      this.loading = true
      this.error = null
      this.success = false
      const config = useRuntimeConfig()
      const api = `${config.public.baseUrl}/contact_us`

      try {
        const res = await $fetch(api, {
          method: 'POST',
          body: form,
        })
        this.success = true
        return res
      } catch (err: any) {
        this.error = err.message || 'Failed to submit form'
        return null
      } finally {
        this.loading = false
      }
    },
  },
})
