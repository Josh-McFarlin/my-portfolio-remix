module.exports = {
  parser: "@typescript-eslint/parser",
  "globals": {
    "NODE_ENV": "readonly",
    "SANITY_PREVIEW_SECRET": "readonly",
    "SANITY_API_TOKEN": "readonly"
  },
  settings: {
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "~": `${__dirname}/src`,
        },
        extensions: [".ts", ".js", ".jsx", ".tsx", ".json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      settings: {
        "import/resolver": {
          typescript: {},
        },
      },
    },
  ],
};
