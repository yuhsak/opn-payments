/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: [
    '**/test/**/*.(ts|tsx|js|jsx)',
    '**/*.(spec|test).(ts|tsx|js|jsx)',
    '!**/__*.(ts|tsx|js|jsx)',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          externalHelpers: true,
          target: 'es2019',
        },
      },
    ],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  verbose: true,
  // setupFilesAfterEnv: ['<rootDir>/test/__setup.ts'],
  globalSetup: '<rootDir>/test/__global-setup.ts',
}

module.exports = config
