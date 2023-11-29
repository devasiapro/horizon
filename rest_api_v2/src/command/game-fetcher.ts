import { Command, CommandRunner, Option } from 'nest-commander';
import { FormData } from 'formdata-node';
import { FormDataEncoder } from "form-data-encoder";
import axios from 'axios';

import { flyingDragonCurrencies, dragonSharedCurrencies } from './currencies';
import { flyingDragonOutputs, dragonSharedOutputs } from './outputs';
import { flyingDragonReportBy, dragonSharedReportBy } from './report-by';
import { DragonSharedResponseDto } from './dto/dragon-shared-response.dto';
import { FlyingDragonResponseDto } from './dto/flying-dragon-response.dto';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';
import { FlyingDragonSeederService } from './flying-dragon-seeder.service';

interface CommandOptions {
  startdate: string;
  enddate: string;
}

@Command({
  name: 'game-fetcher',
  arguments: '',
  description: '',
  options: {}
})
export class GameFetcher extends CommandRunner { 

  public constructor(
    private dragonSharedSeeder: DragonSharedSeederService,
    private flyingDragonSeeder: FlyingDragonSeederService
  ) {
    super(); 
  } 

  @Option({
    flags: '-s, --startdate [startdate]',
    description: 'Start date.'
  })
  public parseStartDate(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --enddate [enddate]',
    description: 'End date.'
  })
  public parseEndDate(val: string): string {
    return val;
  }

  public async run(inputs: string[], options?: CommandOptions): Promise<void> {
    const startDate = options.startdate;
    const endDate = options.enddate;

    await this.run88Shared(startDate, endDate);
    await this.runDragonShared(startDate, endDate);
    process.exit();
  }

  private async run88Shared(startDate: string, endDate: string): Promise<void> {
    const url = process.env.FLYING_DRAGON_URL
    const filters = {
      casino: ["3811"],
      daterange: {
        startdate: startDate,
        enddate: endDate
      },
      currency: flyingDragonCurrencies,
      sdin: "2",
      siaccounts: "2",
      reportBy: flyingDragonReportBy,
    };

    const formData = new FormData();
    formData.append('reportId', 'Reporting___Game_statistics');
    formData.append('configurationCode', process.env.FLYING_DRAGON_CONFIGURATION_CODE);
    formData.append('format', 'json');
    formData.append('apikey', process.env.FLYING_DRAGON_API_KEY);
    formData.append('filters', JSON.stringify(filters));
    formData.append('outputs', flyingDragonOutputs);

    const { headers } = new FormDataEncoder(formData)

    try {
      const response: { data: { data: FlyingDragonResponseDto[] } } = await axios.post(url, formData, { headers });
      const gameSessions = response.data.data;
      this.flyingDragonSeeder.setGameSessions(gameSessions);
      await this.flyingDragonSeeder.process();
    } catch (err) {
      console.log(err);
    }
  }

  private async runDragonShared(startDate: string, endDate: string): Promise<void> {
    const url = process.env.DRAGON_SHARED_URL
    const filters = {
      casino: ["4500", "4501", "4502", "4508"],
      daterange: {
        startdate: startDate,
        enddate: endDate
      },
      currency: dragonSharedCurrencies,
      sdin: "2",
      siaccounts: "2",
      reportBy: dragonSharedReportBy,
    };

    const formData = new FormData();
    formData.append('reportId', 'Reporting___Game_statistics');
    formData.append('configurationCode', process.env.DRAGON_SHARED_CONFIGURATION_CODE);
    formData.append('format', 'json');
    formData.append('apikey', process.env.DRAGON_SHARED_API_KEY);
    formData.append('filters', JSON.stringify(filters));
    formData.append('outputs', dragonSharedOutputs);

    const { headers } = new FormDataEncoder(formData)

    try {
      const response: { data: { data: DragonSharedResponseDto[] } } = await axios.post(
        url, formData, { headers }
      );
      const gameSessions = response.data.data;
      this.dragonSharedSeeder.setGameSessions(gameSessions);
      await this.dragonSharedSeeder.process();
    } catch (err) {
      console.log(err);
    }
  }
}
