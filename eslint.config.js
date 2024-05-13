let js = require("@eslint/js")

module.exports = [
  {
    ...js.configs.recommended,
    "files": ["/src"],
  },
  {
    "files": ["/src"],
    "rules": {
      "array-callback-return": "error",
      "no-constructor-return": "error",
      "no-promise-executor-return": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "require-atomic-updates": "error",
      "no-duplicate-imports": "warn",
      "no-inner-declarations": "warn",
      "no-self-compare": "warn",
      "no-template-curly-in-string": "warn",
      "no-useless-assignment": "warn",
      "no-with": "error",
      "no-undefined": "error",
      "no-shadow": "error",
      "no-redeclare": "error",
      "no-eq-null": "error",
      "no-console": "warn",
      "yoda": "warn",
      "strict": "warn",
      "sort-imports": "warn",
      "sort-keys": "warn",
      "sort-vars": "warn",
      "prefer-spread": "warn",
      "prefer-rest-params": "warn",
      "prefer-template": "warn",
      "operator-assignment": "warn",
      "object-shorthand": "warn",
      "no-useless-return": "warn",
      "no-magic-numbers": "warn",
      "no-empty": "warn",
      "new-cap": "warn",
      "eqeqeq": "warn",
      "curly": "warn",
      "eslint-disable": "off"
    }
  }
]

