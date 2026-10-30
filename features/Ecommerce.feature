Feature: : Ecommerce validation
@Regression
Scenario: Placing the Order
Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
When Add "ZARA COAT 3" to Cart
Then Verify "ZARA COAT 4" is displayed in the Cart
When Enter valid details and place the order
Then Verify order is present in OrderHistory


@validation
Scenario Outline: Placing the order
Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify error message is displayed  

Examples:
    | username    | password | 
    | rahulshetty | Learning@830$3mK2 |
   

