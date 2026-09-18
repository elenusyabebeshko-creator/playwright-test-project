const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { RegistrationForm } = require("../pages/RegistrationForm");
const { GaragePage } = require("../pages/GaragePage");
const {
  validPassword,
  validRegistrationData,
} = require("../test_data/loginData");

let homePage;
let modal;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
  modal = await homePage.openRegistrationForm();
});

test("TC-01 - positive: User's registration with valid data in every field", async ({
  page,
}) => {
  const data = validRegistrationData();

  await modal.fill(data);
  await expect(modal.registerButton).toBeEnabled();

  await modal.submit();

  // A successful registration logs the new user in and redirects to the garage page
  await expect(page).toHaveURL("/panel/garage");
  const garage = new GaragePage(page);
  await expect(garage.heading).toBeVisible();
  await expect(garage.userProfile).toBeVisible();
  await expect(modal.modal).toBeHidden();
});

test("TC-02 - negative: Errors for all empty required fields => Registration impossible", async () => {
  await modal.fill({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  await expect(modal.errorFor(modal.nameInput)).toHaveText("Name required");
  await expect(modal.errorFor(modal.lastNameInput)).toHaveText(
    "Last name required",
  );
  await expect(modal.errorFor(modal.emailInput)).toHaveText("Email required");
  await expect(modal.errorFor(modal.passwordInput)).toHaveText(
    "Password required",
  );
  await expect(modal.errorFor(modal.repeatPasswordInput)).toHaveText(
    "Re-enter password required",
  );

  for (const input of [
    modal.nameInput,
    modal.lastNameInput,
    modal.emailInput,
    modal.passwordInput,
    modal.repeatPasswordInput,
  ]) {
    await expect(input).toHaveClass(/is-invalid/);
  }
  await expect(modal.registerButton).toBeDisabled();
});

test("TC-03 - negative: Incorrect length value for Name field (shorter than 2 characters)", async () => {
  await modal.fill({ name: "A" });

  await expect(modal.errorFor(modal.nameInput)).toHaveText(
    "Name has to be from 2 to 20 characters long",
  );
  await expect(modal.nameInput).toHaveClass(/is-invalid/);
  await expect(modal.registerButton).toBeDisabled();
});

test("TC-04 - negative: Incorrect Email format", async () => {
  await modal.fill({ email: "aqa.elenusyabebeshkogmail.com" });

  await expect(modal.errorFor(modal.emailInput)).toHaveText(
    "Email is incorrect",
  );
  await expect(modal.emailInput).toHaveClass(/is-invalid/);
  await expect(modal.registerButton).toBeDisabled();
});

test("TC-05 - negative: Password does not meet the complexity rules", async () => {
  // all lower-case, no digit -> violates "at least one integer, one capital, one small letter"
  await modal.fill({ password: "password160926" });

  await expect(modal.errorFor(modal.passwordInput)).toHaveText(
    "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
  );
  await expect(modal.passwordInput).toHaveClass(/is-invalid/);
  await expect(modal.registerButton).toBeDisabled();
});

test("TC-06 - negative: Re-entered password differs from the Password", async () => {
  await modal.fill({
    password: validPassword(),
    repeatPassword: "Password160927",
  });

  await expect(modal.errorFor(modal.repeatPasswordInput)).toHaveText(
    "Passwords do not match",
  );
  await expect(modal.repeatPasswordInput).toHaveClass(/is-invalid/);
  await expect(modal.registerButton).toBeDisabled();
});
