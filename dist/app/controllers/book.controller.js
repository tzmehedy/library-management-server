"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const zod_1 = require("zod");
const createBookValidationWithZod = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number()
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const checkedPayload = yield createBookValidationWithZod.parseAsync(payload);
        const book = yield book_model_1.default.create(checkedPayload);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err._message,
            error: err,
        });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const sortBy = req.query.sortBy;
        const sort = req.query.sort;
        const limit = parseInt(`${req.query.limit}`);
        let books = [];
        let query = {};
        let sortOptions = {};
        if (filter) {
            query = {
                genre: filter
            };
        }
        if (sortBy && sort) {
            sortOptions = { [sortBy]: sort };
        }
        if (limit) {
            books = yield book_model_1.default.find(query).sort(sortOptions).limit(limit);
        }
        else {
            books = yield book_model_1.default.find(query).sort(sortOptions);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err._message,
            error: err,
        });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.default.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err._message,
            error: err,
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const payload = req.body;
        const book = yield book_model_1.default.findByIdAndUpdate(bookId, payload, { new: true });
        res.status(201).json({
            success: true,
            message: "Books updated successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err._message,
            error: err,
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.default.findByIdAndDelete(bookId, { new: true });
        res.status(200).json({
            success: true,
            message: "Books deleted successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err._message,
            error: err,
        });
    }
});
exports.deleteBook = deleteBook;
