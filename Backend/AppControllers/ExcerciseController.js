const ExerciseModal=require("../AppModels/ExerciseModal")
module.exports.GetExerciseDetails=async (request,response)=>{
    const result=await ExerciseModal.find()
    response.send({
        result
    })
}