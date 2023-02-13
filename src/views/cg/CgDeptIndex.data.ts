import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '一级部门',
    align:"center",
    dataIndex: 'firstLevelDept_dictText'
   },
   {
    title: '一级部门负责人',
    align:"center",
    dataIndex: 'firstLevelOwner'
   },
   {
    title: '二级部门',
    align:"center",
    dataIndex: 'secondLevelDept_dictText'
   },
   {
    title: '二级部门负责人',
    align:"center",
    dataIndex: 'secondLevelOwner'
   },
   {
    title: '指标名称，英文名',
    align:"center",
    dataIndex: 'indexName'
   },
   {
    title: '指标名称，中文名',
    align:"center",
    dataIndex: 'indexNameZh'
   },
   {
    title: '指标释义',
    align:"center",
    dataIndex: 'indexInterpretation'
   },
   {
    title: '指标周期, 累计|日|周|月|季度|年',
    align:"center",
    dataIndex: 'indicatorCycle'
   },
   {
    title: '指标对接人',
    align:"center",
    dataIndex: 'indicatorDockingPerson'
   },
   {
    title: '在周的第几天，数据填报日期',
    align:"center",
    dataIndex: 'weekDay'
   },
   {
    title: '在天的小时填报开始',
    align:"center",
    dataIndex: 'dayHourBegin'
   },
   {
    title: '在天的小时填报结束',
    align:"center",
    dataIndex: 'dayHourOver'
   },
   {
    title: '活动备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "一级部门",
      field: 'firstLevelDept',
      component: 'JDictSelectTag',
      componentProps:{
        dictCode: 'first_level_dept',
        placeholder: '请选择一级部门',
        stringToNumber: false,
      },
      colProps: {span: 6},
 	},
	{
      label: "一级部门负责人",
      field: 'firstLevelOwner',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "二级部门",
      field: 'secondLevelDept',
      component: 'JDictSelectTag',
      componentProps:{
      },
      colProps: {span: 6},
 	},
	{
      label: "二级部门负责人",
      field: 'secondLevelOwner',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "指标名称，英文名",
      field: 'indexName',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "指标名称，中文名",
      field: 'indexNameZh',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "指标释义",
      field: 'indexInterpretation',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "指标周期, 累计|日|周|月|季度|年",
      field: 'indicatorCycle',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "指标对接人",
      field: 'indicatorDockingPerson',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '一级部门',
    field: 'firstLevelDept',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入一级部门!'},
          ];
     },
  },
  {
    label: '一级部门负责人',
    field: 'firstLevelOwner',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入一级部门负责人!'},
          ];
     },
  },
  {
    label: '二级部门',
    field: 'secondLevelDept',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入二级部门!'},
          ];
     },
  },
  {
    label: '二级部门负责人',
    field: 'secondLevelOwner',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入二级部门负责人!'},
          ];
     },
  },
  {
    label: '指标名称，英文名',
    field: 'indexName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入指标名称，英文名!'},
          ];
     },
  },
  {
    label: '指标名称，中文名',
    field: 'indexNameZh',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入指标名称，中文名!'},
          ];
     },
  },
  {
    label: '指标释义',
    field: 'indexInterpretation',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入指标释义!'},
          ];
     },
  },
  {
    label: '指标周期, 累计|日|周|月|季度|年',
    field: 'indicatorCycle',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入指标周期, 累计|日|周|月|季度|年!'},
          ];
     },
  },
  {
    label: '指标对接人',
    field: 'indicatorDockingPerson',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入指标对接人!'},
          ];
     },
  },
  {
    label: '在周的第几天，数据填报日期',
    field: 'weekDay',
    component: 'Input',
  },
  {
    label: '在天的小时填报开始',
    field: 'dayHourBegin',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss'
    },
  },
  {
    label: '在天的小时填报结束',
    field: 'dayHourOver',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss'
    },
  },
  {
    label: '活动备注',
    field: 'remark',
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