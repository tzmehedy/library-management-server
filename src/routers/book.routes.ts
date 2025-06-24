import { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controller";

export const bookRouter = Router()

bookRouter.post("/", createBook)
bookRouter.get("/:bookId", getBookById)
bookRouter.put("/:bookId", updateBook)
bookRouter.get("/", getAllBooks)



