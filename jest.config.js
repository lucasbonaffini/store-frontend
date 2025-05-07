export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['/src/setupTests.ts'];
export const moduleNameMapper = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '\\.(jpg|jpeg|png|gif|webp|svg)$': '/__mocks__/fileMock.js'
};
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest'
};

