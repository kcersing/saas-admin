import jiti from "file:///D:/docker/src/vben-admin/node_modules/.pnpm/jiti@1.21.0/node_modules/jiti/lib/index.js";

/** @type {import("D:/docker/src/vben-admin/internal/vite-config/src/index")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "@vben/vite-config": "D:/docker/src/vben-admin/internal/vite-config"
  }
})("D:/docker/src/vben-admin/internal/vite-config/src/index.ts");

export const defineApplicationConfig = _module.defineApplicationConfig;
export const definePackageConfig = _module.definePackageConfig;