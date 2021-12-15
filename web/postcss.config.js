const path = require("path");
const fs = require("fs-extra");

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

        if (Object.keys(json).length > 0) {
          await fs.writeFile(`${outputFilename}.json`, JSON.stringify(json));
        }
      },
    }),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
