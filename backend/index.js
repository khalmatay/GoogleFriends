const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const mongoose = require('mongoose')

const start = async() =>{
   try {
    await mongoose.connect(`mongodb+srv://khalmatay:khalmatay@cluster0.9abmc.mongodb.net/auth?retryWrites=true&w=majority`)
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
   } catch (error) {
        console.log(error)   
   }
}
start()
