const puppeteer = require('puppeteer');
const UserAgent = require('user-agents');
// const axios = require('axios');
// const proxyChain = require('proxy-chain');
const { EventEmitter } = require('events');
const config = require('../config');
const goStealth = require('./go-stealth');
const Helper = require('./helper');
const schema = require('../config/automation.json');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let browser = null;
let loggedIn = false;
let isLoggingIn = false;
let eventEmitter = null;
const helper = new Helper('FedExClass');
const creds = config.creds;

module.exports = class FedEx {

  async getBrowser() {
    if (browser != null) {
      return { browser };
    }

    const userAgent = new UserAgent({ deviceCategory: 'desktop' });

    const launchingArgs = {
      headless: config.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1388,
        height: 774
      },
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--safebrowsing-disable-download-protection',
        // `--proxy-server=${proxyServer}`,
        `--user-agent=${userAgent.toString()}`
      ]
    };
    browser = await puppeteer.launch(launchingArgs);
    return browser;
  }

  async getPage() {
    if (browser != null) {
      const page = await browser.newPage();
      await goStealth(page);
      await page.waitFor(2000);
      return { browser, page };
    }

    browser = await this.getBrowser();
    const page = await browser.newPage();
    await goStealth(page);
    await page.waitFor(2000);
    return { browser, page };
  }

  async getLoggedInInstance() {
    const { browser, page } = await this.getPage();
    if (!loggedIn) {
      if (isLoggingIn) {
        await this.waitForLoginToComplete();
        await this.openPage(page);
        return { browser, page, eventEmitter: this.getEventEmitter() };
      }
      isLoggingIn = true;
      await this.openPage(page);
      await this.login(page);
      loggedIn = true;
      isLoggingIn = false;
    } else {
      await this.openPage(page);
    }
    return { browser, page, eventEmitter: this.getEventEmitter() };
  }

  getEventEmitter() {
    if (eventEmitter) {
      return eventEmitter;
    }
    eventEmitter = new EventEmitter();
    return eventEmitter;
  }

  async removeCurrentBrowser() {
    if (eventEmitter) {
      eventEmitter.emit('stop');
      await delay(2000);
    }
    if (browser) {
      try {
        browser.close();
      } catch (error) {
        // ignore
      }
    }

    browser = null;
    loggedIn = false;
    isLoggingIn = false;
    eventEmitter = null;
  }

  async openPage(page) {
    const url = schema.login.pageUrl;
    helper.log('info', 'Opening the Page');
    await page
      .goto(url, { waitUntil: 'networkidle0', timeout: 0 })
      .catch(error => {
        helper.log('info', 'Could not open page for Login' + error);
        page.reload();
      });
  }

  async login(page) {

    helper.log('info', 'Entering Login');

    await this.enterValue(schema.login.uname, creds.uname, page, true);
    await this.enterValue(schema.login.pwd, creds.pwd, page, true);

    try {
      await Promise.all([
        this.click(schema.login.submit, page),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
      ]);
    } catch (error) {
      helper.log('error', 'Ignore - Navigation timeout')
    }

    helper.log('info', 'Exiting Login');
  }

  async logout(page) {
    await page
      .goto(schema.logout.pageUrl, {
        waitUntil: 'networkidle0',
        timeout: 0
      })
      .catch(error => {
        helper.log('info', 'Could not open page for Login' + error);
      });

    await page.waitFor(2 * 1000);

    try {
      await Promise.all([
        this.click(schema.logout.button, page),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
      ]);
    } catch (error) {
      helper.log('error', 'Ignore - Navigation timeout')
    }

    await page.waitFor(2 * 1000);

  }

  async waitForLoginToComplete() {
    for (let index = 0; index < 30000; index++) {
      if (loggedIn) {
        return;
      } else {
        await delay(2000);
      }
    }
  }

  async enterValue(selector, value, page, exitOnError = false) {
    let ele = null;
    try {
      ele = await Helper.getSelector(selector, page);
      await Helper.clearAndFill(ele, value);
    } catch (error) {
      helper.log('error', 'could not type into: ' + selector.selector, error);
      await helper.takeScreenshot(page, `Error_`);
      if (exitOnError) throw error;
    }
  }

  async click(selector, page) {
    let ele = null;
    try {
      ele = await Helper.getSelector(selector, page);
      await ele.click();
    } catch (error) {
      helper.log('error', 'could not click: ' + selector.selector, error);
      await helper.takeScreenshot(page, `Error_`);
    }
  }

};
