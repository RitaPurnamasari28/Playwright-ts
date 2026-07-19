import { defineConfig } from '@playwright/test';

export default defineConfig({

  use:{

    headless:false,

    screenshot:"on",

    trace:"on",

    video:"retain-on-failure"

  }

});