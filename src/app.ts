import express, { Application, Request, Response } from "express"
import { bookRouter } from "./app/routers/book.routes"                                                                                                   
import { borrowRouters } from "./app/routers/borrow.routes"
const cors = require("cors")
const app:Application = express()



app.use(express.json())
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-server-omega-hazel.vercel.app/",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/api/books", bookRouter)
app.use("/api/borrow", borrowRouters)

app.get("/", (req: Request, res:Response)=>{
    res.json({
        success:true,
        message:"Welcome to library management server"
    })
})


export  default app




