const {test,expect} = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager.js');
const { json } = require('node:stream/consumers');
//import fixture
const {customtest}=require("../Utils/test-base.js")
//convert json file to string and then to javascript object
const dataset=JSON.parse(JSON.stringify(require("../Utils/placeoorderTestData.json")));

//iterating through the array dataset
for (const data of dataset){
test(`Client App login for ${data.productName}`, async ({page})=>
{
const cvv="123";
const nameinCard="lini";


const pomanager=new POManager(page);
const loginPage=pomanager.getLoginpage();
//open url
await loginPage.goTo();
//login 
await loginPage.validLogin(data.username,data.password);

const dashboardpage=pomanager.getDashboardpage();
await dashboardpage.searchProductAddcart(data.productName);
//go to cart page
await dashboardpage.navigateTocart();

//check whether the product selected is displayed in Add to cart page
const cartpage=pomanager.getCartpage();
await cartpage.verifyProductisDisplayed(data.productName);
//Go to CheckOut page
await cartpage.navigateToCheckout();


const ordersreviewpage=pomanager.getOrdersReviewPage();
//provide cvv card and name
await ordersreviewpage.providePersonalInfo(cvv,nameinCard);
//select country=india from auto suggestive dropdown
await ordersreviewpage.searchCountryandSelect("ind","India");
//asserion for email id given in Shipping Information
await ordersreviewpage.checkshippingInfo(data.username);
//click on Place Oder
const orderId=await ordersreviewpage.submitandgetOrderid();
console.log(orderId);


//click on orders tab
await dashboardpage.navigateToOrders();
const orderhistorypage= pomanager.getOrdersHistoryPage();
await orderhistorypage.searchOrderandSelect(orderId);

//check whether the order summary page has correct orderId
expect(orderId.includes(await orderhistorypage.getOrderid())).toBeTruthy();

//pause the test
//await page.pause();  
})
};
customtest('@Web Client App test', async ({page,testDataforOrder})=>
{
const cvv="123";
const nameinCard="lini";


const pomanager=new POManager(page);
const loginPage=pomanager.getLoginpage();
//open url
await loginPage.goTo();
//login 
await loginPage.validLogin(testDataforOrder.username,testDataforOrder.password);

const dashboardpage=pomanager.getDashboardpage();
await dashboardpage.searchProductAddcart(testDataforOrder.productName);
//go to cart page
await dashboardpage.navigateTocart();

//check whether the product selected is displayed in Add to cart page
const cartpage=pomanager.getCartpage();
await cartpage.verifyProductisDisplayed(testDataforOrder.productName);
//Go to CheckOut page
await cartpage.navigateToCheckout();


const ordersreviewpage=pomanager.getOrdersReviewPage();
//provide cvv card and name
await ordersreviewpage.providePersonalInfo(cvv,nameinCard);
//select country=india from auto suggestive dropdown
await ordersreviewpage.searchCountryandSelect("ind","India");
//asserion for email id given in Shipping Information
await ordersreviewpage.checkshippingInfo(testDataforOrder.username);
//click on Place Oder
const orderId=await ordersreviewpage.submitandgetOrderid();
console.log(orderId);


//click on orders tab
await dashboardpage.navigateToOrders();
const orderhistorypage= pomanager.getOrdersHistoryPage();
await orderhistorypage.searchOrderandSelect(orderId);

//check whether the order summary page has correct orderId
expect(orderId.includes(await orderhistorypage.getOrderid())).toBeTruthy();

//pause the test
//await page.pause();  
})
