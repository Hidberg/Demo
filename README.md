[![SauceDemo Tests](https://github.com/Hidberg/Demo/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Hidberg/Demo/actions/workflows/playwright.yml)

## Description
Autotests implementation
- **UI**: [SauceDemo](https://www.saucedemo.com)
- **API**: [Reqres.in](https://reqres.in)

## Requirements
- **Node.js** version 18+

## Run tests
```bash
npm install
npx playwright install
npm test
```

## How to open reports
- Locally you can open index.html from playwright-report directory
- If you want to open Allure report from CI, you can download artifact,
then run ```npx allure open "path to the directory allure-report"```