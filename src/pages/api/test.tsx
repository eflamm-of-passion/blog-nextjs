import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser } from "puppeteer-core";
import Chromium from "chrome-aws-lambda";

// TODO add a short section (soft skills)
// TODO apprenticeship at Mosica about the CI/CD platform
// TODO enhance my description

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
  // res: NextApiResponse<string>
) {
  const browserExecPath = await Chromium.executablePath;
  // const browserExecPath = "/usr/bin/chromium";
  const browser: Browser = await puppeteer.launch({
    args: Chromium.args,
    executablePath: browserExecPath,
    defaultViewport: Chromium.defaultViewport,
    headless: Chromium.headless,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 1200,
    isMobile: false,
    hasTouch: false,
  });

  await page.setContent("hello world");
  await page.waitForSelector("img");
  const pdf = await page.pdf({
    format: "a4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  // Serve the PDF document as a response
  // res.setHeader("Content-Type", "text/html");
  // res.send(html);
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);
}
