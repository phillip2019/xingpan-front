import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '年份',
    align:"center",
    dataIndex: 'year'
   },
   {
    title: '市场ID缩写',
    align:"center",
    dataIndex: 'shortMarketId'
   },
   {
    title: '月份',
    align:"center",
    dataIndex: 'month'
   },
   {
    title: '统计开始日期',
    align:"center",
    dataIndex: 'statStartDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '统计结束日期',
    align:"center",
    dataIndex: 'statEndDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '资源-资源填报ID',
    align:"center",
    dataIndex: 'resourceId'
   },
   {
    title: '资源-GMV填报ID',
    align:"center",
    dataIndex: 'resourceGmvId'
   },
   {
    title: '资源-流量填报ID',
    align:"center",
    dataIndex: 'resourceTrafficId'
   },
   {
    title: '财务填报ID',
    align:"center",
    dataIndex: 'financeId'
   },
   {
    title: '每日流量填报ID',
    align:"center",
    dataIndex: 'flowId'
   },
   {
    title: '发布状态: 0 校准中, 1 已发布',
    align:"center",
    dataIndex: 'isPublish'
   },
   {
    title: '复制状态: 0 未复制, 1 已复制',
    align:"center",
    dataIndex: 'isCopy'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
   {
    title: '删除状态: 0 正常, 1 删除',
    align:"center",
    dataIndex: 'isDeleted'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '年份',
    field: 'year',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入年份!'},
          ];
     },
  },
  {
    label: '市场ID缩写',
    field: 'shortMarketId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入市场ID缩写!'},
          ];
     },
  },
  {
    label: '月份',
    field: 'month',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入月份!'},
          ];
     },
  },
  {
    label: '统计开始日期',
    field: 'statStartDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入统计开始日期!'},
          ];
     },
  },
  {
    label: '统计结束日期',
    field: 'statEndDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入统计结束日期!'},
          ];
     },
  },
  {
    label: '资源-资源填报ID',
    field: 'resourceId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入资源-资源填报ID!'},
          ];
     },
  },
  {
    label: '资源-GMV填报ID',
    field: 'resourceGmvId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入资源-GMV填报ID!'},
          ];
     },
  },
  {
    label: '资源-流量填报ID',
    field: 'resourceTrafficId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入资源-流量填报ID!'},
          ];
     },
  },
  {
    label: '财务填报ID',
    field: 'financeId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入财务填报ID!'},
          ];
     },
  },
  {
    label: '每日流量填报ID',
    field: 'flowId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入每日流量填报ID!'},
          ];
     },
  },
  {
    label: '发布状态: 0 校准中, 1 已发布',
    field: 'isPublish',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入发布状态: 0 校准中, 1 已发布!'},
          ];
     },
  },
  {
    label: '复制状态: 0 未复制, 1 已复制',
    field: 'isCopy',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入复制状态: 0 未复制, 1 已复制!'},
          ];
     },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '删除状态: 0 正常, 1 删除',
    field: 'isDeleted',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入删除状态: 0 正常, 1 删除!'},
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