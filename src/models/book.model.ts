
import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook>({
    title:{
        type: String,
        required:true,
        trim:true
    },
    author:{
        type: String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        enum: ["FICTION" , "NON_FICTION" , "SCIENCE" , "HISTORY" ,"BIOGRAPHY" , "FANTASY"],
        required:true
    },
    isbn:{
        type: String,
        unique:true,
        required:true
    },
    description: {
        type:String
    },
    copies:{
        type:Number,
        min:0,
    },
    available:{
        type:Boolean,
        default:true
    }
},{
    versionKey:false
})

const Book = model("Book", booksSchema)
export default Book

