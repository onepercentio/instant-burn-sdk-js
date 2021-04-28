/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[tj]s?(x)'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '!*.d.ts'
  ],
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '!*.d.ts'
  ]
};