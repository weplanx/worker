import { Command } from 'commander';
import { seed, sync } from './actions';

const program = new Command();

program
  .version('1.0.0')
  .action(() => {
    program.help();
  });

program.addCommand(
  program
    .createCommand('sync')
    .arguments('<target> <task>')
    .description('synchronize database entities', {
      target: 'configuration ID',
      task: 'sync task, for example: framework',
    })
    .action(sync),
);

program.addCommand(
  program
    .createCommand('seed')
    .arguments('<target> <task>')
    .description('generate initialization data', {
      target: 'configuration ID',
      task: 'task name',
    })
    .action(seed),
);

program.parse();
