import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: 'trackId',
    align:"center",
    dataIndex: 'trackId'
   },
   {
    title: 'distinctId',
    align:"center",
    dataIndex: 'distinctId'
   },
   {
    title: 'lib',
    align:"center",
    dataIndex: 'lib'
   },
   {
    title: 'event',
    align:"center",
    dataIndex: 'event_dictText'
   },
   {
    title: 'type',
    align:"center",
    dataIndex: 'type'
   },
   {
    title: 'allJson',
    align:"center",
    dataIndex: 'allJson'
   },
   {
    title: 'host',
    align:"center",
    dataIndex: 'host'
   },
   {
    title: 'userAgent',
    align:"center",
    dataIndex: 'userAgent'
   },
   {
    title: 'uaPlatform',
    align:"center",
    dataIndex: 'uaPlatform'
   },
   {
    title: 'uaBrowser',
    align:"center",
    dataIndex: 'uaBrowser'
   },
   {
    title: 'uaVersion',
    align:"center",
    dataIndex: 'uaVersion'
   },
   {
    title: 'uaLanguage',
    align:"center",
    dataIndex: 'uaLanguage'
   },
   {
    title: 'acceptEncoding',
    align:"center",
    dataIndex: 'acceptEncoding'
   },
   {
    title: 'acceptLanguage',
    align:"center",
    dataIndex: 'acceptLanguage'
   },
   {
    title: 'ip',
    align:"center",
    dataIndex: 'ip'
   },
   {
    title: 'ipCity',
    align:"center",
    dataIndex: 'ipCity'
   },
   {
    title: 'url',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: 'referrer',
    align:"center",
    dataIndex: 'referrer'
   },
   {
    title: 'remark',
    align:"center",
    dataIndex: 'remark'
   },
   {
    title: 'createdAt',
    align:"center",
    dataIndex: 'createdAt'
   },
   {
    title: 'date',
    align:"center",
    dataIndex: 'date',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: 'hour',
    align:"center",
    dataIndex: 'hour'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'trackId',
    field: 'trackId',
    component: 'InputNumber',
  },
  {
    label: 'distinctId',
    field: 'distinctId',
    component: 'Input',
  },
  {
    label: 'lib',
    field: 'lib',
    component: 'Input',
  },
  {
    label: 'event',
    field: 'event',
    component: 'JSelectMultiple',
    componentProps:{
        dictCode:""
     },
  },
  {
    label: 'type',
    field: 'type',
    component: 'Input',
  },
  {
    label: 'allJson',
    field: 'allJson',
    component: 'Input',
  },
  {
    label: 'host',
    field: 'host',
    component: 'Input',
  },
  {
    label: 'userAgent',
    field: 'userAgent',
    component: 'Input',
  },
  {
    label: 'uaPlatform',
    field: 'uaPlatform',
    component: 'Input',
  },
  {
    label: 'uaBrowser',
    field: 'uaBrowser',
    component: 'Input',
  },
  {
    label: 'uaVersion',
    field: 'uaVersion',
    component: 'Input',
  },
  {
    label: 'uaLanguage',
    field: 'uaLanguage',
    component: 'Input',
  },
  {
    label: 'acceptEncoding',
    field: 'acceptEncoding',
    component: 'Input',
  },
  {
    label: 'acceptLanguage',
    field: 'acceptLanguage',
    component: 'Input',
  },
  {
    label: 'ip',
    field: 'ip',
    component: 'Input',
  },
  {
    label: 'ipCity',
    field: 'ipCity',
    component: 'Input',
  },
  {
    label: 'url',
    field: 'url',
    component: 'InputTextArea',
  },
  {
    label: 'referrer',
    field: 'referrer',
    component: 'Input',
  },
  {
    label: 'remark',
    field: 'remark',
    component: 'Input',
  },
  {
    label: 'createdAt',
    field: 'createdAt',
    component: 'Input',
  },
  {
    label: 'date',
    field: 'date',
    component: 'DatePicker',
  },
  {
    label: 'hour',
    field: 'hour',
    component: 'InputNumber',
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