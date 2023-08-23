import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '平台站点类型',
    align: 'center',
    dataIndex: 'platformSiteType',
    sorter: true,
  },
  {
    title: '平台站点',
    align: 'center',
    dataIndex: 'platformSite',
    sorter: true,
  },
  {
    title: '平台站点名称',
    align: 'center',
    dataIndex: 'platformSiteName',
    sorter: true,
  },
  {
    title: '是否移动端',
    align: 'center',
    dataIndex: 'isMobile',
    customRender: ({ text }) => {
      let customText = '是';
      if (text === 0) {
        customText = '否';
      }
      return customText;
    },
    sorter: true,
  },
  {
    title: '客户端名称',
    align: 'center',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '客户端网址',
    align: 'center',
    dataIndex: 'url',
    sorter: true,
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
    sorter: true,
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
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
    field: 'platformSite',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_site,platform_site,1=1 ';
      if (formModel.platformSiteType) {
        sqlPreTpl = sqlPreTpl + " and platform_site_type = '" + formModel.platformSiteType + "'";
      }
      sqlPreTpl += 'group by platform_site';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '站点中文名',
    field: 'platformSiteName',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_site_name,platform_site_name,1=1 ';
      if (formModel.platformSiteType) {
        sqlPreTpl = sqlPreTpl + " and platform_site_type = '" + formModel.platformSiteType + "'";
      }
      if (formModel.platformSite) {
        sqlPreTpl = sqlPreTpl + " and platform_site = '" + formModel.platformSite + "'";
      }
      sqlPreTpl += 'group by platform_site_name';
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
      if (formModel.platformSiteType) {
        sqlPreTpl = sqlPreTpl + " and platform_site_type = '" + formModel.platformSiteType + "'";
      }
      if (formModel.platformSite) {
        sqlPreTpl = sqlPreTpl + " and platform_site = '" + formModel.platformSite + "'";
      }
      if (formModel.platformSiteName) {
        sqlPreTpl = sqlPreTpl + " and platform_site_name = '" + formModel.platformSiteName + "'";
      }
      sqlPreTpl += 'group by `project`';
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
    label: '客户端名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入客户端名称!' }];
    },
  },
  {
    label: '客户端网址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '移动端',
    field: 'isMobile',
    component: 'Select',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入是否移动端!' }];
    },
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
  {
    label: '平台站点类型',
    field: 'platformSiteType',
    component: 'JDictSelectTag',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择平台站点类型!' }];
    },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      // console.log(formActionType);
      let sqlPreTpl = 'et_platform_site_code,platform_site_type,platform_site_type,1=1 ';
      sqlPreTpl += ' group by platform_site_type';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: '平台站点名称',
    field: 'platformSiteCodeId',
    component: 'JDictSelectTag',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入平台站点!' }];
    },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      // console.log(formActionType);
      let sqlPreTpl = 'et_platform_site_code,platform_site_name,max(id),1=1 ';
      if (formModel.platformSiteType) {
        sqlPreTpl = sqlPreTpl + " and platform_site_type = '" + formModel.platformSiteType + "'";
      }
      sqlPreTpl += ' group by platform_site_name';
      return {
        dictCode: sqlPreTpl,
      };
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
