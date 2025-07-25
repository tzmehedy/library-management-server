import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"
let server:Server

async function main(){
    try{
        await mongoose.connect(`${config.database_url}`)
        console.log("✅ The mongodb connected")
        server = app.listen(config.port,()=>{
            console.log(`✅ The server is running on the port ${config.port}`)
        })
    }catch(err){
        console.log(err)

    }
}
main()
