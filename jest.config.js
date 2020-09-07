module.exports = {
  transform: { '\\.ts$': ['ts-jest'] },
  setupFiles: ['./jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  testTimeout: 45000,
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src/$1'
  }
};
