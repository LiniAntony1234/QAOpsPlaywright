import { test, Page, Locator , expect} from "@playwright/test";

export class OrdersreviewPage{
    page:Page;
    cvv:Locator;
    name:Locator;
    country:Locator;
    autoDropdown:Locator;
    shippinginfomail:Locator;
    placeOrderlocator:Locator;

constructor(page:Page){
   this.page=page;
   this.cvv=page.locator("input[class='input txt']");
   this.name=page.locator("input[class='input txt']");
   this.country=page.locator("[placeholder*='Country']");
    this.autoDropdown=page.locator(".ta-results");
    this.shippinginfomail=page.locator(".user__name [type='text']").first();
    this.placeOrderlocator=page.locator(".action__submit");
}
async providePersonalInfo(cvv:any, nameonCard:any){
 //provide cvv card and name
    await this.cvv.nth(0).fill(cvv);
    await this.name.nth(1).fill(nameonCard);
}

async searchCountryandSelect(searchtext:string,countrytoselect:string){
//select country=india from auto suggestive dropdown
        //search with ind
    await this.country.pressSequentially(searchtext,{delay:150});
    await this.autoDropdown.waitFor();
    const count2=await this.autoDropdown.locator("button").count();
    for(let i=0;i<count2;++i)
    {
        let text: any;
      text=await this.autoDropdown.locator("button").nth(i).textContent();
    /// console.log(text);
        if (text.trim()=== countrytoselect)
        {
            await this.autoDropdown.locator("button").nth(i).click();
            break;
        }
    }
 }   
async checkshippingInfo(username:string){
//asserion for email id given in Shipping Information
await expect(this.shippinginfomail).toHaveText(username);
   } 

async submitandgetOrderid(){
    //click on Place Oder
    await this.placeOrderlocator.click();
    //assertion for final page to show text=Thankyou for the order.
await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//print orderid
const orderId=await this.page.locator("label.ng-star-inserted").textContent()
return orderId
}
}
//export the page
module.exports={OrdersreviewPage};