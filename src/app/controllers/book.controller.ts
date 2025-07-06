import { Request, Response } from "express";
import Book from "../models/book.model";
import { z } from "zod";


const createBookValidationWithZod = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number()
})

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const checkedPayload = await createBookValidationWithZod.parseAsync(payload)
    const book = await Book.create(checkedPayload)
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.status(400).json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter;
    const sortBy = req.query.sortBy;
    const sort = req.query.sort;
    const limit = parseInt(`${req.query.limit}`);
    
    let books:any = [];
    let query = {}
    if(filter){
      query = {
        genre: filter
      }
    }
    
    const sortOptions: any = { [sortBy as string]: sort };

    if(limit){
      books = await Book.find(query).sort(sortOptions).limit(limit)
    }

    else{
      books = await Book.find(query).sort(sortOptions).limit(10)
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    
    res.status(400).json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};


const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.status(400).json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const payload = req.body;
    const book = await Book.findByIdAndUpdate(bookId, payload, { new: true });
    res.status(201).json({
      success: true,
      message: "Books updated successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.status(400).json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId, {new:true});
    res.status(200).json({
      success: true,
      message: "Books deleted successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.status(400).json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};

export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
