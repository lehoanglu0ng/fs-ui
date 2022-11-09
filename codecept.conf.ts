import {
  setHeadlessWhen,
  setCommonPlugins
} from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './e2e/*.test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://fundingsocieties.com',
      show: true,
      browser: 'chromium',
      restart: true,
    }
  },
  include: {
    "pages": "./pageFactory.ts"
  },
  name: 'fs-ui',
  plugins: {
    allure: {
      enabled: true
    }
  }
}