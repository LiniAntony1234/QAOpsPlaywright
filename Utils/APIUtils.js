class APIUtils
{
    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

async getToken(){
    //make POST API call
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            });
        //assertion for whether API call is success or not
        //await expect(loginResponse.ok()).toBeTruthy();
    
        //get json response
        const loginresponsejson=await loginResponse.json();
        //get token from json response
          const token=loginresponsejson.token;
         console.log(token);
         return token;
    }  
async createOrder(orderPayload){
    let response={};
    response.token=await this.getToken();
    const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
{
    data: orderPayload,
    headers: {
        'Authorization' : response.token,
        'Content-Type' : 'application/json'
},
    });
    //get order response in json
    const orderResponseJson=await orderResponse.json();
    console.log(orderResponseJson);
    //get orderId
   const  orderId=orderResponseJson.orders[0];
    response.orderId=orderId;
    return response;
}  
}
module.exports={APIUtils};