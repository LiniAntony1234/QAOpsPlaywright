// @ts-check
const {devices} =require ('@playwright/test');
const { workers } = require('node:cluster');
const { trace } = require('node:console');
const { permission } = require('node:process');
const { clearScreenDown } = require('node:readline');
/** 
 * @see https://playwright.dev/docs/test-configuration
 */

const config=({
  testDir: './tests',
  //how many time to re-execute the test once it fails
  retries:1,
  //how many test to execute at a time
  workers:3,
  /*timeouts*/
  timeout:60000,
  /*asserton timeouts*/
  expect:{
    timeout:60000
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects:[
    {
        name: 'Safari',
        use: {
    browserName: "Webkit",
    headless: false,
    screenshot: 'on',
    //record video on failure
    video: 'retain-on-failure',
    //accept ssl certificate
    ignoreHttpsErrors: true,
    //set the window size to the size of iphone 11
    ...devices['iPhone 11'],
    //accepting location pop-up
    Permissions:['Geolocation'],
    trace: 'on'
  },
    },
    {
        name: 'chrome',
        use: {
    browserName: "chromium",
    headless: false,
    screenshot: 'on',
    trace: 'on',
    //set the window size
    viewport:{width:720,height:720}
  },
    }
  ]
  
  
});

module.exports=config;