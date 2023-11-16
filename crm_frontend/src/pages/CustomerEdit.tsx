import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';

import { useQuery } from '../hooks/useQuery';
import { useAuthHook } from '../hooks/useAuthHook';
import { FormTransferContext } from '../context/FormTransferContext';
import { FormSeamlessContext } from '../context/FormSeamlessContext';
import { CustomerEditSeamlessGeneral } from '../pages/CustomerEditSeamlessGeneral';
import { CustomerEditSeamlessContacts } from '../pages/CustomerEditSeamlessContacts';
import { CustomerEditSeamlessStagingDetails } from '../pages/CustomerEditSeamlessStagingDetails';
import { 
  CustomerEditSeamlessProductionDetails 
} from '../pages/CustomerEditSeamlessProductionDetails';
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

  const testAccountsArrayToString = (testAccounts) => {
    const combined = testAccounts.map(testAccount => {
      return testAccount.username + '/' + testAccount.password;
    });
    return combined.toString();
  };

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
    } else if (step === 2) {
      return <CustomerEditSeamlessContacts customerId={customerId} step={step} />
    } else if (step === 3) {
      return <CustomerEditSeamlessStagingDetails customerId={customerId} step={step} />
    } else if (step === 4) {
      return <CustomerEditSeamlessProductionDetails customerId={customerId} step={step} />
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

  const formSeamlessProcess = (customer) => {
    setFormSeamless({
      merchant_english_name: customer.merchant_english_name,
      brand_name: customer.brand_name, 
      regulations: customer.regulations.map(regulation => regulation.name).toString(),
      market_jurisdiction: customer.market_jurisdictions.map(market => market.name).toString(),
      license: customer.licenses.map(license => license.name).toString(),
      office_ips: customer.office_ips.map(office_ip => office_ip.ip).toString(),
      language_used: customer.languages.map(language => language.name).toString(),
      currencies_used: customer.currencies.map(currency => currency.name).toString(),
      default_currency: customer.currencies.find(currency => currency.is_default) ? customer.currencies.find(currency => currency.is_default).name : '',
      business_contact: customer.business_contact,
      billing_contact: customer.billing_contact,
      technical_contact: customer.technical_contact,
      customer_contact: customer.customer_contact,
      maintainer_contact: customer.maintainer_contact,
      company_contact: customer.company_contact,
      staging_desktop_lobby_url: customer.staging_desktop_lobby_url,
      staging_mobile_lobby_url: customer.staging_mobile_lobby_url,
      test_account_stagings: testAccountsArrayToString(customer.test_account_stagings),
      staging_wallet_endpoint: customer.staging_wallet_endpoint,
      staging_wallet_ip_port: customer.staging_wallet_ip_port,
      staging_service_api_ip: customer.staging_service_api_ip,
      production_desktop_lobby_url: customer.production_desktop_lobby_url,
      production_mobile_lobby_url: customer.production_mobile_lobby_url,
      test_account_productions: testAccountsArrayToString(customer.test_account_productions),
      production_wallet_endpoint: customer.production_wallet_endpoint,
      production_wallet_ip_port: customer.production_wallet_ip_port,
      production_service_api_ip: customer.production_service_api_ip
    });
  };

  const formTransferProcess = (customer) => {
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
        if (customer.wallet_type === 'seamless') {
          formSeamlessProcess(customer);
        } else {
          formTransferProcess(customer);
        }
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
