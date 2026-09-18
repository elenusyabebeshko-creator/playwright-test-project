//email
function generateTestEmail() {
  return `aqa.elenusyabebeshko+${Date.now()}@gmail.com`;
}

//password (8-15 chars, min 1 integer, 1 capital letter, 1 lowercase letter)
function validPassword() {
  return "Password160926";
}

/** A complete, valid set of registration data (for the positive scenario). */
function validRegistrationData() {
  return {
    name: "Olena",
    lastName: "Bebeshko",
    email: generateTestEmail(),
    password: validPassword(),
    repeatPassword: validPassword(),
  };
}

module.exports = { generateTestEmail, validPassword, validRegistrationData };
