/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "pl",
    locales: ["en", "pl", "ru"],
    // localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
