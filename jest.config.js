module.exports = async () => {
   return {
      verbose: true,
      testEnvironment: 'jsdom',
      testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
      collectCoverage: true,
      verbose: true,
      moduleNameMapper: {
         '.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
         '.(gif|ttf|eot|svg|jpg)$': '<rootDir>/__mocks__/fileMock.js',
      },
      moduleFileExtensions: ['js', 'jsx'],
      testPathIgnorePatterns: ['<rootDir>/spec'],
      globals: {
         __API__: '/api',
      },
   };
};
