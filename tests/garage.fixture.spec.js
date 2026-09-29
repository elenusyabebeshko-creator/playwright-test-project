const { test, expect } = require("../fixtures/userGaragePage.fixture");

//Тест використовує кастомну фікстуру `userGaragePage, яка віддає GaragePage вже залогіненого юзера.

test('Залогінений юзер відразу бачить сторінку "Garage"', async ({
  userGaragePage,
}) => {
  await expect(userGaragePage.heading).toBeVisible();
  await expect(userGaragePage.userProfile).toBeVisible();
});
