const express=require('express');
const router=express.Router();
const Product=require('./model');

router.post('/products', (req,res)=>{
    const product=new Product(req.body);
    product.save();
    res.status(201).send(product)
})

router.get('/products',(req,res)=>{
    Product.find().then((result)=>{
        res.send(result)
    })
})

router.param('id',(req,res,next,id)=>{
    Product.find({_id:id}).then((product)=>{
        req.product=product;
        next()
    })
})

router.get('/products/:id',(req,res)=>{
    res.send(req.product)
})

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, price, category } = req.body;
  
    Product.findByIdAndUpdate(id, { name, description, price, category }, { new: true })
      .then((updatedProduct) => {
        if (updatedProduct) {
          res.send(updatedProduct);
        } else {
          res.status(404).send({ error: "There is no such product id" });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: "Internal Server Error" });
      });
  });
  
  

router.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.deleteOne({ _id: id })
      .then(() => {
        res.status(204).send('deleted');
      })
      .catch((error) => {
        res.status(404).send({ error: "There is no such product id" });
      });
  });
  





module.exports=router