from sqlalchemy import text
import asyncio

from database import database
from src.models.CustomerModule import CustomerModule
from src.models.Language import Language
from src.models.Currency import Currency
from src.models.CustomerCurrency import CustomerCurrency
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist
from src.models.Regulation import Regulation
from src.models.MarketJurisdiction import MarketJurisdiction
from src.models.OfficeIp import OfficeIp
from src.models.TestAccountStaging import TestAccountStaging
from src.models.TestAccountProduction import TestAccountProduction
from src.models.ContractStatus import ContractStatus
from src.models.License import License


connection = database.engine.connect()

db = None
for getdb in database.get_db():
    db = getdb

query = text('SELECT * FROM seamless_wallet;')
result = connection.execute(query).keys()
keys = {}
for index, row in enumerate(result):
    keys[row] = index

query = text('SELECT * FROM seamless_wallet;')
result = connection.execute(query)
for row in result:
    customer_module = CustomerModule(
        wallet_type = 'seamless',
        merchant_english_name = row[keys['licensee_name']],
        brand_name = row[keys['brand_name']],
        business_contact = row[keys['business_contact_email']],
        billing_contact = row[keys['billing_contact_email']],
        technical_contact = row[keys['technical_contact_email']],
        customer_contact = row[keys['customer_service_contact_email']],
        maintainer_contact = row[keys['maintainer_contact_email']],
        company_contact = row[keys['company_contact_email']],
        staging_desktop_lobby_url = row[keys['staging_desktop_url']],
        staging_mobile_lobby_url = row[keys['staging_mobile_url']],
        staging_wallet_endpoint = row[keys['staging_wallet_endpoint']],
        staging_wallet_ip_port = row[keys['staging_wallet_ip_port']],
        staging_service_api_ip = row[keys['staging_serviceapi_ip']],
        production_desktop_lobby_url = row[keys['production_desktop_url']],
        production_mobile_lobby_url = row[keys['production_mobile_url']],
        production_wallet_endpoint = row[keys['production_wallet_endpoint']],
        production_wallet_ip_port = row[keys['production_wallet_ip_port']],
        production_service_api_ip = row[keys['production_serviceapi_ip']],
        date_added = row[keys['created_at']],
        contract_status_id = 1,
        integration_status_id = 1
    )

    db.add(customer_module)
    db.commit()
    db.refresh(customer_module)

    raw_regulations = row[keys['regulation']]
    regulations = []
    if raw_regulations:
        regulations = raw_regulations.split(',')

    for regulation in regulations:
        regulation_model = Regulation(
            name = regulation.strip(),
            customer_id = customer_module.id
        )
        db.add(regulation_model)
        db.commit()
        db.refresh(regulation_model)

    raw_licenses = row[keys['licence']]
    licenses = []
    if raw_licenses:
        licenses = raw_licenses.split(',')
    for license in licenses:
        license_model = License(
            name = license.strip(),
            customer_id = customer_module.id
        )
        db.add(license_model)
        db.commit()
        db.refresh(license_model)

    raw_market_jurisdictions = row[keys['market_jurisdiction']]
    market_juridictions = []
    if raw_market_jurisdictions:
        market_jurisdictions = raw_market_jurisdictions.split(',')
    for market_jurisdiction in market_jurisdictions:
        market_jurisdiction_model = MarketJurisdiction(
            name = market_jurisdiction.strip(),
            customer_id = customer_module.id
        )
        db.add(market_jurisdiction_model)
        db.commit()
        db.refresh(market_jurisdiction_model)

    raw_office_ips = row[keys['office_ip']]
    office_ips = []
    if raw_office_ips:
        office_ips = raw_office_ips.split(',')
    for office_ip in raw_office_ips:
        office_ip_model = OfficeIp(
            ip = office_ip,
            customer_id = customer_module.id
        )
        db.add(office_ip_model)
        db.commit()
        db.refresh(office_ip_model)

    raw_languages = row[keys['lang_code']]
    languages = []
    if raw_languages:
        languages = raw_languages.split(',')

    for language in languages:
        language = language.strip()
        language_model = (db
            .query(Language)
            .filter(Language.name == language)
            .first()
        )

        if not language_model:
            language_model = Language(name = language)
            db.add(language_model)
            db.commit()
            db.refresh(language_model)

        customer_module.languages.append(language_model)

    raw_currencies = row[keys['currency']]
    currencies = []
    if raw_currencies:
        currencies = raw_currencies.split(',')

    for currency in currencies:
        currency = currency.strip()
        currency_model = (db
            .query(Currency)
            .filter(Currency.name == currency)
            .first()
        )

        if not currency_model:
            currency_model = Currency(name = currency)
            db.add(currency_model)
            db.commit()
            db.refresh(currency_model)

        customer_module.currencies.append(currency_model)

    raw_staging_test_accounts = row[keys['staging_test_accounts']]
    staging_test_accounts = []
    if raw_staging_test_accounts:
        staging_test_accounts = raw_staging_test_accounts.split(',')

    for staging_test_account in staging_test_accounts:
        staging_test_account = staging_test_account.strip()
        test_account_model = TestAccountStaging(
            customer_id = customer_module.id,
            username = staging_test_account,
            password = 'NA'
        )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

    raw_production_test_accounts = row[keys['production_test_accounts']]
    production_test_accounts = []
    if raw_production_test_accounts:
        production_test_accounts = raw_production_test_accounts.split(',')

    for production_test_account in production_test_accounts:
        production_test_account = production_test_account.strip()
        test_account_model = TestAccountProduction(
            customer_id = customer_module.id,
            username = production_test_account,
            password = 'NA'
        )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

query = text('SELECT * FROM transfer_wallet;')
result = connection.execute(query).keys()

keys = {}
for index, row in enumerate(result):
    keys[row] = index

query = text('SELECT * FROM transfer_wallet;')
result = connection.execute(query)

for row in result: 
    customer_module = CustomerModule(
        merchant_english_name = row[keys['merchant_name']],
        merchant_chinese_name = row[keys['merchant_name']],
        wallet_type = 'transfer',
        prefix = row[keys['player_prefix']],
        business_contact = row[keys['business_contact_email']],
        billing_contact = row[keys['billing_contact_email']],
        technical_contact = row[keys['technical_contact_email']],
        customer_contact = row[keys['customer_service_contact_email']],
        maintainer_contact = row[keys['maintainer_contact_email']],
        company_contact = row[keys['company_contact_email']],
        brand_name = row[keys['brand_name']],
        date_added = row[keys['created_at']],
        contract_status_id = 1,
        integration_status_id = 1
    )

    rawCurrencies = row[keys['currency']]
    currencies = []
    if rawCurrencies:
        currencies = rawCurrencies.split(',')

    for currency in currencies:
        currency = currency.strip()
        currency_model = (db
            .query(Currency)
            .filter(Currency.name == currency)
            .first()
        )

        if not currency_model:
            currency_model = Currency(name = currency)
            db.add(currency_model)
            db.commit()
            db.refresh(currency_model)

        customer_module.currencies.append(currency_model)

    rawLanguages = row[keys['lang']]
    languages = []
    if rawLanguages:
        languages = rawLanguages.split(',')

    for language in languages:
        language = language.strip()
        language_model = (db
            .query(Language)
            .filter(Language.name == language)
            .first()
        )

        if not language_model:
            language_model = Language(name = language)
            db.add(language_model)
            db.commit()
            db.refresh(language_model)

        customer_module.languages.append(language_model)

    db.add(customer_module)
    db.commit()
    db.refresh(customer_module)

    rawDomains = row[keys['url_domain_whitelist']]
    if rawDomains:
        domains = rawDomains.split(',')
        for domain in domains:
            domain_whitelist_model = DomainWhitelist(
                domain = domain.strip(),
                customer_id = customer_module.id
            )
            db.add(domain_whitelist_model)
            db.commit()
            db.refresh(domain_whitelist_model)
