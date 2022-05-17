import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResultData } from '../utils/result';

const baseTypeName = ['String', 'Number', 'Boolean']
/**
 * 封装swagger统一返回结构
 * 支持复杂类型 { code, msg, data }
 * @param model 返回的 data 数据类型
 * @param isArray data 是否为数组
 * @param isPager 设置为 true 则 data 类型为 { list,total }, false 则data类型是纯数组
*/
export const ApiResult = 
    <TModel extends Type<any>>(model?: TModel, isArray?: boolean, isPager?: boolean) =>
    {
        let items = null
        if(model && baseTypeName.includes(model.name)){
            items = { type: model.name.toLocaleLowerCase()}
        } else {
            items = { $ref: getSchemaPath(model) }
        }
        let prop = null
        if(isArray && isPager){
            prop = {
                type: 'object',
                properties: {
                    list: {
                        type: 'array',
                        items
                    },
                    total: {
                        type: 'number',
                        default: 0
                    }
                }
            }
        } else if (isArray) {
            prop = {
                type: 'array',
                items
            }
        } else if (model) {
            prop = items
        } else {
            prop = { type: 'null', default: null }
        }

        return applyDecorators(ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResultData) },
                    {
                        properties: {
                            data: prop
                        }
                    }
                ]
            }
        }))

    }