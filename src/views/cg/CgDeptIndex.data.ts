import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getDictItemsByCode } from '/@/utils/dict';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '部门',
    align: 'center',
    dataIndex: 'deptText',
  },
  {
    title: '一级部门负责人',
    align: 'center',
    dataIndex: 'firstLevelOwner',
  },
  {
    title: '二级部门负责人',
    align: 'center',
    dataIndex: 'secondLevelOwner',
  },
  {
    title: '指标名称',
    align: 'center',
    dataIndex: 'indexName',
  },
  {
    title: '中文指标名称',
    align: 'center',
    dataIndex: 'indexNameZh',
  },
  {
    title: '指标释义',
    align: 'center',
    dataIndex: 'indexInterpretation',
  },
  {
    title: '指标周期',
    align: 'center',
    dataIndex: 'indicatorCycle',
  },
  {
    title: '指标对接人',
    align: 'center',
    dataIndex: 'indicatorDockingPerson',
  },
  {
    title: '星期几填报',
    align: 'center',
    dataIndex: 'weekDay',
  },
  {
    title: '开始填报时间',
    align: 'center',
    dataIndex: 'dayHourBegin',
  },
  {
    title: '截止填报时间',
    align: 'center',
    dataIndex: 'dayHourOver',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '部门',
    field: 'deptId',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'sys_category,name,id',
      pidField: 'pid',
      pidValue: '1625117453522718721',
      placeholder: '请选择部门',
      converIsLeafVal: 0,
      multiple: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '一级部门负责人',
    field: 'firstLevelOwner',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '二级部门负责人',
    field: 'secondLevelOwner',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '指标名称： ',
    field: 'indexName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '中文指标名称: ',
    field: 'indexNameZh',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '指标释义： ',
    field: 'indexInterpretation',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '指标周期',
    field: 'indicatorCycle',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '指标对接人： ',
    field: 'indicatorDockingPerson',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '部门编号',
    field: 'deptId',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'sys_category,name,id',
      pidField: 'pid',
      pidValue: '1625117453522718721',
      placeholder: '请选择部门',
      converIsLeafVal: 0,
      multiple: false,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择部门!' }];
    },
  },
  {
    label: '一级部门负责人',
    field: 'firstLevelOwner',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入一级部门负责人!' }];
    },
  },
  {
    label: '二级部门负责人',
    field: 'secondLevelOwner',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入二级部门负责人!' }];
    },
  },
  {
    label: '指标名称',
    field: 'indexName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标名称，英文名!' }];
    },
  },
  {
    label: '中文指标名称',
    field: 'indexNameZh',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标名称，中文名!' }];
    },
  },
  {
    label: '指标释义',
    field: 'indexInterpretation',
    component: 'InputTextArea',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标释义!' }];
    },
  },
  {
    label: '指标周期',
    field: 'indicatorCycle',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标周期, 累计|日|周|月|季度|年!' }];
    },
  },
  {
    label: '指标对接人',
    field: 'indicatorDockingPerson',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标对接人!' }];
    },
  },
  {
    label: '星期几填报',
    field: 'weekDay',
    component: 'Input',
  },
  {
    label: '开始填报时间',
    field: 'dayHourBegin',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss',
    },
  },
  {
    label: '截止填报时间',
    field: 'dayHourOver',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss',
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
