<template>
    <main class="contact-wrapper">
        <div class="container">
            <div class="row g-5 align-items-start">
                <!-- Left Column -->
                <div class="col-lg-5 ">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="contact-card">
                                <Icon name="mdi:envelope-outline"></Icon>
                                <div>
                                    <h6>Email</h6>
                                    <a href="mailto:contact@flyhospitals.com">
                                        contact@ClickHospitals.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="contact-card">
                                <Icon name="mdi:telephone"></Icon>
                                <div>
                                    <h6>Call us</h6>
                                    <a href="tel:+17344475890">
                                        +1(734)-447-5890
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <img src="~/assets/img/contact.png" alt="Patients at reception" class="contact-image mt-3">
                </div>
                <!-- Right Column -->
                <div class="col-lg-7">
                    <div class="contact-form-section">
                        <h1>We're here to help you find your treatment worldwide</h1>
                        <p>Have a question? We look forward to hearing from you. Or are you a medical provider looking
                            to list with us? Just click the Add Your Clinic button in the top-right corner, to create
                            your profile today.</p>
                        <form @submit.prevent="handleSubmit">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">Name</label>
                                    <input v-model="form.name" type="text" class="form-control" id="name"
                                        placeholder="Alex White">
                                </div>

                                <div class="col-md-6">
                                    <label for="email" class="form-label">Email</label>
                                    <input v-model="form.email" type="email" class="form-control" id="email"
                                        placeholder="example@gmail.com">
                                </div>

                                <div class="col-md-6">
                                    <label for="phone" class="form-label">Phone</label>
                                    <div class="phone-input-wrapper-new">
                                        <CountrySelector
                                            v-model="form.phoneDialCode"
                                            default-country-code="AE"
                                            @country-changed="onCountryChanged"
                                        />
                                        <input
                                            v-model="form.phone"
                                            type="text"
                                            class="form-control phone-input-field"
                                            id="phone"
                                            placeholder="Phone number"
                                            inputmode="numeric"
                                            pattern="[0-9]*"
                                            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                            maxlength="15"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="category" class="form-label">Category</label>
                                    <select v-model="form.contact_category_id" class="form-select" id="category"
                                        name="category">
                                        <option disabled value="">Select a category</option>
                                        <option v-for="cat in contactStore.categories" :key="cat.id" :value="cat.id">
                                            {{ cat.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-12">
                                    <label for="subject" class="form-label">Subject</label>
                                    <input v-model="form.subject" type="text" class="form-control" id="subject"
                                        placeholder="Type subject here">
                                </div>

                                <div class="col-12">
                                    <label for="message" class="form-label">Message</label>
                                    <textarea v-model="form.message" class="form-control" id="message"
                                        placeholder="Type your message here..."></textarea>
                                </div>

                                <div class="col-12 mt-5">
                                    <button type="submit" class="btn btn-primary submit-btn">Submit</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useContactStore } from '~/stores/contact'

const contactStore = useContactStore()

// ✅ Load categories on SSR + CSR
await contactStore.fetchCategories()

// ✅ Reactive form data (must match API payload exactly)
const form = reactive({
    name: '',
    email: '',
    phone: '',
    phoneDialCode: '+971', // Country dial code
    subject: '',
    message: '',
    contact_category_id: '' // will hold category ID from API
})

// ✅ Handle country change
const onCountryChanged = (country: any) => {
    form.phoneDialCode = country.dialCode
    console.log('Country changed to:', country.name, country.dialCode)
}

// ✅ Submit handler
const handleSubmit = async () => {
    // Combine dial code and phone for the API
    const submissionData = {
        ...form,
        phone: `${form.phoneDialCode}${form.phone}`
    }
    
    const res = await contactStore.submitContact(submissionData)

    if (contactStore.success) {
        alert('Message sent successfully ✅')

        // Reset form after success
        form.name = ''
        form.email = ''
        form.phone = ''
        form.phoneDialCode = '+971'
        form.subject = ''
        form.message = ''
        form.contact_category_id = ''
    } else {
        alert('Error: ' + contactStore.error)
    }
}
</script>
