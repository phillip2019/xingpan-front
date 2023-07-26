import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '所属事件的Id',
    align:"center",
    dataIndex: 'eventId'
   },
   {
    title: '属性的英文名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '属性的中文名称',
    align:"center",
    dataIndex: 'zhName'
   },
   {
    title: '属性值类型,1-字符串,2-数值,3-BOOL,4-列表',
    align:"center",
    dataIndex: 'type'
   },
   {
    title: '属性值示例',
    align:"center",
    dataIndex: 'example'
   },
   {
    title: '对属性的说明描述',
    align:"center",
    dataIndex: 'propertyDesc'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '所属事件的Id',
    field: 'eventId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入所属事件的Id!'},
          ];
     },
  },
  {
    label: '属性的英文名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入属性的英文名称!'},
          ];
     },
  },
  {
    label: '属性的中文名称',
    field: 'zhName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入属性的中文名称!'},
          ];
     },
  },
  {
    label: '属性值类型,1-字符串,2-数值,3-BOOL,4-列表',
    field: 'type',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入属性值类型,1-字符串,2-数值,3-BOOL,4-列表!'},
          ];
     },
  },
  {
    label: '属性值示例',
    field: 'example',
    component: 'Input',
  },
  {
    label: '对属性的说明描述',
    field: 'propertyDesc',
    component: 'Input',
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