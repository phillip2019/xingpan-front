import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '缩写市场ID',
    align:"center",
    dataIndex: 'shortMarketId'
   },
   {
    title: '市场名称',
    align:"center",
    dataIndex: 'shortMarketName'
   },
   {
    title: '日期 yyyy-MM-dd',
    align:"center",
    dataIndex: 'dateCol',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '日人流量',
    align:"center",
    dataIndex: 'marketBuyerEntrNum1d'
   },
   {
    title: '日车流量',
    align:"center",
    dataIndex: 'carEntrNum1d'
   },
   {
    title: '日开门率',
    align:"center",
    dataIndex: 'boothOpeningRate1d'
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createdAt',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '缩写市场ID',
    field: 'shortMarketId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入缩写市场ID!'},
          ];
     },
  },
  {
    label: '市场名称',
    field: 'shortMarketName',
    component: 'Input',
  },
  {
    label: '日期 yyyy-MM-dd',
    field: 'dateCol',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日期 yyyy-MM-dd!'},
          ];
     },
  },
  {
    label: '日人流量',
    field: 'marketBuyerEntrNum1d',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日人流量!'},
          ];
     },
  },
  {
    label: '日车流量',
    field: 'carEntrNum1d',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日车流量!'},
          ];
     },
  },
  {
    label: '日开门率',
    field: 'boothOpeningRate1d',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日开门率!'},
          ];
     },
  },
  {
    label: '创建时间',
    field: 'createdAt',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入创建时间!'},
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