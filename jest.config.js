module.exports = {
  preset: 'ts-jest', // Usa o preset do ts-jest para integrar com TypeScript
  testEnvironment: 'node', // Configura o ambiente de execução para Node.js
  roots: ['<rootDir>/tests'], // Define a pasta onde os testes estão localizados
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões reconhecidas pelo Jest
  testMatch: ['**/*.(test|spec).ts'], // Aceita arquivos .test.ts e .spec.ts
  collectCoverage: true, // Ativa a coleta de cobertura de código
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Inclui os arquivos TypeScript na pasta src
    '!src/**/*.d.ts', // Exclui arquivos de definição de tipos
  ],
  coverageDirectory: 'coverage', // Define a pasta onde será salvo o relatório de cobertura
  coverageReporters: ['text', 'lcov'], // Formatos de relatório de cobertura
};
