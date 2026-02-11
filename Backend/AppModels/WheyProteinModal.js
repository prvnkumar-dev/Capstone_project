const mongoose=require("mongoose")
// const DBconnection=require("../DatabaseManger/Database")
const AppSchema=mongoose.Schema
const WheyProteinSchema=new AppSchema({
    
name:{type:String},
price:{type:String},
imageLink:{type:String},
ingredients:{type:Array},
ratings:{type:String},
nutrients:{type:Object},
description:{type:String},
specifications:{type:String},
quantity:{type:String},
flavour:{type:String},
usage_timings:{type:String},
dietary_preferences:{type:String},
food_preference:{type:String},
country_of_origin:{type:String},
stock:{type:Number},
orders:{type:Number}

})
const WheyProteinModal=mongoose.model("wheyprotein",WheyProteinSchema,"WheyProtein")
module.exports=WheyProteinModal