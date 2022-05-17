import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsIn } from 'class-validator'
import { RouterMethods } from 'src/common/enums/routerMethod.enum'
import { $enum } from 'ts-enum-util'


export class MenuPermDto {
  @ApiProperty({ description: 'api method 值 POST PUT GET DELETE', enum: $enum(RouterMethods).getValues() })
  @IsString({ message: 'apiMethod 类型错误' })
  @IsNotEmpty({ message: 'apiMethod 不能为空' })
  @IsIn($enum(RouterMethods).getValues())
  readonly apiMethod: RouterMethods

  @ApiProperty({ description: 'api url' })
  @IsString({ message: 'apiUrl 类型错误' })
  @IsNotEmpty({ message: 'apiUrl 不能为空' })
  readonly apiUrl: string
}
