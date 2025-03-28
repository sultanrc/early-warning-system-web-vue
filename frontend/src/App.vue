<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Tentukan class dinamis berdasarkan route
const contentClass = computed(() =>
  route.name === 'about'
    ? 'lg:w-[720px] xl:w-[1000px] 2xl:w-[1200px] flex flex-col p-8 md:p-0 gap-6 md:max-h-[750px] overflow-y-auto'
    : 'lg:w-[720px] xl:w-[1000px] 2xl:w-[1200px] flex flex-col gap-6 md:max-h-[750px] md:overflow-y-auto',
)

const mainClass = computed(() =>
  route.name === 'about'
    ? 'relative flex flex-col mt-2 md:my-4 pt-8 pb-8 md:pb-2 px-8 gap-6 rounded-3xl outline outline-1 outline-secondary bg-white h-[760px] md:h-auto md:border-red-500'
    : 'relative flex flex-col mt-2 md:my-4 pt-8 pb-8 md:pb-2 px-8 gap-6 rounded-3xl outline outline-1 outline-secondary bg-white md:h-auto',
)
</script>

<template>
  <nav
    id="nav"
    class="relative flex justify-between md:justify-start md:flex-col w-full md:w-[200px] lg:w-[320px] md:p-4 lg:p-8"
  >
    <Nav />
  </nav>
  <main id="main-container" :class="mainClass">
    <header id="header" class="flex flex-col gap-4 md:gap-0">
      <Header />
    </header>
    <div id="content-container" :class="contentClass">
      <RouterView />
    </div>
    <footer
      class="absolute bottom-1 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] flex justify-center p-2 rounded-3xl bg-white"
    >
      <Footer />
    </footer>
  </main>
</template>

<style scoped></style>
