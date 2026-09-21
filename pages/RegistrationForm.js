// Page Object для "Registration" форми

class RegistrationForm {
  constructor(page) {
    this.page = page;
    this.modal = page.locator("ngb-modal-window");
    this.title = this.modal.locator(".modal-title");
    this.closeButton = this.modal.locator('button[aria-label="Close"]');

    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");

    this.registerButton = this.modal.locator(".modal-footer button", {
      hasText: "Register",
    });
  }

  // Returns the validation-message locator that is shown after empty field or incorrect input
  errorFor(input) {
    return input
      .locator('xpath=ancestor::div[contains(@class,"form-group")]')
      .locator(".invalid-feedback p");
  }

  //Fills every field and blurs it after filling

  async fill(data) {
    if (data.name !== undefined) {
      await this.nameInput.fill(data.name);
      await this.nameInput.blur();
    }
    if (data.lastName !== undefined) {
      await this.lastNameInput.fill(data.lastName);
      await this.lastNameInput.blur();
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
      await this.emailInput.blur();
    }
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
      await this.passwordInput.blur();
    }
    if (data.repeatPassword !== undefined) {
      await this.repeatPasswordInput.fill(data.repeatPassword);
      await this.repeatPasswordInput.blur();
    }
  }

  async submit() {
    await this.registerButton.click();
  }
}

module.exports = { RegistrationForm };
