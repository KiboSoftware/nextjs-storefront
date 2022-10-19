/* Jest Config using Babel until NextJS Rust Compiler works with MaterialUI5 */

module.exports = {
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'context/**/*.{js,jsx,ts,tsx}',
    'lib/helpers/**/*.{js,jsx,ts,tsx}',
    'lib/getters/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/_middleware.ts',
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
    // Handle Lib aliases
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    // Handle context aliases
    '^@/context(.*)$': '<rootDir>/context/$1',
    // Handle mock aliases
    '^@/__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    // Handle test aliases
    '^@/__test__/(.*)$': '<rootDir>/__test__/$1',
    // Handle hooks aliases
    '^@/hooks(.*)$': '<rootDir>/hooks/$1',
    // Handle pages aliases
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/__test__/integration/',
    '<rootDir>/__test__/utils/',
    '<rootDir>/react-query/',
  ],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['./jest-setup.js'],
}
