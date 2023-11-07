from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import database
from src.schemas.CustomerRequest import CustomerTransferRequest, CustomerSeamlessRequest
from src.models.CustomerModule import CustomerModule
from src.models.Currency import Currency
from src.models.Language import Language
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist
from src.models.Regulation import Regulation
from src.models.MarketJurisdiction import MarketJurisdiction
from src.models.OfficeIp import OfficeIp
from src.models.TestAccountStaging import TestAccountStaging
from src.models.TestAccountProduction import TestAccountProduction

router = APIRouter(
    tags=['Customer Seamless'],
    prefix='/customer/seamless'
)

@router.post('')
def create_customer(
        request: CustomerSeamlessRequest,
        db: Session = Depends(database.get_db)
    ):
    customer_model = CustomerModule(
        wallet_type = 'seamless',
        merchant_english_name = request.merchant_english_name, 
        brand_name = request.brand_name,
        business_contact = request.business_contact,
        billing_contact = request.billing_contact,
        technical_contact = request.technical_contact,
        customer_contact = request.customer_contact,
        maintainer_contact = request.maintainer_contact,
        company_contact = request.company_contact,
        staging_desktop_lobby_url = request.staging_desktop_lobby_url,
        staging_mobile_lobby_url = request.staging_mobile_lobby_url,
        staging_wallet_endpoint = request.staging_wallet_endpoint,
        staging_wallet_ip_port = request.staging_wallet_ip_port,
        staging_service_api_ip = request.staging_service_api_ip,
        production_desktop_lobby_url = request.production_desktop_lobby_url,
        production_mobile_lobby_url = request.production_mobile_lobby_url,
        production_wallet_endpoint = request.production_wallet_endpoint,
        production_wallet_ip_port = request.production_wallet_ip_port,
        production_service_api_ip = request.production_service_api_ip
    )

    db.add(customer_model)
    db.commit()
    db.refresh(customer_model)

    for regulation in request.regulations:
        regulation_model = Regulation(
            name = regulation,
            customer_id = customer_model.id
        )
        db.add(regulation_model)
        db.commit()
        db.refresh(regulation_model)

    for market_jurisdiction in request.market_jurisdiction:
        market_jurisdiction_model = MarketJurisdiction(
            name = market_jurisdiction,
            customer_id = customer_model.id
        )
        db.add(market_jurisdiction_model)
        db.commit()
        db.refresh(market_jurisdiction_model)

    for office_ip in request.office_ips:
        office_ip_model = OfficeIp(
            ip=office_ip, 
            customer_id=customer_model.id
        )
        db.add(office_ip_model)
        db.commit()
        db.refresh(office_ip_model)

    for language in request.languages_used:
        language_model = (db
            .query(Language)
            .filter(Language.name == language)
            .first()
        )

        if not language_model:
            language_model = Language(name=language)
            db.add(language_model)
            db.commit()
            db.refresh(language_model)

        customer_model.languages.append(language_model)

    for currency in request.currencies_used: 
        currency_model = (db
            .query(Currency)
            .filter(Currency.name == currency)
            .first()
        )

        is_default = False 
        if request.default_currency == currency:
            is_default = True

        if not currency_model:
            currency_model = Currency(
                name = currency,
                is_default = is_default
            )
            db.add(currency_model)
            db.commit()
            db.refresh(currency_model)

        customer_model.currencies.append(currency_model)

    for test_account in request.test_account_stagings:
        test_account_model = TestAccountStaging(
                customer_id = customer_model.id,
                username = test_account.username,
                password = test_account.password
            )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

    for test_account in request.test_account_productions:
        test_account_model = TestAccountProduction(
                customer_id = customer_model.id,
                username = test_account.username,
                password = test_account.password
            )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

    return customer_model 
