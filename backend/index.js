const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port') || 5000
const app = express()

app.use('/api/auth')



async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=> console.log('App has ben starteed on ${PORT}...'))

    } catch (error) {
        console.log('Server Error', e.message)
        process.exit(1)
    }


}
start()
