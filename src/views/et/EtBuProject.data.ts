import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '项目',
    align: 'center',
    dataIndex: 'name',
    customRender: ({ record }) => {
      const name = record?.name;
      const prototypeLink = record?.prototypeLink;
      return render.renderHref2(name, prototypeLink);
    },
  },
  {
    title: '项目描述',
    align: 'center',
    dataIndex: 'projectDesc',
  },
  {
    title: '产品经理',
    align: 'center',
    dataIndex: 'productManager',
  },
  {
    title: '上线时间',
    align: 'center',
    dataIndex: 'onlineTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
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
export const searchFormSchema: FormSchema[] = [
  {
    label: '项目',
    field: 'id',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_bu_project,name,max(id),1=1 ';
      sqlPreTpl += 'group by name';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '项目名',
    field: 'name',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '项目描述',
    field: 'projectDesc',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '产品经理',
    field: 'product_manager',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_bu_project,product_manager,product_manager,1=1 ';
      sqlPreTpl += 'group by product_manager';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '原型链接',
    field: 'prototypeLink',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '上线日期',
    field: 'onlineTimeArr',
    component: 'RangePicker',
    componentProps: {
      valueType: 'DateTime',
      showTime: true,
      valueFormat: 'YYYY-MM-DD',
    },
    helpMessage: ['请选择产品上线日期'],
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '项目中文名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入项目中文名称!' }];
    },
  },
  {
    label: '产品经理',
    field: 'productManager',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入产品经理名称!' }];
    },
  },
  {
    label: '产品原型链接',
    field: 'prototypeLink',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入产品原型链接!' }];
    },
  },
  {
    label: '上线时间',
    field: 'onlineTime',
    component: 'DatePicker',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入上线时间!' }];
    },
  },
  {
    label: '项目描述',
    field: 'projectDesc',
    component: 'InputTextArea',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入项目描述!' }];
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
