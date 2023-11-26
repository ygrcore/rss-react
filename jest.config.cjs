const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
