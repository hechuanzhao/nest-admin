import { UserController } from './system/user/user.controller';
import { JwtAuthGuard } from './common/guard/auth.guard';
import { RoleModule } from './system/role/role.module';
import { AuthModule } from './system/auth/auth/auth.module';
import { MenuModule } from './system/menu/menu.module';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisUtilModule } from './common/libs/redis/redis/redis.module';
import { RedisModuleOptions } from 'nestjs-redis'
import configuration from './config/index';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { UserModule } from './system/user/user.module';
import { PermModule } from './system/perm/perm.module';

@Module({
  imports: [
    // 配置环境模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          keepConnectionAlive: true,
          ...config.get('db.mysql'),
        } as TypeOrmModuleOptions
      },
    }),
    // libs redis
    RedisUtilModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return config.get<RedisModuleOptions>('redis')
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    MenuModule,
    RoleModule,
    PermModule
  ],
  // app module 守卫，两个守卫分别依赖 UserService、PermService,
  // 而 UserService、PermService 没有设置全局模块，
  // 所以这俩 守卫 不能再 main.ts 设置全局守卫
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
