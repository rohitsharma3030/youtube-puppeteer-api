const express = require("express");
const puppeteer = require("puppeteer-core");
const app = express();
const PORT = process.env.PORT || 3000;

// Chromium path where Puppeteer installs on Render
const CHROME_EXEC_PATH = '/opt/render/.cache/puppeteer/chrome/linux-127.0.6533.88/chrome-linux64/chrome';

app.get("/", (req, res) => {
  res.send("🧠 YouTube Puppeteer API is running!");
});

app.get("/info", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: CHROME_EXEC_PATH
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const title = await page.title();
    const favicon = await page.$eval("link[rel='shortcut icon']", el => el.href);

    await browser.close();
    res.json({ title, favicon });
  } catch (err) {
    res.status(500).json({ error: "Failed to scrape page", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
