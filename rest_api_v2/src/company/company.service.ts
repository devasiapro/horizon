import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm'; 
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  public constructor(
    @Inject('COMPANY_REPOSITORY') 
    private companyRepository: Repository<Company>,
  ) {}

  public async findByName(companyName: string): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ name: companyName });
    return company;
  }

  public async store(company: Company): Promise<Company> {
    await this.companyRepository.save(company);
    return company;
  }
}
