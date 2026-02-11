
const { lte, reduce } = require("lodash")
const WheyProteinModal=require("../AppModels/WheyProteinModal")
const GymEquipmentModal=require("../AppModels/GymEquipmentModal")
const { $lte } = require("sift")
module.exports.GetWheyProteinDetails=async (request,response)=>{
    let result=await WheyProteinModal.find()
    response.send({
        result
    })

}
module.exports.GetFilteredWheyData=async (request,response)=>{
    let {sort,dragsort,foodtype,country,PageNumber,ProductName}=request.body
    sort=sort===undefined ? 1 : sort
    let filterWhey={}
    let filterGymEqipment={}
    if(ProductName===0){
        if (dragsort !==undefined) filterWhey["price"]={$lte:dragsort}
        if(foodtype!==undefined) filterWhey["food_preference"]=foodtype
        if(country!==undefined) filterWhey["country_of_origin"]=country

    }
    else{
        if(dragsort !==undefined){
            if(dragsort<=10000){
                filterGymEqipment["price"]={$lte:dragsort}
            }
            else{
                console.log(dragsort)
                filterGymEqipment["price"]={$gte:dragsort}
            }
        }
    }
    let MaxitemPage=6
    let LastIndex=PageNumber*MaxitemPage
    let FirstIndex=LastIndex-MaxitemPage
    let resultsort
    if(ProductName==0){
    resultsort=await WheyProteinModal.find({...filterWhey}).sort({price:sort})
    }
    else{
    resultsort=await GymEquipmentModal.find({...filterGymEqipment})

    }

    let PageNumberCount=Math.ceil(resultsort.length/MaxitemPage)
    let result=resultsort.slice(FirstIndex,LastIndex)
    let PageNumberCountLoop=[]
    for(let i=1;i<=PageNumberCount;i++){
        PageNumberCountLoop.push(i)
    }
    let wheyDataset=await WheyProteinModal.find({},{stock:1})
    let wheyDatasetresult=wheyDataset.map((item)=>item.stock)
    let GymDataset=await GymEquipmentModal.find({},{stock:1})
    let GymDatasetresult=GymDataset.map((item)=>item.stock)
    response.send({
        result:result,
        PageNumberCount:PageNumberCountLoop,
        resultsort:resultsort,
        wheyDatasetresult:wheyDatasetresult.reduce((prev,next)=>prev+next),
        GymDatasetresult:GymDatasetresult.reduce((prev,next)=>prev+next)

    })
}
module.exports.GetWheyProductdetails=async (request,response)=>{
    let {productId}=request.params
    let result=await WheyProteinModal.find({_id:productId})
    response.send({
        result
    })
}
module.exports.UpdateStocks=async (request,response)=>{
    let {id,NewStockqty,productname}=request.body
    let result
    if(productname===0){
        result=await WheyProteinModal.updateOne({_id:id},{$set:{stock:NewStockqty}})
        // result=await WheyProteinModal.find({_id:id})

    }
    else{
        result=await GymEquipmentModal.updateOne({_id:id},{$set:{stock:NewStockqty}})

    }
    if(result.modifiedCount>0){
        response.send({
            status:true
        })

    }
}