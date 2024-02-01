import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客户端名称',
    align: 'center',
    sorter: true,
    dataIndex: 'platformType',
    helpMessage: '客户端名称，页面所属客户端名称，例如pc、wap、Android、ios...',
    width: 150,
  },
  {
    title: '平台语言',
    align: 'center',
    sorter: true,
    dataIndex: 'lang',
    helpMessage: '平台语言，页面所属平台语言，例如zh、en...',
    width: 120,
  },
  {
    title: '一级页面模块',
    align: 'center',
    sorter: true,
    dataIndex: 'unit',
    slots: { customRender: 'copySlot' },
    helpMessage: '页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...',
    width: 150,
  },
  {
    title: '二级页面模块',
    align: 'center',
    sorter: true,
    dataIndex: 'subUnit',
    slots: { customRender: 'copySlot' },
    helpMessage: '页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...',
    width: 150,
  },
  {
    title: '页面名称',
    align: 'center',
    sorter: true,
    dataIndex: 'pageName',
    width: 200,
    slots: { customRender: 'copySlot' },
    helpMessage:
      '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
  },
  {
    title: '原始URL',
    align: 'center',
    sorter: true,
    dataIndex: 'scUrl',
    customRender: render.renderFullUrlHref,
    helpMessage: '原始url，如果原始url存在于特殊url表standard_special_url中，则正则表达式字段不能为空',
  },
  {
    title: '标准URL',
    align: 'center',
    sorter: true,
    dataIndex: 'standardUrl',
    slots: { customRender: 'copySlot' },
    helpMessage: '标准url，完成相应清洗，转化之后的url',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '客户端名称',
    field: 'platformType',
    component: 'JSearchSelect',
    defaultValue: 'pc',
    helpMessage: ['客户端名称，页面所属客户端名称，例如pc、wap、Android、ios...!'],
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_client where 1 = 1 and name is not null group by name,`name`,`name`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '平台语言',
    field: 'lang',
    component: 'JSearchSelect',
    colProps: { span: 6 },
    defaultValue: 'zh',
    helpMessage: ['平台语言，页面所属平台语言，例如zh、en...!'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_platform_site_code where 1 = 1 and platform_lang is not null group by platform_lang,`platform_lang`,`platform_lang`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '一级页面模块',
    field: 'unit',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: ['页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...'],
  },
  {
    label: '二级页面模块',
    field: 'subUnit',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: ['页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...'],
  },
  {
    label: '页面名称',
    field: 'pageName',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: [
      '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
    ],
  },
  // {
  //   label: '一级页面模块',
  //   field: 'unit',
  //   component: 'JSearchSelect',
  //   helpMessage: ['页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...'],
  //   colProps: { span: 6 },
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     const sqlPreTpl = 'standard_rule_url where 1 = 1 and unit is not null group by unit,`unit`,`unit`';
  //     return {
  //       dict: sqlPreTpl,
  //     };
  //   },
  // },
  // {
  //   label: '二级页面模块',
  //   field: 'subUnit',
  //   component: 'JSearchSelect',
  //   colProps: { span: 6 },
  //   helpMessage: ['页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...'],
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     let sqlPreTpl = 'standard_rule_url where 1 = 1 and sub_unit is not null';
  //     if (formModel.unit) {
  //       sqlPreTpl += ' and unit = "' + formModel.unit + '"';
  //     }
  //     sqlPreTpl += ' group by sub_unit,`sub_unit`,`sub_unit`';
  //     return {
  //       dict: sqlPreTpl,
  //     };
  //   },
  // },
  // {
  //   label: '页面名称',
  //   field: 'pageName',
  //   component: 'JSearchSelect',
  //   helpMessage: [
  //     '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
  //   ],
  //   colProps: { span: 6 },
  //   componentProps: ({ schema, tableAction, formActionType, formModel }) => {
  //     let sqlPreTpl = 'standard_rule_url where 1 = 1 and page_name is not null';
  //     if (formModel.unit) {
  //       sqlPreTpl += ' and unit = "' + formModel.unit + '"';
  //     }
  //     if (formModel.subUnit) {
  //       sqlPreTpl += ' and sub_unit = "' + formModel.subUnit + '"';
  //     }
  //     sqlPreTpl += ' group by page_name,`page_name`,`page_name`';
  //     return {
  //       dict: sqlPreTpl,
  //     };
  //   },
  // },
  {
    label: '原始URL',
    field: 'scUrl',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: ['原始url，如果原始url存在于特殊url表standard_special_url中，则正则表达式字段不能为空'],
  },
  {
    label: '标准URL',
    field: 'standardUrl',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: ['标准url，完成相应清洗，转化之后的url'],
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户端名称',
    field: 'platformType',
    component: 'JSearchSelect',
    defaultValue: 'pc',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入客户端类型!' }];
    },
    helpMessage: ['客户端名称，页面所属客户端名称，例如pc、wap、Android、ios...!'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_client where 1 = 1 and name is not null group by name,`name`,`name`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '平台语言',
    field: 'lang',
    component: 'JSearchSelect',
    defaultValue: 'zh',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入语言!' }];
    },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_platform_site_code where 1 = 1 and platform_lang is not null group by platform_lang,`platform_lang`,`platform_lang`';
      return {
        dict: sqlPreTpl,
      };
    },
    helpMessage: ['平台语言，页面所属平台语言，例如zh、en...!'],
  },
  {
    label: '一级页面模块',
    field: 'unit',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入模块!' }];
    },
    helpMessage: ['页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...'],
  },
  {
    label: '二级页面模块',
    field: 'subUnit',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入子模块!' }];
    },
    helpMessage: ['页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...'],
  },
  {
    label: '页面名称',
    field: 'pageName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入访问页面名称!' }];
    },
    helpMessage: [
      '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
    ],
  },
  {
    label: '原始URL',
    field: 'scUrl',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入页面路径!' }];
    },
    helpMessage: ['原始url，如果原始url存在于特殊url表standard_special_url中，则正则表达式字段不能为空'],
  },
  {
    label: '标准URL',
    field: 'standardUrl',
    component: 'Input',
    helpMessage: ['标准url，完成相应清洗，转化之后的url'],
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
