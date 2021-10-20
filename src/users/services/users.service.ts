import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) {
  }

  findAll() {
    return this.userModel.find().exec();
  }

  

  async findOne(id: string) {
    const product = await this.userModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateUserDto) {
    const newProduct = new this.userModel(data);
    return newProduct.save();
  }



  update(id: string, changes: UpdateUserDto) {
    const product = this.userModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
   return this.userModel.findByIdAndDelete(id);
  } 

 /*  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  } */
}
