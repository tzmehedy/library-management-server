import { Request, Response } from "express";
import Book from "../models/book.model";

const createBook = async(req:Request, res:Response)=>{
    try{
        const payload = req.body;
        const book = await Book.create(payload);
        res.json({
          success: true,
          message: "Book created successfully",
          data: book,
        });

    }catch(err){
        res.json({
          success: false,
          message: "Validation failed",
          data: err,
        });
    }
}

export {createBook}