// stores/hospital.ts
import { defineStore } from 'pinia'

export const useHospitalStore = defineStore('hospital', {
    state: () => ({
        hospitals: [] as any[],
        totalHospitals: 0,
        countries: [] as any[],
        cities: [] as any[],
        search: '' as string,
        country_id: '' as string | number | null,
        city_id: '' as string | number | null,
        category_id: '' as string | number | null,
        treatment_id: '' as string | number | null,
        procedure: [] as any[],
        subprocedure: [] as any[],
    }),

    actions: {
        async index() {
            const query = new URLSearchParams()

            if (this.search) query.append('search', this.search)
            if (this.country_id) query.append('country_id', String(this.country_id))
            if (this.city_id) query.append('city_id', String(this.city_id))
            if (this.category_id) query.append('procedure_id', this.category_id)
            if (this.treatment_id) query.append('treatment_id', this.treatment_id)
            const config = useRuntimeConfig()
            const api = `${config.public.baseUrl}/hospitals?${query.toString()}`;
            const { data, error } = await useFetch(api);

            if (error.value) {
                console.error('❌ API Error:', error.value)
                return
            }

            if (data.value) {
                this.hospitals = data.value.data ?? data.value
                this.totalHospitals = data.value.total_hospitals ?? 0
            }
        },

        async list() {
            const query = new URLSearchParams()
            if (this.search) query.append('search', this.search)
            if (this.country_id) query.append('country_id', String(this.country_id))
            if (this.city_id) query.append('city_id', String(this.city_id))
            if (this.category_id) query.append('procedure_id', this.category_id)
            if (this.treatment_id) query.append('treatment_id', this.treatment_id)
            const config = useRuntimeConfig()
            const api = `${config.public.baseUrl}/hospital-listing?${query.toString()}`;
            const { data, error } = await useFetch(api);

            if (error.value) {
                console.error('❌ API Error:', error.value)
                return
            }

            if (data.value) {
                this.hospitals = data.value.data ?? data.value
                this.totalHospitals = data.value.total_hospitals ?? 0
            }

        },

        // Load countries
        async loadCountries() {
            const { data, error } = await useFetch(
                'https://flyhospitals.dev/api/countries'
            )

            if (error.value) {
                console.error('❌ API Error:', error.value)
                return
            }

            if (data.value) {
                this.countries = data.value.data ?? data.value
            }
        },

        // Load cities by countries
        async loadCities(countryId: string | number) {
            if (!countryId) {
                this.cities = []
                return
            }

            const { data, error } = await useFetch(`https://flyhospitals.dev/api/countries/${countryId}/cities`)
            if (error.value) return console.error(error.value)
            this.cities = data.value.data ?? data.value
        },

        async loadprocedure() {
            const config = useRuntimeConfig()
            const api = `${config.public.baseUrl}/treatments`;
            const { data, error } = await useFetch(api)

            if (error.value) {
                console.error('❌ API Error:', error.value)
                return
            }

            if (data.value) {
                this.procedure = data.value.data ?? data.value
            }
        },

        async loadSubprocedure(procedureId: string | number) {
            if (!procedureId) {
                this.subprocedure = []
                return
            }
            const config = useRuntimeConfig()
            const api = `${config.public.baseUrl}/sub-treatments?parent_id=${procedureId}`;
            const { data, error } = await useFetch(api)
            if (error.value) return console.error(error.value)
            this.subprocedure = data.value.data ?? data.value
        },
    },
})
