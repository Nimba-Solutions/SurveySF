

module.exports = {
  "browsers": [`chrome:${require("puppeteer").executablePath()}:headless`],
  "concurrency": 4,
  "quarantineMode": {
    "successThreshold": 1,
    "attemptLimit": 5
  }
}