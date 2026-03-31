import { ref, readonly } from 'vue'

export interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
  flagUrl?: string
}

export const useCountries = () => {
  const countries = ref<Country[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCountries = async () => {
    // Using REST Countries API to get flags and dial codes
    if (countries.value.length > 0) return // Cache the data

    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags,flag')
      const data = await response.json()

      // Map countries data
      countries.value = data
        .map((country: any) => ({
          name: country.name.common || country.name,
          code: country.cca2,
          dialCode: country.idd?.root
            ? country.idd.root + (country.idd.suffixes?.[0] || '')
            : '',
          flag: country.flag || '🏳️',
          flagUrl: country.flags?.svg || country.flags?.png,
        }))
        .filter((c: Country) => c.dialCode && c.code && c.dialCode.length <= 5)
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
    } catch (err) {
      error.value = 'Failed to fetch countries'
      console.error('Error fetching countries:', err)
      // Fallback: Load a basic list
      loadFallbackCountries()
    } finally {
      loading.value = false
    }
  }

  const loadFallbackCountries = () => {
    // Popular countries fallback
    countries.value = [
      { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', flagUrl: 'https://flagcdn.com/ae.svg' },
      { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', flagUrl: 'https://flagcdn.com/sa.svg' },
      { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', flagUrl: 'https://flagcdn.com/us.svg' },
      { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', flagUrl: 'https://flagcdn.com/gb.svg' },
      { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', flagUrl: 'https://flagcdn.com/ca.svg' },
      { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', flagUrl: 'https://flagcdn.com/au.svg' },
      { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', flagUrl: 'https://flagcdn.com/de.svg' },
      { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', flagUrl: 'https://flagcdn.com/fr.svg' },
      { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', flagUrl: 'https://flagcdn.com/in.svg' },
      { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: '🇵🇰', flagUrl: 'https://flagcdn.com/pk.svg' },
      { name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷', flagUrl: 'https://flagcdn.com/tr.svg' },
      { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬', flagUrl: 'https://flagcdn.com/eg.svg' },
      { name: 'Oman', code: 'OM', dialCode: '+968', flag: '🇴🇲', flagUrl: 'https://flagcdn.com/om.svg' },
      { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', flagUrl: 'https://flagcdn.com/qa.svg' },
      { name: 'Kuwait', code: 'KW', dialCode: '+965', flag: '🇰🇼', flagUrl: 'https://flagcdn.com/kw.svg' },
    ]
  }

  const getCountryByCode = (code: string): Country | undefined => {
    return countries.value.find(c => c.code === code)
  }

  const getCountryByDialCode = (dialCode: string): Country | undefined => {
    return countries.value.find(c => c.dialCode === dialCode)
  }

  return {
    countries: readonly(countries),
    loading: readonly(loading),
    error: readonly(error),
    fetchCountries,
    getCountryByCode,
    getCountryByDialCode,
  }
}
