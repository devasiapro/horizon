from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy import desc
from sqlalchemy.orm import Session
import math

from database import database
from src.schemas.CustomerResponse import CustomerResponse
from src.schemas.CustomerRequest import CustomerTransferRequest, CustomerSeamlessRequest
from src.models.CustomerModule import CustomerModule
from src.models.Currency import Currency
from src.models.Language import Language
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist
from src.models.ContractStatus import ContractStatus
from src.models.CustomerCurrency import CustomerCurrency 
from src.models.Regulation import Regulation 
from src.models.MarketJurisdiction import MarketJurisdiction 
from src.models.License import License
from src.models.OfficeIp import OfficeIp
from src.models.TestAccountStaging import TestAccountStaging
from src.models.TestAccountProduction import TestAccountProduction

router = APIRouter(
    tags=['Customer'],
    prefix='/customer'
)

@router.get('')
def list_customer(
        page: int = 1, 
        search: str = '', 
        wallet_type: str = 'transfer,seamless', 
        size = 20, 
        integration_status: int = 0,
        db: Session = Depends(database.get_db)
    ):


    if wallet_type == '':
        wallet_type = 'transfer,seamless'

    wallet_types = wallet_type.split(',') 
    
    query = (db
        .query(CustomerModule)
        .filter(CustomerModule.brand_name.like('%' + search + '%'))
        .filter(CustomerModule.wallet_type.in_(wallet_types))
    )

    if integration_status > 0:
        query = query.filter(CustomerModule.integration_status_id == integration_status)

    total = query.count()
    offset = 20 * (page - 1)
    query = (db
        .query(CustomerModule)
        .filter(CustomerModule.brand_name.like('%' + search + '%'))
        .filter(CustomerModule.wallet_type.in_(wallet_types))
    )

    if integration_status > 0:
        query = query.filter(CustomerModule.integration_status_id == integration_status)

    query = (query
        .order_by(desc(CustomerModule.date_added))
        .offset(offset)
        .limit(size)
    )

    customers = query.all()

    for customer in customers:
        currencies = customer.currencies

    return {
        "items": customers,
        "total": total,
        "page": page,
        "size": size,
        "pages": math.ceil(total / size)
    }

@router.get('/{customer_id}')
def view_customer(customer_id: int, db: Session = Depends(database.get_db)):
    customer = db.query(CustomerModule).filter(CustomerModule.id == customer_id).first();

    if not customer:
        # TODO: Throw 404 error here
        pass

    #STUB: 
    #Without this declarations, child tables are not included.
    #We should find a way to include these without weirdly just declaring the child properties
    if customer.wallet_type == 'seamless':
        customer.regulations
        customer.market_jurisdictions
        customer.licenses
        customer.office_ips
        customer.languages
        customer.currencies
        customer.test_account_stagings
        customer.test_account_productions
    else:
        customer.languages
        customer.currencies
        customer.domain_whitelist
        customer.ip_whitelist

    return customer

@router.put('/{customer_id}/transfer')
def edit_customer_transfer(
        request: CustomerTransferRequest,
        customer_id: int, 
        db: Session = Depends(database.get_db)
    ):
    customer = db.query(CustomerModule).filter(CustomerModule.id == customer_id).first()    

    if not customer:
        # TODO: Throw 404 error here
        pass

    if customer.wallet_type != 'transfer':
        # TODO: Throw 404 error here
        pass

    customer.merchant_english_name = request.merchant_english_name  
    customer.merchant_chinese_name = request.merchant_chinese_name
    customer.prefix = request.prefix
    customer.business_contact = request.business_contact
    customer.billing_contact = request.billing_contact
    customer.technical_contact = request.technical_contact
    customer.customer_contact = request.customer_contact
    customer.maintainer_contact = request.maintainer_contact
    customer.company_contact = request.company_contact
    customer.brand_name = request.brand_name

    customer.currencies.clear() 
    db.commit()
    for currency in request.currencies:
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

        customer.currencies.append(currency_model)

    customer.languages.clear()
    db.commit()
    for language in request.languages:
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

        customer.languages.append(language_model)

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer

@router.put('/{customer_id}/seamless')
def edit_customer_seamless(
        request: CustomerSeamlessRequest,
        customer_id: int, 
        db: Session = Depends(database.get_db)
    ):
    customer = db.query(CustomerModule).filter(CustomerModule.id == customer_id).first()

    if not customer:
        # TODO: Throw 404 error here
        pass

    if customer.wallet_type != 'seamless':
        #TODO: Throw 404 error here
        pass

    customer.merchant_english_name = request.merchant_english_name
    customer.brand_name = request.brand_name
    customer.business_contact = request.business_contact
    customer.billing_contact = request.billing_contact
    customer.technical_contact = request.technical_contact
    customer.customer_contact = request.customer_contact
    customer.maintainer_contact = request.maintainer_contact
    customer.company_contact = request.company_contact
    customer.staging_desktop_lobby_url = request.staging_desktop_lobby_url
    customer.staging_mobile_lobby_url = request.staging_mobile_lobby_url
    customer.staging_wallet_endpoint = request.staging_wallet_endpoint
    customer.staging_wallet_ip_port = request.staging_wallet_ip_port
    customer.staging_service_api_ip = request.staging_service_api_ip
    customer.production_desktop_lobby_url = request.production_desktop_lobby_url
    customer.production_mobile_lobby_url = request.production_mobile_lobby_url
    customer.production_wallet_endpoint = request.production_wallet_endpoint
    customer.production_wallet_ip_port = request.production_wallet_ip_port
    customer.production_service_api_ip = request.production_service_api_ip

    db.query(Regulation).filter(Regulation.customer_id == customer_id).delete()
    db.commit()
    for regulation in request.regulations:
        regulation_model = Regulation(
            name = regulation,
            customer_id = customer_id
        )
        db.add(regulation_model)
        db.commit()
        db.refresh(regulation_model)

    db.query(MarketJurisdiction).filter(MarketJurisdiction.customer_id == customer_id).delete()
    db.commit()
    for market_jurisdiction in request.market_jurisdiction: 
        market_jurisdiction_model = MarketJurisdiction(
            name = market_jurisdiction,
            customer_id = customer_id
        )
        db.add(market_jurisdiction_model)
        db.commit()
        db.refresh(market_jurisdiction_model)

    db.query(License).filter(License.customer_id == customer_id).delete()
    db.commit()
    for license in request.licenses:
        license_model = License(
            name = license,
            customer_id = customer_id
        )
        db.add(license_model)
        db.commit()
        db.refresh(license_model)

    db.query(OfficeIp).filter(OfficeIp.customer_id == customer_id).delete()
    db.commit()
    for office_ip in request.office_ips:
        office_ip_model = OfficeIp(
            ip = office_ip,
            customer_id = customer_id
        )
        db.add(office_ip_model)
        db.commit()
        db.refresh(office_ip_model)

    customer.languages.clear()
    db.commit()
    for language in request.languages_used:
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

        customer.languages.append(language_model)

    customer.currencies.clear()
    db.commit()
    for currency in request.currencies_used:
        currency_model = (db
            .query(Currency) 
            .filter(Currency.name == currency)
            .first()
        )

        is_default = False 
        if currency == request.default_currency:
            is_default = True

        if not currency_model:
            currency_model = Currency(name = currency, is_default = is_default)
            db.add(currency_model)
            db.commit()
            db.refresh(currency_model)

        customer_currency = CustomerCurrency(
                customer_id = customer_id, 
                currency_id = currency_model.id, 
                is_default = True
        )
        db.add(customer_currency)
        db.commit()
        db.refresh(customer_currency)

    db.query(TestAccountStaging).filter(TestAccountStaging.customer_id == customer_id).delete()
    db.commit()
    for test_account in request.test_account_stagings:
        test_account_model = TestAccountStaging(
            customer_id = customer_id,
            username = test_account.username,
            password = test_account.password
        )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

    db.query(TestAccountProduction).filter(TestAccountProduction.customer_id == customer_id).delete()
    db.commit()
    for test_account in request.test_account_productions:
        test_account_model = TestAccountProduction(
            customer_id = customer_id,
            username = test_account.username,
            password = test_account.password
        )
        db.add(test_account_model)
        db.commit()
        db.refresh(test_account_model)

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer

@router.delete('/{customer_id}')
def delete_customer():
    pass

@router.post('')
def create_customer():
    pass
