import { RegisteredNotices } from 'unofficial-avoindata-nodejs-client';

const registeredNotices = new RegisteredNotices();
// const notices = await registeredNotices.search();
// console.log('Registered notices:', notices.totalResults);

const descriptions = await registeredNotices.getCodeDescriptions(RegisteredNotices.CodeList.COMPANY_FORM, RegisteredNotices.Language.ENGLISH);
console.log('Company form descriptions:', descriptions);