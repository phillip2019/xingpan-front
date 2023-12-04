import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '推广页面地址',
    align: 'center',
    sorter: true,
    dataIndex: 'sourceUrl',
    filtered: true,
    customRender: render.renderEventHref,
    helpMessage: '推广页面地址，需要推广的网页地址',
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    width: 80,
    dataIndex: 'status',
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '活动名称',
    align: 'center',
    sorter: true,
    dataIndex: 'utmCampaign',
    helpMessage: '广告系列活动utm_campaign，一般用于标识推广活动名称，例如周末大促，双11活动',
  },
  {
    title: '广告来源',
    align: 'center',
    sorter: true,
    dataIndex: 'utmSource',
    helpMessage: '广告系列来源utm_source，一般用于标识流量来源，引荐来源网址：baidu、sina、sohu',
  },
  {
    title: '广告媒介',
    align: 'center',
    sorter: true,
    dataIndex: 'utmMedium',
    helpMessage: '广告系列媒介utm_medium，一般用于标识广告媒介，营销媒介：cpc、banner、edm',
  },
  {
    title: '关键词',
    align: 'center',
    sorter: true,
    dataIndex: 'utmTerm',
    helpMessage: '广告系列字词utm_term，一般用于标识付费关键字，主要适用于SEM',
  },
  {
    title: '广告内容',
    align: 'center',
    sorter: true,
    dataIndex: 'utmContent',
    helpMessage: '广告系列内容utm_content，一般用于区分广告，主要适用A/B-test和按内容定位广告',
  },
  {
    title: '带参二维码',
    align: 'center',
    sorter: true,
    dataIndex: 'targetUrl',
    width: 200,
    slots: { customRender: 'qrCode' },
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
  {
    title: '更新时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '推广页面地址',
    field: 'sourceUrl',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '请输入原始推广地址，支持模糊搜索',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '初始化', value: 0 },
        { label: '上线', value: 1 },
        { label: '下线', value: 2 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    label: '活动名称',
    field: 'utmCampaign',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'mkt_channel_link,utm_campaign,utm_campaign,1=1 ';
      sqlPreTpl += ' group by utm_campaign';
      return {
        dictCode: sqlPreTpl,
      };
    },
    helpMessage: '广告系列活动utm_campaign，一般用于标识推广活动名称，例如周末大促，双11活动',
  },
  {
    label: '广告来源',
    field: 'utmSource',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'mkt_channel_link,utm_source,utm_source,1=1 ';
      sqlPreTpl += ' group by utm_source';
      return {
        dictCode: sqlPreTpl,
      };
    },
    helpMessage: '广告系列来源utm_source，一般用于标识流量来源，引荐来源网址：baidu、sina、sohu',
  },
  {
    label: '广告媒介',
    field: 'utmMedium',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'mkt_channel_link,utm_medium,utm_medium,1=1 ';
      sqlPreTpl += ' group by utm_medium';
      return {
        dictCode: sqlPreTpl,
      };
    },
    helpMessage: '广告系列媒介utm_medium，一般用于标识广告媒介，营销媒介：cpc、banner、edm',
  },
  {
    label: '关键词',
    field: 'utmTerm',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '广告系列字词utm_term，一般用于标识付费关键字，主要适用于SEM',
  },
  {
    label: '广告内容',
    field: 'utmContent',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '广告系列内容utm_content，一般用于区分广告，主要适用A/B-test和按内容定位广告',
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'mkt_channel_link,create_by,create_by,1=1 ';
      sqlPreTpl += ' group by create_by';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: '创建时间',
    field: 'createTimeArr',
    component: 'RangePicker',
    componentProps: {
      valueType: 'DateTime',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    colProps: { span: 6 },
    helpMessage: ['开始时间', '结束时间'],
    show: true,
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '推广页面地址',
    field: 'sourceUrl',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入推广页面地址!' }];
    },
  },
  {
    label: '活动名称',
    field: 'utmCampaign',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入广告系列活动utm_campaign，一般用于标识推广活动名称，例如周末大促，双11活动!' }];
    },
    helpMessage: '广告系列活动utm_campaign，一般用于标识推广活动名称，例如周末大促，双11活动',
  },
  {
    label: '广告来源',
    field: 'utmSource',
    defaultValue: 'baidu_search',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'utmSource',
      placeholder: '请选择广告来源',
      stringToNumber: false,
    },
    helpMessage: '广告系列来源utm_source，一般用于标识流量来源，引荐来源网址：baidu、sina、sohu',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入广告系列活动utm_campaign，一般用于标识推广活动名称，例如周末大促，双11活动!' }];
    },
  },
  {
    label: '广告媒介',
    field: 'utmMedium',
    component: 'JDictSelectTag',
    defaultValue: 'cpc',
    componentProps: {
      dictCode: 'utmMedium',
      placeholder: '请选择广告媒介',
      stringToNumber: false,
    },
    helpMessage: '广告系列媒介utm_medium，一般用于标识广告媒介，营销媒介：cpc、banner、edm',
  },
  {
    label: '关键字',
    field: 'utmTerm',
    component: 'Input',
    helpMessage: '广告系列字词utm_term，一般用于标识付费关键字，主要适用于SEM',
  },
  {
    label: '广告内容',
    field: 'utmContent',
    component: 'Input',
    helpMessage: '广告系列内容utm_content，一般用于区分广告，主要适用A/B-test和按内容定位广告',
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: 0,
    show: false,
    component: 'JDictSelectTag',
    componentProps: {
      options: [
        { label: '初始化', value: 0 },
        { label: '上线', value: 1 },
        { label: '下线', value: 2 },
      ],
    },
    helpMessage: '投流推广链接状态，若已经验证，则为上线，否则为初始化',
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
