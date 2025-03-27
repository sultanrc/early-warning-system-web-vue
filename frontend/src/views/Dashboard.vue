<script setup>
import { ref, onMounted, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
Chart.register(...registerables)

// State untuk data sensor
const sensorData = ref([])

// Fetch data dari lokal JSON
const fetchData = async () => {
  try {
    const response = await fetch('/data.json') // Ambil dari public/data.json
    if (!response.ok) throw new Error('Failed to fetch data')

    const jsonData = await response.json() // Parse JSON
    sensorData.value = jsonData.slice(-10) // Ambil 10 data terakhir

    console.log('Processed Sensor Data:', sensorData.value)
  } catch (error) {
    console.error('Error loading sensor data:', error)
  }
}

// Konfigurasi Chart Temperature
const temperatureChartData = computed(() => ({
  labels: sensorData.value.map((item) => `${item.time}`),
  datasets: [
    {
      label: 'Temperature (°C)',
      data: sensorData.value.map((item) => item.temp),
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      pointStyle: 'circle',
      pointBorderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
    },
  ],
}))

const temperatureChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 20,
      suggestedMax: 40,
      title: {
        display: true,
        text: 'Temp (°C)',
      },
    },
  },
}

// Konfigurasi Chart Humidity
const humidityChartData = computed(() => ({
  labels: sensorData.value.map((item) => `${item.time}`),
  datasets: [
    {
      label: 'Humidity (%)',
      data: sensorData.value.map((item) => item.hum),
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      pointStyle: 'circle',
      pointBorderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
    },
  ],
}))

const humidityChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 40,
      suggestedMax: 80,
      title: {
        display: true,
        text: 'Hum (%)',
      },
    },
  },
}

// Latest Data Computation
const latestData = computed(() => {
  if (sensorData.value.length > 0) {
    const lastData = sensorData.value[sensorData.value.length - 1]
    return {
      temperature: lastData.temp,
      humidity: lastData.hum,
      date: lastData.date,
      time: lastData.time,
      fire: lastData.fa,
    }
  }
  return null
})

const calculateTempOffset = computed(() => {
  if (latestData.value) {
    const temp = latestData.value.temperature

    // Total keliling lingkaran (misal 100)
    const totalCircle = 100

    // Perhitungan offset
    const offset = totalCircle - (temp / 30) * totalCircle

    // Pastikan offset tidak kurang dari 0 atau lebih dari 100
    return Math.max(0, Math.min(offset, 100))
  }
  return 100 // Default jika tidak ada data
})

const calculateHumOffset = computed(() => {
  if (latestData.value) {
    const hum = latestData.value.humidity

    // Total keliling lingkaran (misal 100)
    const totalCircle = 100

    // Perhitungan offset
    const offset = totalCircle - (hum / 80) * totalCircle

    // Pastikan offset tidak kurang dari 0 atau lebih dari 100
    return Math.max(0, Math.min(offset, 100))
  }
  return 100 // Default jika tidak ada data
})

// Panggil fetchData saat komponen dimuat
onMounted(() => {
  fetchData()
})
</script>

<template>
  <section id="current" class="flex gap-4">
    <div
      class="relative w-1/2 md:w-1/3 px-10 flex flex-col py-4 md:py-0 gap-2 md:gap-6 items-center justify-center rounded-3xl bg-primary"
    >
      <h2 class="font-medium">Current Temperature</h2>
      <svg
        width="40"
        height="44"
        viewBox="0 0 46 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute scale-75 xl:scale-100 left-6 md:left-16 lg:left-12 xl:left-20 top-14"
      >
        <path
          d="M13 34.9995C11.6193 34.9995 10.5 36.1187 10.5 37.4995C10.5 38.8802 11.6193 39.9995 13 39.9995C14.3807 39.9995 15.5 38.8802 15.5 37.4995C15.5 36.1187 14.3807 34.9995 13 34.9995ZM13 34.9995L13.0177 25M13 37.4995L13.0177 37.5173M43 7.5C43 10.2614 40.7615 12.5 38 12.5C35.2385 12.5 33 10.2614 33 7.5C33 4.73857 35.2385 2.5 38 2.5C40.7615 2.5 43 4.73857 43 7.5ZM23 37.4995C23 43.0225 18.5228 47.4995 13 47.4995C7.47715 47.4995 3 43.0225 3 37.4995C3 34.9635 3.9441 32.6478 5.5 30.885V10C5.5 5.85788 8.85788 2.5 13 2.5C17.1421 2.5 20.5 5.85788 20.5 10V30.885C22.056 32.6478 23 34.9635 23 37.4995Z"
          stroke="#B50713"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div class="relative w-32 h-32">
        <svg class="w-full h-full scale-75 lg:scale-100" viewBox="0 0 36 36">
          <circle
            class="text-gray-300 stroke-current"
            stroke-width="4"
            cx="18"
            cy="18"
            r="16"
            fill="none"
          />
          <circle
            class="text-temp stroke-current"
            stroke-width="4"
            stroke-dasharray="100"
            :stroke-dashoffset="calculateTempOffset"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            transform="rotate(90 18 18)"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-xl font-bold" v-if="latestData">{{ latestData.temperature }} °C</span>
          <span v-else>Loading...</span>
        </div>
      </div>
      <span class="text-center text-xs text-neutral-400"
        >Ensure that the server room temperature remains below 30°C at all times.</span
      >
    </div>
    <div
      class="relative w-1/2 md:w-1/3 px-10 flex flex-col gap-2 md:gap-6 items-center justify-center rounded-3xl bg-primary"
    >
      <h2 class="font-medium">Current Humidity</h2>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute scale-75 xl:scale-100 left-6 md:left-16 lg:left-12 xl:left-20 top-14"
      >
        <path
          d="M18 36C22.6422 36 25.2 33.57 25.2 29.1601C25.2 23.3228 19.3734 18.5925 19.125 18.3945C18.8057 18.1389 18.409 17.9997 18 17.9997C17.591 17.9997 17.1943 18.1389 16.875 18.3945C16.6266 18.5925 10.8 23.3228 10.8 29.1601C10.8 33.57 13.3578 36 18 36ZM18 22.2501C19.9974 24.0413 21.2766 26.4968 21.6 29.1601C21.6 31.1617 20.997 32.4001 18 32.4001C15.003 32.4001 14.4 31.1617 14.4 29.1601C14.7234 26.4968 16.0026 24.0413 18 22.2501ZM8.325 0.394868C8.00575 0.139267 7.60897 0 7.2 0C6.79103 0 6.39425 0.139267 6.075 0.394868C5.8266 0.592865 0 5.32317 0 11.1605C0 15.5704 2.5578 18.0003 7.2 18.0003C11.8422 18.0003 14.4 15.5704 14.4 11.1605C14.4 5.32317 8.5734 0.592865 8.325 0.394868ZM7.2 14.4004C4.203 14.4004 3.6 13.162 3.6 11.1605C3.9234 8.49711 5.20263 6.04169 7.2 4.2504C9.19737 6.04169 10.4766 8.49711 10.8 11.1605C10.8 13.162 10.197 14.4004 7.2 14.4004ZM29.925 0.394868C29.6057 0.139267 29.209 0 28.8 0C28.391 0 27.9943 0.139267 27.675 0.394868C27.4266 0.592865 21.6 5.32317 21.6 11.1605C21.6 15.5704 24.1578 18.0003 28.8 18.0003C33.4422 18.0003 36 15.5704 36 11.1605C36 5.32317 30.1734 0.592865 29.925 0.394868ZM28.8 14.4004C25.803 14.4004 25.2 13.162 25.2 11.1605C25.5234 8.49711 26.8026 6.04169 28.8 4.2504C30.7974 6.04169 32.0766 8.49711 32.4 11.1605C32.4 13.162 31.797 14.4004 28.8 14.4004Z"
          fill="#3176AB"
        />
      </svg>
      <div class="relative w-32 h-32">
        <!-- Lingkaran Background -->
        <svg class="w-full h-full scale-75 lg:scale-100" viewBox="0 0 36 36">
          <circle
            class="text-gray-300 stroke-current"
            stroke-width="4"
            cx="18"
            cy="18"
            r="16"
            fill="none"
          />
          <!-- Lingkaran Progress -->
          <circle
            class="text-hum stroke-current"
            stroke-width="4"
            stroke-dasharray="100"
            :stroke-dashoffset="calculateHumOffset"
            cx="18"
            cy="18"
            r="16"
            fill="none"
            transform="rotate(90 18 18)"
          />
        </svg>
        <!-- Text Suhu -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-xl font-bold" v-if="latestData">{{ latestData.humidity }} %</span>
          <span v-else>Loading...</span>
        </div>
      </div>
      <span class="text-center text-xs text-neutral-400"
        >Ensure that the server room humidity remains below 80% at all times.</span
      >
    </div>
    <div
      class="hidden relative w-1/3 md:flex flex-col gap-4 p-4 items-center justify-center rounded-3xl bg-primary"
    >
      <svg
        width="30"
        height="37"
        viewBox="0 0 30 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute scale-75 xl:scale-100 md:left-16 lg:left-10 xl:left-[70px] top-14"
      >
        <path
          d="M16.922 35.969C22.2621 34.8203 29.1667 30.6977 29.1667 20.0372C29.1667 10.3359 22.5498 3.87586 17.7917 0.907548C16.736 0.248868 15.5 1.1151 15.5 2.42568V5.77789C15.5 8.4213 14.4644 13.2464 11.5868 15.2533C10.1176 16.2779 8.53089 14.7444 8.35233 12.8738L8.20571 11.3377C8.03527 9.55204 6.34062 8.46803 5.01077 9.55676C2.62168 11.5126 0.125 14.9376 0.125 20.0372C0.125 33.0742 9.16019 36.3335 13.6777 36.3335C13.9405 36.3335 14.2167 36.3251 14.5042 36.3073C12.2735 36.1027 8.66667 34.6173 8.66667 29.8144C8.66667 26.0573 11.2207 23.5156 13.1613 22.2801C13.6832 21.9477 14.2941 22.3793 14.2941 23.0305V24.1107C14.2941 24.9373 14.592 26.2296 15.3011 27.1142C16.1037 28.1152 17.2816 27.0666 17.3766 25.75C17.4067 25.3348 17.7958 25.0701 18.131 25.2803C19.2266 25.9675 20.625 27.4352 20.625 29.8144C20.625 33.569 18.6963 35.2962 16.922 35.969Z"
          fill="url(#paint0_linear_71_885)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_71_885"
            x1="14.6458"
            y1="0.681793"
            x2="14.6458"
            y2="36.3335"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.37" stop-color="#FF7B00" />
            <stop offset="1" stop-color="#95CC14" />
          </linearGradient>
        </defs>
      </svg>
      <h2 class="font-medium">Fire Anomaly Status</h2>
      <div
        class="flex w-32 h-32 items-center justify-center rounded-full text-white scale-75 lg:scale-100"
        :class="latestData && (latestData.fire ? 'bg-danger text-2xl' : 'bg-safe text-4xl ')"
      >
        <span class="font-bold" v-if="latestData">
          {{ latestData.fire ? 'DANGER' : 'SAFE' }}
        </span>
        <span v-else>Loading...</span>
      </div>
      <span class="text-center text-xs text-neutral-400"
        >This system detects fire using a sensor and displays the fire status in real-time. If fire
        is detected, a visual alert will be triggered.</span
      >
    </div>
  </section>

  <section id="current" class="flex md:hidden">
    <div
      class="relative w-full flex flex-col gap-1 p-4 items-center justify-center rounded-3xl bg-primary"
    >
      <svg
        width="30"
        height="37"
        viewBox="0 0 30 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute scale-75 xl:scale-100 md:left-16 lg:left-10 xl:left-[70px] top-14"
      >
        <path
          d="M16.922 35.969C22.2621 34.8203 29.1667 30.6977 29.1667 20.0372C29.1667 10.3359 22.5498 3.87586 17.7917 0.907548C16.736 0.248868 15.5 1.1151 15.5 2.42568V5.77789C15.5 8.4213 14.4644 13.2464 11.5868 15.2533C10.1176 16.2779 8.53089 14.7444 8.35233 12.8738L8.20571 11.3377C8.03527 9.55204 6.34062 8.46803 5.01077 9.55676C2.62168 11.5126 0.125 14.9376 0.125 20.0372C0.125 33.0742 9.16019 36.3335 13.6777 36.3335C13.9405 36.3335 14.2167 36.3251 14.5042 36.3073C12.2735 36.1027 8.66667 34.6173 8.66667 29.8144C8.66667 26.0573 11.2207 23.5156 13.1613 22.2801C13.6832 21.9477 14.2941 22.3793 14.2941 23.0305V24.1107C14.2941 24.9373 14.592 26.2296 15.3011 27.1142C16.1037 28.1152 17.2816 27.0666 17.3766 25.75C17.4067 25.3348 17.7958 25.0701 18.131 25.2803C19.2266 25.9675 20.625 27.4352 20.625 29.8144C20.625 33.569 18.6963 35.2962 16.922 35.969Z"
          fill="url(#paint0_linear_71_885)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_71_885"
            x1="14.6458"
            y1="0.681793"
            x2="14.6458"
            y2="36.3335"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.37" stop-color="#FF7B00" />
            <stop offset="1" stop-color="#95CC14" />
          </linearGradient>
        </defs>
      </svg>
      <h2 class="font-medium">Fire Anomaly Status</h2>
      <div
        class="flex w-32 h-32 items-center justify-center rounded-full text-white animated-gradient scale-75 lg:scale-100"
      >
        <span class="text-4xl font-bold">SAFE</span>
      </div>
      <span class="hidden md:flextext-center text-xs text-neutral-400"
        >This system detects fire using a sensor and displays the fire status in real-time. If fire
        is detected, a visual alert will be triggered.</span
      >
      <span class="flex md:hidden text-center text-xs text-neutral-400"
        >This system displays the fire status in real-time.</span
      >
    </div>
  </section>
  <section id="chart" class="flex flex-col md:flex-row justify-between gap-6">
    <div
      class="md:w-1/2 flex flex-col h-[150px] 2xl:h-[360px] md:h-[300px] p-4 items-center justify-between bg-primary rounded-3xl"
    >
      <h2 class="font-medium">Temperature Chart</h2>
      <Line
        v-if="sensorData.length > 0"
        :data="temperatureChartData"
        :options="temperatureChartOptions"
        class="w-full h-full scale-90"
      />
      <span v-else>Loading...</span>
    </div>
    <div
      class="md:w-1/2 flex flex-col h-[150px] 2xl:h-[360px] md:h-[300px] p-4 items-center justify-between bg-primary rounded-3xl"
    >
      <h2 class="font-medium">Humidity Chart</h2>
      <Line
        v-if="sensorData.length > 0"
        :data="humidityChartData"
        :options="humidityChartOptions"
        class="w-full h-full scale-90"
      />
      <span v-else>Loading...</span>
    </div>
  </section>
</template>

<style scoped>
@keyframes gradient-wave {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-safe {
  background: radial-gradient(circle, #9cff8b, #5ea951);
  background-size: 200% 200%;
  animation: gradient-wave 2s infinite ease-in-out;
}
.bg-danger {
  background: radial-gradient(circle, #fe5f77, #9c0f0f);
  background-size: 200% 200%;
  animation: gradient-wave 2s infinite ease-in-out;
}
</style>
