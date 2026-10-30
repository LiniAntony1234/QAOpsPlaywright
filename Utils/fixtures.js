//import playwright package
const base = require('@playwright/test');
const {request}=require('@playwright/test');
const { APIUtils } = require('./APIUtils');
const loginPayload={userEmail: "liniantony1234@gmail.com", userPassword: "welcome123"};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};


//extending the test capabilities
exports.customtest = base.test.extend({

    authenticatedPage: async ({ browser}, use ) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    //open url
    await page.goto("https://rahulshettyacademy.com/client");
    //provide username & password & click submit
    await page.locator("#userEmail").fill("liniantony1234@gmail.com");
    await page.locator("[type='password']").fill("welcome123");
    await page.locator("[name='login']").click();
    //wait
    await page.waitForLoadState("networkidle");
    await use(page);
    //teardown methods
    await context.close();
},
createOrder: async ({},use)=>{
    const apiContext=await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    const response=await apiUtils.createOrder(orderPayload);
    await use(response);
    //teardown methods
    await apiContext.dispose();
},

testdataforOrder:{
productname: "Zara Coat 3"
}
});