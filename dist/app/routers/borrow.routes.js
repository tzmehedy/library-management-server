"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouters = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("../controllers/borrow.controller");
exports.borrowRouters = (0, express_1.Router)();
exports.borrowRouters.post("/", borrow_controller_1.createBorrow);
exports.borrowRouters.get("/", borrow_controller_1.getBorrow);
