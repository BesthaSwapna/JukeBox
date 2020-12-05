async function randomMouseMovement(page) {
  try {
    // Scroll to bottom
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

    // Random mouse movement
    await page.mouse.move(
      Math.floor(Math.random() * (1000 - 0 + 1)),
      Math.floor(Math.random() * (1000 - 0 + 1))
    );
    await page.mouse.move(
      Math.floor(Math.random() * (1000 - 0 + 1)),
      Math.floor(Math.random() * (1000 - 0 + 1))
    );
  } catch (e) {
    console.log('Error in mouse moving');
  }
}

async function mouseMoveToElement(page, selector) {
  try {
    await this.randomMouseMovement(page);
    let selectedElem = selector;

    const boundingBox = await selectedElem.boundingBox();

    // Move to middle of the element
    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2,
      boundingBox.y + boundingBox.height / 2
    );
  } catch (e) {
    console.log('Error in mouse moving');
  }
}

module.exports = { randomMouseMovement: randomMouseMovement, mouseMoveToElement: mouseMoveToElement };
