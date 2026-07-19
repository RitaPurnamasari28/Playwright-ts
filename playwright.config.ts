import { defineConfig } from '@playwright/test';

export default defineConfig({

  use:{

    headless:true,

    screenshot:"on",

    trace:"on",

    video:"retain-on-failure"

  }

});