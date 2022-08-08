import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['./dist/src/**/*.entity.js'],
  migrations: ['./dist/**/migrations/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;
