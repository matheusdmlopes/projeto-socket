// module.exports = {
//     transform: {
//         "^.+\\.[t|j]sx?$": "babel-jest",
//     },
//     testEnvironment: 'jsdom',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
// };

// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//     verbose: true,
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     transform: {
//         '^.+\\.(ts|tsx)$': [
//             'ts-jest',
//             {
//                 diagnostics: {
//                     ignoreCodes: [1343],
//                 },
//                 astTransformers: {
//                     before: [
//                         {
//                             path: 'node_modules/ts-jest-mock-import-meta',
//                             options: {
//                                 metaObjectReplacement: {
//                                     VITE_LOCAL_URL: 'http://localhost:3001',
//                                 },
//                             },
//                         },
//                     ],
//                 },
//             },
//         ],
//     },
// };

// export default config;