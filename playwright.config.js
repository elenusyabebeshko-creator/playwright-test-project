//MODIFIED file
// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  // Усі спек-файли лежать у ./tests (стандартна назва, яку пропонує `npm init playwright@latest` за замовчуванням).
  testDir: "./tests",

  // Тести в різних файлах можуть виконуватись паралельно (кожен файл — в окремому воркері)
  // Усередині одного файлу тести йдуть по черзі, якщо явно не увімкнути test.describe.configure({ mode: 'parallel' })
  fullyParallel: true,

  // !!! ЦЕ захист від випадково залишеного .only() в коді — якщо хтось закомітить test.only(...),
  //  то прогін у CI впаде з помилкою замість того, щоб тихо прогнати лише один тест і "позеленити" пайплайн.
  forbidOnly: !!process.env.CI,

  //!! У CI мережа/застосунок можуть бути повільнішими/нестабільнішими — даємо флакі-тестам два додаткові шанси
  // Локально ретраї не потрібні: якщо тест впав локально, краще одразу побачити реальну помилку.
  retries: process.env.CI ? 2 : 0,

  // У CI 1 воркер для стабільності (менше конкуренції за ресурси/мережу)
  // !!локально Playwright сам підбере оптимальну кількість під кількість ядер CPU
  workers: process.env.CI ? 1 : undefined,

  // html-звіт — аналог mochawesome з Cypress-проєкту:
  // зручний візуальний звіт з трейсами/скріншотами на failed тестах
  // { open: 'never' } — щоб звіт не відкривався сам у браузері
  // після кожного npx playwright test, а тільки за явною командою show-report
  reporter: [["html", { open: "never" }], ["list"]],

  // Таймаут на весь тест (30с) і окремо — на кожен expect() усередині (5с).
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  // Застосунок https://qauto.forstudy.space/ з Basic Auth як guest/welcome2qauto
  use: {
    baseURL: "https://qauto.forstudy.space",

    // ! на відміну від Cypress, де auth треба було передавати в кожний cy.visit()/cy.request()
    // у Playwright достатньо задати httpCredentials один раз у конфігу —
    // і вони будуть застосовані до кожного запиту автоматично
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },

    // trace/screenshot/video: фіксація фейлів лише коли вони справді потрібні (а не на кожен тест)
    trace: "on-first-retry", // або 'retain-on-failure',
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Три основні браузерні "проєкти"
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    }, 
    */
  ],
});
