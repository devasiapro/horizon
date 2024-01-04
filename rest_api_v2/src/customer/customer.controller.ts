import { 
  UseGuards,
  Query,
  Controller, 
  Get, 
  Post, 
  Patch,
  Delete,
  Res, 
  Body,
  HttpStatus,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { ReportDto } from './report.dto';
import { WalletTypeService } from '../wallet-type/wallet-type.service';
import { WalletType } from '../wallet-type/wallet-type.entity';
import { WalletTypeEnum } from '../wallet-type/wallet-type.enum';
import { KioskService } from '../kiosk/kiosk.service';
import { InstanceService } from '../instance/instance.service';
import { GameSessionService } from '../game-session/game-session.service';
import { ContactService } from '../contact/contact.service';

@Controller('customer')
export class CustomerController {

  public constructor(
    private customerService: CustomerService,
    private walletTypeService: WalletTypeService,
    private instanceService: InstanceService,
    private kioskService: KioskService,
    private gameSessionService: GameSessionService,
    private contactService: ContactService
  ) {}

  @Get('')
  @UseGuards(AuthGuard())
  public async findAll(@Res() res: Response) {
    const customers = await this.customerService.fetchAll();
    return res.status(200).json({
      items: customers
    });
  }

  @Get(':customerId')
  @UseGuards(AuthGuard())
  public async find(
    @Param() params: any,
    @Res() res: Response
  ) {
    const customer = await this.customerService.findById(params.customerId);
    return res.status(200).json(customer);
  }

  @Get(':customerId/kpi')
  @UseGuards(AuthGuard())
  public async findCustomerKpi(
    @Query() query: ReportDto,
    @Param() params: any,
    @Res() res: Response
  ) {
    const customerId = params.customerId;
    const startDate = query.start_date;
    const endDate = query.end_date;

    const customer = await this.customerService.findById(customerId);
    const gameSessions = await this
      .gameSessionService
      .fetchByCustomer(customer, startDate, endDate);

    const totalWins = gameSessions
      .reduce((sum, current) => sum + Number(current.totalGameWins), 0);

    const totalBets = gameSessions
      .reduce((sum, current) => sum + Number(current.totalGameBets), 0);

    const kpi = {
      ggr: gameSessions
        .reduce((sum, current) => sum + Number(current.totalIncome), 0),
      total_bets: totalBets,
      total_players: gameSessions
        .reduce((sum, current) => sum + Number(current.playersCount), 0),
      rtp: totalWins / totalBets,
      bet_count: gameSessions
        .reduce((sum, current) => sum + Number(current.gamesCount), 0)
    };
    return res.status(200).json(kpi);
  }

  @Get(':customerId/game-session')
  @UseGuards(AuthGuard())
  public async findGameSessions(
    @Query() query: ReportDto,
    @Param() params: any,
    @Res() res: Response
  ) {
    const customerId = params.customerId;
    const startDate = query.start_date;
    const endDate = query.end_date;

    try {
      const customer = await this.customerService.findById(customerId);
      if (customer.walletType.id == WalletTypeEnum.SEAMLESS) {
        if (!customer.instance) {
          return res.status(200).json([]);
        }
        const gameSessions = await this.gameSessionService.findAllByInstance(
          customer.instance.id,
          startDate,
          endDate
        );
        return res.status(200).json(gameSessions);
      }

      if (customer.walletType.id == WalletTypeEnum.TRANSFER) {
        if (!customer.kiosk) {
          return res.status(200).json([]);
        }
        const gameSessions = await this.gameSessionService.findAllByKiosk(
          customer.kiosk.id,
          startDate,
          endDate
        );
        return res.status(200).json(gameSessions);
      }

    } catch(err) {
      console.log('err', err);
    } finally {

    }
    return res.status(200).json({test: 'test'});
  }

  @Post()
  @UseGuards(AuthGuard())
  public async create(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    let parent = null;
    if (createCustomerDto.parent) {
      parent = await this.customerService.findByBrandName(createCustomerDto.parent);
      if (!parent) {
        return res.status(400).json({ group: 'Group does not exists.' });
      }
    }

    const customer = new Customer();
    customer.brandName = createCustomerDto.brand_name;
    if (parent) {
      customer.parent = parent;
    }

    const walletType = await this.walletTypeService.findById(createCustomerDto.wallet_type_id);

    if (!walletType) {
      return res.status(400).json({
        wallet_type: 'Wallet type does not exists.' 
      });
    }

    customer.walletType = walletType;
    customer.contactPerson = createCustomerDto.contact_person;
    customer.email = createCustomerDto.email;
    customer.skypeGroup = createCustomerDto.skype_group;
    await this.customerService.store(customer);
    return res.status(200).json(customer);
  }

  @Patch(':customerId')
  @UseGuards(AuthGuard())
  public async update(
    @Param() params: any,
    @Res() response: Response,
    @Body() request: UpdateCustomerDto
  ) {
    const customerId = params.customerId;
    try {
      const customer = await this.customerService.findById(customerId);

      if (customer.walletType.id == WalletTypeEnum.SEAMLESS) {
        const instance = await this.instanceService.findByName(request.instance);
        customer.instance = instance;
      }

      if (customer.walletType.id == WalletTypeEnum.TRANSFER) {
        const kiosk = await this.kioskService.findByName(request.kiosk);
        customer.kiosk = kiosk;
      }

      await this.customerService.store(customer);

    } catch (err) {
      console.log('err', err);
    } finally {

    }
    return response.status(200).json({customerId});
  }

  @Delete(':customerId')
  @UseGuards(AuthGuard())
  public async delete(
    @Param() params: any, 
    @Res() response: Response
  ) {
    const customerId = params.customerId;
    const children = await this.customerService.fetchChildren(customerId);
    if (children.length > 0) {
      return response.status(400).json({
        customer: `Customer with sub-brands can't be deleted. Please delete the sub-brands first.`
      });
    }
    await this.contactService.deleteByCustomer(customerId);
    await this.customerService.deleteById(customerId);
    return response.status(200).json({delete: 'ok'});
  }
}
