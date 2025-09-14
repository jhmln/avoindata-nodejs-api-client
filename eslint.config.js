import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs}'], 
    plugins: { js }, 
    extends: ['js/recommended'], 
    languageOptions: { globals: globals.node },
    rules: {
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always']      
    }
  }
]);
