import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.{ts}'], 
  subscribers: [],
  migrations: ['dist/migrations'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('success typeorm');
  })
  .catch((error) => console.log(error));
