//importing When,Then,Given keywords from node-module
const {When,Then,Given}=require('@cucumber/cucumber')
const { POManager } = require('../../pageObjects/POManager.js');
const {expect}=require('@playwright/test');
const playwright=require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000},async function (username,password) {
  // Write code here that turns the phrase above into concrete actions
//world constructor
const loginPage=this.pomanager.getLoginpage();
//open url
await loginPage.goTo();
//login 
await loginPage.validLogin(username,password);
});

When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardpage=this.pomanager.getDashboardpage();
await this.dashboardpage.searchProductAddcart(productName);
//go to cart page
await this.dashboardpage.navigateTocart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  //check whether the product selected is displayed in Add to cart page
const cartpage=this.pomanager.getCartpage();
await cartpage.verifyProductisDisplayed(productName);
//Go to CheckOut page
await cartpage.navigateToCheckout();
});

When('Enter valid details and place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersreviewpage=this.pomanager.getOrdersReviewPage();
//select country=india from auto suggestive dropdown
await ordersreviewpage.searchCountryandSelect("ind","India");
//click on Place Oder
this.orderId=await ordersreviewpage.submitandgetOrderid();
console.log(this.orderId);
});

Then('Verify order is present in OrderHistory',async  function () {
  // Write code here that turns the phrase above into concrete actions
//click on orders tab
await this.dashboardpage.navigateToOrders();
const orderhistorypage= this.pomanager.getOrdersHistoryPage();
await orderhistorypage.searchOrderandSelect(this.orderId);

//check whether the order summary page has correct orderId
expect(this.orderId.includes(await orderhistorypage.getOrderid())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', {timeout:100*1000},async function (username, password) {
 const userName=this.page.locator("#username");
 const singnIn=this.page.locator("[type='submit']");
 //opening a url
 await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //provide username
await userName.fill(username);
//provide password
await this.page.locator("[name='password']").fill(password);
//click on SignIn button
await singnIn.click();
});

Then('Verify error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
  //get the validation text for invalid credentials
console.log(await this.page.locator("[style*='block']").textContent());
//check whetether the validation text is correct or not
await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});


