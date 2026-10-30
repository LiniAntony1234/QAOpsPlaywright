class LoginPage{
constructor(page){
    this.page=page;
    this.username=page.locator("#userEmail");
    this.password=page.locator("[type='password']");
    this.login=page.locator("[name='login']");
    }

async goTo(){
//open url
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}
    async validLogin(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login.click();
        await this.page.waitForLoadState("networkidle");
    }
}
//exportiing the class
module.exports={LoginPage};