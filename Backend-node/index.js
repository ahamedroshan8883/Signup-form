const express = require('express');
const cors = require('cors');
const connectionDB = require('./util/db');
const UserRouter = require('./Router/UserRoutes');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();



app.listen(8080,()=>{
    console.log('server is running on port 8080');
})

const start = async()=>{
    try{
        await connectionDB(process.env.MONGOO_URL)
    }catch(error){
        console.log(error);
    }
}

start();

app.use('/api',UserRouter);
