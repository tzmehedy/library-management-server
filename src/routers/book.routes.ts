import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller";

export const bookRouter = Router()

bookRouter.post("/", createBook)
bookRouter.get("/", getAllBooks)


