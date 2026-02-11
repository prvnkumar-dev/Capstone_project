const { response } = require("express");
const UserModel=require("../AppModels/UserModel")
const mongoose=require("mongoose")
const OrderModel=require("../AppModels/UserOrderModel");
const { empty } = require("statuses");
// const {MongoClient}=require("mongodb")
// const DBconnection=require("../DatabaseManger/Database")
const accountSid = 'AC5632686db599f2531be290fa7c65418e';
const authToken = 'e46bf87e8ee3fdd0bdd293b5168c9eb1';
const client = require('twilio')(accountSid, authToken);
module.exports.UserLogin=async (request,response)=>{
   let {Email,Password}=request.body
   let result=await UserModel.find({Email:Email,Password:Password,Role:"User"},{
UserName:1,
Password:1,
Email:1,
Phone:1,
Address:1,
Age:1
})
let Databaseid=result.map((item)=>item._id)
if(result.length > 0){
    setTimeout(()=>{
        response.send({
            status:true,
            id:Databaseid[0],
            result
        })
    },1000)
}
else{
    setTimeout(()=>{
        response.send({
            status:false
        })
    },1000)
}

}
module.exports.Newuser=async (request,response)=>{
    let {UserName,Email,Password,Phone,Address,Age}=request.body
    let userexist=await UserModel.find({Email:Email})
    if(userexist.length > 0) {response.send({status:false})}
    else{let NewUserModel=new UserModel({
        UserName:UserName,
Password:Password,
Email:Email,
Phone:Phone,
Address:Address,
Age:Age,
Role:"User"

    })
    await NewUserModel.save()
    response.send({
        status:true
    })
//     let DatabaseCreateId=await UserModel.find({Email:Email})
//     let Databasename=DatabaseCreateId.map((item)=>item._id)


//     let url=`mongodb+srv://admin:praveen7979@edureka-fullstack.br1bbet.mongodb.net`
// const client=new MongoClient(url)
// const dbname=`${Databasename[0]}`
//     client.connect()
//     console.log("Database Created")
//     const Database=client.db(dbname)
//     Database.createCollection("WheyProteinCart",()=>client.close())

//     response.send({status:true,id:Databasename[0]})
}
}
module.exports.LogoutUser=(request,response)=>{
    let {userLoginID}=request.body
    mongoose.disconnect()
    mongoose.createConnection("mongodb+srv://admin:praveen7979@edureka-fullstack.br1bbet.mongodb.net/BodyData")
    // let url=`mongodb+srv://admin:praveen7979@edureka-fullstack.br1bbet.mongodb.net/${userLoginID}`
    // DBconnection.BodyData.connection.close()
    // mongoose.disconnect(url).then(()=>{
    //     response.send({
    //         status:true
    //     })
    // }).catch((err)=>console.log(err))
    // mongoose.connect("mongodb+srv://admin:praveen7979@edureka-fullstack.br1bbet.mongodb.net/BodyData").then(()=>{
    //     console.log("Boday data connectedd")
    // }).catch((err)=>console.log(err))
    // mongoose.connection.close()
    // mongoose.connection.release().then(()=>{
    //     response.send({
    //         status:true
    //     })
    // }).catch((err)=>console.log(err))

}
module.exports.GetUserdetails=async (request,response)=>{
    let result=await UserModel.find({},{_id:1,UserName:1,Email:1,ProfileImage:1,Role:1})
    response.send({
        result
    })
}
module.exports.AdminLogin=async (request,response)=>{
    console.log(request.body)
    let {Email,Password}=request.body
    let result=await UserModel.find({Role:"Admin",Email:Email,Password:Password},{
 UserName:1,
 Password:1,
 Email:1,
 Phone:1,
 Address:1,
 Age:1
 })
 let Databaseid=result.map((item)=>item._id)
 if(result.length > 0){
     setTimeout(()=>{
         response.send({
             status:true,
             id:Databaseid[0],
             result
         })
     },1000)
 }
 else{
     setTimeout(()=>{
         response.send({
             status:false
         })
     },1000)
 }
 
 }
 module.exports.SaveUserOrders=async (request,response)=>{
    let {UserId}=request.params
    let data=request.body
    let lengthdata=data.length
    console.log(lengthdata)
    let NewOrderModel
    for(let i=0;i<lengthdata;i++){
        NewOrderModel=new OrderModel({
            name:data[i].name,
            price:data[i].price,
            imageLink:data[i].imageLink,
            orderId:data[i].orderId,
            Address:data[i].Address,
            quantity:data[i].quantity,
            DeliveryDate:data[i].DeliveryDate,
            UserId:UserId,
            status:data[i].status,
            OrderDate:data[i].OrderDate,
            product:data[i].product
            
        })
        NewOrderModel.save()

    }
    // data.map((item,index)=>console.log(item[index]))
    // let result=await UserModel.updateOne({_id:UserId},{$push:{UserOrders:data}})
    let UserName=await UserModel.find({_id:UserId},{UserName:1})
    // let itemQuantity=data.quantity.length
    console.log(NewOrderModel)
    if(NewOrderModel!==""){
        await UserModel.updateOne({_id:UserId},{$unset:{GymEquipmentCart:"",Wheycart:""}})
        client.messages.create({
            body:`Mr/Mrs ${UserName[0].UserName} Had Placed New Order with ${lengthdata} Items`,
            from: '+16164219560',
            to: '+916369380943'
        }).then((message)=>{
            console.log("Messege Sent to admin")
        })
       

        response.send({
            status:true
        })

    }
 }
 module.exports.getUserOrders=async (request,response)=>{
    let result=await OrderModel.find()
    response.send({
        result
    })

 }
 module.exports.SendUserQueries=async (request,response)=>{
    let {UserId,UserName,Email,Queries}=request.body
    client.messages.create({
        body:`
        UserId:${UserId},
        UserName:${UserName},
        UserEmail:${Email}
        Query:${Queries}
        `,
        from: '+15739430710',
        to: '+916369380943'
    }).then((message)=>{
        console.log("Messege Sent to admin")
    })
   

    response.send({
        status:true
    })

 }

