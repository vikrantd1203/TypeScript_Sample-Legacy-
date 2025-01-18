import { Builder, By, until } from 'selenium-webdriver';

async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();

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
runTest().catch(err => console.error('Test failed:', err));
