import { Server } from "http"
import app from "./app"
import config from "./config"
let server:Server



function main(){
    try{
        server = app.listen(config.port,()=>{
            console.log(`The server is running on the port ${config.port}`)
        })

    }catch(err){
        console.log(err)

    }
}
main()
