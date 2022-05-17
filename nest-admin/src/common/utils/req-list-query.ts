import { ApiProperty } from '@nestjs/swagger'
export class ReqListQuery {
    
    @ApiProperty({description:'显示页数'})
    page:number 

    @ApiProperty({description:'显示每一页条数'})
    size:number

}