<template>
  <div ref="selectorRef" class="country-selector-wrapper">
    <div class="country-selector-input" @click="toggleDropdown">
      <div v-if="selectedCountry" class="country-flag">
        <img v-if="selectedCountry.flagUrl" :src="selectedCountry.flagUrl" :alt="selectedCountry.name" class="flag-img">
        <span v-else>{{ selectedCountry.flag }}</span>
      </div>
      <div v-else class="country-flag">🌍</div>
      <span class="country-code">{{ selectedCountry?.dialCode || '+1' }}</span>
      <Icon name="mdi:chevron-down" class="chevron-icon" :class="{ 'is-open': showDropdown }"></Icon>
    </div>

    <!-- Dropdown List -->
    <div v-if="showDropdown" class="country-dropdown">
      <div class="dropdown-search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search country..."
          class="search-input"
          @click.stop
        >
        <Icon name="mdi:magnify" class="search-icon"></Icon>
      </div>

      <div class="country-list">
        <div
          v-for="country in filteredCountries"
          :key="country.code"
          class="country-item"
          @click="selectCountry(country)"
        >
          <div class="flag">
            <img v-if="country.flagUrl" :src="country.flagUrl" :alt="country.name" class="flag-img">
            <span v-else>{{ country.flag }}</span>
          </div>
          <span class="name">{{ country.name }}</span>
          <span class="dial-code">{{ country.dialCode }}</span>
        </div>

        <div v-if="filteredCountries.length === 0" class="no-results">
          No countries found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountries, type Country } from '~/composables/useCountries'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  modelValue?: string
  defaultCountryCode?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'country-changed', country: Country): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '+971',
  defaultCountryCode: 'AE',
})

const emit = defineEmits<Emits>()

const { countries, fetchCountries, getCountryByCode, getCountryByDialCode } =
  useCountries()

const selectorRef = ref<HTMLElement | null>(null)
const showDropdown = ref(false)
const searchQuery = ref('')
const selectedCountry = ref<Country | undefined>()

// Fetch countries on component mount
onMounted(async () => {
  await fetchCountries()
  initializeCountry()
})

// Initialize with default country or from passed value
const initializeCountry = () => {
  // Try to find by dial code first (modelValue)
  if (props.modelValue) {
    selectedCountry.value = getCountryByDialCode(props.modelValue)
  }

  // If not found, use default country code
  if (!selectedCountry.value && props.defaultCountryCode) {
    selectedCountry.value = getCountryByCode(props.defaultCountryCode)
  }

  // Fallback
  if (!selectedCountry.value && countries.value.length > 0) {
    selectedCountry.value = countries.value[0]
  }
}

const filteredCountries = computed(() => {
  return countries.value.filter(
    country =>
      country.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      country.dialCode.includes(searchQuery.value)
  )
})

const selectCountry = (country: Country) => {
  selectedCountry.value = country
  emit('update:modelValue', country.dialCode)
  emit('country-changed', country)
  showDropdown.value = false
  searchQuery.value = ''
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    searchQuery.value = ''
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (e: MouseEvent) => {
  if (selectorRef.value && !selectorRef.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  newVal => {
    if (newVal && newVal !== selectedCountry.value?.dialCode) {
      const country = getCountryByDialCode(newVal)
      if (country) {
        selectedCountry.value = country
      }
    }
  }
)
</script>

<style scoped>
.country-selector-wrapper {
  position: relative;
  display: flex;
}

.country-selector-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  min-width: 100px;
}

.country-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 18px;
  overflow: hidden;
  border-radius: 2px;
}

.flag-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-code {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #2d2d2d;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #565656;
  transition: transform 0.3s ease;
}

.chevron-icon.is-open {
  transform: rotate(180deg);
}

/* Dropdown Styles */
.country-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 300px;
  background: #fff;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-search {
  position: relative;
  padding: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  padding-left: 2rem;
  border: 1px solid #d0d5dd;
  border-radius: 6px;
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px;
  color: #2d2d2d;
}

.search-input:focus {
  outline: none;
  border-color: #053862;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #9ca3af;
  pointer-events: none;
}

.country-list {
  max-height: 250px;
  overflow-y: auto;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.country-item:hover {
  background-color: #f3f4f6;
}

.country-item .flag {
  width: 24px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 2px;
  flex-shrink: 0;
}

.country-item .name {
  flex: 1;
  font-family: 'Inter Tight', sans-serif;
  font-size: 13px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.country-item .dial-code {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #6b7280;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}

/* Scrollbar styling */
.country-list::-webkit-scrollbar {
  width: 4px;
}

.country-list::-webkit-scrollbar-track {
  background: transparent;
}

.country-list::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}

.country-list::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
