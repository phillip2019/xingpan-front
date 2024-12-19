import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '市场',
    align:"center",
    sorter: true,
    dataIndex: 'shortMarketId_dictText'
   },
   {
    title: '日期 yyyy-MM-dd',
    align:"center",
    sorter: true,
    dataIndex: 'dateCol',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '日人流量',
    align:"center",
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1d'
   },
   {
    title: '日车流量',
    align:"center",
    sorter: true,
    dataIndex: 'carEntrNum1d'
   },
   {
    title: '日开门率',
    align:"center",
    sorter: true,
    dataIndex: 'boothOpeningRate1d'
   },
   {
    title: '创建时间',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
   },
   {
    title: '修改时间',
    align:"center",
    sorter: true,
    dataIndex: 'updateTime'
   },
   {
    title: '创建人',
    align:"center",
    sorter: true,
    dataIndex: 'createBy'
   },
   {
    title: '修改人',
    align:"center",
    sorter: true,
    dataIndex: 'updateBy'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王 9000:海城 9999:市场运营
999999:全部市场 12345:一至五区 123456:一至五区、篁园 1234567:一至五区、篁园、义西 ",
      field: 'shortMarketId',
      component: 'JDictSelectTag',
      componentProps:{
      },
      colProps: {span: 6},
 	},
	{
      label: "市场名称",
      field: 'shortMarketName',
      component: 'JDictSelectTag',
      componentProps:{
      },
      colProps: {span: 6},
 	},
	{
      label: "日期 yyyy-MM-dd",
      field: 'dateCol',
      component: 'DatePicker',
      colProps: {span: 6},
 	},
	{
      label: "创建时间",
      field: 'createTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
	{
      label: "修改时间",
      field: 'updateTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
	{
      label: "创建人",
      field: 'createBy',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "修改人",
      field: 'updateBy',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王 9000:海城 9999:市场运营
999999:全部市场 12345:一至五区 123456:一至五区、篁园 1234567:一至五区、篁园、义西 ',
    field: 'shortMarketId',
    defaultValue: "1001",
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王 9000:海城 9999:市场运营
999999:全部市场 12345:一至五区 123456:一至五区、篁园 1234567:一至五区、篁园、义西 !'},
          ];
     },
  },
  {
    label: '市场名称',
    field: 'shortMarketName',
    defaultValue: "一区",
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入市场名称!'},
          ];
     },
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
                 { pattern: /^-?\d+$/, message: '请输入整数!'},
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
                 { pattern: /^-?\d+$/, message: '请输入整数!'},
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
                 { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!'},
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