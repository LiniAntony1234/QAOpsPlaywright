const {test,expect}=require('@playwright/test');
class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordertable=page.locator("tbody");
        this.rows=page.locator("tbody tr");
        this.orderIddetails=page.locator(".col-text");
    }

    async searchOrderandSelect(orderId) {
        //wait for loading the page
        await this.ordertable.waitFor();
        //check the order id you have placed is there in the Order page
        for (let i = 0; i < await this.rows.count(); i++) {
            const rowid = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowid)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
    async getOrderid(){
          //check whether the order summary page has correct orderId
        const orderidsummarypage = await this.orderIddetails.textContent();
        return orderidsummarypage;
    }
      
    }

module.exports = { OrdersHistoryPage };