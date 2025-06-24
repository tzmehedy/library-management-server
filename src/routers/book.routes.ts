import { Router } from "express";
import { createBook, getAllBooks, getBookById } from "../controllers/book.controller";

export const bookRouter = Router()

bookRouter.post("/", createBook)
bookRouter.get("/:bookId", getBookById)
bookRouter.get("/", getAllBooks)



