import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  public constructor(
    @Inject('COUNTRY_REPOSITORY')
    private countryRepository: Repository<Country>,
  ) {}

  public async findByCountry(countryName: string): Promise<Country> {
    const country = await this.countryRepository.findOneBy({ country: countryName });
    return country;
  }

  public async store(country: Country): Promise<Country> {
    await this.countryRepository.save(country);
    return country;
  }
}
