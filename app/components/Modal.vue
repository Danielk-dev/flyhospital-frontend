<!-- components/Modal.vue -->
<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-black" @click="close">
                ✖
            </button>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

watch(
    () => props.modelValue,
    (val) => (isOpen.value = val)
);

function close() {
    emit("update:modelValue", false);
}
</script>
