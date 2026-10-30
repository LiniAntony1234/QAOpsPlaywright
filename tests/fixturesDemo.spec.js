const{test,expect}=require('@playwright/test');
const {customtest}=require("../Utils/fixtures");

 customtest('fixtures Test',async({authenticatedPage,createOrder,testdataforOrder})=>
    {
authenticatedPage.goto("https://rahulshettyacademy.com/client");
//click on orders tab
await authenticatedPage.locator("[routerlink*='myorders']").first().click();
//wait for loading the page
await authenticatedPage.locator("tbody").waitFor();
await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
console.log(testdataforOrder.productname);
 });