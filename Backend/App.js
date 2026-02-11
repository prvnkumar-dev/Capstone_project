const express=require("express");
const fs=require("fs")
const cors=require("cors");
const App=express();
const Approuter=require("./Approuter");
const mongoose=require("mongoose")
const MongoURL=`mongodb+srv://admin:praveen7979@edureka-fullstack.br1bbet.mongodb.net/BodyData`
App.use(cors());
App.use(express.json())
App.use(express.urlencoded({extended:false}))
const PORT=3030;
App.use("/",Approuter);
mongoose.connect(MongoURL).then(()=>{
        console.log("BodyData Connected")
        App.listen(PORT,()=>{
                console.log(`Server is Running under the URL : localhost:${PORT}/`);
             });
}).catch((err)=>console.log(err))
