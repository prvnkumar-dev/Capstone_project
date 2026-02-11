const UserModel=require("../AppModels/UserModel")
module.exports.SaveWorkoutData=async (request,response)=>{
    let {UserId}=request.params
    let data=request.body
    let result=await UserModel.updateOne({_id:UserId},{$push:{Workouts:data}})
    if(result.modifiedCount>0){
        response.send({
            status:true
        })
    }
}
module.exports.GetWorkoutHistory=async (request,response)=>{
    let {UserId}=request.params
    let result=await UserModel.find({_id:UserId},{Workouts:1})
    response.send({
        result:result[0].Workouts
    })
}