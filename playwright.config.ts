import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  reporter: [['list'], ['./utils/excelReporter.ts']],

  use:{

    headless:true,

    screenshot: 'only-on-failure',

    trace:"off",

    video:"retain-on-failure",
    actionTimeout: 30000,

    

  },
  timeout: 120000

});