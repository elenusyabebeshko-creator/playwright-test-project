const { test, expect } = require("@playwright/test");

// Returns the validation-message locator that sits under the given input.
function errorFor(input) {
  return input
    .locator('xpath=ancestor::div[contains(@class,"form-group")]')
    .locator(".invalid-feedback p");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.locator("ngb-modal-window .modal-title")).toHaveText(
    "Registration",
  );
});

test("TC-01 - positive: User's registration with valid data in every field", async ({
  page,
}) => {
  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const repeatPasswordInput = page.locator("#signupRepeatPassword");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  const uniqueEmail = `aqa.elenusyabebeshko+${Date.now()}@gmail.com`;

  await nameInput.fill("Olena");
  await nameInput.blur();
  await lastNameInput.fill("Bebeshko");
  await lastNameInput.blur();
  await emailInput.fill(uniqueEmail);
  await emailInput.blur();
  await passwordInput.fill("Password130926");
  await passwordInput.blur();
  await repeatPasswordInput.fill("Password130926");
  await repeatPasswordInput.blur();

  await expect(registerButton).toBeEnabled();
  await registerButton.click();

  // A successful registration logs the new user in and redirects to the garage page
  await expect(page).toHaveURL("/panel/garage");
  await expect(page.getByRole("button", { name: "My profile" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Garage" })).toBeVisible();
  //await expect(page.locator("ngb-modal-window")).toBeHidden();
});

test("TC-02 - negative: Errors for all empty required fields => Registration impossible", async ({
  page,
}) => {
  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const repeatPasswordInput = page.locator("#signupRepeatPassword");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  for (const input of [
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput,
  ]) {
    await input.fill("");
    await input.blur();
  }

  await expect(errorFor(nameInput)).toHaveText("Name required");
  await expect(errorFor(lastNameInput)).toHaveText("Last name required");
  await expect(errorFor(emailInput)).toHaveText("Email required");
  await expect(errorFor(passwordInput)).toHaveText("Password required");
  await expect(errorFor(repeatPasswordInput)).toHaveText(
    "Re-enter password required",
  );

  for (const input of [
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput,
  ]) {
    await expect(input).toHaveClass(/is-invalid/);
  }
  await expect(registerButton).toBeDisabled();
});

test("TC-03 - negative: Incorrect length value for Name field (shorter than 2 characters)", async ({
  page,
}) => {
  const nameInput = page.locator("#signupName");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  await nameInput.fill("A");
  await nameInput.blur();

  await expect(errorFor(nameInput)).toHaveText(
    "Name has to be from 2 to 20 characters long",
  );
  await expect(nameInput).toHaveClass(/is-invalid/);
  await expect(registerButton).toBeDisabled();
});

test("TC-04 - negative: Incorrect Email format", async ({ page }) => {
  const emailInput = page.locator("#signupEmail");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  await emailInput.fill("aqa.elenusyabebeshkogmail.com");
  await emailInput.blur();

  await expect(errorFor(emailInput)).toHaveText("Email is incorrect");
  await expect(emailInput).toHaveClass(/is-invalid/);
  await expect(registerButton).toBeDisabled();
});

test("TC-05 - negative: Password does not meet the complexity rules", async ({
  page,
}) => {
  const passwordInput = page.locator("#signupPassword");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  // all lower-case, no digit -> violates "at least one integer, one capital, one small letter"
  await passwordInput.fill("password130926");
  await passwordInput.blur();

  await expect(errorFor(passwordInput)).toHaveText(
    "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
  );
  await expect(registerButton).toBeDisabled();
});

test("TC-06 - negative: Re-entered password differs from the Password", async ({
  page,
}) => {
  const passwordInput = page.locator("#signupPassword");
  const repeatPasswordInput = page.locator("#signupRepeatPassword");
  const registerButton = page.locator("ngb-modal-window .modal-footer button", {
    hasText: "Register",
  });

  await passwordInput.fill("Password130926");
  await passwordInput.blur();
  await repeatPasswordInput.fill("Password130927");
  await repeatPasswordInput.blur();

  await expect(errorFor(repeatPasswordInput)).toHaveText(
    "Passwords do not match",
  );
  await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
  await expect(registerButton).toBeDisabled();
});
