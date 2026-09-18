/**
 * Page Object for /panel/garage - сторінка, яка відображається після успішної реєстрації або входу юзера
 */
class GaragePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Garage" });
    this.userProfile = page.getByRole("button", { name: "My profile" });
  }
}

module.exports = { GaragePage };
