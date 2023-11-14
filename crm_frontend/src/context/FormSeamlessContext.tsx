import { createContext } from 'react';

export const FormSeamlessContext = createContext({
  formSeamless: {
    id: 0,
    merchant_english_name: '',
    brand_name: '',
    regulations: '',
    market_jurisdiction: '',
    licenses: '',
    office_ips: '',
    language_used: '',
    currencies_used: '',
    default_currency: '',
    business_contact: '',
    billing_contact: '',
    technical_contact: '',
    customer_contact: '',
    maintainer_contact: '',
    company_contact: '',
    production_desktop_lobby_url: '',
    production_mobile_lobby_url: '',
    test_account_productions: '', 
    production_wallet_endpoint: '', 
    production_wallet_ip_port: '',
    production_service_api_ip: '',
    staging_desktop_lobby_url: '',
    staging_mobile_lobby_url: '',
    test_account_stagings: '', 
    staging_wallet_endpoint: '', 
    staging_wallet_ip_port: '',
    staging_service_api_ip: ''
  },
  setFormSeamless: val => {}
});
