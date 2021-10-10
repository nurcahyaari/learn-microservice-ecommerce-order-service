import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersDetailRepository } from './repository/orders_detail.repository';
import { OrderController } from './handlers/http/order.controller';
import { UserAuthMiddleware } from 'src/external/auth/user-auth.middleware';
import { CartsModule } from 'src/external/carts/carts.module';
import { ProductsModule } from 'src/external/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository, OrdersDetailRepository]),
    CacheModule.register(),
    CartsModule,
    ProductsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).exclude().forRoutes(OrderController);
  }
}
