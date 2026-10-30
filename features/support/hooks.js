//importing the hooks
const {Before, After, AfterStep, Status, BeforeStep}=require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager.js');
const playwright=require('@playwright/test');

Before(async function () {
const browser=await playwright.chromium.launch(
  {
    headless:false
  }
);
const context=await browser.newContext();
//using world constructor so that page is accessible in steps.js
this.page=await context.newPage();
//using world constructor so that pomanager is accessible in steps.js
this.pomanager=new POManager(this.page);
});

//BeforeStep Hook
BeforeStep(function(){   
});

//take screenshot when any step(Given,When,Then) fails
AfterStep(async function({result}){
if(result.status===Status.FAILED){
    await this.page.screenshot({path: 'screenshot1.png'});
}
});
After( function () {
console.log("I am last to execute")
});