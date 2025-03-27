require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const app = express()
const PORT = process.env.PORT || 3000

// Koneksi ke Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Middleware
app.use(cors())
app.use(express.json())

// Path ke file JSON (fallback jika Supabase error)
const dataPath = path.join(__dirname, 'sensorData.json')

// Endpoint mengambil semua data sensor
app.get('/api/sensor-data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('ews_table').select('*')
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error retrieving sensor data:', error)
    try {
      const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      res.json(jsonData)
    } catch {
      res.status(500).json({ error: 'Failed to retrieve sensor data' })
    }
  }
})

// Endpoint mengambil data berdasarkan tanggal
app.get('/api/sensor-data/:date', async (req, res) => {
  const { date } = req.params
  try {
    const { data, error } = await supabase.from('ews_table').select('*').eq('date', date)
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error retrieving data by date:', error)
    res.status(500).json({ error: 'Failed to retrieve sensor data' })
  }
})

// Jalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
