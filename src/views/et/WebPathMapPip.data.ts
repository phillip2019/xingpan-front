import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: 'Project',
    align: 'center',
    sorter: true,
    dataIndex: 'project',
    helpMessage: '项目名称，数据上报项目名称，不同数据上报不同项目中，例如中英文卖家版为chinagoods，卖家版为bp_chinagoods!',
  },
  {
    title: '客户端名称',
    align: 'center',
    sorter: true,
    dataIndex: 'platformType',
    helpMessage: '客户端名称，页面所属客户端名称，例如pc、wap、Android、ios...',
  },
  {
    title: '平台语言',
    align: 'center',
    sorter: true,
    dataIndex: 'platformLang',
    helpMessage: '平台语言，页面所属平台语言，例如zh、en...',
  },
  {
    title: '一级页面模块',
    align: 'center',
    sorter: true,
    dataIndex: 'unit',
    helpMessage: '页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...',
  },
  {
    title: '二级页面模块',
    align: 'center',
    sorter: true,
    dataIndex: 'subUnit',
    helpMessage: '页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...',
  },
  {
    title: '页面名称',
    align: 'center',
    sorter: true,
    dataIndex: 'pageName',
    helpMessage:
      '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
  },
  {
    title: '页面路径',
    align: 'center',
    sorter: true,
    dataIndex: 'path',
    helpMessage: '页面路径，页面路径，例如:https://www.baidu.com/index.html-> /index.html，此处为进行页面模式划分，可以处理路径中含变量情况',
  },
  {
    title: '页面参数',
    align: 'center',
    sorter: true,
    dataIndex: 'parameter',
    helpMessage:
      '页面参数，页面请求参数，例如https://www.baidu.com/index.html?a=1&b=2-> a=1&b=2，此处为进行页面模式划分，可以处理路径中请求参数中含变量情况，参数顺序无关，只要参数最大化匹配，页面就会进行相应标识',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: 'Project',
    field: 'project',
    component: 'JSearchSelect',
    defaultValue: 'chinagoods',
    helpMessage: ['项目名称，数据上报项目名称，不同数据上报不同项目中，请选择页面项目名称，例如中英文卖家版为chinagoods，卖家版为bp_chinagoods!'],
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_platform_site_code where 1 = 1 and platform_site_name is not null group by project,`project`,`project`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
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
    field: 'platformLang',
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
    component: 'JSearchSelect',
    helpMessage: ['页面所属一级模块，针对页面进行模块划分，例如首页、商品详情页...'],
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'web_path_map_pip where 1 = 1 and unit is not null group by unit,`unit`,`unit`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '二级页面模块',
    field: 'subUnit',
    component: 'JSearchSelect',
    colProps: { span: 6 },
    helpMessage: ['页面所属二级模块，针对页面进行子模块划分，例如首页资讯中心、首页品类...'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'web_path_map_pip where 1 = 1 and sub_unit is not null';
      if (formModel.unit) {
        sqlPreTpl += ' and unit = "' + formModel.unit + '"';
      }
      sqlPreTpl += ' group by sub_unit,`sub_unit`,`sub_unit`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '页面名称',
    field: 'pageName',
    component: 'JSearchSelect',
    helpMessage: [
      '页面名称，针对页面进行人为命名，其中URL地址和APP页面为类名，这种类名是非人类可读的，因此进行页面命名，方便后续针对页面进行精细化运营...',
    ],
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'web_path_map_pip where 1 = 1 and page_name is not null';
      if (formModel.unit) {
        sqlPreTpl += ' and unit = "' + formModel.unit + '"';
      }
      if (formModel.subUnit) {
        sqlPreTpl += ' and sub_unit = "' + formModel.subUnit + '"';
      }
      sqlPreTpl += ' group by page_name,`page_name`,`page_name`';
      return {
        dict: sqlPreTpl,
      };
    },
  },
  {
    label: '页面路径',
    field: 'path',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '参数',
    field: 'parameter',
    component: 'JInput',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'Project',
    field: 'project',
    component: 'JSearchSelect',
    defaultValue: 'chinagoods',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入项目名!' }];
    },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      const sqlPreTpl = 'et_platform_site_code where 1 = 1 and platform_site_name is not null group by project,`project`,`project`';
      return {
        dict: sqlPreTpl,
      };
    },
    helpMessage: '项目名称，数据上报项目名称，不同数据上报不同项目中，例如中英文卖家版为chinagoods，卖家版为bp_chinagoods',
  },
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
    field: 'platformLang',
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
    label: '页面路径',
    field: 'path',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入页面路径!' }];
    },
    helpMessage: ['页面路径，页面路径，例如:https://www.baidu.com/index.html-> /index.html，此处为进行页面模式划分，可以处理路径中含变量情况'],
  },
  {
    label: '页面参数',
    field: 'parameter',
    component: 'Input',
    helpMessage: [
      '页面参数，页面请求参数，例如https://www.baidu.com/index.html?a=1&b=2-> a=1&b=2，此处为进行页面模式划分，可以处理路径中请求参数中含变量情况，参数顺序无关，只要参数最大化匹配，页面就会进行相应标识',
    ],
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
