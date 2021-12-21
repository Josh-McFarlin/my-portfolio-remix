const path = require("path");
const fs = require("fs-extra");
const bundleCSS = require("./bundle-css");

const scssModuleRegex = /.module.[s]?css$/;

module.exports = {
  plugins: [
    require("postcss-calc"),
    require("precss"),
    // require("autoprefixer"),
    require("postcss-strip-inline-comments"),
    require("postcss-discard-comments"),
    require("postcss-modules")({
      getJSON: async (cssFilename, json, outputFilename) => {
        await fs
          .mkdir(path.dirname(outputFilename), { recursive: true })
          .catch(() => {});

        if (scssModuleRegex.test(cssFilename)) {
          const jsonPath = cssFilename.endsWith(".module.scss")
            ? `${cssFilename}.json`
            : `${outputFilename}.json`;

          await fs.writeFile(jsonPath, JSON.stringify(json || {}));

          await bundleCSS();
        }
      },
    }),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
