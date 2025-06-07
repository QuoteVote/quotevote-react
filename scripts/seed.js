import mongoose from "mongoose";
import productModel from "../models/product.models.js";
import dotenv from "dotenv";
import { Products } from "../data/ProductData.js";
dotenv.config();
const SeederProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // await productModel.deleteMany();
    // console.log("Products Are Deleted !");

    //The products to be added will be generated and pulled from external data.
    await productModel.insertMany(Products);
    console.log("Products Are Added !");
  } catch (error) {
    console.log(error);
  }
};

SeederProduct();