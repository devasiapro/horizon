from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from datetime import datetime

from database import database
from src.schemas.CustomerRequest import CustomerTransferRequest, CustomerSeamlessRequest
from src.models.CustomerModule import CustomerModule
from src.models.Currency import Currency
from src.models.Language import Language
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist

router = APIRouter(
    tags=['Customer Transfer'],
    prefix='/customer/transfer'
)

@router.post('')
def create_customer(
        request: CustomerTransferRequest,
        db: Session = Depends(database.get_db)
    ):
    customer_model = CustomerModule(
        merchant_english_name = request.merchant_english_name,
        merchant_chinese_name = request.merchant_chinese_name,
        wallet_type = 'transfer',
        prefix = request.prefix,
        business_contact = request.business_contact,
        billing_contact = request.billing_contact,
        technical_contact = request.technical_contact,
        customer_contact = request.customer_contact,
        maintainer_contact = request.maintainer_contact,
        company_contact = request.company_contact,
        brand_name = request.brand_name,
        date_added = datetime.now(),
        contract_status_id = 1
    )

    for currency in request.currencies:
        currency_model = (db
            .query(Currency)
            .filter(Currency.name == currency)
            .first()
        )
        
        if not currency_model:
            currency_model = Currency(name=currency)
            db.add(currency_model)
            db.commit()
            db.refresh(currency_model)
        
        customer_model.currencies.append(currency_model)

    for language in request.languages:
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

    db.add(customer_model)
    db.commit()
    db.refresh(customer_model)

    for ip in request.ip_whitelist:
        ip_whitelist_model = IpWhitelist(
            ip = ip,
            customer_id = customer_model.id
        )
        db.add(ip_whitelist_model)
        db.commit()
        db.refresh(ip_whitelist_model)

    for domain in request.domain_whitelist:
        domain_whitelist_model = DomainWhitelist(
            domain = domain,
            customer_id = customer_model.id
        )
        db.add(domain_whitelist_model)
        db.commit()
        db.refresh(domain_whitelist_model)

    return customer_model 
