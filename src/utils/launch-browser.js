const puppeteer = require('puppeteer');
const UserAgent = require('user-agents');
// const axios = require('axios');
// const proxyChain = require('proxy-chain');
const config = require('../config');
const goStealth = require('./go-stealth');

module.exports = class LaunchBrowser {
  async getInstance() {
    const userAgent = new UserAgent({ deviceCategory: 'desktop' });
    // const proxyResponse = await axios({
    //   method: 'get',
    //   url: 'http://35.226.105.91/getproxy.php'
    // });

    // console.log(proxyResponse.data);
    // const proxyData = proxyResponse.data;

    // const proxyUrl = `${proxyData.data.host}:${proxyData.data.port}`;
    // const proxyServer = await proxyChain.anonymizeProxy(proxyUrl);

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
    const browser = await puppeteer.launch(launchingArgs);
    const page = await browser.newPage();
    await goStealth(page);
    await page.waitFor(2000);
    return { browser, page };
  }
};
