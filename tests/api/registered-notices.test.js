import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { RegisteredNotices } from '../../src/index.js';

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

const originalCompany = notices.companies[0];
const comparisonCompany = await registeredNotices.getCompany(originalCompany.businessId.value);

describe('Get company', () => {
  it('Should throw an error if business ID is not valid', async () => {
    await assert.rejects(async () => {
      await registeredNotices.getCompany('invalid-id');
    });
  });

  it('Should return the same company when searched by business ID', () => {
    assert.deepEqual(originalCompany, comparisonCompany);
  });
});

const companyWithNotices = notices.companies.find(company => 
  hasProperty(company, 'publicNotices') && company.publicNotices.length > 0
);

if (companyWithNotices) {
  const originalNotice = companyWithNotices.publicNotices[0];
  const [recordYear, recordNumber] = originalNotice.recordNumber.split('/');

  describe('Get public notice', () => {    
    it('Should throw an error if record year is null', async () => {
      await assert.rejects(async () => {
        await registeredNotices.getPublicNotice(null, '123');
      });
    });

    it('Should throw an error if record year is undefined', async () => {
      await assert.rejects(async () => {
        await registeredNotices.getPublicNotice(undefined, '123');
      });
    });

    it('Should throw an error if record year is non-integer string', async () => {
      await assert.rejects(async () => {
        await registeredNotices.getPublicNotice('invalid-year', '123');
      });
    });

    it('Should return a matching public notice', async () => {
      const comparisonNotice = await registeredNotices.getPublicNotice(+recordYear, recordNumber);

      for(let key in originalNotice) {
        if(hasProperty(originalNotice, key)) {
          assert.deepEqual(originalNotice[key], comparisonNotice[key]);
        }
      };
    });
  });
}

describe('Get code descriptions', () => {
  it('Should throw an error if code list is invalid', async () => {
    await assert.rejects(async () => {
      await registeredNotices.getCodeDescriptions('INVALID_CODE', RegisteredNotices.Language.FINNISH);
    }); 
  });

  it('Should throw an error if language is invalid', async () => {
    await assert.rejects(async () => {
      await registeredNotices.getCodeDescriptions(RegisteredNotices.CodeList.COMPANY_FORM, 'INVALID_LANGUAGE');
    });
  });

  const codes = Object.values(RegisteredNotices.CodeList);
  const languages = Object.values(RegisteredNotices.Language);

  for (let codeIndex = 0; codeIndex < codes.length; codeIndex++) {
    const code = codes[codeIndex];

    for (let languageIndex = 0; languageIndex < languages.length; languageIndex++) {
      const language = languages[languageIndex];

      it(`Should return code descriptions for code ${code} in language ${language}`, async () => {
        assert.ok(async () => await registeredNotices.getCodeDescriptions(code, language));
      });      
    }
  }
});

function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}