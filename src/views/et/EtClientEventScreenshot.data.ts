import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '事件客户端ID',
    align: 'center',
    sorter: true,
    dataIndex: 'clientEventId',
  },
  {
    title: '模块',
    align: 'center',
    sorter: true,
    dataIndex: 'unitName',
  },
  {
    title: '页面',
    align: 'center',
    sorter: true,
    dataIndex: 'pageName',
  },
  {
    title: '位置',
    align: 'center',
    sorter: true,
    dataIndex: 'pagePosition',
  },
  {
    title: '点位',
    align: 'center',
    sorter: true,
    dataIndex: 'screenshot',
    customRender: render.renderImage,
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    slots: { customRender: 'status' },
    width: 80,
  },
  {
    title: '创建人',
    align: 'center',
    sorter: true,
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  // {
  //   label: '客户端',
  //   field: 'clientId',
  //   component: 'JDictSelectTag',
  //   colProps: { span: 24 },
  //   helpMessage: ['请客户端名称'],
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     let sqlPreTpl = 'et_client,unit_name,unit_name,1=1 ';
  //     sqlPreTpl += ' group by unit_name';
  //     return {
  //       dictCode: sqlPreTpl,
  //     };
  //   },
  // },
  // {
  //   label: '模块',
  //   field: 'unitName',
  //   component: 'JDictSelectTag',
  //   colProps: { span: 24 },
  //   helpMessage: ['请输入模块名称'],
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     let sqlPreTpl = 'et_client_event_screenshot,unit_name,unit_name,1=1 ';
  //     sqlPreTpl += ' group by unit_name';
  //     return {
  //       dictCode: sqlPreTpl,
  //     };
  //   },
  // },
  {
    label: '页面',
    field: 'pageName',
    component: 'JDictSelectTag',
    colProps: { span: 24 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_client_event_screenshot,pageName,pageName,1=1 ';
      sqlPreTpl += ' group by pageName';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: '埋点位置',
    field: 'pagePosition',
    component: 'JInput',
    colProps: { span: 12 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      options: [
        { label: '初始化', value: 0 },
        { label: '正常', value: 1 },
        { label: '改版', value: 2 },
      ],
    },
    colProps: { span: 12 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '事件客户端编号',
    field: 'clientEventId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件客户端编号' }];
    },
  },
  {
    label: '模块',
    field: 'unitName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入模块名称' }];
    },
  },
  {
    label: '页面',
    field: 'pageName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入页面名称' }];
    },
  },
  {
    label: '位置',
    field: 'pagePosition',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入埋点点位位置' }];
    },
  },
  {
    label: '点位图片',
    field: 'screenshot',
    component: 'JImageUpload',
    componentProps: {},
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位图片' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '初始化', value: 0 },
        { label: '正常', value: 1 },
        { label: '改版', value: 2 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择状态!' }];
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
