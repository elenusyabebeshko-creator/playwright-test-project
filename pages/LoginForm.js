// Page Object for the "Log in" form (after clicking "Sign In" button)
class LoginForm {
  constructor(page) {
    this.page = page;
    this.modal = page.locator("ngb-modal-window");
    this.title = this.modal.locator(".modal-title");
    this.closeButton = this.modal.locator('button[aria-label="Close"]');

    this.emailInput = page.locator("#signinEmail");
    this.passwordInput = page.locator("#signinPassword");
    this.rememberMeCheckbox = page.locator("#remember");
    this.forgotPasswordButton = this.modal.locator("button", {
      hasText: "Forgot password",
    });
    this.registrationLink = this.modal.locator(".modal-footer button", {
      hasText: "Registration",
    });
    this.loginButton = this.modal.locator(".modal-footer button", {
      hasText: "Login",
    });
  }

  // Returns the validation-message locator that is shown after empty field or incorrect input
  errorFor(input) {
    return input
      .locator('xpath=ancestor::div[contains(@class,"form-group")]')
      .locator(".invalid-feedback p");
  }

  //Fills every field and blurs it after filling
  async fill({ email, password, remember } = {}) {
    if (email !== undefined) {
      await this.emailInput.fill(email);
      await this.emailInput.blur();
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
      await this.passwordInput.blur();
    }
    if (remember !== undefined) {
      if (remember) {
        await this.rememberMeCheckbox.check();
      } else {
        await this.rememberMeCheckbox.uncheck();
      }
    }
  }

  async submit() {
    await this.loginButton.click();
  }
}

module.exports = { LoginForm };
