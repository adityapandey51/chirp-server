import { initServer } from "./app";

async function init () {
    const app=await initServer();
    app.listen(8080,()=>{
        console.log(`Server started on PORT 8080`)
    })
}

init();