const mongoose=require("mongoose")
const AppSchema=mongoose.Schema
const GymEquipmentSchema=new AppSchema({
    
name:{type:String},
price:{type:String},
imageLink:{type:String},
ratings:{type:String},
description:{type:String},
specifications:{type:String},
quantity:{type:String},
Exercise_Type:{type:String},
Material:{type:String},
color:{type:String},
Designed_For:{type:String},
Used_For:{type:String},
Weight:{type:String},
Type:{type:String},
stock:{type:Number},
orders:{type:Number}

})
const GymEquipmentModal=mongoose.model("gym",GymEquipmentSchema,"GymEquipments")
module.exports=GymEquipmentModal