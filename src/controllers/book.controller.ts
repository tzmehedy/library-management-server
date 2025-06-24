import { Request, Response } from "express";
import Book from "../models/book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const book = await Book.create(payload);
    res.json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.json({
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

    console.log(filter, sortBy, sort, limit);
    let books = [];
    if (filter || sortBy || sort || limit) {
      books = await Book.find({ genre: `${filter}` })
        .sort({ sortBy: sort === "asc" ? 1 : -1 })
        .limit(limit);
    } else {
      books = await Book.find().limit(10);
    }
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.json({
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
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.json({
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
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (err: any) {
    const modifiedError = {
      errors: err.errors,
      name: err.name,
    };
    res.json({
      success: false,
      message: err._message,
      error: modifiedError,
    });
  }
};

export { createBook, getAllBooks, getBookById, updateBook };
