"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("./routers/book.routes");
const borrow_routes_1 = require("./routers/borrow.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_routes_1.bookRouter);
app.use("/api/borrow", borrow_routes_1.borrowRouters);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to library management server"
    });
});
exports.default = app;
