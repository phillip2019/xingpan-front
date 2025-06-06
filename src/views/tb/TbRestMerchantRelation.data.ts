import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '设备端档口名称',
    align:"center",
    dataIndex: 'deviceMerchantName'
   },
   {
    title: '展示档口名称',
    align:"center",
    dataIndex: 'merchantName'
   },
   {
    title: '食堂名称',
    align:"center",
    dataIndex: 'restName'
   },
   {
    title: '创建人',
    align:"center",
    dataIndex: 'createBy'
   },
   {
    title: '创建日期',
    align:"center",
    dataIndex: 'createTime'
   },
   {
    title: '更新人',
    align:"center",
    dataIndex: 'updateBy'
   },
   {
    title: '更新日期',
    align:"center",
    dataIndex: 'updateTime'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "设备端档口名称",
      field: 'deviceMerchantName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "展示档口名称",
      field: 'merchantName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "食堂名称",
      field: 'restName',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '设备端档口名称',
    field: 'deviceMerchantName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入设备端档口名称!'},
          ];
     },
  },
  {
    label: '展示档口名称',
    field: 'merchantName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入展示档口名称!'},
          ];
     },
  },
  {
    label: '食堂名称',
    field: 'restName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入食堂名称!'},
          ];
     },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'Input',
  },
  {
    label: '创建日期',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '更新人',
    field: 'updateBy',
    component: 'Input',
  },
  {
    label: '更新日期',
    field: 'updateTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
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