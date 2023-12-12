import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {

  public constructor(
    private customerService: CustomerService
  ) {}

  @Get('/')
  public async getCustomers(@Res() res: Response) {
    const customers = await this.customerService.fetchAll();
    console.log(customers);
    return res.status(200).json({
      items: customers
    });
  }
}
