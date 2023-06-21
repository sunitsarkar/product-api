const mongoose=require('mongoose');

const product=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    category:String
})

module.exports=mongoose.model('PRODUCT',product)