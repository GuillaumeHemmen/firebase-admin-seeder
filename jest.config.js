// ESM-compatible Jest config for an ESM TypeScript project
export default {
  // Use the ESM preset for ts-jest
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testRegex: '(/__tests__/.*|\\.test)\\.ts$',
  moduleFileExtensions: ['ts', 'js'],

  // Ensure ts-jest emits ESM
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: './tsconfig.json' }],
  },

  // Treat TS files as ESM
  extensionsToTreatAsEsm: ['.ts'],

  // Helpful when using NodeNext and TS path resolution without .js extensions
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};