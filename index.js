const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config()
const bodyparser=require('body-parser');
const password=process.env.PASSWORD;
const router=require('./router')


const dbUrl=`mongodb+srv://sunitsarkar:${password}@cluster0.gxschpx.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery'  ,false);
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('conneted to database')
});

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/',router)
app.listen(8000, ()=>{
    console.log("app is running on port 8000")
})