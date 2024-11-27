import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户端编号',
    align: 'center',
    dataIndex: 'clientId',
  },
  {
    title: '事件编号',
    align: 'center',
    dataIndex: 'eventId',
  },
  {
    title: '状态 1-初始化 2-上线 3-下线 4-异常',
    align: 'center',
    dataIndex: 'status',
  },
  {
    title: '截图地址',
    align: 'center',
    dataIndex: 'screenshot',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户端编号',
    field: 'clientId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入客户端编号!' }];
    },
  },
  {
    label: '事件编号',
    field: 'eventId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件编号!' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态 1-初始化 2-上线 3-下线 4-异常!' }];
    },
  },
  {
    label: '截图地址',
    field: 'screenshot',
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
