import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '场景',
    align: 'center',
    dataIndex: 'scene',
    sorter: true,
  },
  {
    title: '事件名',
    align: 'center',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '中文名',
    align: 'center',
    dataIndex: 'zhName',
    sorter: true,
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    sorter: true,
    customRender: ({ value }) => {
      const statusArr = ['未知', '上线', '下线', '异常'];
      console.log(value);
      return statusArr[value];
    },
  },
  {
    title: '事件位置',
    align: 'center',
    dataIndex: 'position',
    sorter: true,
  },
  {
    title: '用户表操作说明',
    align: 'center',
    dataIndex: 'operDesc',
    sorter: true,
  },
  {
    title: '埋点形式',
    align: 'center',
    dataIndex: 'type',
    sorter: true,
    customRender: ({ value }) => {
      const eventTypeArr = ['未知', '前端', '后端'];
      console.log(value);
      return eventTypeArr[value];
    },
  },
  {
    title: '触发时机',
    align: 'center',
    dataIndex: 'trigger',
    sorter: true,
  },
  {
    title: '文档说明',
    align: 'center',
    dataIndex: 'eventDesc',
    sorter: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '场景',
    field: 'scene',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入场景，事件场景!' }];
    },
  },
  {
    label: '事件名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件名称!' }];
    },
  },
  {
    label: '事件中文名',
    field: 'zhName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件中文名称!' }];
    },
  },
  {
    label: '埋点位置',
    field: 'position',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入埋点位置!' }];
    },
  },
  {
    label: '操作说明',
    field: 'operDesc',
    component: 'Input',
  },
  {
    label: '埋点形式',
    field: 'type',
    component: 'Select',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择埋点形式!' }];
    },
    componentProps: {
      options: [
        { label: '前端', value: 1 },
        { label: '后端', value: 2 },
      ],
    },
  },
  {
    label: '触发时机',
    field: 'trigger',
    component: 'Input',
  },
  {
    label: '文档说明',
    field: 'eventDesc',
    component: 'InputTextArea',
  },
  {
    label: '是否预置事件',
    field: 'isPresetEvent',
    component: 'Select',
    defaultValue: 0,
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入是否预置事件!' }];
    },
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择状态 1-初始化 2-上线 3-下线 4-异常!' }];
    },
    componentProps: {
      options: [
        { label: '初始化', value: 1 },
        { label: '上线', value: 2 },
        { label: '下线', value: 3 },
        { label: '异常', value: 4 },
      ],
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
