<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="(item, index) in items" :key="index" class="breadcrumb-item" :class="{ active: item.active }">
                <template v-if="!item.active">
                    <NuxtLink :to="item.link">
                        {{ item.label }}
                    </NuxtLink>
                    <span style="font-size: 21px !important; color: rgba(0, 61, 111, 0.6);">
                        <Icon name="material-symbols:chevron-right"  class="text-[#6c8da8]" ></Icon>
                    </span>
                </template>
                <template v-else>
                    {{ item.label }}
                </template>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
defineProps<{
    items: { label: string; link?: string; active?: boolean }[]
}>()
</script>
