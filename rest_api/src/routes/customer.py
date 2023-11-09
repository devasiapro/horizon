from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
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

router = APIRouter(
    tags=['Customer'],
    prefix='/customer'
)

@router.get('')
def list_customer(page: int = 1, size = 20, db: Session = Depends(database.get_db)):
    total = db.query(CustomerModule).count()
    offset = 20 * (page - 1)
    customers = db.query(CustomerModule).offset(offset).limit(size).all()

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

    if customer.wallet_type == 'seamless':
        pass
    else:
        #STUB: 
        #Without this declarations, child tables are not included.
        #We should find a way to include these without weirdly just declaring the child properties
        customer.languages
        customer.currencies
        customer.domain_whitelist
        customer.ip_whitelist

    return customer

@router.put('/{customer_id}/transfer')
def edit_customer(
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
def edit_customer(
        request: CustomerSeamlessRequest,
        customer_id: int, 
        db: Session = Depends(database.get_db)
    ):
    pass

@router.delete('/{customer_id}')
def delete_customer():
    pass

@router.post('')
def create_customer():
    pass
