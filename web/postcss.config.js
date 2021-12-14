/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fsp = require("fs/promises");

module.exports = {
  plugins: [
    require("postcss-calc"),
    require("precss"),
    require("autoprefixer"),
    require("postcss-strip-inline-comments"),
    require("postcss-discard-comments"),
    require("postcss-modules")({
      getJSON: async (cssFilename, json, outputFilename) => {
        // console.log(cssFilename, json, outputFilename);

        await fsp
          .mkdir(path.dirname(outputFilename), { recursive: true })
          .catch(() => {});

        if (Object.keys(json).length > 0) {
          await fsp.writeFile(
            `${outputFilename.replace(/\.css$/, ".json")}`,
            JSON.stringify(json)
          );
        }
      },
    }),
  ],
};
