import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '指标所属部门',
    align: 'center',
    sorter: true,
    dataIndex: 'deptText',
  },
  {
    title: '指标名称',
    align: 'center',
    sorter: true,
    dataIndex: 'indexNameZh',
  },
  {
    title: '指标目标值',
    align: 'center',
    dataIndex: 'targetIndexValue',
  },
  {
    title: '指标所属年',
    align: 'center',
    sorter: true,
    dataIndex: 'yearCol',
  },
  {
    title: '指标目标值季度',
    align: 'center',
    dataIndex: 'quarterCol',
  },
  {
    title: '指标目标值月份',
    align: 'center',
    dataIndex: 'monthCol',
  },
  {
    title: '指标统计类型',
    align: 'center',
    dataIndex: 'indexStatsType',
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '目标备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '部门',
    field: 'deptId',
    component: 'JTreeDict',
    componentProps: {
      field: 'id',
      async: true,
      parentCode: 'B03',
      placeholder: '请选择部门',
    },
    colProps: { span: 6 },
  },
  {
    label: '指标名称',
    field: 'deptIndexId',
    component: 'JDictSelectTag',
    helpMessage: ['请选择填报指标'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'cg_dept_index,index_name_zh,id,1=1 ';
      if (formModel.deptId) {
        sqlPreTpl = sqlPreTpl + " and dept_id = '" + formModel.deptId + "'";
      }
      sqlPreTpl += ' and status = 1 and index_filling_method = 1 order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '指标目标值年',
    field: 'yearCol',
    component: 'Select',
    componentProps: {
      options: [
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '指标目标值季度',
    field: 'quarterCol',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '-', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
      ],
    },
  },
  {
    label: '指标目标值月份',
    field: 'monthCol',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '-', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
      ],
    },
  },
  {
    label: '指标统计类型',
    field: 'indexStatsType',
    component: 'Select',
    componentProps: {
      options: [
        { label: '累计', value: 'sum' },
        { label: '平均值', value: 'avg' },
        { label: '最大值', value: 'max' },
        { label: '最小值', value: 'min' },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '弃用', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
  {
    label: '更新人',
    field: 'updateBy',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '更新时间',
    field: 'updateTime',
    component: 'DatePicker',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '指标部门',
    field: 'deptId',
    component: 'JTreeDict',
    helpMessage: ['请选择填报部门'],
    // defaultValue: 'deptText',
    componentProps: {
      field: 'id',
      async: true,
      parentCode: 'B03',
      placeholder: '请选择部门',
      // dict: 'sys_category,name,id,1=1 order by create_time',
      // pidField: 'pid',
      // pidValue: '1625117453522718721',
      // placeholder: '请选择部门',
      // converIsLeafVal: 1,
      // multiple: false,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择部门!' }];
    },
  },
  {
    label: '指标名称',
    field: 'deptIndexId',
    component: 'JDictSelectTag',
    helpMessage: ['请选择填报指标'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      // console.log(formActionType);
      let sqlPreTpl = 'cg_dept_index,index_name_zh,id,1=1 ';
      if (formModel.deptId) {
        sqlPreTpl = sqlPreTpl + " and dept_id = '" + formModel.deptId + "'";
      }
      sqlPreTpl += ' and status = 1 and index_filling_method = 1  order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入部门指标编号!' }];
    },
  },
  {
    label: '指标目标值',
    field: 'targetIndexValue',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入指标目标值!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '指标目标值年份',
    field: 'yearCol',
    component: 'Select',
    defaultValue: 2023,
    componentProps: {
      options: [
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入指标所属年!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
    dynamicDisabled: false,
  },
  {
    label: '指标所属季度',
    field: 'quarterCol',
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '-', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
      ],
    },
  },
  {
    label: '指标所属月份',
    field: 'monthCol',
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '-', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 },
        { label: '11', value: 11 },
        { label: '12', value: 12 },
      ],
    },
  },
  {
    label: '指标统计类型, sum|avg|max|min',
    field: 'indexStatsType',
    component: 'Select',
    defaultValue: 'sum',
    componentProps: {
      options: [
        { label: '累计', value: 'sum' },
        { label: '平均值', value: 'avg' },
        { label: '最大值', value: 'max' },
        { label: '最小值', value: 'min' },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标统计类型, sum|avg|max|min!' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '弃用', value: 0 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请选择指标目标值状态!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '目标备注',
    field: 'remark',
    component: 'Input',
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
