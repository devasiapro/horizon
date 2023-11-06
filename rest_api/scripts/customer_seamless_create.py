import requests

url = "http://localhost:8888/customer/seamless"

payload = {
    "merchant_english_name": "Merchant English Name",
    "brand_name": "Test brand",
    "regulations": ["Regulation1", "Regulation2"],
    "market_jurisdiction": ["Market1", "Market2"],
    "licenses": ["License1", "License2"],
    "office_ips": ["123141231", "21313132"],
    "languages_used": ["Language1", "Language2"],
    "currencies_used": ["Currency1", "Currency2"],
    "default_currency": "Currency2",
    "business_contact": "Business123",
    "billing_contact": "Billing123",
    "technical_contact": "Technical123",
    "customer_contact": "Customer123",
    "maintainer_contact": "Maintainer123",
    "company_contact": "Company123",
    "staging_desktop_lobby_url": "https://staging.com",
    "staging_mobile_lobby_url": "https://mobile.staging.com",
    "staging_test_accounts": [{"username": "user1", "password": "pass1"}],
    "staging_wallet_endpoint": "https://wallet.com",
    "staging_wallet_ip_port": "https://12.12.12.12:9090",
    "staging_service_api_ip": "https://12.23.12.12",
    "production_desktop_lobby_url": "https://prod.com",
    "production_mobile_lobby_url": "https://mobile.prod.com",
    "production_test_accounts": [{"username": "user2", "password": "pass2"}],
    "production_wallet_endpoint": "https://wallet2.com",
    "production_wallet_ip_port": "https://11.12.12.12:9090",
    "production_service_api_ip": "https://11.23.12.12",
}

response = requests.post(url, json=payload);

status = response.status_code
print(status)
if status == 200:
    print(response.json())
