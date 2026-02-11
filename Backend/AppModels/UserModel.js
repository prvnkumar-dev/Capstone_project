const mongoose=require("mongoose")
// const DBconnection=require("../DatabaseManger/Database")
const AppScehma=mongoose.Schema
const UserSchema=new AppScehma({
    
UserName:{type:String},
Password:{type:String},
Email:{type:String},
Phone:{type:String},
Address:{type:String},
Age:{type:Number},
Wheycart:{type:Array},
ProfileImage:{type:String},
GymEquipmentCart:{type:Array},
Height:{type:String},
Weight:{type:String},
Dob:{type:String},
Workouts:{type:Array},
BaseImage:{type:String},
UserOrders:{type:Array},
Role:{type:String}

})
const UserModel=mongoose.model("user",UserSchema,"UserManagement")
module.exports=UserModel