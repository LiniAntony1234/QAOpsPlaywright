const {test, expect}= require('@playwright/test');

test('@Web Browser Context Playwright test', async ({browser})=>
{
 //opening a browser   
 const context=await browser.newContext();
 //opening a page
 const page=await context.newPage();
 //pre defining webelement
 const userName=page.locator("#username");
 const singnIn=page.locator("[type='submit']");
 const cardTitles=page.locator(".card-body a");
 //opening a url
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//print page title
console.log(await page.title());
//assertions to check the page title  
//await expect(page).toHaveTitle("Google");
//provide username
await userName.fill("rahulshetty");
//provide password
await page.locator("[name='password']").fill("Learning@830$3mK2");
//click on SignIn button
await singnIn.click();
//get the validation text for invalid credentials
console.log(await page.locator("[style*='block']").textContent());
//check whetether the validation text is correct or not
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
//provide correct username
    //clear the already provided username
await userName.fill("");
await userName.fill("rahulshettyacademy");
//click on SignIn
await singnIn.click();

//get the name of 1st product in the new page
console.log(await cardTitles.nth(0).textContent());
/* or
console.log(await cardTitles.first().textContent());
*/
//get the name of all products in the new page
const allTitles=await cardTitles.allTextContents();
console.log(allTitles);
});

test('Page Playwright test', async ({page})=>
{
await page.goto("https://www.google.com/");
console.log(await page.title());
//assertions to check the page title  
await expect(page).toHaveTitle("Google");
});

test('UIControlsTest',async ({page})=>
{
//open url
await page.goto("https://rahulshettyacademy.com/loginpagePractise");
//provide username
await page.locator("#username").fill("rahulshettyacademy");
//provide password
await page.locator("[type='password']").fill("Learning@830$3mK2");

//select radio button user
const radioBtn=page.locator(".radiotextsty");
await radioBtn.last().click();
//select okay from the pop-up
await page.locator("#okayBtn").click();
//assertion
await expect(radioBtn.last()).toBeChecked();
//or
console.log( await radioBtn.last().isChecked());


//select the option Consultant from static dropdown
const dropdown=page.locator("select.form-control");
await dropdown.selectOption("consult");

//select the check box for Terms
const checkBox= page.locator("#terms");
await checkBox.click();
//assertion
await expect(checkBox).toBeChecked();
//uncheck the checkbox
await checkBox.uncheck();
//assertion
expect(await checkBox.isChecked()).toBeFalsy();

 //check whether the link in the page is blinkable
 const documentLink=page.locator("[href*='documents-request']");
 await expect(documentLink).toHaveAttribute("class","blinkingText");
//pause the page
await page.pause();
});

test.only('child windows handle',async ({browser})=>
{
//open browser
const context=await browser.newContext();
//ope new page
const page=await context.newPage();
//open url
await page.goto("https://rahulshettyacademy.com/loginpagePractise");
//click the link
const documentLink=page.locator("[href*='documents-request']");
const [newpage]=await Promise.all(
    [
        context.waitForEvent('page'),
     documentLink.click(),
    ]);
//get the username
const text=await newpage.locator(".im-para.red").textContent();
const arrayText=text.split("@");
const domain=arrayText[1].split(" ")[0];
//console.log(domain);
//provide username
const userName=page.locator("#username");
await userName.fill(domain);
//get the text in username
console.log(await userName.inputValue());
//pause
await page.pause();
});