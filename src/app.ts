import express, { Application, Request, Response } from "express"
import { bookRouter } from "./routers/book.routes"                                                                                                   
const app:Application = express()

app.use(express.json())

app.use("/api/books", bookRouter)

app.get("/", (req: Request, res:Response)=>{
    res.json({
        success:true,
        message:"Welcome to library management server"
    })
})


export  default app




