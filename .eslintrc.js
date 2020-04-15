module.exports = {
  root: true,

  globals: {
    __dirname: false,
    require: false,
    module: false,
    process: false
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

  plugins: ["vue", "json", "prettier", "unicorn", "import", "@typescript-eslint"],

  rules: {
    // Style
    "no-console": "error",
    "no-debugger": "error",
    semi: ["error", "never"],
    // Prevent circular dependencies in modules
    "import/no-cycle": 2,
    // Always require file extensions except for js/ts files
    "import/extensions": ["warn", "always", { ts: "never", js: "never" }],
    // Better for unit testing
    "func-style": ["warn", "expression"],
    // TypeScript
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-function-return-type": "off", // overridden for .ts files
    "@typescript-eslint/no-use-before-define": "warn", // can cause organization issues
    "@typescript-eslint/no-var-requires": "off", // overridden for .ts files
    "@typescript-eslint/no-explicit-any": "off",
    // Vue
    "vue/max-attributes-per-line": [2, { singleline: 20, multiline: {} }],
    "vue/html-closing-bracket-spacing": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    // Add Vue rules to fix conflicts with prettier/eslint
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
    ]
  },

  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": ["warn"]
      }
    }
  ],

  settings: {
    "import/ignore": ["firebase", "create-api"]
  }
}
