import { defineConfig } from '@playwright/test';

export default defineConfig({

  

  use:{

    headless:false,

    screenshot:"on",

    trace:"on",

    video:"retain-on-failure",
    actionTimeout: 30000,

    

  },
  timeout: 120000

});