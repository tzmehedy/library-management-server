import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

const createBorrow = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const book = await Borrow.create(payload);
    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: book,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err,
    });
  }
};

const getBorrow = async (req: Request, res: Response) => {
  try {
    const borrowBooks = await Borrow.find().populate("book");
    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBooks,
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

export { createBorrow, getBorrow };
