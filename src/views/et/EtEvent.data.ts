import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '事件名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '事件中文名称',
    align:"center",
    dataIndex: 'zhName'
   },
   {
    title: '埋点位置',
    align:"center",
    dataIndex: 'position'
   },
   {
    title: '操作说明',
    align:"center",
    dataIndex: 'operDesc'
   },
   {
    title: '埋点形式 1-前端 2-后端',
    align:"center",
    dataIndex: 'type'
   },
   {
    title: '触发时机',
    align:"center",
    dataIndex: 'trigger'
   },
   {
    title: '文档说明',
    align:"center",
    dataIndex: 'eventDesc'
   },
   {
    title: '是否预置事件',
    align:"center",
    dataIndex: 'isPresetEvent'
   },
   {
    title: '场景，事件场景',
    align:"center",
    dataIndex: 'scene'
   },
   {
    title: '状态 1-初始化 2-上线 3-下线 4-异常',
    align:"center",
    dataIndex: 'status'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '事件名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入事件名称!'},
          ];
     },
  },
  {
    label: '事件中文名称',
    field: 'zhName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入事件中文名称!'},
          ];
     },
  },
  {
    label: '埋点位置',
    field: 'position',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入埋点位置!'},
          ];
     },
  },
  {
    label: '操作说明',
    field: 'operDesc',
    component: 'Input',
  },
  {
    label: '埋点形式 1-前端 2-后端',
    field: 'type',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入埋点形式 1-前端 2-后端!'},
          ];
     },
  },
  {
    label: '触发时机',
    field: 'trigger',
    component: 'Input',
  },
  {
    label: '文档说明',
    field: 'eventDesc',
    component: 'Input',
  },
  {
    label: '是否预置事件',
    field: 'isPresetEvent',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否预置事件!'},
          ];
     },
  },
  {
    label: '场景，事件场景',
    field: 'scene',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入场景，事件场景!'},
          ];
     },
  },
  {
    label: '状态 1-初始化 2-上线 3-下线 4-异常',
    field: 'status',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入状态 1-初始化 2-上线 3-下线 4-异常!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}