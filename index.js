const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const vendorRoutes = require('./Routes/vendorRoutes');
const firmRoutes = require('./Routes/firmRoute');
const productRoutes = require('./Routes/productRoute');
const cors = require("cors");
const path = require("path");

const app = express()

const PORT = 4000;

dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB is connected successfully"))
.catch((error)=>console.log(error));

app.use(bodyParser.json())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`server started and running at port ${PORT}`);
})

app.use('/home',(req,res)=>{
    res.send("<h1> Welcome to SUBY");
})