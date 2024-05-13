//require('@testing-library/jest-dom')

module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  testRegex: '/src/.*\\.spec?\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
}
