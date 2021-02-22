import { ConnectionOptions, createConnection } from 'typeorm';
import { parse } from 'yaml';
import { readFileSync } from 'fs';

export const sync = async (target: string, task: string, option: any) => {
  console.log(option);
  const configs = parse(readFileSync('./config.yml', 'utf8'));
  if (!configs.hasOwnProperty(target)) {
    console.error('configuration target does not exist');
    return;
  }
  const config = configs[target];
  const connection = await createConnection(Object.assign({
    synchronize: false,
    logging: true,
    entities: [
      `src/entity/${task}/*.ts`,
    ],
  }, <ConnectionOptions>{
    type: config.type,
    url: config.url,
    entityPrefix: config.entityPrefix,
  }));
  await connection.synchronize(option.fresh);
  await connection.close();
};

export const seed = async (target: string, task: string) => {
  const configs = parse(readFileSync('./config.yml', 'utf8'));
  if (!configs.hasOwnProperty(target)) {
    console.error('configuration target does not exist');
    return;
  }
  const config = configs[target];
  const connection = await createConnection(Object.assign({
    synchronize: false,
    logging: true,
    entities: [
      `src/entity/**/*.ts`,
    ],
  }, <ConnectionOptions>{
    type: config.type,
    url: config.url,
    entityPrefix: config.entityPrefix,
  }));
  const vars = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  const loader = await import('./seed/' + task);
  await loader.bootstrap(connection, vars);
  await connection.close();
};
