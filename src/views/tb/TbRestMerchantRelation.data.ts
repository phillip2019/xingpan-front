import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '设备端档口名称',
    align: 'center',
    sorter: true,
    dataIndex: 'deviceMerchantName',
    helpMessage: '设备端档口名称',
  },
  {
    title: '展示档口名称',
    align: 'center',
    sorter: true,
    dataIndex: 'merchantName',
    helpMessage: '展示档口名称',
  },
  {
    title: '食堂名称',
    align: 'center',
    sorter: true,
    dataIndex: 'restName',
    helpMessage: '食堂名称',
  },
  {
    title: '创建人',
    align: 'center',
    sorter: true,
    dataIndex: 'createBy',
    helpMessage: '数据源创建人',
    defaultHidden: true,
  },
  {
    title: '创建时间',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 20 ? text.substr(0, 20) : text;
    },
    helpMessage: '数据源创建时间',
    defaultHidden: false,
  },
  {
    title: '更新人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
    helpMessage: '数据源更新人',
    defaultHidden: true,
  },
  {
    title: '更新时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 20 ? text.substr(0, 20) : text;
    },
    helpMessage: '数据源更新时间',
    defaultHidden: false,
  }
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '设备端档口名',
    field: 'deviceMerchantName',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '设备端档口名',
  },
  {
    label: '展示档口名',
    field: 'merchantName',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '展示档口名',
  },
  {
    label: '食堂名称',
    field: 'restName',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '食堂名称',
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '业务线',
    field: 'deviceMerchantName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入设备端档口名称!' }];
    },
    helpMessage: '',
  },
  {
    label: '展示档口名称',
    field: 'merchantName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入展示档口名称!' }];
    },
    helpMessage: '',
  },
  {
    label: '食堂名称',
    field: 'restName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入食堂名称!' }];
    },
    helpMessage: '',
  }
];

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
