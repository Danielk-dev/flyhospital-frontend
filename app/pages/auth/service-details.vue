<template>
    <div class="main-content">
        <div class="registration-panel">
            <div class="row g-0">
                <!-- Left Column -->
                <div class="col-lg-5">
                    <div class="left-column">
                        <h1>Welcome to ClickHospitals Partnership Registration!</h1>
                        <p>Create an account to become our partner and list your clinic on ClickHospitals in 4 simple
                            steps.</p>
                        <img src="~/assets/img/map.png" alt="World map with location pins">
                    </div>
                </div>

                <!-- Right Column -->
                <div class="col-lg-7">
                    <div class="right-column">
                        <!-- Stepper -->
                        <ul class="stepper-nav d-flex justify-content-start gap-3">
                            <li class="step d-flex">
                                <NuxtLink to="/auth/signup" class="mr-2">1. Profile</NuxtLink>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.71634 11.6507L6.74551 9.67982C6.57745 9.51176 6.36356 9.42773 6.10384 9.42773C5.84412 9.42773 5.63023 9.51176 5.46218 9.67982C5.29412 9.84787 5.21009 10.0618 5.21009 10.3215C5.21009 10.5812 5.29412 10.7951 5.46218 10.9632L8.07468 13.5757C8.25801 13.759 8.4719 13.8507 8.71634 13.8507C8.96079 13.8507 9.17468 13.759 9.35801 13.5757L14.5372 8.39648C14.7052 8.22843 14.7893 8.01454 14.7893 7.75482C14.7893 7.4951 14.7052 7.28121 14.5372 7.11315C14.3691 6.9451 14.1552 6.86107 13.8955 6.86107C13.6358 6.86107 13.4219 6.9451 13.2538 7.11315L8.71634 11.6507ZM9.99968 19.1673C8.73162 19.1673 7.53995 18.9265 6.42468 18.445C5.3094 17.9634 4.33926 17.3105 3.51426 16.4861C2.68926 15.6617 2.03629 14.6915 1.55534 13.5757C1.0744 12.4598 0.83362 11.2681 0.833009 10.0007C0.832398 8.73321 1.07318 7.54154 1.55534 6.42565C2.03751 5.30976 2.69048 4.33962 3.51426 3.51523C4.33804 2.69085 5.30818 2.03787 6.42468 1.55632C7.54118 1.07476 8.73284 0.833984 9.99968 0.833984C11.2665 0.833984 12.4582 1.07476 13.5747 1.55632C14.6912 2.03787 15.6613 2.69085 16.4851 3.51523C17.3089 4.33962 17.9621 5.30976 18.4449 6.42565C18.9277 7.54154 19.1682 8.73321 19.1663 10.0007C19.1645 11.2681 18.9237 12.4598 18.444 13.5757C17.9643 14.6915 17.3113 15.6617 16.4851 16.4861C15.6589 17.3105 14.6887 17.9637 13.5747 18.4459C12.4606 18.9281 11.269 19.1685 9.99968 19.1673Z"
                                        fill="#053862" />
                                </svg>
                            </li>
                            <li class="step active">
                                <NuxtLink to="/auth/service-details">2. Service Details</NuxtLink>
                            </li>
                            <!-- <li class="step"><a href="#">3. Step form</a></li> -->
                            <!-- <li class="step"><a href="#">4. Step form</a></li> -->
                        </ul>

                        <!-- Registration Form -->
                        <form>
                            <div class="row g-4">
                                <div class="col-md-12">
                                    <label for="country" class="form-label">Category</label>
                                    <select v-model="selectedCategory" class="form-control" id="country">
                                        <option v-for="option in categoryOptions" :key="option.value"
                                            :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="selectedCategory === 'hospital'" class="col-md-6">
                                    <label for="country" class="form-label">Country</label>
                                    <select v-model="selectedCountry" class="form-control" id="country">
                                        <option v-for="option in countryOptions" :key="option.value"
                                            :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="selectedCategory === 'hospital'" class="col-md-6">
                                    <label for="city" class="form-label">City</label>
                                    <select v-model="selectedCity" class="form-control" id="city">
                                        <option v-for="option in cityOptions" :key="option.value" :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="selectedCategory === 'hotel' || selectedCategory === 'restaurant'"
                                    class="col-md-12">
                                    <label for="city" class="form-label">Nearby Hospital</label>
                                    <input type="text" v-model="nearbyHospital" placeholder="Enter nearby hospital"
                                        class="form-control" id="nearbyHospital">
                                </div>
                                <div class="col-12 mt-4">
                                    <NuxtLink to="#" type="submit" class="btn btn-primary btn-continue">
                                        Signup
                                    </NuxtLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useHospitalListStore } from '~/stores/hospitallist'

const store = useHospitalListStore()

definePageMeta({
    layout: 'auth'
})

const selectedCategory = ref('')
const selectedCountry = ref('')
const selectedCity = ref('')
const nearbyHospital = ref('')

const categoryOptions = computed(() => [
    { label: 'Select Category', value: '' },

    // 🔹 Static categories
    { label: 'Hospital', value: 'hospital' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Restaurant', value: 'restaurant' },
])

const countryOptions = computed(() => [
    { label: 'Select Country', value: '' },
    ...store.countries.map(c => ({ label: c.country_name || c.name, value: String(c.id) }))
])

const cityOptions = computed(() => [
    { label: 'Select City', value: '' },
    ...store.cities.map(city => ({ label: city.name, value: String(city.id) }))
])

onMounted(() => {
    store.loadCountries()
})

watch(selectedCountry, (newId) => {
    selectedCity.value = ''
    if (newId) {
        store.loadCities(newId)
    }
})
</script>