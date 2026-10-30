const {test,expect}=require('@playwright/test');
class CartPage {

    constructor(page) {
        this.page = page;
        this.productSelected = page.locator("div li").first();
        this.Checkoutlocator = page.locator("text=Checkout");
    }
    async verifyProductisDisplayed(productname) {
        //check whether the product selected is displayed in Add to cart page
        await this.productSelected.waitFor();
        const bool = await this.getProductLocator(productname).isVisible();
        await expect(bool).toBeTruthy();

    }

    async navigateToCheckout() {
        //Go to CheckOut page
        await this.Checkoutlocator.click();
    }
    getProductLocator(productname){
return this.page.locator("h3:has-text('"+productname+"')");
    }

}

//exporting the class
module.exports = { CartPage };