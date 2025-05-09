const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🧠 YouTube Puppeteer API is running!");
});

app.get("/info", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const title = await page.title();
  const thumbnail = await page.$eval("link[rel='shortcut icon']", el => el.href);

  await browser.close();

  res.json({ title, thumbnail });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
