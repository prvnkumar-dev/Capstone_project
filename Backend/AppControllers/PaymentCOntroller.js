const Razorpay = require('razorpay');
const crypto=require("crypto");
var instance = new Razorpay({ 
    key_id: 'rzp_test_RB0WElnRLezVJ5', 
    key_secret: 'VLMCIrqKxRMNR9EcRcbL2UG8'
 })
module.exports.CreateOrderId=(request,response)=>{
    let {Amount}=request.body;
    console.log(Amount)

var options = {
  amount:Number(Amount) * 100 ,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  if(err){
    response.status(500).send({
        status:false,
        messege:"Error in controller",
        send:err
    })
    
  }
  else{
    response.send({
        status:true,
        order
    })
  }
});
  
      }
module.exports.VerifyPayment=(request,response)=>{
    let {payment_id,order_id,signature}=request.body;
//    let  generated_signature = hmac_sha256(order_id + "|" +payment_id, 'VLMCIrqKxRMNR9EcRcbL2UG8');
let  generated_signature =  crypto.createHmac("sha256",'VLMCIrqKxRMNR9EcRcbL2UG8').update(order_id + "|" +payment_id).digest("hex");

  if (generated_signature == signature) {
    response.send({
        status:true
    });
  }
  else{
    response.send({
        status:false
    });
  }


}
