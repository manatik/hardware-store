import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'test',
  password: 'testik',
  database: 'test',
  synchronize: false,
  logging: true,
  entities: ['./dist/src/**/*.entity.js'],
  migrations: ['./dist/**/migrations/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;
