const {test,expect}=require('@playwright/test');
import { Page,Locator } from "@playwright/test";

export class OrdersHistoryPage {
    page:Page;
    ordertable:Locator;
    rows:Locator;
    orderIddetails:Locator;

    constructor(page:Page) {
        this.page = page;
        this.ordertable=page.locator("tbody");
        this.rows=page.locator("tbody tr");
        this.orderIddetails=page.locator(".col-text");
    }

    async searchOrderandSelect(orderId:any) {
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