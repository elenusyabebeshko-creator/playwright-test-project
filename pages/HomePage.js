const { RegistrationForm } = require("./RegistrationForm");
const { LoginForm } = require("./LoginForm");
const { GaragePage } = require("./GaragePage");

// Page Object for the initial page https://qauto.forstudy.space

class HomePage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.guestLoginButton = page.getByRole("button", { name: "Guest log in" });
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async goto() {
    await this.page.goto("/");
  }

  //Opens the "Registration" form and returns its Page Object

  async openRegistrationForm() {
    await this.signUpButton.click();
    const form = new RegistrationForm(this.page);
    await form.title.waitFor({ state: "visible" });
    return form;
  }

  async openLogInForm() {
    await this.signInButton.click();
    const form = new LoginForm(this.page);
    await form.title.waitFor({ state: "visible" });
    return form;
  }

  async clickGuestLogButton() {
    await this.page.waitForURL("/panel/garage");
    return new GaragePage(this.page);
  }
}

module.exports = { HomePage };
