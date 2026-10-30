/*const { CartPage } = require("./CartPage");
//corresponding import code in TS */
import {CartPage} from './CartPage';
import {DashboardPage} from './DashboardPage';
import {LoginPage} from './LoginPage';
import {OrdersHistoryPage} from './OrdersHistoryPage';
import  { OrdersreviewPage } from './OrdersreviewPage';
import { Page } from '@playwright/test';

export class POManager {
    //defing the data type of items added in constructor
    page:Page;
    loginpage:LoginPage;
    dashboardpage:DashboardPage;
    cartpage:CartPage;
    ordersreviewpage:OrdersreviewPage;
    orderhistorypage:OrdersHistoryPage;

    constructor(page:Page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.dashboardpage = new DashboardPage(page);
        this.cartpage = new CartPage(page);
        this.ordersreviewpage = new OrdersreviewPage(page);
        this.orderhistorypage = new OrdersHistoryPage(page);
    }
    getLoginpage() {
        return this.loginpage;
    }
    getDashboardpage() {
        return this.dashboardpage;
    }
    getCartpage() {
        return this.cartpage;
    }
    getOrdersReviewPage() {
        return this.ordersreviewpage;
    }
    getOrdersHistoryPage() {
        return this.orderhistorypage;
    }
}
//module.exports = { POManager };