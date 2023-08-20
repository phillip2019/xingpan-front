import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '所属事件的Id',
    align: 'center',
    dataIndex: 'eventId',
    sorter: true,
    ifShow: false,
  },
  {
    title: '属性名',
    align: 'center',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '属性中文名',
    align: 'center',
    dataIndex: 'zhName',
    sorter: true,
  },
  {
    title: '属性值类型',
    align: 'center',
    dataIndex: 'type',
    customRender: ({ value }) => {
      const typeArr = ['未知', '字符串', '数值', 'BOOL', '列表'];
      return typeArr[value];
    },
    sorter: true,
  },
  {
    title: '属性值示例',
    align: 'center',
    dataIndex: 'example',
    sorter: true,
  },
  {
    title: '对属性的说明描述',
    align: 'center',
    dataIndex: 'propertyDesc',
    sorter: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '属性名',
    field: 'name',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入英文属性名称过滤'],
  },
  {
    label: '属性中文名',
    field: 'zhName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入中文属性名称过滤'],
  },
  {
    label: '属性值类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: [
        { label: '字符串', value: 1 },
        { label: '数值', value: 2 },
        { label: 'BOOL', value: 3 },
        { label: '列表', value: 4 },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择属性值类型过滤'],
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '所属事件',
    field: 'eventId',
    component: 'Input',
    show: false,
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所属事件的Id!' }];
    },
  },
  {
    label: '属性名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入属性的英文名称!' }];
    },
  },
  {
    label: '属性中文名',
    field: 'zhName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入属性的中文名称!' }];
    },
  },
  {
    label: '属性值类型',
    field: 'type',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '字符串', value: 1 },
        { label: '数值', value: 2 },
        { label: 'BOOL', value: 3 },
        { label: '列表', value: 4 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入属性值类型,1-字符串,2-数值,3-BOOL,4-列表!' }];
    },
  },
  {
    label: '属性值示例',
    field: 'example',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'propertyDesc',
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
