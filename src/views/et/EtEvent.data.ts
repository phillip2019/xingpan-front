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
    title: '序号',
    align: 'right',
    dataIndex: 'sorted',
    sorter: true,
    width: 80,
  },
  {
    title: '事件名',
    align: 'left',
    dataIndex: 'name',
    sorter: true,
    width: 200,
    slots: { customRender: 'copySlot' },
  },
  {
    title: '中文名',
    align: 'left',
    dataIndex: 'zhName',
    sorter: true,
    slots: { customRender: 'copySlot' },
  },
  {
    title: '触发时机',
    align: 'left',
    dataIndex: 'triggerTiming',
    sorter: true,
    width: 300,
  },
  {
    title: '客户端',
    align: 'center',
    dataIndex: 'clientNames',
    sorter: true,
    helpMessage: '该事件在哪些客户端需要埋点',
    slots: { customRender: 'clientNameTag' },
    width: 200,
  },
  {
    title: '操作说明',
    align: 'left',
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
      return eventTypeArr[value];
    },
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    sorter: true,
    slots: { customRender: 'status' },
    // customRender: ({ value }) => {
    //   const statusArr = ['未知', '初始化', '上线', '下线', '异常'];
    //   return statusArr[value];
    // },
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '项目名',
    field: 'buProjectNameId',
    // component: 'JSearchSelect',
    component: 'JDictSelectTag',
    helpMessage: ['请选择项目'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_bu_project,name,max(id),1=1 ';
      sqlPreTpl += ' group by `name`';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '场景',
    field: 'scene',
    component: 'JDictSelectTag',
    helpMessage: ['请选择事件场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_event,scene,scene,1=1 ';
      sqlPreTpl += ' group by scene';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '事件名',
    field: 'name',
    // component: 'JSearchSelect',
    component: 'JDictSelectTag',
    helpMessage: ['请选择事件名称场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_event,name,name,1=1 ';
      if (formModel.scene) {
        sqlPreTpl = sqlPreTpl + " and scene = '" + formModel.scene + "'";
      }
      sqlPreTpl += ' group by name';
      return {
        dictCode: sqlPreTpl,
        // dict: 'et_event,name,name',
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '事件中文名',
    field: 'zhName',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入事件中文名过滤'],
  },
  {
    label: '事件状态',
    field: 'status',
    component: 'Select',
    defaultValue: 2,
    componentProps: {
      options: [
        { label: '初始化', value: 1 },
        { label: '上线', value: 2 },
        { label: '下线', value: 3 },
        { label: '异常', value: 4 },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择事件状态过滤'],
  },
  {
    label: '埋点形式',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: [
        { label: '前端', value: 1 },
        { label: '后端', value: 2 },
      ],
    },
    colProps: { span: 6 },
    helpMessage: ['请选择埋点形式过滤'],
  },
  {
    label: '触发时机',
    field: 'triggerTiming',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入触发时机过滤'],
  },
  {
    label: '文档说明',
    field: 'eventDesc',
    component: 'JInput',
    colProps: { span: 4 },
    helpMessage: ['请输入文档说明过滤'],
  },
  {
    label: '预置属性',
    field: 'isPresetEvent',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
];
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
    label: '序号',
    field: 'sorted',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件序号，序号越小排序越前!' }];
    },
    componentProps: {
      step: 10,
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
    label: '操作说明',
    field: 'operDesc',
    component: 'Input',
  },
  {
    label: '埋点形式',
    field: 'type',
    component: 'Select',
    defaultValue: 1,
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
    field: 'triggerTiming',
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
    defaultValue: 2,
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

export const changeSceneSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'ids',
    component: 'Input',
    required: true,
    helpMessage: ['编号列表'],
    componentProps: { readOnly: true },
    show: false,
  },
  {
    label: '原始场景',
    field: 'oldScene',
    component: 'Input',
    required: true,
    helpMessage: ['原始事件场景'],
    componentProps: { readOnly: true },
  },
  {
    label: '新场景',
    field: 'scene',
    component: 'Input',
    helpMessage: ['请输入新场景名称'],
    dynamicRules: ({ model, schema }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('新场景名称不可能为空');
            }
            if (value === model.oldScene) {
              return Promise.reject('新场景名称和老场景名称不能一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
