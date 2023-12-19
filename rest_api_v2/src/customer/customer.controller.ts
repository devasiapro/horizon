import { 
  Controller, 
  Get, 
  Post, 
  Res, 
  Body,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';
import { WalletTypeService } from '../wallet-type/wallet-type.service';
import { WalletType } from '../wallet-type/wallet-type.entity';

@Controller('customer')
export class CustomerController {

  public constructor(
    private customerService: CustomerService,
    private walletTypeService: WalletTypeService
  ) {}

  @Get()
  public async findAll(@Res() res: Response) {
    const customers = await this.customerService.fetchAll();
    return res.status(200).json({
      items: customers
    });
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    let parent = null;
    if (createCustomerDto.parent) {
      parent = await this.customerService.findByBrandName(createCustomerDto.parent);
      if (!parent) {
        return res.status(400).json({ test: 'est' });
      }
    }

    const customer = new Customer();
    customer.brandName = createCustomerDto.brand_name;
    if (parent) {
      customer.parent = parent;
    }

    const walletType = await this.walletTypeService.findById(createCustomerDto.wallet_type_id);

    if (!walletType) {
      return res.status(400).json();
    }

    customer.walletType = walletType;
    customer.contactPerson = createCustomerDto.contact_person;
    customer.email = createCustomerDto.email;
    customer.skypeGroup = createCustomerDto.skype_group;
    await this.customerService.store(customer);
    return res.status(200).json(customer);
  }
}
