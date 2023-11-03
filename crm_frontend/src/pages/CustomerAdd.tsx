import React, { useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { CustomerAddSeamless } from './CustomerAddSeamless';
import { CustomerAddSeamlessContacts } from './CustomerAddSeamlessContacts';
import { CustomerAddSeamlessStagingDetails } from './CustomerAddSeamlessStagingDetails';
import { CustomerAddSeamlessProductionDetails } from './CustomerAddSeamlessProductionDetails';
import { CustomerAddTransfer } from './CustomerAddTransfer';
import { CustomerAddTransferProductInfo } from './CustomerAddTransferProductInfo';
import { CustomerAddTransferContacts } from './CustomerAddTransferContacts';
import { CustomerAddTransferSubmitted } from './CustomerAddTransferSubmitted';
import { FormTransferContext } from '../context/FormTransferContext';
import { FormSeamlessContext } from '../context/FormSeamlessContext';

export const CustomerAdd = () => {
  const query = useQuery();

  const [formTransfer, setFormTransfer] = useState({
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
  });
  const [formSeamless, setFormSeamless] = useState({
    merchant_english_name: '',
    brand_name: '',
    regulations: '',
    market_jurisdiction: '',
    license: '',
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
    production_test_accounts: '', 
    production_wallet_endpoint: '', 
    production_wallet_ip_port: '',
    production_service_api_ip: '',
    staging_desktop_lobby_url: '',
    staging_mobile_lobby_url: '',
    staging_test_accounts: '', 
    staging_wallet_endpoint: '', 
    staging_wallet_ip_port: '',
    staging_service_api_ip: ''
  });

  const step = query.get('step') ? parseInt(query.get('step')) : 1;

  const customerAddSeamlessRender = (step) => {
    if (step == 1) {
      return <CustomerAddSeamless step={step} />
    } else if (step === 2) {
      return <CustomerAddSeamlessContacts step={step} />
    } else if (step === 3) {
      return <CustomerAddSeamlessStagingDetails step={step} />
    } else if (step === 4) {
      return <CustomerAddSeamlessProductionDetails step={step} />
    }
    return <CustomerAddSeamless step={step} /> 
  };

  const customerAddTransferRender = (step) => {
    if (step === 1) {
      return <CustomerAddTransfer step={step} />
    } else if (step === 2) {
      return <CustomerAddTransferProductInfo step={step} /> 
    } else if (step === 3) {
      return <CustomerAddTransferContacts step={step} />
    } else if (step === 4) {
      return <CustomerAddTransferSubmitted step={step} />
    }
    return <CustomerAddTransfer step={3} /> 
  };

  if (query.get('wallet_type') === 'seamless') {
    return (
      <FormSeamlessContext.Provider value={{ formSeamless, setFormSeamless }}>
        {customerAddSeamlessRender(step)}
      </FormSeamlessContext.Provider>
    );
  }

  return (
    <FormTransferContext.Provider value={{ formTransfer, setFormTransfer }}>
      {customerAddTransferRender(step)}
    </FormTransferContext.Provider>
  );
};
