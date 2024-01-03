import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  public constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  public async store(contact: Contact): Promise<Contact> {
    await this.contactRepository.save(contact);
    return contact;
  }
}
