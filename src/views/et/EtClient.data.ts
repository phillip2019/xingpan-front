import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '客户端名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '客户端网址',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: '是否移动端',
    align:"center",
    dataIndex: 'isMobile'
   },
   {
    title: '平台站点',
    align:"center",
    dataIndex: 'platformSite'
   },
   {
    title: '平台站点编码',
    align:"center",
    dataIndex: 'platformSiteCodeId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户端名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入客户端名称!'},
          ];
     },
  },
  {
    label: '客户端网址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '是否移动端',
    field: 'isMobile',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否移动端!'},
          ];
     },
  },
  {
    label: '平台站点',
    field: 'platformSite',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入平台站点!'},
          ];
     },
  },
  {
    label: '平台站点编码',
    field: 'platformSiteCodeId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入平台站点编码!'},
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