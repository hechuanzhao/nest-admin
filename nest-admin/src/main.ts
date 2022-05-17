import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './common/libs/log4js/logger.middleware';
import { Logger } from './common/libs/log4js/log4js.utils';
import { ConfigService } from '@nestjs/config';
import Chalk from 'chalk'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Logger
  app.use(logger)
  const config = app.get(ConfigService)
  // 设置 api 访问前缀
  const prefix = config.get<string>('app.prefix')
  app.setGlobalPrefix(prefix)

  //swagger 文档
  const options = new DocumentBuilder()
  .setTitle('RBAC SYSTEM')
  .setDescription('接口文档')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${prefix}/swagger-doc`, app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
    customSiteTitle: 'App Doc'
  });
  // 获取配置端口
  const port = config.get<number>('app.port') || 8080
  await app.listen(port);

  Logger.log(
    Chalk.green(`服务启动成功 `),
    `http://localhost:${port}${prefix}/`,
    '\n',
    Chalk.green('swagger 文档地址        '),
    `http://localhost:${port}${prefix}/swagger-doc/`)

}
bootstrap();
