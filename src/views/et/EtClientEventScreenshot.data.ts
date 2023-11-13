import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '事件客户端编号，关联et_client_event表的id',
    align:"center",
    sorter: true,
    dataIndex: 'clientEventId'
   },
   {
    title: '状态 0-初始化 1-正常 2-改版',
    align:"center",
    sorter: true,
    dataIndex: 'status_dictText'
   },
   {
    title: '模块名称',
    align:"center",
    sorter: true,
    dataIndex: 'unitName'
   },
   {
    title: '页面名称',
    align:"center",
    sorter: true,
    dataIndex: 'pageName'
   },
   {
    title: '埋点位置',
    align:"center",
    sorter: true,
    dataIndex: 'pagePosition'
   },
   {
    title: '图片存储路径',
    align:"center",
    sorter: true,
    dataIndex: 'screenshot',
    customRender:render.renderImage,
   },
   {
    title: '创建人',
    align:"center",
    sorter: true,
    dataIndex: 'createBy'
   },
   {
    title: '创建时间',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
   },
   {
    title: '更新时间',
    align:"center",
    sorter: true,
    dataIndex: 'updateTime'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "状态 0-初始化 1-正常 2-改版",
      field: 'status',
      component: 'JDictSelectTag',
      componentProps:{
      },
      colProps: {span: 6},
 	},
	{
      label: "模块名称",
      field: 'unitName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "页面名称",
      field: 'pageName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "埋点位置",
      field: 'pagePosition',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '事件客户端编号，关联et_client_event表的id',
    field: 'clientEventId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入事件客户端编号，关联et_client_event表的id!'},
          ];
     },
  },
  {
    label: '状态 0-初始化 1-正常 2-改版',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入状态 0-初始化 1-正常 2-改版!'},
          ];
     },
  },
  {
    label: '模块名称',
    field: 'unitName',
    component: 'Input',
  },
  {
    label: '页面名称',
    field: 'pageName',
    component: 'Input',
  },
  {
    label: '埋点位置',
    field: 'pagePosition',
    component: 'Input',
  },
  {
    label: '图片存储路径',
    field: 'screenshot',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入创建人!'},
          ];
     },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入创建时间!'},
          ];
     },
  },
  {
    label: '更新人',
    field: 'updateBy',
    component: 'Input',
  },
  {
    label: '更新时间',
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