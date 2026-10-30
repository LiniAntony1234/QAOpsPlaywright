// @ts-check
const {devices} =require ('@playwright/test');
const { trace } = require('node:console');
const { clearScreenDown } = require('node:readline');
/** 
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  testMatch:'**/*.spec.js',
  /*timeouts*/
  timeout:60000,
  /*asserton timeouts*/
  expect:{
    timeout:60000
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /*open in firefox
    browserName: "firefox", 
    *open in safari 
    browserName: "webkit", */
    //open in chrome
    browserName: "chromium",
    headless: false,
    screenshot: 'on',
    trace: 'on'

  },
  
});

module.exports=config;