import express, { Application, Request, Response } from "express"
import { bookRouter } from "./routers/book.routes"                                                                                                   
import { borrowRouters } from "./routers/borrow.routes"
const app:Application = express()

app.use(express.json())

app.use("/api/books", bookRouter)
app.use("/api/borrow", borrowRouters)

app.get("/", (req: Request, res:Response)=>{
    res.json({
        success:true,
        message:"Welcome to library management server"
    })
})


export  default app




