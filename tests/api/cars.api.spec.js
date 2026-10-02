require("dotenv").config();

const { test, expect, request } = require("@playwright/test");

//Завдання 2: API-тести для для створення машин

const API_BASE_URL = "https://qauto.forstudy.space";

let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({ baseURL: API_BASE_URL });

  // POST /auth/signin - єдиний спосіб отримати сесійну cookie "sid"
  // (так і написано в описі API: "to get a session cookie you need to
  // request api/auth/signup or api/auth/signin"). apiContext сам зберігає
  // cookie з відповіді і підставляє її в усі наступні запити цього ж
  // контексту.
  const signInResponse = await apiContext.post("/api/auth/signin", {
    data: {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
      remember: false,
    },
  });
  // console.log("status:", signInResponse.status());
  // console.log("body:", await signInResponse.text());
  expect(signInResponse.ok()).toBeTruthy();
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe("POST /api/cars", () => {
  test("TC-01 [позитивний]: створення авто з валідними даними", async () => {
    const response = await apiContext.post("/api/cars", {
      data: { carBrandId: 1, carModelId: 1, mileage: 100 },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.data).toMatchObject({
      carBrandId: 1,
      carModelId: 1,
      mileage: 100,
      brand: "Audi",
      model: "TT",
    });

    // Прибираємо за собою, щоб не засмічувати гараж реального юзера     // тестовими машинами при кожному прогоні.
    await apiContext.delete(`/api/cars/${body.data.id}`);
  });

  test("TC-02 [негативний]: відсутнє обов'язкове поле mileage -> 400", async () => {
    const response = await apiContext.post("/api/cars", {
      data: { carBrandId: 1, carModelId: 1 },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe("Mileage is required");
  });

  test("TC-03 [негативний]: неіснуючий carBrandId -> 404", async () => {
    const response = await apiContext.post("/api/cars", {
      data: { carBrandId: 6, carModelId: 1, mileage: 100 },
    });

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe("Brand not found");
  });
});
