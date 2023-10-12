import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: 'JOB名称',
    align: 'center',
    dataIndex: 'jobName',
  },
  {
    title: '度量名称',
    align: 'center',
    dataIndex: 'measureName',
  },
  {
    title: '度量描述',
    align: 'center',
    dataIndex: 'measureDesc',
  },
  {
    title: '定时表达式',
    align: 'center',
    dataIndex: 'cronExpression',
  },
  {
    title: 'SPARK任务ID',
    align: 'center',
    dataIndex: 'applicationId',
  },
  {
    title: '执行日期',
    align: 'center',
    dataIndex: 'executeDate',
  },
  {
    title: 'JOB创建者',
    align: 'center',
    dataIndex: 'jobOwer',
  },
  {
    title: 'DQ类型',
    align: 'center',
    dataIndex: 'dqType',
  },
  {
    title: '指标描述',
    align: 'center',
    dataIndex: 'fieldDesc',
  },
  {
    title: '最小值',
    align: 'center',
    dataIndex: 'startValue',
  },
  {
    title: '表达式1',
    align: 'center',
    dataIndex: 'compareExpression1',
  },
  {
    title: '表达式2',
    align: 'center',
    dataIndex: 'compareExpression2',
  },
  {
    title: '最大值',
    align: 'center',
    dataIndex: 'endValue',
  },
  {
    title: '规则',
    align: 'center',
    dataIndex: 'rule',
  },
  {
    title: '连接类型',
    align: 'center',
    dataIndex: 'connType',
  },
  {
    title: '指标名称',
    align: 'center',
    dataIndex: 'fieldName',
  },
  {
    title: '源表名称',
    align: 'center',
    dataIndex: 'tableNames',
  },
  {
    title: '指标值',
    align: 'center',
    dataIndex: 'value',
  },
  {
    title: '状态',
    align: 'center',
    helpMessage: '状态，0生效 1失效',
    dataIndex: 'status',
  },
  {
    title: '是否异常',
    align: 'center',
    helpMessage: '是否异常,0正常 1异常',
    dataIndex: 'isAbnormal',
  },
  {
    title: '校验强度',
    align: 'center',
    helpMessage: '校验强度, A强/B中/C弱',
    dataIndex: 'ruleType',
  },
  {
    title: '负责人',
    align: 'center',
    dataIndex: 'ownerName',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
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
