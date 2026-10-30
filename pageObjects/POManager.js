const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");
const { OrdersreviewPage } = require("./Ordersreviewpage");

class POManager {
    constructor(page) {
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
module.exports = { POManager };