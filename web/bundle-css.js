const path = require("path");
const fs = require("fs-extra");

async function run() {
  const stylePath = path.resolve(__dirname, "src", "styles");
  const genPath = path.join(stylePath, "generated");
  const bundlePath = path.join(stylePath, "modules.css");

  const files = await fs.readdir(genPath);

  const contents = await Promise.all(
    files
      .filter((i) => i.endsWith(".css"))
      .map((file) => fs.readFile(path.join(genPath, file), "utf8"))
  );

  await fs.writeFile(bundlePath, contents.join("\n"));

  await Promise.all(
    files
      .filter((i) => i.endsWith(".json"))
      .map((i) =>
        fs.move(path.join(genPath, i), path.join(stylePath, i), {
          overwrite: true,
        })
      )
  );

  await fs.remove(genPath);
}

try {
  run();
  console.log("CSS bundled!");
} catch (error) {
  console.error("Failed to bundle CSS!");
  console.error(error.message || error);
}

module.exports = {};
