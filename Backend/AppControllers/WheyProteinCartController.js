// const WheyProteinCartModal=require("../AppModels/WheyProteinCartModal")
const UserModel=require("../AppModels/UserModel")
const GymEquipmentModal=require("../AppModels/GymEquipmentModal")
module.exports.AddWheyProteinCartItems=async (request,response)=>{
    let {name,price,imageLink,ratings,description,specifications,quantity,id,UserId,color,Designed_For,product}=request.body
    let result
    if(Designed_For===undefined){
        result=await UserModel.updateOne({_id:UserId},{$push:{Wheycart:{
            name:name,
            price:price,
            imageLink:imageLink,
            ratings:ratings,
            description:description,
            specifications:specifications,
            quantity:quantity,
            id:id,
            product:product
           
               }}})

    }
    else{
        result=await UserModel.updateMany({_id:UserId},{$push:{GymEquipmentCart:{
            name:name,
            price:price,
            imageLink:imageLink,
            ratings:ratings,
            description:description,
            specifications:specifications,
            quantity:quantity,
            color:color,
            Designed_For:Designed_For,
            id:id,
            product:product
           
               }}})
    }
    if(result.modifiedCount>0){
        response.send({
            status:true
        })
    }
//     const NewWheyProteinCartModal=new WheyProteinCartModal({
//         name:name,
// price:price,
// imageLink:imageLink,
// ratings:ratings,
// description:description,
// specifications:specifications,
// quantity:quantity,
// id:id
//     })
//     let CartItemCheck=await WheyProteinCartModal.find({id:id})
//     if(CartItemCheck.length==0){
//         await NewWheyProteinCartModal.save()
//         response.send({
//             status:true
//         })

//     }
//     else{
//         response.send({
//             status:false
//         })
//     }

}
module.exports.GetWheyProteinCartDetails=async(request,response)=>{
    let {UserID,ProductName}=request.body
    let result=await UserModel.find({_id:UserID},{
       
    })
    let NavBarCartCount=result[0].Wheycart.length + result[0].GymEquipmentCart.length 
    if(ProductName!==undefined){
        if(ProductName===0){
            response.send({
             result:result[0].Wheycart,
             NavBarCartCount
            })
        }
        else{
            response.send({
                result:result[0].GymEquipmentCart,
                NavBarCartCount
               })
    
        }

    }
    else{
        response.send({
            result:result[0].Wheycart,
            NavBarCartCount
           })

    }
// response.send({
//     UserId
// })
}
module.exports.GetFullCartDetails=async (request,response)=>{
    let {UserId}=request.params
    let userAddress=await UserModel.find({_id:UserId},{UserName:1,Email:1,Phone:1})
    let WheyCartres=await UserModel.find({_id:UserId},{Wheycart:1})
    let GymCartres=await UserModel.find({_id:UserId},{GymEquipmentCart:1})
    let result=WheyCartres[0].Wheycart
    GymCartres[0].GymEquipmentCart.map((item)=>{
        result.push(item)
    })
    // let finalres=result.push(GymCartres[0].GymEquipmentCart)
    response.send({
       result:result,
       userAddress:userAddress
    })
}
module.exports.DeleteCartItems=async (request,response)=>{
    let {id,Designed_For,UserId}=request.body
    let result
    if(Designed_For===undefined){
        result=await UserModel.updateOne({_id:UserId},{$pull:{Wheycart:{id:id}}})

    }
    else{
        result=await UserModel.updateOne({_id:UserId},{$pull:{GymEquipmentCart:{id:id}}})
    }
    if(result.modifiedCount>0){
        response.send({
            status:true
        })

    }

}