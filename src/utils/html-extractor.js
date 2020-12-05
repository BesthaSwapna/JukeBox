/* eslint-disable prefer-destructuring */
const HtmlTableToJson = require('html-table-to-json');

class HtmlExtractor {
  // Grab data from table
  static async grabDataFromTable(page, selector) {
    try {
      if (selector.type === 1) {
        await page.waitForSelector(selector.selector);
        const data = await page
          .$eval(
            selector.selector,
            heading =>
              // return heading.innerText;
              heading.innerHTML
          )
          .then(result => {
            const jsonTables = new HtmlTableToJson(result);
            return jsonTables.results;
          });
        return data[0];
      }
      await page.waitForXPath(selector.selector);
      const xpathdata = await page.$x(selector.selector);

      const html = await page.evaluate(el => el.innerHTML, xpathdata[0]);
      const jsonTables = new HtmlTableToJson(html);
      const data = jsonTables.results;
      return data[0];
    } catch (e) {
      // this.logger('error', 'Error while fetching data from HTML Table', e);
      console.log('error', 'Error while fetching data from HTML Table', e);
      return null;
    }
  }

  // Grab data from inner Text
  static async grabDataInnerText(page, selector) {
    try {
      let element = null;
      element = await HtmlExtractor.getSingleSelector(selector, page);
      const data = await page.evaluate(ele => ele.textContent, element);
      return data.trim();
    } catch (e) {
      // this.logger('error', 'Error while fetching data from HTML innerText', e)
      console.log('error', 'Error while fetching data from HTML innerText', e);
      return null;
    }
  }

  // Grab data from inner Text
  static async grabTextFromElement(elementHandle, selector) {
    try {
      const data = await elementHandle.$eval(selector, ele => ele.textContent);
      return data.trim();
    } catch (e) {
      // this.logger('error', 'Error while fetching data from HTML innerText', e)
      console.log('error', 'Error while fetching data from HTML innerText', e);
      return null;
    }
  }

  // Grab data from Dropdown
  async getOtionsFromSelect(page, selector, attribute) {
    try {
      const data = await page.$$eval(
        selector.selector,
        (aTags, attr) =>
          aTags.map(a => {
            const val = {};
            if (a.getAttribute(attr)) {
              val.value = a.getAttribute(attr);
            } else {
              val.value = a.innerText;
            }
            val.opt = a.innerText;
            return val;
          }),
        attribute
      );
      // console.log(data)
      return data;
    } catch (e) {
      console.log('Error in Select Option Extraction', e);
      return null;
    }
  }

  // Set value for Dropdown
  async setValueForSelector(page, eleSelector, value) {
    const selector = eleSelector.replace(/> option/g, '');
    console.log('selector in set selector', selector, value);
    try {
      await page.evaluate(
        data => {
          document.querySelector(data.selector).value = data.value;
        },
        { selector, value }
      );
      await page.select(selector, value);
    } catch (e) {
      console.log(e);
    }
  }

  // Get Value from Attribute
  async getAttributeValue(page, selector, attribute) {
    let data = '';
    try {
      if (selector.type === 1) {
        [data] = await page.$$eval(selector.selector, (aTags, attr) => aTags.map(a => a.getAttribute(attr)), attribute);
      } else {
        const [linkHandle] = await page.$x(selector.selector);
        const hrefHandle = await linkHandle.getProperty(attribute);
        [data] = await hrefHandle.jsonValue();
      }
      if (selector.isFunctionRequired) {
        return await this.processData(selector, data);
      }
      return data;
    } catch (e) {
      console.log('Error in get Attribute Value', e);
      return null;
    }
  }

  static async getValue(page, selector) {
    try {
      let data = '';

      data = await page.$$eval(selector.selector, aTags => {
        return aTags.map(a => a.value);
      });
      console.log('Attribute Value', data[0]);
      return data[0];
    } catch (e) {
      console.log('Error', e);
      return null;
    }
  }

  async getSelector(data, page) {
    let selector = null;
    if (data.isItInIFrame) {
      try {
        const frames = await page.frames();
        for (let i = 0; i < frames.length; i += 1) {
          try {
            if (selector == null || !selector.length) {
              const frame = frames[i];
              console.log('frame------->', frame.name(), frame.title(), frame.url());
              if (data.type === 1) {
                selector = await frame.$$(data.selector);
              } else {
                selector = await frame.$x(data.selector);
              }
            }
          } catch (e) {
            console.log('Error getting name of iframe', e);
          }
        }
        return selector;
      } catch (error) {
        return selector;
      }
    }

    if (data.type === 1) {
      // await page.waitForSelector(data.selector);
      selector = await page.$$(data.selector); // To get multiple css selector elements
    } else {
      // await page.waitForXPath(data.selector);
      selector = await page.$x(data.selector); // To get multiple xpath elements
    }
    return selector;
  }

  static async getSingleSelector(data, page) {
    let selector = null;
    if (data.isItInIFrame) {
      try {
        const frames = await page.frames();
        for (let i = 0; i < frames.length; i += 1) {
          try {
            if (selector == null) {
              const frame = frames[i];
              if (data.type === 1) {
                selector = await frame.$(data.selector);
              } else {
                [selector] = await frame.$x(data.selector);
              }
            }
          } catch (e) {
            console.log('Error getting name of iframe', e);
          }
        }
        return selector;
      } catch (error) {
        return selector;
      }
    }

    if (data.type === 1) {
      selector = await page.$(data.selector); // To get single css selector elements
    } else {
      [selector] = await page.$x(data.selector); // To get single xpath elements
    }
    return selector;
  }

  async getFrame(data, page) {
    let selector = null;
    const finalFrame = null;
    if (data.isItInIFrame) {
      try {
        const frames = await page.frames();
        for (let i = 0; i < frames.length; i += 1) {
          try {
            let frame = null;
            if (selector == null) {
              frame = frames[i];
              if (data.type === 1) {
                selector = await frame.$(data.selector);
              } else {
                [selector] = await frame.$x(data.selector);
              }
            }

            if (selector !== null) {
              return frame;
            }
          } catch (e) {
            console.log('Error getting name of iframe', e);
          }
        }
        return finalFrame;
      } catch (error) {
        return finalFrame;
      }
    }
  }
}

module.exports = HtmlExtractor;
