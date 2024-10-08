import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '埋点项目编号',
    align: 'center',
    dataIndex: 'buProjectId',
    sorter: true,
  },
  {
    title: '事件编号',
    align: 'center',
    dataIndex: 'eventId',
    sorter: true,
  },
  {
    title: '负责人',
    align: 'center',
    dataIndex: 'owner',
    sorter: true,
  },
  {
    title: '测试负责人',
    align: 'center',
    dataIndex: 'teOwner',
    sorter: true,
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    sorter: true,
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    sorter: true,
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
    sorter: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '埋点项目编号',
    field: 'buProjectId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入埋点项目编号!' }];
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
    label: '负责人',
    field: 'owner',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入负责人!' }];
    },
  },
  {
    label: '测试负责人',
    field: 'teOwner',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入测试负责人!' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态 1-初始化 2-埋点中 3-测试中 4-测试完成 5-上线!' }];
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
