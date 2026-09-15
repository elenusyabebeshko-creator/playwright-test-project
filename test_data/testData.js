/**
 ВИМОГА до юзерів яких ви будете створювати - їх email адреса має починатися з якогось префіксу.
 Таким чином ви зможете відрізняти юзерів створених автотестами від інших.
Наприклад префікс"aqa". Приклад email адреси aqa-staran@test.com
 */

//email
function generateTestEmail() {
  return `aqa.elenusyabebeshko+${Date.now()}@gmail.com`;
}

/*
//варіант email з унікальним числом, щоб не було колізій при паралельному прогоні тестів
//  у декільках воркерах одночасно, коли два виклики можуть зловити однакову мілісекунду
const EMAIL_PREFIX = "aqa";
const BASE_MAILBOX = "elenusyabebeshko";

let counter = 0;

function uniqueId() {
  counter += 1;
  return `${Date.now()}${counter}`;
}

function generateTestEmail() {
  return `${EMAIL_PREFIX}.${BASE_MAILBOX}+${uniqueId()}@gmail.com`;
}
*/

//password (8-15 chars, min 1 integer, 1 capital letter, 1 lowercase letter)
function validPassword() {
  return "Password130926";
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
