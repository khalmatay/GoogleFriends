require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express()


const WSServer = require('express-ws')(app)
const aWss= WSServer.getWss()
const mongoose = require('mongoose');
const router = require('./router/router')

const PORT = process.env.PORT || 8000;

const errorMiddleware = require('./middleware/error-midlware')

app.ws('/',(ws,req) => {
    console.log('Подключение Установлено')
    ws.send('Ты красавчик')
    ws.on('message', (msg) =>{
        msg=JSON.parse(msg)
        console.log(msg)
        switch (msg.method){
            case "connection":
                connectionHandler(ws,msg)
                break;
           
        }
        
    })
    
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorMiddleware);

app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
const connectionHandler= (ws,msg)=>{
    ws.id=msg.id
    broadcastConnection (ws, msg)
}
const broadcastConnection = (ws, msg) =>{
    aWss.clients.forEach(client =>{
        if(client.id ===msg.id ){
            client.send(`Пользователь ${msg.username}подключился `)
        }
    })
    
}
start()