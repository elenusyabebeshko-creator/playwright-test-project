const { test, expect } = require("@playwright/test");

// Мінімальний "smoke"-тест — не з завдання, а щоб одразу перевірити, що
// конфіг (baseURL + httpCredentials) реально працює одразу після
// npm init playwright@latest, ще до написання "справжніх" тестів.
// Селектор кнопки "Sign In" звірений з Cypress-проєктом (cy.contains
// ('button', 'Sign In') у cypress/support/commands.js, HW 20.1).
test("головна сторінка відкривається і показує кнопку Sign In", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
