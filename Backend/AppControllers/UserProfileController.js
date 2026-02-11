const multer = require("multer")
const UserModel=require("../AppModels/UserModel")
const UploadFiles=require("../Multer/multer")
module.exports.StoreUserProfile=(request,response)=>{
    let {UserID}=request.body
    let UploadHandler=UploadFiles.single("file")
    UploadHandler(request,response,(err)=>{
        if(err instanceof multer.MulterError){
            if(err.code=="LIMIT_FILE_SIZE"){
                response.send({
                    messege:"Maximum File size Must be 2MB"
                })
            }
        }
        else{
            response.send({
                messege:"File Uploaded Successfully",
                filename:request.file.filename
                
            })
           
        }

    })
}
module.exports.SaveUserProfileImage=async (request,response)=>{
    let {filename,userLoginID}=request.body
    let res=await UserModel.updateOne({_id:userLoginID},{$set:{ProfileImage:filename}})
    if(res.modifiedCount>0){
        response.send({
            status:true
        })
    }
    else{
        response.send({
            status:false
        })
    }
}
module.exports.GetUserProfileImage=async (request,response)=>{
    let {userid}=request.params
    let result=await UserModel.find({_id:userid})
        response.send({result})
}
module.exports.UpdateUserdata=async (request,response)=>{
    let {UserId}=request.params
    let {UserName,Phone,Height,Weight,Dob}=request.body
    let UpdateData={}
    if(UserName !=="") UpdateData["UserName"]=UserName
    if(Phone !=="") UpdateData["Phone"]=Phone
    if(Height !=="") UpdateData["Height"]=Height
    if(Weight !=="") UpdateData["Weight"]=Weight
    if(Dob !=="") UpdateData["Dob"]=Dob
    let result=await UserModel.updateMany({_id:UserId},{$set:{...UpdateData}})
    if(result.modifiedCount>0){
        response.send({
            status:true
        })
    }
}
