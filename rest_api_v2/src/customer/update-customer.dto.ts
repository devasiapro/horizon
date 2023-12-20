import { 
  IsEmail, 
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsInt,
  MaxLength,
  ValidateIf,
  Validate
} from 'class-validator';
import { CustomerUniqueRule } from '../validation/customer-unique.rule';
import { CustomerExistsRule } from '../validation/customer-exists.rule';

export class UpdateCustomerDto {
  @ValidateIf(o => o.kiosk)
  @IsOptional()
  @MaxLength(256)
  kiosk: string;

  @ValidateIf(o => o.instance)
  @IsOptional()
  @MaxLength(256)
  instance: string;
}
