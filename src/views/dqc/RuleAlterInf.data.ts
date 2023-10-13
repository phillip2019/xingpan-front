import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import dayjs from 'dayjs';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '日期',
    align: 'center',
    dataIndex: 'executeDate',
    helpMessage: '执行日期',
    sorter: true,
    width: 100,
  },
  {
    title: '任务',
    align: 'center',
    dataIndex: 'jobName',
    helpMessage: 'JOB名称',
    sorter: true,
    width: 250,
  },
  {
    title: '度量',
    align: 'center',
    dataIndex: 'measureName',
    helpMessage: '度量名称',
    sorter: true,
  },
  {
    title: '度量描述',
    align: 'center',
    dataIndex: 'measureDesc',
    helpMessage: '度量描述',
    sorter: true,
  },
  {
    title: '执行CRON',
    align: 'center',
    dataIndex: 'cronExpression',
    helpMessage: '定时表达式，执行任务定时表达式',
    sorter: true,
  },
  {
    title: '运行任务ID',
    align: 'center',
    dataIndex: 'applicationId',
    customRender: render.renderYarnApplicationHref,
    helpMessage: 'SPARK运行任务ID',
    sorter: true,
  },
  {
    title: '类型',
    align: 'center',
    dataIndex: 'dqType',
    helpMessage: 'DQ类型，按照数据质量校验，分为数据准确性、分析、及时性、唯一性、完整性',
    customRender: ({ value }) => {
      const eventTypeArr = {
        ACCURACY: '准确性',
        PROFILING: '分析',
        TIMELINESS: '及时性',
        UNIQUENESS: '唯一性',
        COMPLETENESS: '完整性',
      };
      return eventTypeArr[value];
    },
    sorter: true,
  },
  {
    title: '指标名称',
    align: 'center',
    dataIndex: 'fieldName',
    helpMessage: '校验指标名称',
    sorter: true,
  },
  {
    title: '指标描述',
    align: 'center',
    dataIndex: 'fieldDesc',
    helpMessage: '校验指标描述',
    sorter: true,
  },
  {
    title: '是否异常',
    align: 'center',
    helpMessage: '是否异常,0正常 1异常',
    slots: { customRender: 'abnormalStatus' },
    dataIndex: 'isAbnormal',
  },
  {
    title: '度量校验规则',
    align: 'center',
    dataIndex: 'startValue',
    helpMessage: '指标正常情况最小值极限值',
    customRender: ({ text, record }) => {
      const startValue = text !== null ? text : '';
      const endValue = record.endValue !== null ? record.endValue : '';
      const compareExpression1 = record.compareExpression1 !== null ? record.compareExpression1 : '';
      const compareExpression2 = record.compareExpression2 !== null ? record.compareExpression2 : '';
      const title = `${startValue}${compareExpression1}value${compareExpression2}${endValue}`;
      return title === 'value' ? '无' : title;
    },
    sorter: true,
  },
  {
    title: '指标值',
    align: 'right',
    dataIndex: 'value',
    helpMessage: '当前校验指标值',
    sorter: true,
  },
  {
    title: '责任人',
    align: 'center',
    dataIndex: 'ownerName',
    helpMessage: '该指标责任人',
    sorter: true,
  },
  {
    title: '规则描述',
    align: 'center',
    dataIndex: 'rule',
    helpMessage: '详细规则内容',
    sorter: true,
  },
  {
    title: '连接类型',
    align: 'center',
    dataIndex: 'connType',
    helpMessage: '数据源连接类型',
    customRender: ({ value }) => {
      const connTypeArr = {
        HIVE: 'hive',
        JDBC: 'jdbc',
        ELASTICSEARCH: 'es',
        FILE: 'file',
      };
      return connTypeArr[value];
    },
    sorter: true,
  },
  {
    title: '源表',
    align: 'center',
    dataIndex: 'tableNames',
    helpMessage: '源表名称',
    sorter: true,
  },
  {
    title: '状态',
    align: 'center',
    helpMessage: '状态，0生效 1失效',
    dataIndex: 'status',
    slots: { customRender: 'status' },
    sorter: true,
  },
  {
    title: '校验强度',
    align: 'center',
    helpMessage: '校验强度, A强/B中/C弱',
    dataIndex: 'ruleType',
    customRender: ({ value }) => {
      const ruleTypeArr = {
        A: '强',
        B: '中',
        C: '弱',
      };
      return ruleTypeArr[value];
    },
    sorter: true,
  },
  {
    title: '创建时间',
    align: 'center',
    helpMessage: '数据质量规则创建时间',
    dataIndex: 'createdAt',
    sorter: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '责任人',
    field: 'ownerName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入责任人，支持模糊搜索'],
  },
  {
    label: '创建时间',
    field: 'createdAtArr',
    component: 'RangePicker',
    componentProps: {
      valueType: 'DateTime',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultValue: [dayjs().startOf('day').format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')],
    },
    helpMessage: ['请选择规则创建时间'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '任务',
    field: 'jobName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入任务名称，支持模糊搜索'],
  },
  {
    label: '度量',
    field: 'measureName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入度量名，支持模糊搜索'],
  },
  {
    label: '类型',
    field: 'dqType',
    component: 'Select',
    componentProps: {
      options: [
        { label: '准确性', value: 'ACCURACY' },
        { label: '分析', value: 'PROFILING' },
        { label: '及时性', value: 'TIMELINESS' },
        { label: '唯一性', value: 'UNIQUENESS' },
        { label: '完整性', value: 'COMPLETENESS' },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择事件状态过滤'],
  },
  {
    label: '指标名称',
    field: 'fieldName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入校验指标名称，支持模糊搜索'],
  },
  {
    label: '指标描述',
    field: 'fieldName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入校验校验指标描述，支持模糊搜索'],
  },
  {
    label: '结果状态',
    field: 'isAbnormal',
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '正常', value: 0 },
        { label: '异常', value: 1 },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择结果状态过滤'],
  },
  {
    label: '连接类型',
    field: 'connType',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'hive', value: 'hive' },
        { label: 'jdbc', value: 'JDBC' },
        { label: 'es', value: 'ELASTICSEARCH' },
        { label: 'file', value: 'FILE' },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择连接类型过滤'],
  },
  {
    label: '规则描述',
    field: 'rule',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入规则，支持模糊搜索'],
  },
  {
    label: '源表',
    field: 'tableNames',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入源表名，支持模糊搜索'],
  },
  {
    label: '规则状态',
    field: 'status',
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '生效', value: 0 },
        { label: '失效', value: 1 },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择规则状态过滤'],
  },
  {
    label: '校验强度',
    field: 'ruleType',
    component: 'Select',
    componentProps: {
      options: [
        { label: '强', value: 'A' },
        { label: '中', value: 'B' },
        { label: '弱', value: 'C' },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择校验强度过滤'],
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'JOB名称',
    field: 'jobName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入JOB名称!' }];
    },
  },
  {
    label: '度量名称',
    field: 'measureName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入度量名称!' }];
    },
  },
  {
    label: '度量描述',
    field: 'measureDesc',
    component: 'Input',
  },
  {
    label: '定时表达式',
    field: 'cronExpression',
    component: 'Input',
  },
  {
    label: 'SPARK任务ID',
    field: 'applicationId',
    component: 'Input',
  },
  {
    label: '执行日期',
    field: 'executeDate',
    component: 'Input',
  },
  {
    label: 'JOB创建者',
    field: 'jobOwer',
    component: 'Input',
  },
  {
    label: 'DQ类型',
    field: 'dqType',
    component: 'Input',
  },
  {
    label: '指标描述',
    field: 'fieldDesc',
    component: 'Input',
  },
  {
    label: '最小值',
    field: 'startValue',
    component: 'Input',
  },
  {
    label: '表达式1',
    field: 'compareExpression1',
    component: 'Input',
  },
  {
    label: '表达式2',
    field: 'compareExpression2',
    component: 'Input',
  },
  {
    label: '最大值',
    field: 'endValue',
    component: 'Input',
  },
  {
    label: '规则',
    field: 'rule',
    component: 'Input',
  },
  {
    label: '连接类型',
    field: 'connType',
    component: 'Input',
  },
  {
    label: '指标名称',
    field: 'fieldName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入指标名称!' }];
    },
  },
  {
    label: '源表名称',
    field: 'tableNames',
    component: 'Input',
  },
  {
    label: '指标值',
    field: 'value',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态, 0生效 1失效!' }];
    },
  },
  {
    label: '是否异常',
    field: 'isAbnormal',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入是否异常, 0正常 1异常!' }];
    },
  },
  {
    label: '校验强度',
    field: 'ruleType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入校验强度 A强/B中/C弱!' }];
    },
  },
  {
    label: '负责人',
    field: 'ownerName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入负责人!' }];
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
