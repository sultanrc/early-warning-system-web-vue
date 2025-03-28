<script setup></script>

<template>
  <section
    id="about"
    class="w-full flex flex-col gap-8 md:gap-12 md:pr-6 bg-white max-h-[750px] md:overflow-y-auto"
  >
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 flex flex-col gap-2 text-sm md:pr-10">
        <h1 class="text-2xl font-semibold">What is Early Warning System?</h1>
        <p class="text-justify text-neutral-500">
          From February to June 2023, our team participated in an internship program at PetroChina
          International Jabung Ltd. as Information Technology Developers. During this period, we
          developed the Early Warning System (EWS) to monitor temperature, humidity, and fire
          anomalies in the server room.This system was designed to detect abnormal conditions and
          send email notifications to the IT team whenever:
        </p>
        <ul>
          <li><strong>• Temperature</strong> exceeds <strong>30°C</strong></li>
          <li><strong>• Humidity</strong> goes above <strong>80%</strong></li>
          <li><strong>• Fire anomaly</strong> is detected</li>
        </ul>
      </div>
      <img
        src="/images/photo1.jpeg"
        class="hidden md:flex md:w-1/2 h-[270px] object-cover object-[50%_90%] rounded-xl shadow-md"
      />
    </div>
    <div class="flex flex-col md:flex-row gap-8 md:gap-0">
      <img
        src="/images/flow.jpeg"
        class="scale-90 md:scale-100 md:w-1/2 h-[160px] md:h-[240px] 2xl:h-[300px] md:pr-6"
      />
      <div class="md:w-1/2 flex flex-col gap-2 text-sm">
        <h1 class="text-2xl font-semibold">How the System Works?</h1>
        <p class="text-justify text-neutral-500">
          EWS begins by collecting data from the DHT11 sensor, which measures temperature and
          humidity, and a fire detection sensor. This data is then sent to the ESP8266 (NodeMCU),
          which processes and forwards it to Node-RED. Node-RED evaluates the received data and
          stores it in the database. If the temperature exceeds 30°C, humidity goes above 80%, or a
          fire anomaly is detected, the system triggers an email notification to the IT team as a
          warning. Regardless of whether an alert is sent, all data is logged into the database for
          monitoring purposes. This ensures that abnormal conditions in the server room can be
          identified and addressed promptly.
        </p>
      </div>
    </div>
    <div class="flex flex-col pt-6 pb-12">
      <h1 class="mx-auto text-3xl font-semibold pb-1">Team Members & Roles</h1>
      <span class="mx-auto mb-8 text-xs font-semibold text-neutral-400">
        List of team members and their respective roles in the project.
      </span>

      <div
        class="flex flex-col md:flex-row md:pb-12 px-4 md:px-0 items-center md:items-start justify-center gap-6 md:gap-10"
      >
        <!-- Thoriq -->
        <div
          class="flex md:flex-col md:w-64 p-[6px] outline outline-1 outline-secondary rounded-lg"
        >
          <img class="h-44 w-44 md:h-64 md:w-64 rounded-md" src="/images/1.jpeg" alt="" />
          <div class="flex flex-col md:px-0 px-2">
            <p class="pt-2 font-bold md:text-center">M. Thoriq Al Fajri</p>
            <span class="text-xs md:text-center mb-2 text-neutral-500">
              Embedded Systems & Database
            </span>
            <hr />
            <span class="py-2 px-1 space-y-1 text-xs md:text-justify text-neutral-500">
              Programmed the ESP8266 module, integrated sensors, and ensured smooth data
              transmission to the database.
            </span>
          </div>
        </div>

        <!-- Ahmad -->
        <div
          class="flex md:flex-col md:w-64 p-[6px] outline outline-1 outline-secondary rounded-lg"
        >
          <img class="h-44 w-44 md:h-64 md:w-64 rounded-md" src="/images/2.jpeg" alt="" />
          <div class="flex flex-col md:px-0 px-2">
            <p class="pt-2 font-bold md:text-center">Ahmad Al-Farizi</p>
            <span class="text-xs md:text-center mb-2 text-neutral-500">
              Backend Developer & Database
            </span>
            <hr />
            <span class="py-2 px-1 space-y-1 text-xs md:text-justify text-neutral-500">
              Built the backend of the web, managed API integration, and designed the database for
              efficient data storage.
            </span>
          </div>
        </div>

        <!-- Sultan -->
        <div
          class="flex md:flex-col md:w-64 p-[6px] outline outline-1 outline-secondary rounded-lg"
        >
          <img class="h-44 w-44 md:h-64 md:w-64 rounded-md" src="/images/3.jpeg" alt="" />
          <div class="flex flex-col md:px-0 px-2">
            <p class="pt-2 font-bold md:text-center">Muhammad Sultan Raisyah</p>
            <span class="text-xs md:text-center mb-2 text-neutral-500">
              UI/UX Designer & Frontend Developer
            </span>
            <hr />
            <span class="py-2 px-1 space-y-1 text-xs md:text-justify text-neutral-500">
              Designed the UI/UX, coded the frontend, and optimized the interface to ensure a
              responsive and user-friendly experience.
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
