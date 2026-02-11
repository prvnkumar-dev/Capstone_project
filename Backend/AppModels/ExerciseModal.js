const mongoose=require("mongoose")
const AppSchema=mongoose.Schema
const ExerciseSchema=new AppSchema({
    
name:{type:String},
type:{type:String},
muscle:{type:String},
equipment:{type:String},
difficulty:{type:String},
shorts:{type:String},
IamgeLink:{type:String}

})
const ExerciseModal=mongoose.model("Exercise",ExerciseSchema,"ExerciseData")
module.exports=ExerciseModal