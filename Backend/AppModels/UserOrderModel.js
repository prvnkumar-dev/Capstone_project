const mongoose=require("mongoose")
const AppSchema=mongoose.Schema
const OrderSchema=new AppSchema({
    name:{type:String},
    price:{type:Number},
    imageLink:{type:String},
    orderId:{type:String},
    Address:{type:String},
    quantity:{type:Number},
    DeliveryDate:{type:String},
    UserId:{type:String},
    status:{type:String},
    product:{type:Number},
    OrderDate:{type:String}

})
OrderModel=mongoose.model("order",OrderSchema,"UserOrders")
module.exports=OrderModel