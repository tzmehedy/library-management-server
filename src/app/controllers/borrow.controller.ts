/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

const createBorrow = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const book = await Borrow.create(payload);

    await Borrow.updateAvailability(payload.book);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: book,
    });
  } catch (err:any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const getBorrow = async (req: Request, res: Response) => {
  try {
    const borrowBooks = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },

      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
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
