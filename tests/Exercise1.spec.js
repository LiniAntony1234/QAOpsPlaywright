const {test,expect}=require ('@playwright/test');
const { log } = require('node:console');

const BASE_URL ='https://eventhub.rahulshettyacademy.com'
const username="liniantony1234@gmail.com";
const pwd="Welcome@123";

async function login(page){
//await page.goto('${BASE_URL}/login');
 await page.goto(`${BASE_URL}/login`);

//login
await page.getByPlaceholder("you@email.com").fill("liniantony1234@gmail.com");
await page.getByLabel("password").fill("Welcome@123");
await page.locator("#login-btn").click();
await expect(page.getByText("Browse Events →")).toBeVisible();
};

test('Create Event Test', async ({page})=>{
//login
await login(page);
//Create a new event via the admin form 
const title="Obsqura"
  await page.goto(`${BASE_URL}/admin/events`);
  await page.locator("#event-title-input").fill(title);
  await page.locator("textarea").fill("description");
  await page.getByLabel("city").fill("Pune");
  await page.getByLabel("venue").fill("Charholi");
  await page.getByLabel("Event Date & Time").fill('2026-10-15T14:30');
  await page.getByLabel("Price ($)").fill("1000");
  await page.getByLabel("Total Seats").fill("1000");
  await page.getByRole("button",{name:"+ Add Event"}).click();
  await expect(page.getByText("Event created!")).toBeVisible();

  await page.goto(`${BASE_URL}/events`);
  await page.locator("#event-card").first().waitFor();
  await expect(page.locator("#event-card").first()).toBeVisible();
  //await expect(page.locator("#event-card").filter({hastext:title})).toBeVisible();
  await page.locator("#event-card").filter({hastext:title}).click();
await page.pause();


});

