const base = require("@playwright/test");
const { GaragePage } = require("../pages/GaragePage");

exports.test = base.test.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });
    const page = await context.newPage();
    await page.goto("/panel/garage");
    await use(new GaragePage(page));
    await context.close();
  },
});

exports.expect = base.expect;
