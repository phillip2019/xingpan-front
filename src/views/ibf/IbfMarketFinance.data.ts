import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '市场',
    align: 'center',
    sorter: true,
    dataIndex: 'shortMarketId_dictText',
  },
  {
    title: '所属年月',
    align: 'center',
    sorter: true,
    dataIndex: 'monthCol',
  },
  {
    title: '本期收入',
    helpMessage: '本期收入，单位万元',
    align: 'center',
    sorter: true,
    dataIndex: 'curPeriodIncome1m',
  },
  {
    title: '本期营收',
    helpMessage: '本期营收，单位万元',
    align: 'center',
    sorter: true,
    dataIndex: 'turnoverIncomeSd',
  },
  {
    title: '目标营收',
    helpMessage: '目标营收，单位万元',
    align: 'center',
    sorter: true,
    dataIndex: 'targetTurnoverIncomeSd',
  },
  {
    title: '本期利润',
    helpMessage: '本期利润，单位万元',
    align: 'center',
    sorter: true,
    dataIndex: 'accumulateProfitIncomeSd',
  },
  {
    title: '目标利润',
    helpMessage: '目标利润，单位万元',
    align: 'center',
    sorter: true,
    dataIndex: 'targetProfitIncomeSd',
  },
  {
    title: '创建时间',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
  },
  {
    title: '修改时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
  },
  {
    title: '创建人',
    align: 'center',
    sorter: true,
    dataIndex: 'createBy',
  },
  {
    title: '修改人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'short_market_id',
    },
    colProps: { span: 6 },
  },
  {
    label: '月份',
    field: 'monthCol',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
  {
    label: '修改时间',
    field: 'updateTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
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
    label: '修改人',
    field: 'updateBy',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JDictSelectTag',
    defaultValue: '1001',
    componentProps: {
      dictCode: 'short_market_id',
    },
    dynamicRules: ({ model, schema }) => {
      return [
        {
          required: true,
          message: '请选择市场',
        },
      ];
    },
  },
  {
    label: '所属年月',
    field: 'monthCol',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择月份，格式为yyyy-MM!' }];
    },
  },
  {
    label: '本期收入(万)',
    field: 'curPeriodIncome1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期收入(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本期营收(万)',
    field: 'turnoverIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期营收(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '目标营收(万)',
    field: 'targetTurnoverIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入目标营收(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本期利润(万)',
    field: 'accumulateProfitIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期利润(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '目标利润(万)',
    field: 'targetProfitIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入目标利润(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
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
