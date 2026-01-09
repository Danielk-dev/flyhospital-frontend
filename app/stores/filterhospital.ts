import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define interfaces based on the API response
interface Media {
  id: number;
  model_type: string;
  model_id: string;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: string;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: string;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

interface Treatment {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  image_url: string;
  pivot?: {
    hospital_id: string;
    treatment_id: string;
    price: string;
    created_at: string;
    updated_at: string;
  };
  children?: Treatment[];
  media?: Media[];
}

interface Nearby {
  id: number;
  hospital_id: string;
  type: string;
  child_id: string;
  created_at: string;
  updated_at: string;
}

interface Staff {
  id: number;
  hospital_id: string;
  name: string;
  description: string;
  experience: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  media: Media[];
}

interface Review {
  id: number;
  user_id: string;
  content: string;
  rating: string;
  model_id: string;
  model_type: string;
  created_at: string;
  updated_at: string;
}

interface Facility {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: {
    hospital_id: string;
    facility_id: string;
  };
}

interface Hospital {
  id: number;
  user_id: string;
  country_id: string;
  city_id: string;
  title: string;
  email: string | null;
  phone: string;
  category_id: string;
  subject: string | null;
  message: string | null;
  address: string;
  latitude: string | null;
  longitude: string | null;
  url: string | null;
  description: string | null;
  start_date: string | null;
  created_at: string;
  updated_at: string;
  image_urls: string[];
  average_rating: string;
  total_reviews: number;
  treatments: Treatment[];
  nearbies: Nearby[];
  staff: Staff[];
  reviews: Review[];
  facilities: Facility[];
  media: Media[];
}

export const useFilterHospitalStore = defineStore('filterHospital', () => {
  // State
  const hospitals = ref<Hospital[]>([]);
  const totalHospitals = ref<number>(0);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Actions
  async function fetchHospitals(countryslug: string, slug: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const config = useRuntimeConfig()
      const api = `${config.public.baseUrl}/filter-hospitals?countryslug=${countryslug}&slug=${slug}`
      const response = await fetch(api);
      const data = await response.json();

      console.log('my data: ', data);

      if (data.success) {
        hospitals.value = data.data;
        totalHospitals.value = data.total_hospitals;
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isLoading.value = false;
    }
  }

  // Reset state
  function reset() {
    hospitals.value = [];
    totalHospitals.value = 0;
    error.value = null;
  }

  return {
    hospitals,
    totalHospitals,
    isLoading,
    error,
    fetchHospitals,
    reset,
  };
});