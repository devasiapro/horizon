import { 
  UseGuards,
  Query,
  Controller, 
  Get, 
  Post, 
  Patch,
  Res, 
  Body,
  HttpStatus,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { CustomerService } from '../customer/customer.service';

@Controller('contact')
export class ContactController {
  public constructor(
    private contactService: ContactService,
    private customerService: CustomerService
  ) {}


  @Post()
  @UseGuards(AuthGuard())
  public async create(
    @Res() res: Response,
    @Body() createContactDto: CreateContactDto
  ) {
    const customer = await this.customerService.findById(createContactDto.customer_id);
    createContactDto.contacts.forEach(async (contact) => {
      const model = new Contact(); 
      model.email = contact.email;
      model.skypeId = contact.skype_id;
      model.testUserCredential = contact.test_user_credential;
      model.customer = customer;
      await this.contactService.store(model);
    });

    return res.status(200).json(createContactDto); 
  }
}
