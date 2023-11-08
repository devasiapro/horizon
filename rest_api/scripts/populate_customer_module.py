from faker import Faker
import requests
import random

fake = Faker()

for i in range(500):
    if random.randint(0, 1) == 1:
        url = "http://localhost:8888/customer/seamless"
        company = fake.company()
        default_currency = fake.currency_code()
        payload = {
            "merchant_english_name": company,
            "brand_name": company,
            "regulations": [fake.company_suffix(), fake.company_suffix()],
            "market_jurisdiction": [fake.city(), fake.city()],
            "licenses": [fake.sbn9(), fake.sbn9()],
            "office_ips": [fake.ipv4(), fake.ipv4()],
            "languages_used": [fake.language_name(), fake.language_name()],
            "currencies_used": [fake.currency_code(), default_currency],
            "default_currency": default_currency,
            "business_contact": fake.ascii_company_email(),
            "billing_contact": fake.ascii_company_email(),
            "technical_contact": fake.ascii_company_email(),
            "customer_contact": fake.ascii_company_email(),
            "maintainer_contact": fake.ascii_company_email(),
            "company_contact": fake.ascii_company_email(),
            "staging_desktop_lobby_url": fake.url(),
            "staging_mobile_lobby_url": fake.url(),
            "test_account_stagings": [{"username": fake.first_name(), "password": fake.word()}],
            "staging_wallet_endpoint": fake.url(),
            "staging_wallet_ip_port": fake.ipv4() + ':80',
            "staging_service_api_ip": fake.ipv4(),
            "production_desktop_lobby_url": fake.url(),
            "production_mobile_lobby_url": fake.url(),
            "test_account_productions": [{
                "username": fake.first_name(), 
                "password": fake.word()
            }],
            "production_wallet_endpoint": fake.url(),
            "production_wallet_ip_port": fake.ipv4() + ':80',
            "production_service_api_ip": fake.ipv4() 
        }

        response = requests.post(url, json=payload);
    else:
        url = "http://localhost:8888/customer/transfer"
        company = fake.company()
        default_currency = fake.currency_code()
        payload = {
            "wallet_type": 'transfer',
            "merchant_english_name": company,
            "merchant_chinese_name": fake.company(),
            "brand_name": company,
            "languages": [fake.language_name(), fake.language_name()],
            "currencies": [fake.currency_code(), default_currency],
            "prefix": fake.company_suffix(),
            "domain_whitelist": [fake.url(), fake.url()],
            "ip_whitelist": [fake.ipv4(), fake.ipv4()],
            "business_contact": fake.ascii_company_email(),
            "billing_contact": fake.ascii_company_email(),
            "technical_contact": fake.ascii_company_email(),
            "customer_contact": fake.ascii_company_email(),
            "maintainer_contact": fake.ascii_company_email(),
            "company_contact": fake.ascii_company_email(),
        }
        response = requests.post(url, json=payload);

    print(i)
