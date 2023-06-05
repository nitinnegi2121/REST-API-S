const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/Sample", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected with Mongodb')
}).catch((err) => {
  console.log(err)
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
})

const Product = new mongoose.model("Product", productSchema)


//create product
app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product

  })
})



//read
app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  })
})


//update

app.put("/api/v1/product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      success: true,
      message: "product is not found"
    })
  }


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    product

  })

})

//delete product 

app.delete("/api/v1/product/:id", async (req, res) => {


  const product = await Product.findById(req.params.id);


  if (!product) {
    res.status(500).json({
      success: true,
      message: "product is not found"
    })
  }


 

  res.status(200).json({
    success: true,
    message: "product is deleted successfully"
  })
})


app.listen(4500, () => {
  console.log('server is working http://localhost:4500');
})