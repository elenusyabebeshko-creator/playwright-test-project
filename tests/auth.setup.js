require("dotenv").config();
const { test: setup } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");

setup("login and save storage state", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  const loginForm = await homePage.openLogInForm();
  await loginForm.fill({
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  });
  await loginForm.submit();

  await page.waitForURL("/panel/garage");
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
