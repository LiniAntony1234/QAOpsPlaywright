const {test,expect}=require('@playwright/test');
const { expectFailure } = require('node:test');

test('Security Test',async ({page})=>{
    //open url >> login to page>>click on orders tab
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill("liniantony1234@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("welcome123");
await page.getByRole("button",{name:"Login"}).click();
await page.locator("[routerlink*='myorders']").click();
//send a intercepting request
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
async route=>
    route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"})
)
//click on view button
await page.locator("button:has-text('View')").first().click();

await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
//await page.pause();

})