const path = require('path')
const express = require('express')

const port = 2220
const app = express()

const wxDir = path.resolve(__dirname, '../dist/wx')

app.use(express.static(`${wxDir}/cdn-assets`))
app.use(express.static(`${wxDir}/img`))

app.listen(port, () => {
  console.log(`Assets server listening on port ${port}`)
})
