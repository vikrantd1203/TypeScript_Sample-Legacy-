import { Builder, By, until, Capabilities } from 'selenium-webdriver';
import * as https from 'https';
async function runTest() {

  // Create capabilities for BrowserStack
  const cap = new Capabilities();
    cap.set("osVersion", "10");
    cap.set("os", "Windows");
    cap.set("browserName","Chrome");


    console.log('Capabilities:', cap);
    
    // Initialize the WebDriver to use BrowserStack's remote server
    const driver = await new Builder()
    .usingServer("https://username:access_key@hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(cap) // Set capabilities
    .usingHttpAgent(
      new https.Agent({
          keepAlive: true,
          keepAliveMsecs: 1000000,
        })
    )
    .build();
    
    try {
        // Navigate to Google
        await driver.get('https://www.google.com');
    
        // Find the search box using its name attribute
        const searchBox = await driver.findElement(By.name('q'));
    
        // Type a search term into the search box
        await searchBox.sendKeys('Selenium WebDriver');
    
        // Press Enter to search
        await searchBox.submit();
    
        // Wait until the title contains the word "Selenium"
        await driver.wait(until.titleContains('Selenium'), 5000);
    
        // Get the title of the page
        const title = await driver.getTitle();
        console.log('Page title is:', title);
      } finally {
        // Quit the driver and close the browser
        await driver.quit();
      }
}

// Run the test
runTest().catch(err => console.error('Unexpected error:', err));