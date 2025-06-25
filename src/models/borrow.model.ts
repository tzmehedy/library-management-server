import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
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
});

const Borrow = model("Borrow", borrowSchema)

export {Borrow}
