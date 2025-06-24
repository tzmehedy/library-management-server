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
    }
    catch(err:any){
      const modifiedError = {
        errors: err.errors,
        name: err.name
      } 
        res.json({
          success: false,
          message: err._message,
          error: modifiedError,
        });
    }
}

export {createBook}