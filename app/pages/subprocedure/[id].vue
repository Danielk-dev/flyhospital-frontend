<template>
    <!-- Main Content -->
    <main class="container my-5">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
            { label: 'Home', link: '/' },
            { label: name, active: true }
        ]" />

          <!-- Hospital Listings -->
        <div class="listings-header mb-4">
            <h2>{{ name }}</h2>
            <p class="text-muted">The ClickHospitals is based on data science algorithms, providing a trusted, transparent, and objective comparison. It takes into account patient demand, review scores (both positive and negative), the frequency of updates to procedure options and prices, response speed, and clinic certifications.</p>
        </div>

        <!-- Filter Section -->
        <div class=" mb-5">
            <div class="row g-3 align-items-center">
                <div class="col-lg-4">
                    <div class="input-group">
                        <span class="input-group-text bg-white">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;">
                                <path
                                    d="M42 42L33.028 33.012M38 21C38 25.5087 36.2089 29.8327 33.0208 33.0208C29.8327 36.2089 25.5087 38 21 38C16.4913 38 12.1673 36.2089 8.97919 33.0208C5.79107 29.8327 4 25.5087 4 21C4 16.4913 5.79107 12.1673 8.97919 8.97919C12.1673 5.79107 16.4913 4 21 4C25.5087 4 29.8327 5.79107 33.0208 8.97919C36.2089 12.1673 38 16.4913 38 21Z"
                                    stroke="#053862" stroke-width="4" stroke-linecap="round" />
                            </svg>
                        </span>
                        <input type="text" class="form-control" 
                            placeholder="Enter procedure Name"
                             v-model="searchQuery"
                            >
                    </div>
                </div>

            </div>
        </div>

      
        <div class="hospital-list">
            <template v-if="filteredSubprocedures.length > 0">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                <!-- <HospitalListCard v-for="hospital in store.hospitals" :key="hospital.id" :hospital="hospital" /> -->
                <SubProcedureCard v-for="treatment in filteredSubprocedures" :treatment="treatment"></SubProcedureCard>
                </div>
            </template>
            <div v-else class="text-center text-muted py-5">
                No hospitals found.
            </div>
        </div>

        <!-- Load More Section -->
        <div class="text-center mt-5">
            <p class="text-muted">Total {{ subprocedures.length }} procedure</p>
            <button class="btn btn-primary mt-3 details-btn" style="max-width: 321px; width:100%">Load More</button>
        </div>

        <!--=============== BLOGS SECTION ===============-->
        <BlogList />

    </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SubProcedureCard from '~/components/procedure/SubProcedureCard.vue'
import { useGeneralStore } from '~/stores/general'

const store = useGeneralStore()
const config = useRuntimeConfig()
const route = useRoute()

const searchQuery = ref("")

// Get id from route
const treatmentId = route.params.id as string
const name = route.query.name

// ✅ SSR-friendly fetch: pass id to store
await useAsyncData(`subprocedures-${treatmentId}`, () => store.fetchSubProcedures(treatmentId))

// Get state from store
const subprocedures = computed(() => store.subprocedures)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

// ✅ Filtered results based on searchQuery
const filteredSubprocedures = computed(() => {
  if (!searchQuery.value) return subprocedures.value
  return subprocedures.value.filter(t =>
    t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

