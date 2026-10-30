import { Page,Locator } from "@playwright/test";

export class DashboardPage{
page:Page;
products:Locator;
productTitle:Locator;
cartLocator:Locator;
orderlocator:Locator;

constructor(page:Page){
this.page=page;
this.products=page.locator(".card-body");  
this.productTitle=page.locator(".card-body b"); 
this.cartLocator=page.locator("[routerlink*='cart']");
//click on orders tab
this.orderlocator= page.locator("[routerlink*='myorders']").first();
}



//click on 'Add to Cart' for product=ZARA COAT 3
async searchProductAddcart(productName:String){
 //get all the poduct name
const producttitle=await this.productTitle.allTextContents();
console.log(producttitle);
const count=await this.products.count();
    //iterating through each product
for(let i=0;i<count;i++)
{
    //check whether product has productName
    if(await this.products.nth(i).locator("b").textContent()==productName)
    {
        await this.products.nth(i).locator("text=Add To Cart").click();
        break;
    }
}
}

async navigateTocart(){
    //go to cart page
    await this.cartLocator.click(); 
}
async navigateToOrders(){
    //go to cart page
    await this.orderlocator.click(); 
}


}
//export the class
module.exports={DashboardPage};