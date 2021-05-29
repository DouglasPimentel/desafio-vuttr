const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  rootDir: root,
  testMatch: ['<rootDir>/test/**/*.spec.js'],
  setupFilesAfterEnv: ['<rootDir>/test/jestSetup.js'],
  testEnvironment: 'node',
  clearMocks: true,
};
