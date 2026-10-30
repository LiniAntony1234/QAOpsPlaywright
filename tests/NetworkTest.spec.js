const {test,expect,request}=require('@playwright/test');
const {APIUtils}=require('../Utils/APIUtils');
const loginPayload={userEmail: "liniantony1234@gmail.com", userPassword: "welcome123"};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakeOrderPayload={"message":"No Product in Cart"};
let response;
test.beforeAll(async()=>
    {
    const apiContext=await request.newContext();
 const apiutils=new APIUtils(apiContext,loginPayload);
  response=await apiutils.createOrder(orderPayload);
  

});
test('@API Place Order Test',async ({page})=>{
    page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },response.token
    );
await page.goto("https://rahulshettyacademy.com/client");
//create intercepting response
await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route=>{
        //creating a api request and getting the response
        const response=await page.request.fetch(route.request());
        //converting javascript payload to json format
        let body=await JSON.stringify(fakeOrderPayload);
        //sending a response to browser with fake playwright response
        route.fulfill(
            {
                response,
                body,   
            });

    });

//click on orders tab
 await page.locator("button[routerlink*='myorders']").click();
 await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
 console.log( await page.locator(".mt-4").textContent());
 await page.pause();
});


