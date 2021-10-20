import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
//import { BrandsController } from './controllers/brands.controller';
//import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
//import { BrandsService } from './services/brands.service';
//import { CategoriesService } from './services/categories.service';

import { Product, ProductSchema } from './entities/product.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService  ],
  exports: [ProductsService],
})
export class ProductsModule { }
