import { Controller, Get } from '@nestjs/common';

@Controller('report')
export class ReportController {

  @Get('/kpi')
  public fetchKpi() {
    return [];
  }

  @Get('/game-earning')
  public fetchGameEarning() {
    return [];
  }

  @Get('/customer-income')
  public fetchCustomerIncome() {
    return [];
  }

  @Get('/product-income')
  public fetchProductIncome() {
    return [];
  }
  
  @Get('/country-income')
  public fetchCountryIncome() {
    return [];
  }
}
