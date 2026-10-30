const {test,expect}=require('@playwright/test');

test('Popup Validation Test', async ({page})=>
{
    //open url
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*navigate to another webesite
    await page.goto("https://www.google.com/");
    //navigate back
    await page.goBack();
    //navigate forward
    await page.goForward(); */
    //assertion for whether edit box is hidden or not
    await expect(page.locator("#displayed-text")).toBeVisible();
    //click on Hide button to hide the edit box
    await page.locator("#hide-textbox").click();
    //assertion for whether edit box is hidden or not
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    //accept the alert/dialog
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    //hover over Mouse Hover button
    await page.locator("#mousehover").hover();

    //handling frames
    const framepage=page.frameLocator("#courses-iframe");
    //click on All Access Plan button
    await framepage.locator("li a[href*='lifetime-access']:visible").click();
    //get the text in page
    const message=await framepage.locator("div[class='text']  h2").textContent();
    const subnum=await message.split(" ")[1];
    console.log(subnum);
})


test('@Web Screenshot Test',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'})
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path:'screenshot.png'})
})

test.only("Visual test",async ({page})=>{
//page.goto("https://www.flightaware.com/");
await page.goto("https://www.google.com/");
expect(await page.screenshot()).toMatchSnapshot('landingpage.png');
})
