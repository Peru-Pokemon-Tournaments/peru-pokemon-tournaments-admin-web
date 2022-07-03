const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

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
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          VUE_APP_API_DOMAIN: process.env.VUE_APP_API_DOMAIN,
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Perú Pokémon Tournaments Admin";
      return args;
    });
  },
});
