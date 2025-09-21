/*
  Opendata Registered Notices Api provided by the Finnish Patent and Registration Office (PRH)
  and is licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
  API documentation: https://avoindata.prh.fi/en/krek/swagger-ui  
*/

import HttpRequest from '../core/http-request.js';
import { validateBusinessId, validateEnumeration } from '../core/validation.js';

const CodeList = {
  COMPANY_FORM: 'CF',
  ENTRY_CODE: 'EC',
  NOTICE_REGISTRATION_TYPE: 'NRT'
};
const CompanyForm = {};
const EntryCode = {};
const NoticeRegistrationType = {};
const Language = {
  ENGLISH: 'EN',
  FINNISH: 'FI',
  SWEDISH: 'SV'
};

export default class RegisteredNotices extends HttpRequest {
  constructor() {
    super('https://avoindata.prh.fi/opendata-registerednotices-api/v3');
  }

  static get CodeList() {
    return CodeList;
  }

  static get CompanyForm() {
    return CompanyForm;
  }

  static get EntryCode() {
    return EntryCode;
  }

  static get NoticeRegistrationType() {
    return NoticeRegistrationType;
  }

  static get Language() {
    return Language;
  }

  async search(options = {}) {
    return this.get('/', options);
  }

  async getCompany(businessId) {
    if (!validateBusinessId(businessId)) {
      throw new Error('Invalid business ID format');
    }

    return this.get(`/${businessId}`);
  }

  async getPublicNotice(recordYear, recordNumber) {
    if (!Number.isInteger(recordYear)) {
      throw new Error('Record year must be an integer');
    }

    return this.get(`/publicnotices/${recordYear}/${recordNumber}`);
  }

  async getCodeDescriptions(code, language) {
    if (!validateEnumeration(CodeList, code)) {
      throw new Error('Invalid code list: ' + code);
    }

    if (!validateEnumeration(Language, language)) {
      throw new Error('Invalid language: ' + language);
    }

    return this.get(`/description?code=${code}&lang=${language}`);
  }
}