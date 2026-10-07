ARG PLAYWRIGHT_VERSION=1.63.0
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-jammy

ENV CI=true

WORKDIR /work

# Спочатку лише package*.json, щоб Docker кешував шар із залежностями
COPY package*.json ./
RUN npm ci

# Решта коду (у docker-compose папка проєкту додатково монтується поверх)
COPY . .

CMD ["npx", "playwright", "test", "--project=chromium"]
