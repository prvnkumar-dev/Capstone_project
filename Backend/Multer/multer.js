const multer=require("multer")
const express=require("express")
const { file } = require("babel-types")
const app=express()
app.use(express.static("C:/Users/PRAVEENKUMAR/Desktop/Capston Project/fitness_tracker/public/images/UserProfile"))
let multerStorage=multer.diskStorage({
    destination:(request,file,cb)=>{
        cb(null,"C:/Users/PRAVEENKUMAR/Desktop/Capston Project/fitness_tracker/public/images/UserProfile")
    },
    filename:(request,file,cb)=>{
        // cb(null,Date.now()+"_"+file.originalname)
        cb(null,Date.now()+".png")

       
    }
})
let maximumFileSIze=(5*1000*1000)
let UploadFiles=multer({
    storage:multerStorage,
    limits:{
        fileSize:maximumFileSIze
    }
})
module.exports=UploadFiles