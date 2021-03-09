import { createConnection } from 'typeorm';

createConnection().then(async connection => {
  const vars = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  await connection.close();
});