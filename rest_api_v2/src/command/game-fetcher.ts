import { Command, CommandRunner } from 'nest-commander';
import { FormData } from 'formdata-node';
import { FormDataEncoder } from "form-data-encoder";
import axios from 'axios';

import { flyingDragonCurrencies, dragonSharedCurrencies } from './currencies';
import { flyingDragonOutputs, dragonSharedOutputs } from './outputs';
import { flyingDragonReportBy, dragonSharedReportBy } from './report-by';
import { DragonSharedResponseDto } from './dto/dragon-shared-response.dto';
import { FlyingDragonResponseDto } from './dto/flying-dragon-response.dto';
import { DragonSharedSeederService } from './dragon-shared-seeder.service';

@Command({
  name: 'game-fetcher',
  arguments: '',
  description: '',
  options: {}
})
export class GameFetcher extends CommandRunner { 

  public constructor(private dragonSharedSeeder: DragonSharedSeederService) {
    super(); 
  } 

  public async run(inputs: string[], options?: Record<string, any>): Promise<void> {
    //await this.run88Shared();
    await this.runDragonShared();
    return;
  }

  private async run88Shared(): Promise<void> {
    const url = 'https://admin.88shared.com/reportviewer/api/report/execute/export';
    const filters = {
      casino: ["3811"],
      daterange: {
        startdate: "2023-11-20",
        enddate: "2023-11-21"
      },
      currency: flyingDragonCurrencies,
      sdin: "2",
      siaccounts: "2",
      reportBy: flyingDragonReportBy,
    };

    const formData = new FormData();
    formData.append('reportId', 'Reporting___Game_statistics');
    formData.append('configurationCode', '230671');
    formData.append('format', 'json');
    formData.append('apikey', 'AK-2-Dv7dryci5qBjqOr0eXLgF30DQ55-JBwWN9crxmc-LL');
    formData.append('filters', JSON.stringify(filters));
    formData.append('outputs', flyingDragonOutputs);

    const { headers } = new FormDataEncoder(formData)

    try {
      const response: { data: { data: FlyingDragonResponseDto[] } } = await axios.post(url, formData, { headers });
      const gameSessions = response.data.data;
      console.log(gameSessions);
    } catch (err) {
      console.log(err);
    }
  }

  private async runDragonShared(): Promise<void> {
    const url = 'https://admin.dragonshared.com/reportviewer/api/report/execute/export';
    const filters = {
      casino: ["4500", "4501", "4502", "4508"],
      daterange: {
        startdate: "2023-11-20",
        enddate: "2023-11-21"
      },
      currency: dragonSharedCurrencies,
      sdin: "2",
      siaccounts: "2",
      reportBy: dragonSharedReportBy,
    };

    const formData = new FormData();
    formData.append('reportId', 'Reporting___Game_statistics');
    formData.append('configurationCode', '231191');
    formData.append('format', 'json');
    formData.append('apikey', 'AK-2-TiPRgh-vLfmTo6JIe7wOgX8wXuqhTnDBKrCyyKs-LL');
    formData.append('filters', JSON.stringify(filters));
    formData.append('outputs', dragonSharedOutputs);

    const { headers } = new FormDataEncoder(formData)

    try {
      const response: { data: { data: DragonSharedResponseDto[] } } = await axios.post(
        url, formData, { headers }
      );
      const gameSessions = response.data.data;
      console.log(gameSessions);
      this.dragonSharedSeeder.setGameSessions(gameSessions);
      await this.dragonSharedSeeder.process();
    } catch (err) {
      console.log(err);
    }
  }
}
