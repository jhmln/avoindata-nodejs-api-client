import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as validation from '../../src/core/validation.js';

describe('Business id', () => {
  it('Invalid business id should return false', () => {
    assert.equal(validation.validateBusinessId('1234567-8'), false);
  });

  it('Valid business id should return true', () => {
    assert.equal(validation.validateBusinessId('1234567-1'), true);
  });
});

describe('Enumeration', () => {  
  it('Should throw an error if enumeration is not an object', () => {
    assert.throws(
      () => {validation.validateEnumeration(null, 'A');}, 
      { message: 'Argument "enumeration" is not an object' }
    );
  });

  const enumeration = { A: 'A', B: 'B', C: 'C' };

  it('Value in enumeration should return true', () => {
    assert.equal(validation.validateEnumeration(enumeration, 'A'), true);
  });

  it('Value not in enumeration should return false', () => {
    assert.equal(validation.validateEnumeration(enumeration, 'D'), false);
  });
});