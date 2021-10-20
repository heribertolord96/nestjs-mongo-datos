import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { User, UserSchema } from './entities/user.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
