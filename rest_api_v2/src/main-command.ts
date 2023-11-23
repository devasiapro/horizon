import { CommandFactory } from 'nest-commander';
import { CommandModule } from './command/command.module';

async function bootstrap() {
  await CommandFactory.run(CommandModule);
}
bootstrap();
