const mongoose=require("mongoose")
const AppSchema=mongoose.Schema
const WheyProteinCartSchema=new AppSchema({
    
name:{type:String},
price:{type:String},
imageLink:{type:String},
ratings:{type:String},
description:{type:String},
specifications:{type:String},
quantity:{type:String},
id:{type:String},
product:{type:String}

})
const WheyProteinCartModal=mongoose.model("wheyprotein",WheyProteinCartSchema,"WheyProteinCart")
module.exports=WheyProteinCartModal