const devServer = require('@web/dev-server');
const puppeteer = require('puppeteer');
const startDevServer = devServer.startDevServer;

// TODO switch to usig a config file to make dry
const spaRouterMiddleware = (context, next) => {
  const spaRoutes = ['blog', 'resume', 'projects'];
  const isSpa = spaRoutes.find(route => context.url.indexOf(`/${route}`) === 0);
  if (isSpa) {
    // force spa routes
    context.url = '/';
  }

  return next();
};

/**
 * Goal - static generate PDF resume at build time
 */

/** @type {import('@web/dev-server').DevServerConfig} */
const devServerConfig = {
  rootDir: process.cwd(),
  port: 8011,
  open: false,
  appIndex: 'index.html',
  nodeResolve: true,
  wach: false,
  plugins: [],
  middleware: [spaRouterMiddleware],
};

async function main() {
  const server = await startDevServer({
    config: devServerConfig,
    readCliArgs: false,
    readFileConfig: false,
  });

  await (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    const url = 'http://localhost:8011/resume';
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    //await page.waitForTimeout(10000);
    await page.pdf({
      path: 'previews/output.pdf',
      format: 'A4',
      printBackground: true,
    });
    await browser.close();
  })();

  // Clean up.
  await server.stop();
}

main();
