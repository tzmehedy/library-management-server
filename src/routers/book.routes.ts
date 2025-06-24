import { Router } from "express";
import { createBook } from "../controllers/book.controller";

export const bookRouter = Router()

bookRouter.post("/", createBook)


