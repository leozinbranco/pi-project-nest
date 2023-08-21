import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
