"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "The author is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "The genre must be fiction or no-fiction or science or history or biography or fantasy",
        },
        required: [true, "The genre is required"],
    },
    isbn: {
        type: String,
        unique: true,
        required: [true, "The isbn is required"],
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        min: [0, "The copies will be more than 0"],
        required: [true, "The copies no is required"],
    },
    available: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});
const Book = (0, mongoose_1.model)("Book", booksSchema);
exports.default = Book;
