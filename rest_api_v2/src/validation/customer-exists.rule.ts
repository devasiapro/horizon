import { Injectable } from '@nestjs/common';
import { 
  ValidatorConstraintInterface, 
  ValidationArguments, 
  ValidatorConstraint 
} from 'class-validator';
import { CustomerService } from '../customer/customer.service';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class CustomerExistsRule implements ValidatorConstraintInterface { 
  constructor(
    private customerService: CustomerService
  ) {}

  async validate(value: string) {
    try {
      const customer = await this.customerService.findByBrandName(value);
      if (!customer) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Customer doest not exists.`;
  }
}
