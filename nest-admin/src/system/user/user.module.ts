import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'



import { UserEntity } from './user.entity'
import { UserDeptEntity } from './dept/user-dept.entity'
import { UserPostEntity } from './post/user-post.entity'

import { UserService } from './user.service'

import { BaseController } from './base.controller'
import { UserController } from './user.controller'
import { AuthModule } from '../auth/auth/auth.module'
import { UserRoleEntity } from './user-role.entity'
import { UserRoleService } from './user-role.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRoleEntity]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
          expiresIn: config.get('jwt.expiresin'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, UserRoleService],
  controllers: [BaseController, UserController],
  exports: [UserService],
})
export class UserModule {}
