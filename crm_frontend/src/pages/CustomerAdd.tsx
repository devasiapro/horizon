import React, { useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { CustomerAddSeamless } from './CustomerAddSeamless';
import { CustomerAddTransfer } from './CustomerAddTransfer';
import { CustomerAddTransferProductInfo } from './CustomerAddTransferProductInfo';
import { CustomerAddTransferContacts } from './CustomerAddTransferContacts';
import { FormTransferContext } from '../context/FormTransferContext';

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

  const step = query.get('step') ? parseInt(query.get('step')) : 1;

  const customerAddTransferRender = (step) => {
    if (step === 1) {
      return <CustomerAddTransfer step={step} />
    } else if (step === 2) {
      return <CustomerAddTransferProductInfo step={step} /> 
    } else if (step === 3) {
      return <CustomerAddTransferContacts step={step}/>
    }
    return <CustomerAddTransfer step={3} /> 
  };

  if (query.get('wallet_type') === 'seamless') {
    return (
      <CustomerAddSeamless step={step} />
    );
  }

  return (
    <FormTransferContext.Provider value={{ formTransfer, setFormTransfer }}>
      {customerAddTransferRender(step)}
    </FormTransferContext.Provider>
  );
};
