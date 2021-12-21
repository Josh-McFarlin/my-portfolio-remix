const path = require("path");
const fs = require("fs-extra");
const postcss = require("postcss");

async function bundleCSS() {
  const stylePath = path.resolve(__dirname, "src", "styles");
  const genPath = path.join(stylePath, "generated");
  const bundlePath = path.join(stylePath, "modules.css");

  if (await fs.pathExists(genPath)) {
    const files = await fs.readdir(genPath);

    const contents = await Promise.all(
      files
        .filter((i) => i.endsWith(".css"))
        .map((file) => fs.readFile(path.join(genPath, file), "utf8"))
    );

    const { css } = await postcss([
      require("cssnano")({
        preset: "default",
      }),
    ]).process(contents.join("\n"), {
      from: undefined,
    });

    await fs.writeFile(bundlePath, css);

    console.log("CSS bundled!");
  }
}

// try {
//   bundleCSS();
// } catch (error) {
//   console.error("Failed to bundle CSS!");
//   console.error(error.message || error);
// }

module.exports = bundleCSS;
