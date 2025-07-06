import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controller";

export const bookRouter = Router()

bookRouter.post("/", createBook)
bookRouter.get("/:bookId", getBookById)
bookRouter.put("/:bookId", updateBook)
bookRouter.delete("/:bookId", deleteBook)
bookRouter.get("/", getAllBooks)



