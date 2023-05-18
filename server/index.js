const express = require('express')
const app = express()
const PORT = 7070
const bodyParser = require("body-parser");
const crypto = require("crypto");
app.use(bodyParser.json());

app.get('/api', (req, res) => {
     res.send('Hello Pehman!')
   })

   const fakeData = [
     {
          id:"1",
          name:"cola",
          price:"66"
     },
     {
          id:"2",
          name:"cola",
          price:"5"
     },
     {
          id:"4",
          name:"cola",
          price:"10"
     },
   ]

app.listen(PORT, () => {
     console.log(`Example app listening on port ${PORT}`)
     })
//GET PRODUCTS
app.get(`/api/products`,(req,res)=>{
     res.send({
     data:fakeData,
     message:'data get success'
     })
})

app.get("/api/products/:id", (req, res) => {
     const id = req.params.id;
     const product = fakeData.find((x) => x.id == id);
     if (product === undefined) {
       res.status(404).send({
         message: "product not found!",
       });
     } else {
       res.status(200).send(product);
     }
   });

//POST

app.post(`/api/products`,(req,res)=>{
     const {name,price}=req.body
     const newProduct = {
          id: crypto.randomUUID(),
          name: name,
          price: price
        };
        fakeData.push(newProduct);
        res.status(201).send({
          message: "product created successfully!",
          data: newProduct,
        });
})

//DELETE

app.delete("/api/products/:id", (req, res) => {
     const id = req.params.id;
     const deletingProduct = fakeData.find((x) => x.id == id);
     let idx = fakeData.indexOf(deletingProduct);
     fakeData.splice(idx, 1);
     if (deletingProduct === undefined) {
       res.status(204).send("product not found!");
     } else {
       res.status(203).send({
         message: "product deleted successfully!",
       });
     }
   });

   //Edit Product
app.put("/api/products/:id", (req, res) => {
     const id = req.params.id;
     const { name, price } = req.body;
   
     let editingProduct = fakeData.find((x) => x.id == id);
     if (name) {
       editingProduct.name = name;
     }
     if (price) {
       editingProduct.price = price;
     }
     res.status(200).send({
       message: "product updated successfully!",
     });
   });