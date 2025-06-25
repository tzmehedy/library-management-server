import { Model, Types } from "mongoose";

export interface IBorrow{
    book: Types.ObjectId,
    quantity: number,
    dueDate: string
}

export interface BorrowBookStatic extends Model<IBorrow>{
    updateAvailability(bookId:string) : void
}
