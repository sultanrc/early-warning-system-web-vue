const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Path ke file JSON
const dataPath = path.join(__dirname, 'sensorData.json')

// Endpoint untuk mengambil semua data sensor
app.get('/api/sensor-data', (req, res) => {
  try {
    // Baca data dari file JSON
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    res.json(data)
  } catch (error) {
    console.error('Error reading sensor data:', error)
    res.status(500).json({ error: 'Failed to retrieve sensor data' })
  }
})

// Endpoint untuk mengambil data sensor berdasarkan tanggal
app.get('/api/sensor-data/:date', (req, res) => {
  try {
    const { date } = req.params
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

    // Filter data berdasarkan tanggal
    const filteredData = data.filter((item) => item.date === date)

    if (filteredData.length === 0) {
      return res.status(404).json({ message: 'No data found for the specified date' })
    }

    res.json(filteredData)
  } catch (error) {
    console.error('Error retrieving data by date:', error)
    res.status(500).json({ error: 'Failed to retrieve sensor data by date' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
