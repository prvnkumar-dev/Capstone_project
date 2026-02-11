const { code } = require("esutils")
const UserModel=require("../AppModels/UserModel")


const spawn=require("child_process").spawn
module.exports.GetPythonoutput=async (request,response)=>{
    let savedata,jsondata,newjson,result
    let python=spawn("python",["hello.py"])
    // python.stdout.on("data",(data)=>{
    //     savedata=data.toString()
    //     jsondata=json.pa
    //     // jsondata=data.toString()

    // })
    python.stdout.on("data",async (data)=>{
        jsondata=data.toString()
        // console.log(jsondata)
        if(jsondata!==undefined){

            result=await UserModel.updateOne({_id:"662606494b1fd3db1dfbbfc0"},{$set:{BaseImage:`${jsondata}`}})
        }
        
        // console.log(jsondata)

    })
setTimeout(()=>{
    console.log(result)
    response.send({
        result
    })
},6000)
//     python.on("close",(code)=>{
//         console.log(newjson)
//         // response.send(newjson)
        
// })
// setTimeout(()=>{
//     console.log(savedata)
// },5000)
}
module.exports.GetBaseImage=async (request,response)=>{
    let {id}=request.body
    let result=await UserModel.find({_id:id},{BaseImage:1})
    response.send({
        result:result[0].BaseImage
    })
}
