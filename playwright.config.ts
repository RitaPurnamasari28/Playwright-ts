import { defineConfig } from '@playwright/test';

export default defineConfig({

  

  use:{

    headless:true,

    screenshot:"on",

    trace:"off",

    video:"retain-on-failure",
    actionTimeout: 30000,

    

  },
  timeout: 120000

});