<template>
  <section id="table" class="flex w-full flex-col bg-white text-base mb-20">
    <div class="flex justify-between items-center">
      <div class="mb-2">
        <div class="flex items-center">
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search ..."
            class="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-temp"
          />
        </div>
      </div>
      <div class="relative flex flex-col gap-4 text-sm">
        <div class="flex gap-4 mb-3">
          <input
            type="date"
            id="dateInput"
            v-model="selectedDate"
            placeholder="input date to print"
            class="w-full py-1 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300 peer"
          />
          <div class="flex items-end gap-2">
            <button
              @click="generatePDF"
              class="cursor-pointer group flex items-center gap-2 bg-red-700 px-4 py-2 outline outline-3 outline-offset-[-3px] outline-red-700 rounded-lg text-sm transition duration-400 hover:bg-red-200"
            >
              <svg
                class="transition duration-400"
                width="10"
                height="20"
                viewBox="0 0 23 33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="transition duration-400 group-hover:fill-[#881337]"
                  fill="white"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.2141 2.18237C6.96281 2.68904 6.96281 3.35404 6.96281 4.68562V15.1356H5.11743C3.75614 15.1356 3.07473 15.1356 2.75252 15.4143C2.61426 15.5336 2.50515 15.6846 2.43393 15.8551C2.36272 16.0256 2.33138 16.2108 2.34243 16.396C2.36864 16.8298 2.83885 17.3349 3.77773 18.3466L10.2496 25.3149C10.7152 25.8184 10.948 26.0685 11.2209 26.162C11.459 26.2439 11.7166 26.2439 11.9547 26.162C12.2276 26.0685 12.4604 25.8184 12.926 25.3149L19.3979 18.3482C20.3383 17.3349 20.807 16.8282 20.8316 16.396C20.8429 16.2109 20.8118 16.0258 20.7408 15.8553C20.6699 15.6848 20.5611 15.5338 20.4231 15.4143C20.1009 15.1356 19.421 15.1356 18.0582 15.1356H16.2128V4.68562C16.2128 3.35562 16.2128 2.69062 15.96 2.18237C15.7386 1.73533 15.3851 1.37174 14.9502 1.1437C14.4569 0.88562 13.8094 0.88562 12.5128 0.88562H10.6628C9.36781 0.88562 8.72031 0.88562 8.22543 1.1437C7.78993 1.37147 7.43588 1.73509 7.2141 2.18237ZM0.796143 30.969C0.796143 31.3889 0.958568 31.7916 1.24769 32.0885C1.53681 32.3855 1.92893 32.5523 2.33781 32.5523H20.8378C21.2467 32.5523 21.6388 32.3855 21.9279 32.0885C22.2171 31.7916 22.3795 31.3889 22.3795 30.969C22.3795 30.549 22.2171 30.1463 21.9279 29.8494C21.6388 29.5524 21.2467 29.3856 20.8378 29.3856H2.33781C1.92893 29.3856 1.53681 29.5524 1.24769 29.8494C0.958568 30.1463 0.796143 30.549 0.796143 30.969Z"
                />
              </svg>
              <span class="font-bold text-white transition duration-400 group-hover:text-red-700"
                >PDF</span
              >
              <div
                class="absolute opacity-0 rounded-md py-1 px-2 bg-primary right-0 top-12 group-hover:opacity-100 transition-opacity shadow-lg border border-1 border-slate-300"
              >
                Want specific data? Pick a date first!
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">Loading data...</div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
      <button @click="fetchData" class="ml-2 underline">Try again</button>
    </div>

    <!-- Table with data -->
    <div v-else class="overflow-x-auto rounded-lg border border-gray-300">
      <table id="table-container" class="min-w-full text-sm">
        <thead>
          <tr>
            <th class="font-bold text-left px-4 py-2 border-b">Date</th>
            <th class="font-bold text-left px-4 py-2 border-b">Time</th>
            <th class="font-bold text-left px-4 py-2 border-b">Temperature</th>
            <th class="font-bold text-left px-4 py-2 border-b">Humidity</th>
            <th class="font-bold text-left px-4 py-2 border-b">Fire Anomaly</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredData.length > 0">
            <tr v-for="(item, index) in paginatedData" :key="index" class="border-b">
              <td class="px-4 py-2">{{ item.date }}</td>
              <td class="px-4 py-2">{{ item.time }}</td>
              <td class="px-4 py-2">{{ item.temp }}</td>
              <td class="px-4 py-2">{{ item.hum }}</td>
              <td class="px-4 py-2">{{ item.fa ? 'Yes' : 'No' }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="5" class="text-center py-4 text-gray-400">No matching records found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error" class="my-4 flex justify-between items-center">
      <div class="text-sm font-base text-neutral-400">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of
        {{ filteredData.length }} entries
      </div>
      <div class="pagination flex">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded mr-1"
          :class="{ 'opacity-50': currentPage === 1 }"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="px-3 py-1 border rounded mx-1"
          :class="{ 'bg-temp text-white': currentPage === page }"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded ml-1"
          :class="{ 'opacity-50': currentPage === totalPages }"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import jsPDF from 'jspdf'

const tableData = ref([])
const allData = ref([]) // Store all data for reset
const loading = ref(false)
const error = ref(null)
const selectedDate = ref('')
const currentPage = ref(1)
const pageSize = 10
const searchQuery = ref('')

// Reset to first page when search query changes
watch(searchQuery, () => {
  currentPage.value = 1
})

const fetchData = async () => {
  try {
    const response = await fetch('/data.json') // Ambil data dari public/data.json
    if (!response.ok) throw new Error('Failed to fetch data')

    const jsonData = await response.json() // Parse JSON
    tableData.value = jsonData
    allData.value = jsonData
  } catch (err) {
    error.value = 'Failed to load data: ' + err.message
    console.error('Error loading data:', err)
  }
}

const filterByDate = async () => {
  if (!selectedDate.value) {
    tableData.value = [...allData.value]
    return
  }

  const filteredByDate = allData.value.filter((item) => item.date === selectedDate.value)
  tableData.value = filteredByDate
  currentPage.value = 1
}

// Improved search functionality
const filteredData = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const dateFilter = selectedDate.value

  return allData.value
    .filter((item) => {
      // Check if the item matches the date filter (if any)
      const dateMatch = !dateFilter || item.date === dateFilter

      // Check if the item matches the search query
      const queryMatch =
        !query || Object.values(item).some((value) => String(value).toLowerCase().includes(query))

      return dateMatch && queryMatch
    })
    .reverse() // Most recent data first
})

// Pagination computed properties
const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize)))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => startIndex.value + pageSize)
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value))

// PDF Generation
const generatePDF = () => {
  const doc = new jsPDF()

  // Judul
  doc.setFontSize(18)
  doc.text('Sensor Data', 10, 10)

  // Header
  doc.setFontSize(12)
  doc.text('Date', 10, 20)
  doc.text('Time', 50, 20)
  doc.text('Temperature', 90, 20)
  doc.text('Humidity', 130, 20)
  doc.text('Fire Anomaly', 170, 20)

  // Garis pembatas header
  doc.line(10, 22, 200, 22)

  // Data
  doc.setFontSize(10)
  filteredData.value.forEach((item, index) => {
    const yPosition = 30 + index * 10

    doc.text(item.date, 10, yPosition)
    doc.text(item.time, 50, yPosition)
    doc.text(String(item.temp), 90, yPosition)
    doc.text(String(item.hum), 130, yPosition)
    doc.text(item.fa ? 'Yes' : 'No', 170, yPosition)
  })

  doc.save(`sensor_data_${selectedDate.value || 'all'}.pdf`)
}
onMounted(() => {
  fetchData()
})
</script>
