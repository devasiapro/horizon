import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  public constructor(
    @Inject('CURRENCY_REPOSITORY')
    private currencyRepository: Repository<Currency>
  ) {}

  public async findByCurrencyCode(currencyCode: string): Promise<Currency> {
    const currency = await this.currencyRepository.findOneBy({ currencyCode });
    return currency;
  }

  public async store(currency: Currency): Promise<Currency> {
    await this.currencyRepository.save(currency);
    return currency;
  }
}
