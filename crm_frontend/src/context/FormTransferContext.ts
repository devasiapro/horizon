import { createContext } from 'react';

export const FormTransferContext = createContext({
  formTransfer: {
    merchant_english_name: '',
    merchant_chinese_name: '',
    brand_name: '',
    languages: '',
    currencies: '',
    prefix: '',
    domain_whitelist: '',
    ip_whitelist: '',
    business_contact: '',
    billing_contact: '',
    technical_contact: '',
    customer_contact: '',
    maintainer_contact: '',
    company_contact: '',
  },
  setFormTransfer: val => {} 
});
