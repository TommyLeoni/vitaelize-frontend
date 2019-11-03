const config = require('config')
const mongoose = require('mongoose')
const usersRoute = require('./routes/user.route')
const express = require('express')
const app = express()

if (!config.get('myprivatekey')) {
  console.error('FATAL ERROR: myprivatekey is not defined')
  process.exit(1)
}

mongoose
  .connect(
    'mongodb://localhost:27017/nodejsauth',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to mongodb ...'))
  .catch(err => console.error(err))

app.use(express.json())
app.use('/api/users', usersRoute)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))