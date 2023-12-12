import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  public constructor(
    @Inject('CUSTOMER_REPOSITORY') 
    private customerRepository: Repository<Customer>,
  ) {}

  public async fetchAll() {
    const customers = await this.customerRepository.find();
    return customers;
  }

  public async findByBrandName(brandName: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ brandName });
    return customer;
  }

  public async store(customer: Customer): Promise<Customer> {
    await this.customerRepository.save(customer);
    return customer;
  }
}
