const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_reset.scss";
          @import "@/styles/_fonts.scss";
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_globals.scss";
        `,
      },
    },
  },
});
