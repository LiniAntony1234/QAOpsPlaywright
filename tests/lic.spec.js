const {test,expect}=require('@playwright/test')

test('@UI Playwright Special Locators', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/angularpractice/");

        //select the checkboxes and radiobuttons
        await page.getByLabel("Check me out if you Love IceCreams!").check();
        //or  await page.getByLabel("Check me out if you Love IceCreams!").click();
        await page.getByLabel("Employed").click();
        //or await page.getByLabel("Employed").check();

        //select the gender dropdown
        await page.getByLabel("Gender").selectOption("Female");
        //provide password
        await page.getByPlaceholder("Password").fill("abc");
        //click submit button
        await page.getByRole("button",{name:"Submit"}).click();
        //click on the validation message
        await page.getByText("Success! The Form has been submitted successfully!.").click();
        //click on the link shop
        await page.getByRole("link",{name:"Shop"}).click();
        //select Nokia Edge
        await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

});

test('Playwright Timeouts', async ({page})=>
{
//check whether validation message is visible
        //test level action timeout
        test.setTimeout(60000);
        page.setDefaultTimeout(9000);
        //test level assertion timeout
        const slowexpect=expect.configure({timeout:8000});
        await expect(page.getByText("Success! The Form has been submitted successfully!.")).
        toBeVisible();
        /*or
        await page.getByText("Success! The Form has been submitted successfully!.").isVisible();*/
        ////step level action timeout
         await page.getByRole("button",{name:"Submit"}).click({timeout:15000}); 
        //step level assertion timeout
        await expect(page.getByText("Success! The Form has been submitted successfully!.")).
        toBeVisible({timeout:10_000});
        await slowexpect(page.getByText("Success! The Form has been submitted successfully!.")).
        toBeVisible();
         await page.getByRole("link",{name:"Shop"}).click();



});