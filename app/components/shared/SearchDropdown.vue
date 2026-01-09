<template>
    <div class="relative w-64">
        <!-- Search Input -->
        <input type="text" v-model="search" placeholder="Search..." @focus="isOpen = true" @blur="handleBlur"
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />

        <!-- Dropdown List -->
        <ul v-show="isOpen && filteredOptions.length"
            class="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow">
            <li v-for="option in filteredOptions" :key="option.id" @mousedown.prevent="selectOption(option)"
                class="px-3 py-2 hover:bg-blue-100 cursor-pointer">
                {{ option.name }}
            </li>
            <li v-if="!filteredOptions.length" class="px-3 py-2 text-gray-500">
                No results found.
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

interface Option {
    id: number | string
    name: string
}

const props = defineProps < {
    options: Option[]
  modelValue: number | string | null
} > ()

const emit = defineEmits < {
  (e: 'update:modelValue', value: number | string): void
}> ()

const search = ref('')
const isOpen = ref(false)

const filteredOptions = computed(() => {
    return props.options.filter(
        (option) =>
            option.name &&
            option.name.toLowerCase().includes(search.value.toLowerCase())
    )
})

const selectOption = (option: Option) => {
    emit('update:modelValue', option.id) // send ID
    search.value = option.name
    isOpen.value = false
}

const handleBlur = () => {
    setTimeout(() => {
        isOpen.value = false
    }, 100)
}
</script>

<style scoped>
ul::-webkit-scrollbar {
    width: 6px;
}

ul::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}
</style>
