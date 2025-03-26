require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Path ke file JSON
const dataPath = path.join(__dirname, 'sensorData.json')

// Endpoint untuk mengambil semua data sensor
app.get('/api/sensor-data', async (req, res) => {
  try {
    // Coba ambil data dari Supabase
    const { data: supabaseData, error } = await supabase.from('ews_table').select('*')

    // Jika Supabase error atau tidak ada data, gunakan JSON
    if (error) {
      console.log('Supabase error, fallback to JSON:', error)
      const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      return res.json(jsonData)
    }

    // Jika Supabase berhasil dan ada data, kembalikan data Supabase
    res.json(supabaseData)
  } catch (error) {
    console.error('Error retrieving sensor data:', error)

    // Fallback ke JSON jika terjadi error
    try {
      const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      res.json(jsonData)
    } catch (jsonError) {
      res.status(500).json({ error: 'Failed to retrieve sensor data' })
    }
  }
})

// Endpoint untuk mengambil data sensor berdasarkan tanggal
app.get('/api/sensor-data/:date', async (req, res) => {
  const { date } = req.params

  try {
    // Coba ambil data dari Supabase berdasarkan tanggal
    const { data: supabaseData, error } = await supabase
      .from('ews_table')
      .select('*')
      .eq('date', date)

    // Jika Supabase error, gunakan JSON
    if (error) {
      console.log('Supabase error, fallback to JSON:', error)
      const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      const filteredData = jsonData.filter((item) => item.date === date)

      if (filteredData.length === 0) {
        return res.status(404).json({ message: 'No data found for the specified date' })
      }

      return res.json(filteredData)
    }

    // Jika Supabase berhasil, kembalikan data Supabase
    res.json(supabaseData)
  } catch (error) {
    console.error('Error retrieving data by date:', error)

    // Fallback ke JSON jika terjadi error
    try {
      const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      const filteredData = jsonData.filter((item) => item.date === date)

      if (filteredData.length === 0) {
        return res.status(404).json({ message: 'No data found for the specified date' })
      }

      res.json(filteredData)
    } catch (jsonError) {
      res.status(500).json({ error: 'Failed to retrieve sensor data' })
    }
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
