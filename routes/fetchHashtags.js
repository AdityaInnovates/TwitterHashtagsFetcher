const express = require("express");
const router = express.Router();
const { Builder, By, until } = require("selenium-webdriver");
const uuid = require("uuid");
const Trend = require("../models/Trend");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

const fetchTwitterTrends = async () => {
  const extensionPath = path.join(__dirname, "../extension");

  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--headless");
  //For Adding Rotating ProxyMesh Proxy
  chromeOptions.addArguments(`--load-extension=${extensionPath}`);
  chromeOptions.addArguments("--disable-dev-shm-usage");
  chromeOptions.addArguments("--ignore-certificate-errors");
  chromeOptions.addArguments("--ignore-ssl-errors");
  // For Running Twitter In Headless MODE
  chromeOptions.addArguments("--disable-gpu");
  chromeOptions.addArguments("--enable-automation");
  chromeOptions.addArguments("--window-size=1920,1080");
  chromeOptions.addArguments("--disable-blink-features");
  chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
  chromeOptions.addArguments("--headless=new");
  chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
  chromeOptions.addArguments(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
  );
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  try {
    const cookies = [
      {
        name: "auth_token",
        value: process.env.TWITTER_AUTH_TOKEN,
        domain: ".x.com",
      },
      {
        name: "ct0",
        value: process.env.TWITTER_CT0,
        domain: ".x.com",
      },
      {
        name: "personalization_id",
        value: process.env.TWITTER_PERSONALIZED_ID,
        domain: ".x.com",
      },
      {
        name: "twid",
        value: process.env.TWITTER_TWID,
        domain: ".x.com",
      },
    ];
    await driver.get("https://x.com");
    await driver.sleep(5000);
    for (const cookie of cookies) {
      await driver.manage().addCookie(cookie);
    }
    await driver.get("https://x.com/explore/tabs/trending");

    const elementLocator = By.css(
      "div[aria-label='Timeline: Explore'] > div > div"
    );
    await driver.wait(until.elementLocated(elementLocator), 100000);

    const trendsText = [];
    const trendElements = await driver.findElements(elementLocator);
    for (const el of trendElements) {
      const innerText = await el.getText();
      const lines = innerText.split("\n");
      trendsText.push({
        title: lines[3],
        region: lines[2],
      });
    }

    const ipAddress = await driver
      .get("https://api.ipify.org?format=json")
      .then(async () => {
        const response = await driver.executeScript(
          "return document.body.innerText;"
        );
        return JSON.parse(response).ip;
      });

    const uniqueId = uuid.v4();
    return {
      unique_id: uniqueId,
      AllTrends: trendsText.slice(0, 5),
      date_time: new Date().toISOString(),
      ip_address: ipAddress,
    };
  } catch (error) {
    console.error("Error with proxy connection:", error);
    throw error;
  } finally {
    await driver.quit();
  }
};

router.post("/", async (req, res) => {
  try {
    var data = await fetchTwitterTrends();
    const trend = new Trend(data);
    await trend.save();
    res
      .status(200)
      .json({ message: "Hashtags fetched and stored successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching hashtags", error: error.message });
  }
});

module.exports = router;
