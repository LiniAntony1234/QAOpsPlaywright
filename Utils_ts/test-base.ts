import {test as baseTest} from '@playwright/test';
interface TestDataforOrder {
 username: string;
 password: string;
 productName: string; 
};
//extend test capabilities
export const customTest = baseTest.extend<{testDataforOrder:TestDataforOrder}>(
    {
testDataforOrder: {
        username: "liniantony1234@gmail.com",
        password: "welcome123",
        productName : "ZARA COAT 3"
    }
});
    
