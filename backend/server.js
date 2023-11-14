const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors')
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');



const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(cookieParser());



//
const userRoutes = require('./routes/userRoutes');
const productrRoutes = require('./routes/productRoutes');


// Routes
app.use('/user',userRoutes)
app.use('/products',productrRoutes)

// app.get('/', async(req,res) =>{
//     res.send('home Page')
// }) 

app.use(errorHandler)
require('./config/db')
app.listen(process.env.PORT,()=>{
    console.log('server is running ', process.env.PORT)
})
