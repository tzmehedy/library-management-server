import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import Book from "./book.model";

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
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
},{
  versionKey:false,
  timestamps:true
});

borrowSchema.pre("save", async function(next){
  const book = await Book.findById(this.book)
  const currentCopies = book?.copies
  if (typeof currentCopies === "number" && currentCopies >= this.quantity) {
    next()
  }
  else{
    throw new Error("The book copies is not available at this moment")
  }
})

borrowSchema.post("save", async function(doc){
  console.log("inside post hook")
  console.log(doc)
  const book = await Book.findById(doc.book);
  console.log(book)
  const remainingCopies = book?.copies as number - doc.quantity
  console.log(remainingCopies)
  await Book.findByIdAndUpdate(doc.book, {copies: remainingCopies})
})

const Borrow = model<IBorrow>("Borrow", borrowSchema)

export {Borrow}
