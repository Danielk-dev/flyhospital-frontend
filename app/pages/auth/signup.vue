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
                        <ul class="stepper-nav d-flex justify-content-start gap-5">
                            <li class="step active">
                                <NuxtLink to="/auth/signup">1. Profile</NuxtLink>
                            </li>
                            <li class="step">
                                <NuxtLink to="/auth/service-details">2. Service Details</NuxtLink>
                            </li>
                            <!-- <li class="step"><a href="#">3. Step form</a></li> -->
                            <!-- <li class="step"><a href="#">4. Step form</a></li> -->
                        </ul>

                        <!-- Registration Form -->
                        <form>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">Name</label><input type="text"
                                        class="form-control" id="name" value="Alex White">
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label">Email</label><input type="email"
                                        class="form-control" id="email" value="example@gmail.com">
                                </div>
                                <div class="col-md-6">
                                    <label for="country" class="form-label">Country</label>
                                    <select v-model="selectedCountry" class="form-control" id="country">
                                        <option v-for="option in countryOptions" :key="option.value"
                                            :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="city" class="form-label">City</label>
                                    <select v-model="selectedCity" class="form-control" id="city">
                                        <option v-for="option in cityOptions" :key="option.value" :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label for="phone" class="form-label">Phone</label>
                                    <div class="input-group phone-input-group">
                                        <button class="btn dropdown-toggle" type="button">🇨🇦</button>
                                        <input type="tel" class="form-control" id="phone">
                                    </div>
                                </div>
                                <div class="col-12"><label for="subject" class="form-label">Subject</label><input
                                        type="text" class="form-control" id="subject" placeholder="Type subject here">
                                </div>
                                <div class="col-12"><label for="message" class="form-label">Message</label><textarea
                                        class="form-control" id="message"
                                        placeholder="Type your message here..."></textarea></div>
                                <div class="col-12 mt-4">
                                    <NuxtLink to="/auth/otp" type="submit" class="btn btn-primary btn-continue">
                                        Continue
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

const selectedCountry = ref('')
const selectedCity = ref('')

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