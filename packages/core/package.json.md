  "main": "./dist/umd/index.umd.cjs",
  "module": "./dist/es/index.js",
  "types": "./dist/types/core/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/es/index.js",
      "require": "./dist/umd/index.umd.cjs",
      "types": "./dist/types/core/index.d.ts"
    },
    "./dist/": {
      "import": "./dist/",
      "require": "./dist/"
    }
  },


    "main": "./index.js",