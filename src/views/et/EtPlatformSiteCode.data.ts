import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '站点类型',
    align: 'center',
    dataIndex: 'platformSiteType',
    sorter: true,
  },
  {
    title: '站点中文名',
    align: 'center',
    dataIndex: 'platformSiteZhName',
    sorter: true,
  },
  {
    title: 'Project',
    align: 'center',
    dataIndex: 'project',
    sorter: true,
  },
  {
    title: '平台站点',
    align: 'center',
    dataIndex: 'platformSite',
    sorter: true,
  },
  {
    title: '平台语言',
    align: 'center',
    dataIndex: 'platformLang',
    sorter: true,
  },
  {
    title: '站点网址',
    align: 'center',
    dataIndex: 'platformUrl',
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
export const searchFormSchema: FormSchema[] = [
  {
    label: '站点类型',
    field: 'platformSiteType',
    component: 'Select',
    componentProps: {
      options: [
        { label: '中文站', value: '中文站' },
        { label: '国际站', value: '国际站' },
        { label: '国家站', value: '国家站' },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '平台站点',
    field: 'platform_site',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_site,platform_site,1=1 ';
      sqlPreTpl += 'group by platform_site order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '语言',
    field: 'platform_lang',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_lang,platform_lang,1=1 ';
      sqlPreTpl += 'group by platform_lang order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '站点中文名',
    field: 'platformSiteZhName',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_site_zh_name,platform_site_zh_name,1=1 ';
      sqlPreTpl += 'group by platform_site_zh_name order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: 'Project',
    field: 'project',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,`project`,`project`,1=1 ';
      sqlPreTpl += 'group by `project` order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '站点类型',
    field: 'platformSiteType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入站点类型!' }];
    },
  },
  {
    label: '站点中文名',
    field: 'platformSiteZhName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入站点中文名!' }];
    },
  },
  {
    label: '埋点project名称',
    field: 'project',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入埋点project名称!' }];
    },
  },
  {
    label: '平台站点',
    field: 'platformSite',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入平台站点!' }];
    },
  },
  {
    label: '平台语言',
    field: 'platformLang',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入平台语言!' }];
    },
  },
  {
    label: '站点网址',
    field: 'platformUrl',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入站点网址!' }];
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
