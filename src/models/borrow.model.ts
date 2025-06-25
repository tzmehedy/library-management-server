import { model, Schema } from "mongoose";
import { BorrowBookStatic, IBorrow } from "../interfaces/borrow.interface";
import Book from "./book.model";

const borrowSchema = new Schema<IBorrow, BorrowBookStatic>({
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

borrowSchema.static("updateAvailability", async function(bookId){
  const book = await Book.findById(bookId)
  if(book?.copies === 0){
    await Book.findByIdAndUpdate(bookId, {available: false})
  }
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
  const book = await Book.findById(doc.book);
  const remainingCopies = book?.copies as number - doc.quantity
  await Book.findByIdAndUpdate(doc.book, {copies: remainingCopies})
})

const Borrow = model<IBorrow,BorrowBookStatic>("Borrow", borrowSchema)

export {Borrow}
