import { createConnection } from 'typeorm';

createConnection().then(async connection => {
  await connection.synchronize(true);
  await connection.close();
});