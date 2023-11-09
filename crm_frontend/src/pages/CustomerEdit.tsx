import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';

import { useQuery } from '../hooks/useQuery';
import { useAuthHook } from '../hooks/useAuthHook';
import { FormTransferContext } from '../context/FormTransferContext';
import { FormSeamlessContext } from '../context/FormSeamlessContext';
import { CustomerEditSeamlessGeneral } from '../pages/CustomerEditSeamlessGeneral';
import { CustomerEditTransferGeneral } from '../pages/CustomerEditTransferGeneral';
import { CustomerEditTransferProductInfo } from '../pages/CustomerEditTransferProductInfo';
import { CustomerEditTransferContacts } from '../pages/CustomerEditTransferContacts';
import { CustomerEditTransferContracts } from '../pages/CustomerEditTransferContracts';

export const CustomerEdit = () => {
  const query = useQuery();
  const params = useParams();
  const useAuth = useAuthHook();
  const token = useAuth.getAuth().token;

  const customerId = params.customerId;

  const step = query.get('step') ? parseInt(query.get('step')) : 1;

  const [formTransfer, setFormTransfer] = useState({
    id: 0,
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
    test_account_productions: '', 
    test_account_stagings: '', 
    production_desktop_lobby_url: '',
    production_mobile_lobby_url: '',
    production_wallet_endpoint: '', 
    production_wallet_ip_port: '',
    production_service_api_ip: '',
    staging_desktop_lobby_url: '',
    staging_mobile_lobby_url: '',
    staging_wallet_endpoint: '', 
    staging_wallet_ip_port: '',
    staging_service_api_ip: ''
  });

  const customerEditSeamlessRender = (step) => {
    if (step === 1) {
      return <CustomerEditSeamlessGeneral customerId={customerId} step={step} />
    }

    return <CustomerEditSeamlessGeneral customerId={customerId} step={step} />
  };

  const customerEditTransferRender = (step) => {
    if (step === 1) {
      return <CustomerEditTransferGeneral customerId={customerId} step={step} />
    } else if (step === 2) {
      return <CustomerEditTransferProductInfo customerId={customerId} step={step} />
    } else if (step === 3) {
      return <CustomerEditTransferContacts customerId={customerId} step={step} />
    }

    return <CustomerEditTransferGeneral customerId={customerId} step={step} />
  };

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/${customerId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
          }
        ); 
        const customer = response.data;
        setFormTransfer({
          merchant_english_name: customer.merchant_english_name,
          merchant_chinese_name: customer.merchant_chinese_name,
          brand_name: customer.brand_name,
          languages: customer.languages.map(language => language.name).toString(),
          currencies: customer.currencies.map(currency => currency.name).toString(),
          prefix: customer.prefix,
          domain_whitelist: customer.domain_whitelist.map(domain => domain.domain).toString(),
          ip_whitelist: customer.ip_whitelist.map(ip => ip.ip).toString(),
          business_contact: customer.business_contact,
          billing_contact: customer.billing_contact,
          technical_contact: customer.technical_contact,
          customer_contact: customer.customer_contact,
          maintainer_contact: customer.maintainer_contact,
          company_contact: customer.company_contact
        });
      } catch (err) {
        console.log('err', err); 
      } finally {

      }
    };
    init();     
  }, []);

  if (query.get('wallet_type') === 'seamless') {
    return (
      <FormSeamlessContext.Provider value={{ formSeamless, setFormSeamless }}> 
        {customerEditSeamlessRender(step)}
      </FormSeamlessContext.Provider>
    );
  }

  return (
    <FormTransferContext.Provider value={{ formTransfer, setFormTransfer }}>
      {customerEditTransferRender(step)}
    </FormTransferContext.Provider>
  );
};
