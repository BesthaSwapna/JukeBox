const fs = require('fs');
const Logger = require('../loaders/logger');
const config = require('../config');

class ExtractionHelper {
  constructor(jobId) {
    this.jobId = jobId;
    this.logs = [];
  }

  static async waitForSelector(data, page) {
    try {
      if (data.type === 1) {
        await page.waitForSelector(data.selector);
      } else {
        await page.waitForXPath(data.selector);
      }
    } catch (error) {
      // Just nothing to do. Ignore
    }
  }

  /**
   *
   * @param {*} data
   * @param {*} page
   */
  static async getSelector(data, page) {
    const selectorSchema = data;

    let selector = null;
    let frame = page;
    if (selectorSchema.isItInIFrame) {
      // Check if the element is inside the iframe, If so we need loop through frames,
      // if the matching frame found, then need to check the element in that particular iframe
      try {
        const frames = page.frames();
        for (let i = 0; i < frames.length; i += 1) {
          try {
            if (selector == null) {
              frame = frames[i];
              if (selectorSchema.type === 1) {
                selector = await frame.$(selectorSchema.selector);
              } else {
                [selector] = await frame.$x(selectorSchema.selector);
              }
              if (selector != null) {
                selector.frameObj = frame;
              }
            }
          } catch (e) {
            console.log('Error getting name of iframe', e);
            // return selector;
          }
        }
        // return selector;
      } catch (error) {
        // return selector;
      }
    }

    if (selector != null) {
      return selector;
    }
    if (selectorSchema.type === 1) {
      selector = await page.$(selectorSchema.selector);
    } else {
      [selector] = await page.$x(selectorSchema.selector);
    }
    return selector;
  }

  /**
   *
   * @param {Number} timeout
   * @param {Function} functionTOExecute
   */
  static async setPuppeteerTimeout(timeout, functionTOExecute) {
    return setTimeout(() => {
      try {
        functionTOExecute();
      } catch (e) {
        this.log('error', 'Puppeteer timeout Error: ', e);
      }
    }, 1000 * 60 * timeout);
  }

  static async setUserCookiesInBrowser(page, cookies) {
    // If file exist load the cookies
    if (cookies.length !== 0) {
      for (const cookie of cookies) {
        await page.setCookie(cookie);
      }
      this.log('info', 'Session has been loaded in the browser', cookies);
      return true;
    }
  }

  /**
   *
   * @param {*} elementHandle
   * @param {String} value
   */
  static async clearAndFill(elementHandle, value) {
    await elementHandle.click();
    await elementHandle.focus();
    // click three times to select all
    await elementHandle.click({
      clickCount: 3
    });
    // Clear the text if anything in the input
    await elementHandle.press('Backspace');
    await elementHandle.type(value.toString());
  }

  /**
   *
   * @param {String} type
   * @param {String} text
   * @param {*} data
   */
  log(type, message, data) {
    const log = {
      message,
      data: type === 'info' ? data && JSON.stringify(data) || data : (data && data.toString()) || '',
      label: this.jobId,
    };
    this.logs.push({ type, ...log, timestamp: new Date() });
    if (type === 'error') {
      console.log('\x1b[31m');
      Logger[type](log);
    } else {
      console.log('\x1b[32m');
      Logger[type](log);
    }
  }

  async takeScreenshot(page, prefix) {
    try {
      if (config.headless) {
        // eventHandler.updateScraperStage('TAKING_SCREENSHOT', this.bill, true, true, true, true);
        const pdfLocation = `${this.jobId}/${prefix}${new Date().getTime()}.png`;
        if (!fs.existsSync(`./screenshots/${this.jobId}`)) {
          fs.mkdirSync(`./screenshots/${this.jobId}`);
        }
        await page.screenshot({
          path: `./screenshots/${pdfLocation}`
        });
        await page.waitFor(1 * 1000); // waiting for 1 second To let it finish the storing the file
      }
    } catch (error) {
      this.log('error', 'could not take screenshot', error);
    }
  }
}

module.exports = ExtractionHelper;
