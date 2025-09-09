import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { RegisteredNotices } from 'unofficial-avoindata-nodejs-client';

const registeredNotices = new RegisteredNotices();
const notices = await registeredNotices.search();

describe('Search', () => {
  const hasMandatoryProperties = hasProperty(notices, 'totalResults') && hasProperty(notices, 'companies');

  it('Should have totalResults and companies property', () => {
    assert.equal(hasMandatoryProperties, true);
  });

  it('Should return more than one company', () => {
    assert.equal(notices.totalResults > 0, true);
  });

  const pages = Math.ceil(notices.totalResults / 50);

  it('The last page should have less than or equal to 50 companies', async () => {
    const lastPageNotices = await registeredNotices.search({ page: pages });
    assert.equal(lastPageNotices.companies.length <= 50, true);
  });
});

function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}