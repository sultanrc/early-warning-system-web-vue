<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageData = {
  dashboard: {
    heading: 'Dashboard',
    description: 'Overview of current temperature, humidity, and fire anomaly status.',
  },
  table: {
    heading: 'Table View',
    description: 'View detailed data logs in a structured table format.',
  },
  about: {
    heading: 'About',
    description: 'Information about this system and its development.',
  },
}

const heading = computed(() => pageData[route.name]?.heading || 'Dashboard')
const description = computed(() => pageData[route.name]?.description || '')
</script>

<template>
  <div class="flex items-start justify-between pt-4 md:pt-0">
    <div class="flex flex-col gap-3">
      <h1 id="heading" class="text-3xl md:text-4xl font-bold">{{ heading }}</h1>
      <span id="description" class="hidden md:flex text-xs text-neutral-400">{{
        description
      }}</span>
    </div>
    <div class="flex gap-4">
      <img src="/images/petrochina.png" alt="" class="w-10 h-10" />
      <img src="/images/skkmigas.png" alt="" class="w-14 h-10" />
    </div>
  </div>
  <hr class="md:hidden" />
  <span id="description" class="flex md:hidden mx-auto text-sm text-neutral-400 pb-4">{{
    description
  }}</span>
</template>

<style scoped></style>
