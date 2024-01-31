import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '项目名',
    align: 'center',
    sorter: true,
    dataIndex: 'project',
  },
  {
    title: '客户端类型',
    align: 'center',
    sorter: true,
    dataIndex: 'platformType',
  },
  {
    title: '语言',
    align: 'center',
    sorter: true,
    dataIndex: 'platformLang',
  },
  {
    title: '模块',
    align: 'center',
    sorter: true,
    dataIndex: 'unit',
  },
  {
    title: '子模块',
    align: 'center',
    sorter: true,
    dataIndex: 'subUnit',
  },
  {
    title: '访问页面备注名称',
    align: 'center',
    sorter: true,
    dataIndex: 'pageName',
  },
  {
    title: '页面路径',
    align: 'center',
    sorter: true,
    dataIndex: 'path',
  },
  {
    title: '参数',
    align: 'center',
    sorter: true,
    dataIndex: 'parameter',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '项目名',
    field: 'project',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '客户端类型',
    field: 'platformType',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '语言',
    field: 'platformLang',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '模块',
    field: 'unit',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '子模块',
    field: 'subUnit',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '访问页面备注名称',
    field: 'pageName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '页面路径',
    field: 'path',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '参数',
    field: 'parameter',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '项目名',
    field: 'project',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入项目名!' }];
    },
  },
  {
    label: '客户端类型',
    field: 'platformType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入客户端类型!' }];
    },
  },
  {
    label: '语言',
    field: 'platformLang',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入语言!' }];
    },
  },
  {
    label: '模块',
    field: 'unit',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入模块!' }];
    },
  },
  {
    label: '子模块',
    field: 'subUnit',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入子模块!' }];
    },
  },
  {
    label: '访问页面备注名称',
    field: 'pageName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入访问页面备注名称!' }];
    },
  },
  {
    label: '页面路径',
    field: 'path',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入页面路径!' }];
    },
  },
  {
    label: '参数',
    field: 'parameter',
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
