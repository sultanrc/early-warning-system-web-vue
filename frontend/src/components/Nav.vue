<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const isMenuOpen = ref(false)

const isActive = (path) => computed(() => route.path === path)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="w-full flex justify-between items-center">
    <!-- Logo -->
    <span class="mt-2 md:mt-0 scale-50 lg:scale-100">
      <svg
        width="81"
        height="53"
        viewBox="0 0 71 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-0 md:mt-4"
      >
        <path
          d="M4.2 18C4.2 17.28 4.36 16.5333 4.68 15.76C5 14.96 5.42667 14.2267 5.96 13.56C6.49333 12.8667 7.06667 12.3467 7.68 12L19.8 5V9L7.68 16V24.8L19.8 17.8V21.8L7.68 28.8V37.6L19.8 30.6V34.6L7.68 41.6C6.74667 42.1333 5.93333 42.2 5.24 41.8C4.54667 41.4 4.2 40.6667 4.2 39.6V18ZM19.8 30.6L7.68 37.6L4.2 35.6L16.32 28.6L19.8 30.6ZM19.8 17.8L7.68 24.8L4.2 22.8L16.32 15.8L19.8 17.8ZM19.8 5L7.68 12C7.06667 12.3467 6.49333 12.8667 5.96 13.56C5.42667 14.2267 5 14.96 4.68 15.76C4.36 16.5333 4.2 17.28 4.2 18V39.6C4.2 40.6667 4.54667 41.4 5.24 41.8L1.76 39.8C1.06667 39.4 0.72 38.6667 0.72 37.6V16C0.72 15.28 0.88 14.5333 1.2 13.76C1.52 12.96 1.94667 12.2267 2.48 11.56C3.01333 10.8667 3.58667 10.3467 4.2 10L16.32 3L19.8 5ZM33.6591 41.2C32.7524 41.7333 31.9524 41.8 31.2591 41.4C30.5657 41 30.2191 40.2667 30.2191 39.2L35.3791 36.2V9L38.8591 7V34.2L44.0591 31.2V4L47.5391 2V25.2C47.5391 25.8933 47.3657 26.64 47.0191 27.44C46.6991 28.24 46.2724 28.9867 45.7391 29.68C45.2324 30.3467 44.6724 30.8533 44.0591 31.2C44.0591 31.8933 43.8991 32.64 43.5791 33.44C43.2591 34.24 42.8324 34.9867 42.2991 35.68C41.7657 36.3467 41.1924 36.8533 40.5791 37.2L33.6591 41.2ZM30.2191 39.2C29.2857 39.7333 28.4724 39.8 27.7791 39.4C27.0857 39 26.7391 38.2667 26.7391 37.2V14L30.2191 12V39.2ZM47.5391 2L44.0591 4L40.5791 2L44.0591 0L47.5391 2ZM44.0591 4V31.2L40.5791 29.2V2L44.0591 4ZM44.0591 31.2L38.8591 34.2L35.3791 32.2L40.5791 29.2L44.0591 31.2ZM35.3791 36.2L30.2191 39.2L26.7391 37.2L31.9391 34.2L35.3791 36.2ZM30.2191 39.2C30.2191 40.2667 30.5657 41 31.2591 41.4L27.7791 39.4C27.0857 39 26.7391 38.2667 26.7391 37.2L30.2191 39.2ZM38.8591 7L35.3791 9L31.9391 7L35.3791 5L38.8591 7ZM35.3791 9V36.2L31.9391 34.2V7L35.3791 9ZM30.2191 12L26.7391 14L23.2591 12L26.7391 10L30.2191 12ZM26.7391 14V37.2C26.7391 38.2667 27.0857 39 27.7791 39.4L24.2991 37.4C23.6057 37 23.2591 36.2667 23.2591 35.2V12L26.7391 14ZM57.9534 28C57.0201 28.5333 56.2068 28.6 55.5134 28.2C54.8201 27.8 54.4734 27.0667 54.4734 26V16.4C54.4734 15.68 54.6334 14.9333 54.9534 14.16C55.2734 13.36 55.7001 12.6267 56.2334 11.96C56.7668 11.2667 57.3401 10.7467 57.9534 10.4L66.5934 5.4C67.5001 4.86666 68.3001 4.8 68.9934 5.2C69.7134 5.6 70.0734 6.33333 70.0734 7.4V13L66.5934 15V9.4L57.9534 14.4V24L66.5934 19C67.5001 18.4667 68.3001 18.4 68.9934 18.8C69.7134 19.2 70.0734 19.9333 70.0734 21V30.6C70.0734 31.2933 69.9001 32.04 69.5534 32.84C69.2334 33.64 68.8068 34.3867 68.2734 35.08C67.7668 35.7467 67.2068 36.2533 66.5934 36.6L57.9534 41.6C57.0201 42.1333 56.2068 42.2 55.5134 41.8C54.8201 41.4 54.4734 40.6667 54.4734 39.6V35.6L57.9534 33.6V37.6L66.5934 32.6V23L57.9534 28ZM66.5934 23V32.6L63.1134 30.6V21L66.5934 23ZM66.5934 32.6L57.9534 37.6L54.4734 35.6L63.1134 30.6L66.5934 32.6ZM66.5934 9.4V15L63.1134 13V7.4L66.5934 9.4ZM57.9534 33.6L54.4734 35.6L50.9934 33.6L54.4734 31.6L57.9534 33.6ZM54.4734 35.6V39.6C54.4734 40.6667 54.8201 41.4 55.5134 41.8L52.0334 39.8C51.3401 39.4 50.9934 38.6667 50.9934 37.6V33.6L54.4734 35.6ZM69.0334 18.8C68.3134 18.4 67.5001 18.4667 66.5934 19L57.9534 24L54.4734 22L63.1134 17C64.0468 16.4667 64.8601 16.4 65.5534 16.8L69.0334 18.8ZM69.0334 5.2C68.3134 4.8 67.5001 4.86666 66.5934 5.4L57.9534 10.4C57.3401 10.7467 56.7668 11.2667 56.2334 11.96C55.7001 12.6267 55.2734 13.36 54.9534 14.16C54.6334 14.9333 54.4734 15.68 54.4734 16.4V26C54.4734 27.0667 54.8201 27.8 55.5134 28.2L52.0334 26.2C51.3401 25.8 50.9934 25.0667 50.9934 24V14.4C50.9934 13.68 51.1534 12.9333 51.4734 12.16C51.7934 11.36 52.2201 10.6267 52.7534 9.96C53.2868 9.26667 53.8601 8.74667 54.4734 8.4L63.1134 3.4C64.0468 2.86666 64.8601 2.8 65.5534 3.2L69.0334 5.2Z"
          fill="#C7000D"
        />
      </svg>
    </span>

    <button
      @click="toggleMenu"
      class="md:hidden relative w-14 h-14 mr-2 flex items-center justify-center"
      :class="isMenuOpen ? 'bg-white border border-1 border-secondary' : '0'"
    >
      <span
        class="absolute w-12 h-1 bg-temp transition-transform duration-300"
        :class="isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'"
      ></span>
      <span
        class="absolute w-12 h-1 bg-temp transition-opacity duration-300"
        :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
      ></span>
      <span
        class="absolute w-12 h-1 bg-temp transition-transform duration-300"
        :class="isMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-2'"
      ></span>
    </button>
  </div>

  <!-- Navigation menu - always visible on desktop, toggle on mobile -->
  <ul
    class="flex flex-col gap-2 md:pt-16 lg:pt-12"
    :class="{
      'hidden md:flex': !isMenuOpen,
      'flex p-4 mt-4 absolute bg-white border border-1 border-secondary z-10 right-20 gap-4':
        isMenuOpen,
    }"
  >
    <li
      :class="[
        isActive('/').value ? 'bg-white text-temp rounded-md ' : 'text-neutral-400',
        !isMenuOpen ? 'px-2 py-1' : 'text-xl',
      ]"
      class="flex items-center gap-4"
    >
      <span class="w-5 h-5 mb-[2px] scale-75 lg:scale-100" :class="isMenuOpen ? 'hidden' : 'flex'">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          :fill="isActive('/').value ? '#c7000d' : '#a3a3a3'"
        >
          <path
            d="M2.5 10.8333H9.16667V2.5H2.5V10.8333ZM2.5 17.5H9.16667V12.5H2.5V17.5ZM10.8333 17.5H17.5V9.16667H10.8333V17.5ZM10.8333 2.5V7.5H17.5V2.5H10.8333Z"
          />
        </svg>
      </span>
      <router-link to="/" class="font-semibold"> Dashboard </router-link>
    </li>

    <li
      :class="[
        isActive('/tableview').value ? 'bg-white text-temp rounded-md' : 'text-neutral-400',
        !isMenuOpen ? 'px-2 py-1' : 'text-xl',
      ]"
      class="flex items-center gap-4"
    >
      <span class="w-5 h-5 scale-75 lg:scale-100" :class="isMenuOpen ? 'hidden' : 'flex'">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          class="ms-[2px]"
          :fill="isActive('/tableview').value ? '#c7000d' : '#a3a3a3'"
        >
          <path
            d="M0 18V0H18V18H0ZM2 6H16V2H2V6ZM7.325 11H10.675V8H7.325V11ZM7.325 16H10.675V13H7.325V16ZM2 11H5.325V8H2V11ZM12.675 11H16V8H12.675V11ZM2 16H5.325V13H2V16ZM12.675 16H16V13H12.675V16Z"
          />
        </svg>
      </span>
      <router-link to="/tableview" class="font-semibold"> Table View </router-link>
    </li>

    <li
      :class="[
        isActive('/about').value ? 'bg-white text-temp rounded-md' : 'text-neutral-400',
        !isMenuOpen ? 'px-2 py-1' : 'text-xl',
      ]"
      class="flex items-center gap-4"
    >
      <span class="w-5 h-5 scale-75 lg:scale-100" :class="isMenuOpen ? 'hidden' : 'flex'">
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          :fill="isActive('/about').value ? '#c7000d' : '#a3a3a3'"
        >
          <path
            d="M8.16669 4.83329H9.83335V6.49996H8.16669V4.83329ZM8.16669 8.16663H9.83335V13.1666H8.16669V8.16663ZM9.00002 0.666626C4.40002 0.666626 0.666687 4.39996 0.666687 8.99996C0.666687 13.6 4.40002 17.3333 9.00002 17.3333C13.6 17.3333 17.3334 13.6 17.3334 8.99996C17.3334 4.39996 13.6 0.666626 9.00002 0.666626ZM9.00002 15.6666C5.32502 15.6666 2.33335 12.675 2.33335 8.99996C2.33335 5.32496 5.32502 2.33329 9.00002 2.33329C12.675 2.33329 15.6667 5.32496 15.6667 8.99996C15.6667 12.675 12.675 15.6666 9.00002 15.6666Z"
          />
        </svg>
      </span>
      <router-link to="/about" class="font-semibold"> About </router-link>
    </li>
  </ul>
  <div
    class="absolute hidden md:flex flex-col bottom-10 text-[10px] text-neutral-400 mr-4 text-justify"
  >
    <span class="font-bold text-temp opacity-55"> Disclaimer: </span>
    <span>
      All data displayed on this website is fictitious and used solely for demonstration purposes.
      No real company data is shown to ensure confidentiality and security.
    </span>
    <span class="mt-4">
      Crafted with passion in Figma and brought to life in Visual Studio Code. Powered by Vue.js and
      styled with Tailwind CSS, running seamlessly on an Express.js backend. Every detail, from
      layout to typography, is thoughtfully designed for a smooth experience.
    </span>
  </div>
</template>

<style scoped>
.active-fill {
  fill: #c7000d;
}
.inactive-fill {
  fill: #f3f3f3;
}
</style>
