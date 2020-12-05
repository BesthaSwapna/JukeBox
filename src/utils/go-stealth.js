// const request = require('request');

const goStealth = async page => {
  /** page width and height */
  await page.setViewport({
    width: 1366,
    height: 685
  });

  // Pass the Webdriver Test.
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });
  });

  // Pass the Chrome Test.
  await page.evaluateOnNewDocument(() => {
    // We can mock this in as much depth as we need for the test.
    window.navigator.chrome = {
      runtime: {}
      // etc.
    };
  });

  // Pass the Permissions Test.
  await page.evaluateOnNewDocument(() => {
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = parameters =>
      parameters.name === 'notifications'
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters);
    return window.navigator.permissions.query;
  });

  // Pass the Plugins Length Test.
  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'plugins', {
      // This just needs to have `length > 0` for the current test,
      // but we could mock the plugins too if necessary.
      get: () => [1, 2, 3, 4, 5]
    });
  });

  // Pass the Languages Test.
  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en']
    });
  });

  // const getIp = async () =>
  //   new Promise((resolve, reject) => {
  //     request('https://api.ipify.org/?format=json', (error, ipResponse, ipBody) => {
  //       resolve(JSON.parse(ipBody));
  //     });
  //   });

  // const getGeoLocation = async ip =>
  //   new Promise((resolve, reject) => {
  //     request(
  //       `http://ip-api.com/json/${ip}?fields=country,region,lat,lon,status`,
  //       (error, ipResponse, ipBody) => {
  //         resolve(JSON.parse(ipBody));
  //       }
  //     );
  //   });

  // TODO: check if we can make request with proxy
  // try {
  //   const ipInfo = await getIp();
  //   const geoLoc = await getGeoLocation(ipInfo.ip);
  //   console.log('IP and location: ', ipInfo, geoLoc);
  //   await page.evaluateOnNewDocument(() => {
  //     navigator.geolocation.getCurrentPosition = cb => {
  //       setTimeout(() => {
  //         cb({
  //           coords: {
  //             accuracy: 21,
  //             altitude: null,
  //             altitudeAccuracy: null,
  //             heading: null,
  //             latitude: geoLoc.lat,
  //             longitude: geoLoc.lon,
  //             speed: null
  //           }
  //         });
  //       }, 1000);
  //     };
  //   });
  // } catch (error) {
  //   console.log('evaluateOnNewDocument', error);
  // }
};

module.exports = goStealth;
