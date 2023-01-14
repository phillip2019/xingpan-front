import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '名称',
    align:"center",
    sorter: true,
    dataIndex: 'name'
   },
   {
    title: '负责人',
    align:"center",
    sorter: true,
    dataIndex: 'ownerName'
   },
   {
    title: '目标',
    align:"center",
    dataIndex: 'target',
    slots: { customRender: 'htmlSlot' },
   },
   {
    title: '开始日期',
    align:"center",
    dataIndex: 'beginDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '截止日期',
    align:"center",
    dataIndex: 'endDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '内容',
    align:"center",
    dataIndex: 'content',
    slots: { customRender: 'htmlSlot' },
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '活动名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动名称!'},
          ];
     },
  },
  {
    label: '活动负责人',
    field: 'ownerName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动负责人!'},
          ];
     },
  },
  {
    label: '活动目标',
    field: 'target',
    component: 'JEditor',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动目标!'},
          ];
     },
  },
  {
    label: '活动开始日期',
    field: 'beginDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动开始日期!'},
          ];
     },
  },
  {
    label: '活动截止日期',
    field: 'endDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动截止日期!'},
          ];
     },
  },
  {
    label: '活动内容',
    field: 'content',
    component: 'JEditor',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动内容!'},
          ];
     },
  },
  {
    label: '活动备注',
    field: 'remark',
    component: 'InputTextArea',
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