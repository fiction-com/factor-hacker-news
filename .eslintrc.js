module.exports = {
  root: true,
  globals: {
    __dirname: false,
    require: false,
    module: false,
    process: false,
    to: false,
    describe: false,
    context: false
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module",
    parser: "@typescript-eslint/parser"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:unicorn/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended"
  ],

  plugins: [
    "vue",
    "json",
    "prettier",
    "unicorn",
    "import",
    "import",
    "@typescript-eslint"
  ],

  rules: {
    "no-console": "error",
    "no-debugger": "error",

    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"]
      }
    ],
    complexity: 2,
    semi: ["error", "never"],
    "unicorn/no-abusive-eslint-disable": 0,
    "unicorn/prevent-abbreviations": "off",
    "@typescript-eslint/no-empty-function": "off",
    "import/no-cycle": 2,
    "import/extensions": ["warn", "always", { ts: "never", js: "never" }],

    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    "vue/html-closing-bracket-spacing": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": [2, { singleline: 20, multiline: {} }],
    "@typescript-eslint/explicit-function-return-type": "off", // overridden for .ts files
    "@typescript-eslint/no-use-before-define": "warn", // can cause organization issues
    "func-style": ["warn", "expression"],
    "@typescript-eslint/no-var-requires": "off", // overridden for .ts files
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["warn"],
        "@typescript-eslint/ban-ts-ignore": "warn"
      }
    }
  ],

  settings: {
    "import/resolver": {
      alias: {
        map: [["~", process.env.FACTOR_CWD || process.cwd()]]
      }
    }
  }
}
