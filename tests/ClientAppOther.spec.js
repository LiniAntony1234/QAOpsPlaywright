const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('firstTest', async ({page})=>
{
//open url
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

//provide username & password & click submit
const username="liniantony1234@gmail.com";
await page.getByPlaceholder("email@example.com").fill("liniantony1234@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("welcome123");
await page.getByRole("button",{name:"Login"}).click();

//get all the poduct name
await page.locator(".card-body b").first().waitFor();
const product=await page.locator(".card-body b").allTextContents();
console.log(product);

//click on 'Add to Cart' for product=ZARA COAT 3
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",
    {name:" Add To Cart"}).click();

//go to cart page
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

//check whether the product selected is displayed in Add to cart page
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();

//Go to CheckOut page
await page.getByRole("button",{name:"Checkout"}).click();


//select country=india from auto suggestive dropdown
await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
await page.getByRole("button",{name:"India"}).nth(1).click();
//click on Place order buttom
await page.getByText("PLACE ORDER").click();
//assertion for final page to show text=Thankyou for the order.
await expect(page.getByText("Thankyou for the order.")).toBeVisible();

//print orderid
const orderId=await page.locator("label.ng-star-inserted").textContent()
console.log(orderId);

//click on orders tab
await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click();

//wait for loading the page
await page.locator("tbody").waitFor();
//check the order id you have placed is there in the Order page
await page.locator("tbody tr th").filter({hasText:orderId}).getByRole("button",{name:"View"}).
click();

//check whether the order summary page has correct orderId
const orderidsummarypage=await page.locator(".col-text").textContent();
expect(orderId.includes(orderidsummarypage)).toBeTruthy();
});
