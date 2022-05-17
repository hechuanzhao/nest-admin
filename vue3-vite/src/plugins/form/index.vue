<template>
    <el-form ref="elFormRef" :model="modelValue" :inline="inline" v-bind="$attrs">
        <slot v-if="mode==='render'"></slot>
        <template v-else>
            <el-form-item v-for="(item,index) in formItemsTmp" :label="item.label">
            </el-form-item>
        </template>
    </el-form>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
export default defineComponent({
    name:"KForm",
    props:{
        modelValue:{
            type:Object,
            default:()=>({})
        },
        mode:{
            type:String,
            default:'config',
            validator:(val:string)=>{
                return ['config','render'].includes(val)
            }
        },
        inline:{
            type:Boolean,
            default:false
        },
        formItems:{
            type:Array,
            default:()=>[]
        }
    },
    emits:['update:modelValue'],
    setup(props,{ emit }){
        const elFormRef = ref(null)
        const formItemsTmp = ref<any>(null)
        watch(()=>props.formItems,(val)=>{
            formItemsTmp.value = val.map((v:any)=>{
                // 驼峰 转 中划线
                return {
                    ...v,
                    ...(v.component ? { component: `el-${v.component.replace(/([a-z])([A-Z])/, '$1-$2').toLocaleLowerCase()}` } : null),
                    ...(v.clearable === undefined ? { clearable: true } : null)
                }
            })
        },{ immediate: true, deep: true })
        const modelValueTmp = ref<any>(null)
        //处理表单绑定值
        watch(()=>props.modelValue,(val)=>{
            modelValueTmp.value = val
        },{immediate:true,deep:true})
        watch(modelValueTmp.value,(val)=>{
            emit('update:modelValue',val)
        })
        return{
            elFormRef,
            modelValueTmp,
            formItemsTmp
        }
    }
})
</script>