import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

  // const tasksCollection = database.collection('tasks');
  // const tasks = await tasksCollection.find().toArray();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        } = configService.mongo;
        
        console.log(configService) 

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;

      }
    }
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule { }
