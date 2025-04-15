/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Setup jest-dom matchers
  moduleNameMapper: {
    // Handle CSS imports (if any) - adjust if using CSS Modules or other CSS solutions
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock file imports
  },
  transform: {
    // Use ts-jest for ts/tsx files
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json', // Specify the tsconfig file
      },
    ],
  },
  // Optional: Collect coverage
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageProvider: "v8", // or "babel"
};
