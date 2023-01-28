import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '点位ID',
    align: 'center',
    sorter: true,
    dataIndex: 'positionId',
  },
  {
    title: '点位编号',
    align: 'center',
    sorter: true,
    dataIndex: 'positionNo',
  },
  {
    title: '市场名称',
    align: 'center',
    sorter: true,
    dataIndex: 'marketName',
  },
  {
    title: '市场楼层',
    align: 'center',
    sorter: true,
    dataIndex: 'floor',
  },
  {
    title: '点位位置类型',
    align: 'center',
    sorter: true,
    dataIndex: 'positionAddressType',
  },
  {
    title: '点位详细位置',
    align: 'center',
    dataIndex: 'positionAddressDetail',
  },
  {
    title: '市场行业',
    align: 'center',
    sorter: true,
    dataIndex: 'industryName',
  },
  {
    title: '点位位置状态',
    align: 'center',
    sorter: true,
    dataIndex: 'usedStatus',
    slots: { customRender: 'status' },
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'marketName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'market_name',
      placeholder: '请选择市场',
      stringToNumber: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '楼层',
    field: 'floor',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'floor',
      placeholder: '请选择市场类型',
      stringToNumber: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '点位序号',
    field: 'positionSeqNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位ID',
    field: 'positionId',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位编号',
    field: 'positionNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '市场行业',
    field: 'industryName',
    component: 'Input',
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
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '点位ID',
    field: 'positionId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位ID!' }];
    },
  },
  {
    label: '点位编号',
    field: 'positionNo',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位编号!' }];
    },
  },
  {
    label: '市场名称',
    field: 'marketName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入市场名称!' }];
    },
  },
  {
    label: '市场楼层',
    field: 'floor',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入市场楼层!' }];
    },
  },
  {
    label: '点位位置类型',
    field: 'positionAddressType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位位置类型!' }];
    },
  },
  {
    label: '点位详细位置',
    field: 'positionAddressDetail',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位详细位置!' }];
    },
  },
  {
    label: '市场行业',
    field: 'industryName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入市场行业!' }];
    },
  },
  {
    label: '点位位置状态',
    field: 'usedStauts',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位位置状态!' }];
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
