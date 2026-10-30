const {test,expect,request} = require('@playwright/test');
const { text } = require('node:stream/consumers');
const { APIUtils } = require('../Utils/APIUtils');
const loginPayload={userEmail: "liniantony1234@gmail.com", userPassword: "welcome123"};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;

test.beforeAll(async()=>
    {
    //start with API
    const apiContext=await request.newContext();
    //make POST API call for login & placing order
   const apiutils= new APIUtils(apiContext,loginPayload);
    response=await apiutils.createOrder(orderPayload);
    })  

test('@API PlaceOrderTest', async ({page})=>
{
//passing token to application tab>>locat storage>>key value to auto login
await page.addInitScript (value=>
{
    window.localStorage.setItem('token',value);
},response.token);
/*login
await page.locator("#userEmail").fill("liniantony1234@gmail.com");
await page.locator("[type='password']").fill("welcome123");
await page.locator("[name='login']").click();
*/
//get all the poduct name
/*await page.waitForLoadState("networkidle");
const products=await page.locator(".card-body b").allTextContents();
 console.log(products);
or */
//open url
await page.goto("https://rahulshettyacademy.com/client/");

/*
//click on 'Add to Cart' for product=ZARA COAT 3
const productName='ZARA COAT 3';
const products=page.locator(".card-body");
const count=await products.count();
    //iterating through each product
for(let i=0;i<count;i++)
{
    //check whether product has productName
    if(await products.nth(i).locator("b").textContent()==productName)
    {
        await products.nth(i).locator("text=Add To Cart").click();
        break;
    }
}

//go to cart page
await page.locator("[routerlink*='cart']").click(); 
    //check whether the product selected is displayed in Add to cart page
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    //assertion
expect(bool).toBeTruthy();

//Go to CheckOut page
await page.locator("text=Checkout").click();
//provide cvv card and name
await page.locator("input[class='input txt']").nth(0).fill("123");
await page.locator("input[class='input txt']").nth(1).fill("lini");

//select country=india from auto suggestive dropdown
    //search with ind
await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
const autoDropdown=page.locator(".ta-results");
await autoDropdown.waitFor();
const count2=await autoDropdown.locator("button").count();
for(let i=0;i<count2;++i)
{
 const text=await autoDropdown.locator("button").nth(i).textContent();
/// console.log(text);
    if (text === " India")
    {
        await autoDropdown.locator("button").nth(i).click();
        break;
    }
}
//asserion for email id given in Shipping Information
await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
//click on Place Oder
await page.locator(".action__submit").click();
//assertion for final page to show text=Thankyou for the order.
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//print orderid
const orderId=await page.locator("label.ng-star-inserted").textContent()
console.log(orderId);
*/                                                  
                                               
//check the order id you have placed is there in the Order page
//click on orders tab
await page.locator("[routerlink*='myorders']").first().click();
const rows=await page.locator("tbody tr");
for(let i=0;i< await rows.count();i++)
{
    const rowid=await rows.nth(i).locator("th").textContent();
   if(response.orderId.includes(rowid))
   {
     await rows.nth(i).locator("button").first().click();
     break;
   }
}
//check whether the order summary page has correct orderId
const orderidsummarypage=await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderidsummarypage)).toBeTruthy();

//pause the test
//await page.pause();  
});
