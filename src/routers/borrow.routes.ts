import { Router } from "express";
import { createBorrow, getBorrow } from "../controllers/borrow.controller";

export const borrowRouters = Router()

borrowRouters.post("/", createBorrow)
borrowRouters.get("/", getBorrow)
