const { test, expect } = require("@playwright/test");

//Завдання 1: підміна response body для вказаного запиту GET /api/users/profile

//та перевірка, що відображені на сторінці дані відповідають саме підміненим значенням

//*storage state мого юзера, збережений раніше via tests/auth.setup.js

test.use({ storageState: "playwright/.auth/user.json" });

test("підміна response body для GET /api/users/profile", async ({ page }) => {
  const mockedProfile = {
    status: "ok",
    data: {
      userId: 999999,
      photoFilename: "default-user.png",
      name: "Юзер",
      lastName: "Тестовий",
    },
  };

  // Перехоплення запиту і підміна response body
  await page.route("**/api/users/profile", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedProfile),
    }),
  );

  await page.goto("/panel/profile");

  // Сторінка рендерить "Name LastName" одним рядком у <p class="profile_name">
  // т.ч. перевіряємо, що выдображаються саме підмінені дані, а не Elena Bebeshko

  await expect(page.locator(".profile_name")).toHaveText(
    `${mockedProfile.data.name} ${mockedProfile.data.lastName}`,
  );
});
