import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["packages/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["packages/research/extraction/**/*.ts"],
      exclude: [
        "packages/research/extraction/index.ts",
        "packages/research/extraction/types.ts",
        "packages/research/extraction/**/*.d.ts",
      ],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
  },
})
