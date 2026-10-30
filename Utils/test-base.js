//Importing the Playwright Test module and adding it to the variable base
const base = require('@playwright/test');

//extend test capabilities
//base.test.extend() → Creates an extended Playwright test object with your custom fixture.
//customtest → The name you give to that extended test object.
//exports.customtest → Exports it so other JavaScript files can import and use it.
exports.customtest = base.test.extend({
//creating custom fixture named testDataforOrder, which contains which contains test data 
// such as the username, password, and product name.
testDataforOrder: {

        username: "liniantony1234@gmail.com",
        password: "welcome123",
        productName : "ZARA COAT 3"
    }
});
    
