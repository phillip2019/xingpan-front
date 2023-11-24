import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { Ref } from 'vue';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户端',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'clientEventId',
    customRender: ({ value, record }) => {
      return `${record.client.name}`;
    },
  },
  {
    title: '点位',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'screenshot',
    slots: { customRender: 'screenshot' },
  },
  {
    title: '模块',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'unitName',
  },
  {
    title: '页面',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'pageName',
  },
  {
    title: '位置',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'pagePosition',
  },
  {
    title: '客户端地址',
    align: 'center',
    sorter: true,
    width: 120,
    dataIndex: '',
    customRender: ({ value, record }) => {
      return `${record.client.url}`;
    },
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '创建人',
    align: 'center',
    sorter: true,
    width: 80,
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
export const searchFormSchema = (clientIdOptions: Ref<[]>) => {
  console.log('客户端参数列表: .....', clientIdOptions);

  return [
    {
      label: '客户端',
      field: 'clientId',
      component: 'JDictSelectTag',
      colProps: { span: 24 },
      helpMessage: ['请选择客户端'],
      componentProps: {
        options: clientIdOptions,
      },
    },
    {
      label: '模块',
      field: 'unitName',
      component: 'JDictSelectTag',
      colProps: { span: 24 },
      helpMessage: ['请输入模块名称'],
      componentProps: ({ schema, tableAction, formActionType, formModel }) => {
        let sqlPreTpl = 'et_client_event_screenshot,unit_name,unit_name,1=1 ';
        sqlPreTpl += ' group by unit_name';
        return {
          dictCode: sqlPreTpl,
        };
      },
    },
    {
      label: '页面',
      field: 'pageName',
      component: 'JDictSelectTag',
      colProps: { span: 24 },
      componentProps: ({ schema, tableAction, formActionType, formModel }) => {
        let sqlPreTpl = 'et_client_event_screenshot,page_name,page_name,1=1 ';
        sqlPreTpl += ' group by page_name';
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
      defaultValue: 1,
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
};

//表单数据
export const formSchema = (clientIdOptions: Ref<[]>) => {
  console.log('客户端参数列表: .....', clientIdOptions);
  return [
    {
      label: '客户端',
      field: 'clientEventId',
      component: 'JDictSelectTag',
      componentProps: {
        options: clientIdOptions,
      },
      dynamicRules: ({ model, schema }) => {
        return [{ required: true, message: '请输入事件客户端编号' }];
      },
    },
    {
      label: '模块',
      field: 'unitName',
      component: 'Input',
      dynamicRules: ({ model, schema }) => {
        return [{ required: false, message: '请输入模块名称' }];
      },
    },
    {
      label: '页面',
      field: 'pageName',
      component: 'Input',
      dynamicRules: ({ model, schema }) => {
        return [{ required: false, message: '请输入页面名称' }];
      },
    },
    {
      label: '位置',
      field: 'pagePosition',
      component: 'Input',
      dynamicRules: ({ model, schema }) => {
        return [{ required: false, message: '请输入埋点点位位置' }];
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
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData: { [key: string]: any }, clientIdOptions: any): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema([]);
}
