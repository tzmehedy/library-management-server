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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("./book.model"));
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "The book is required"],
    },
    quantity: {
        type: Number,
        min: [1, "The quantity of the book must be grater than 0"],
        required: [true, "The quantity is required"],
    },
    dueDate: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.static("updateAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if ((book === null || book === void 0 ? void 0 : book.copies) === 0) {
            yield book_model_1.default.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(this.book);
        const currentCopies = book === null || book === void 0 ? void 0 : book.copies;
        if (typeof currentCopies === "number" && currentCopies >= this.quantity) {
            next();
        }
        else {
            throw new Error("The book copies is not available at this moment");
        }
    });
});
borrowSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(doc.book);
        const remainingCopies = (book === null || book === void 0 ? void 0 : book.copies) - doc.quantity;
        yield book_model_1.default.findByIdAndUpdate(doc.book, { copies: remainingCopies });
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.Borrow = Borrow;
