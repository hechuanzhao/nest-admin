import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PermService } from './perm.service';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultData } from 'src/common/utils/result';
import { MenuEntity } from '../menu/menu.entity';
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { RouteDto } from './dto/router.dto';
@ApiTags('权限路由')
@ApiBearerAuth()
@ApiExtraModels(ResultData, MenuEntity, RouteDto)
@Controller('perm')
export class PermController {
  constructor(private readonly permService: PermService) {}

  @Get('all')
  @ApiOperation({ summary: '获取app 所有路由' })
  @ApiResult(RouteDto)
  async findAppAllRoutes(): Promise<ResultData> {
    return await this.permService.findAppAllRoutes()
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户权限所有接口路由列表'})
  @ApiResult(RouteDto, true)
  async findUserRoutes (@Req() req): Promise<ResultData> {
    const appRoutes = await this.permService.findUserPerms(req.user.id)
    return ResultData.ok(appRoutes)
  }

  @Get('menu')
  @ApiOperation({ summary: '用户权限'})
  @ApiResult(MenuEntity, true)
  async findUser (@Req() req): Promise<ResultData> {
    const menuPerms =  await this.permService.findUserMenus(req.user.id, req.user.type)
    return ResultData.ok(menuPerms)
  }
}