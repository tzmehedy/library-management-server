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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrow = exports.createBorrow = void 0;
const borrow_model_1 = require("../models/borrow.model");
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const book = yield borrow_model_1.Borrow.create(payload);
        yield borrow_model_1.Borrow.updateAvailability(payload.book);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: book,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});
exports.createBorrow = createBorrow;
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowBooks = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (err) {
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
});
exports.getBorrow = getBorrow;
