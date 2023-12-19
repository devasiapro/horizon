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

export class CreateCustomerDto {

  @IsNotEmpty() 
  @IsString()
  @MaxLength(45)
  @Validate(CustomerUniqueRule)
  brand_name: string;  

  @ValidateIf(o => o.parent)
  @IsOptional()
  @IsString()
  @MaxLength(45)
  @Validate(CustomerExistsRule)
  parent: string; 

  @IsInt()
  wallet_type_id: number; 

  @ValidateIf(o => o.contact_person)
  @IsOptional()
  @IsString()
  @MaxLength(256)
  contact_person: string; 

  @ValidateIf(o => o.email)
  @IsOptional()
  @IsEmail()
  @MaxLength(256)
  email: string; 

  @ValidateIf(o => o.skype_group)
  @IsOptional()
  @IsString()
  @MaxLength(256)
  skype_group: string;
}
