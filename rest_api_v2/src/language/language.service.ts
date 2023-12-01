import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Language } from './language.entity';

@Injectable()
export class LanguageService {
  public constructor(
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: Repository<Language>,
  ) {}

  public async findByLanguage(languageName: string): Promise<Language> {
    const language = await this.languageRepository.findOneBy({ language: languageName });
    return language;
  }

  public async store(language: Language): Promise<Language> {
    await this.languageRepository.save(language);
    return language;
  }
}
