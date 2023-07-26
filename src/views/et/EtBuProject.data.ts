import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '项目中文名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '项目描述',
    align:"center",
    dataIndex: 'projectDesc'
   },
   {
    title: '产品经理',
    align:"center",
    dataIndex: 'productManager'
   },
   {
    title: '产品原型链接',
    align:"center",
    dataIndex: 'prototypeLink'
   },
   {
    title: '上线时间',
    align:"center",
    dataIndex: 'onlineTime',
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
    label: '项目中文名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入项目中文名称!'},
          ];
     },
  },
  {
    label: '项目描述',
    field: 'projectDesc',
    component: 'Input',
  },
  {
    label: '产品经理',
    field: 'productManager',
    component: 'Input',
  },
  {
    label: '产品原型链接',
    field: 'prototypeLink',
    component: 'Input',
  },
  {
    label: '上线时间',
    field: 'onlineTime',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入上线时间!'},
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