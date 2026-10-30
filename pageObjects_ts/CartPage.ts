import { Page,Locator,expect } from "@playwright/test";
//exporting the class
export class CartPage {
page:Page;
productSelected:Locator;
Checkoutlocator:Locator;

    constructor(page:Page) {
        this.page = page;
        this.productSelected = page.locator("div li").first();
        this.Checkoutlocator = page.locator("text=Checkout");
    }
    async verifyProductisDisplayed(productname:String) {
        //check whether the product selected is displayed in Add to cart page
        await this.productSelected.waitFor();
        const bool = await this.getProductLocator(productname).isVisible();
        expect(bool).toBeTruthy();

    }

    async navigateToCheckout() {
        //Go to CheckOut page
        await this.Checkoutlocator.click();
    }
    getProductLocator(productname:String){
return this.page.locator("h3:has-text('"+productname+"')");
    }

}

//exporting the class
module.exports = { CartPage };