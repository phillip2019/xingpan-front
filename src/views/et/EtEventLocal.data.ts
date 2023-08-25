import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { formatTSToDateTime } from '/@/utils/dateUtil';
import dayjs from 'dayjs';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '唯一键',
    align: 'center',
    dataIndex: 'uk',
    ifShow: false,
    sorter: true,
  },
  {
    title: '时间',
    align: 'center',
    dataIndex: 'createTime',
    customRender: ({ value }) => {
      return !value ? '' : formatTSToDateTime(Number(value));
    },
    sorter: true,
  },
  {
    title: '用户唯一编号',
    align: 'center',
    dataIndex: 'distinctId',
    helpMessage: '用户唯一编号，若用户登录，则此编号为用户号，反之则为设备号',
    slots: { customRender: 'copySlot' },
    sorter: true,
  },
  {
    title: 'USER_ID',
    align: 'center',
    dataIndex: 'loginId',
    helpMessage: '用户编号，若登录，则为用户编号，否则为空',
    sorter: true,
    slots: { customRender: 'copySlot' },
  },
  {
    title: '事件名',
    align: 'center',
    dataIndex: 'event',
    helpMessage: '埋点事件名称',
    sorter: true,
  },
  {
    title: '事件中文名',
    align: 'center',
    dataIndex: 'eventZhName',
    helpMessage: '埋点事件中文名',
    sorter: true,
  },
  {
    title: '访问链接',
    align: 'center',
    dataIndex: 'scUrl',
    customRender: render.renderHref,
    helpMessage: '当前访问链接地址',
    sorter: true,
  },
  {
    title: '上一个链接',
    align: 'center',
    dataIndex: 'scReferrer',
    customRender: render.renderHref,
    helpMessage: '当前访问链接上一个地址',
    sorter: true,
  },
  {
    title: '首日访问',
    align: 'center',
    dataIndex: 'scIsFirstDay',
    slots: { customRender: 'status' },
    width: 100,
    helpMessage: '是否第一天访问，若用户是第一天访问，则是首日访问，反之不是',
    sorter: true,
  },
  {
    title: '首次触发',
    align: 'center',
    dataIndex: 'scIsFirstTime',
    slots: { customRender: 'status' },
    width: 100,
    helpMessage: '是否首次触发，若用户首次触发此事件，则为是，反之不是',
    sorter: true,
  },
  {
    title: '行为类型',
    align: 'center',
    dataIndex: 'type',
    width: 100,
    sorter: true,
  },
  {
    title: '事件时长',
    align: 'center',
    dataIndex: 'scEventDuration',
    width: 100,
    helpMessage: '事件访问时长，单位为s',
    sorter: true,
  },
  {
    title: '页面名称或标题',
    align: 'center',
    dataIndex: 'scTitle',
    customRender: ({ text, record }) => {
      if (record.scTitle) {
        return record.scTitle;
      }
      return record.scScreenName;
    },
    helpMessage: '页面名称或标题',
    sorter: true,
  },
  {
    title: 'IP',
    align: 'center',
    dataIndex: 'ip',
    helpMessage: '访问用户IP地址',
    sorter: true,
  },
  {
    title: 'IP归属洲',
    align: 'center',
    dataIndex: 'ipContinentNames',
    helpMessage: 'IP归属洲',
    sorter: true,
  },
  {
    title: 'IP归属国家',
    align: 'center',
    dataIndex: 'ipCountryName',
    helpMessage: 'IP归属国家',
    sorter: true,
  },
  {
    title: 'IP归属城市',
    align: 'center',
    dataIndex: 'ipCityName',
    helpMessage: 'IP归属城市',
    sorter: true,
  },
  {
    title: '广告渠道',
    align: 'center',
    dataIndex: 'scLatestUtmSource',
    helpMessage: '广告流量来源渠道',
    sorter: true,
  },
  {
    title: '广告名称',
    align: 'center',
    dataIndex: 'scLatestUtmCampaign',
    helpMessage: '投流excel中配置广告系列名称',
    sorter: true,
  },
  {
    title: '广告媒介',
    align: 'center',
    dataIndex: 'scLatestUtmMedium',
    helpMessage: '投流excel中配置广告媒介',
    sorter: true,
  },

  {
    title: '广告系列关键词',
    align: 'center',
    dataIndex: 'scLatestUtmTerm',
    helpMessage: '投流excel中配置广告关键词',
    sorter: true,
  },
  {
    title: '广告系列内容',
    align: 'center',
    dataIndex: 'scLatestUtmContent',
    helpMessage: '投流excel中配置广告内容',
    sorter: true,
  },
  {
    title: '最近一次流量来源站外类型',
    align: 'center',
    dataIndex: 'scLatestTrafficSourceType',
    helpMessage: '流量来源站外类型',
    sorter: true,
  },
  {
    title: '最近一次站外搜索引擎关键词',
    align: 'center',
    dataIndex: 'scLatestSearchKeyword',
    helpMessage: '若流量是搜索引擎来的，用户搜索关键词',
    sorter: true,
  },
  {
    title: '最近一次站外地址',
    align: 'center',
    dataIndex: 'scLatestReferrer',
    customRender: render.renderHref,
    helpMessage: '最近一次站外地址',
    sorter: true,
  },
  {
    title: '最近一次站外域名',
    align: 'center',
    dataIndex: 'scLatestReferrerHost',
    helpMessage: '最近一次站外域名',
    sorter: true,
  },
  {
    title: '最近一次落地页',
    align: 'center',
    dataIndex: 'scLatestLandingPage',
    customRender: render.renderHref,
    helpMessage: '最近一次落地页',
    sorter: true,
  },
  {
    title: '最近一次启动场景',
    align: 'center',
    dataIndex: 'scLatestScene',
    helpMessage: '最近一次启动场景，此为在APP或小程序中存在',
    sorter: true,
  },
  {
    title: '页面路径',
    align: 'center',
    dataIndex: 'scUrlPath',
    helpMessage: '页面路径',
    sorter: true,
  },
  {
    title: '运营商',
    align: 'center',
    dataIndex: 'scCarrier',
    helpMessage: 'IP解析运营商',
    sorter: true,
  },
  {
    title: '网络类型',
    align: 'center',
    dataIndex: 'scNetworkType',
    helpMessage: '客户端网络类型',
    sorter: true,
  },
  {
    title: '设备品牌',
    align: 'center',
    dataIndex: 'scBrand',
    helpMessage: '客户端设备品牌',
    sorter: true,
  },
  {
    title: '设备制造商',
    align: 'center',
    dataIndex: 'scManufacturer',
    helpMessage: '客户端设备制造商',
    sorter: true,
  },
  {
    title: '机型',
    align: 'center',
    dataIndex: 'scModel',
    helpMessage: '客户端机型',
    sorter: true,
  },
  {
    title: '操作系统',
    align: 'center',
    dataIndex: 'scOs',
    helpMessage: '客户端操作系统',
    sorter: true,
  },
  {
    title: '操作系统版本',
    align: 'center',
    dataIndex: 'scOsVersion',
    helpMessage: '客户端操作系统版本',
    sorter: true,
  },
  {
    title: 'APP名称',
    align: 'center',
    dataIndex: 'scAppName',
    helpMessage: '客户端APP名称',
    sorter: true,
  },
  {
    title: 'APP版本',
    align: 'center',
    dataIndex: 'scAppVersion',
    helpMessage: '客户端APP版本',
    sorter: true,
  },
  {
    title: 'UA',
    align: 'center',
    dataIndex: 'userAgent',
    helpMessage: '客户端浏览器UA地址',
    sorter: true,
  },
  {
    title: '浏览器解析平台类型',
    align: 'center',
    dataIndex: 'uaPlatform',
    helpMessage: '浏览器解析平台类型',
    sorter: true,
  },
  {
    title: '浏览器解析浏览器',
    align: 'center',
    dataIndex: 'uaBrowser',
    helpMessage: '浏览器解析浏览器',
    sorter: true,
  },
  {
    title: '浏览器版本',
    align: 'center',
    dataIndex: 'uaVersion',
    helpMessage: '浏览器版本',
    sorter: true,
  },
  {
    title: '浏览器语言',
    align: 'center',
    dataIndex: 'uaLanguage',
    helpMessage: 'UA解析浏览器语言',
    sorter: true,
  },
  {
    title: '自治系统组织名',
    align: 'center',
    dataIndex: 'autonomousSystemOrganization',
    helpMessage: 'IP地址自治系统组织名',
    sorter: true,
  },
  {
    title: 'IP运营商',
    align: 'center',
    dataIndex: 'scIpIsp',
    helpMessage: 'IP运营商',
    sorter: true,
  },
  {
    title: '经度',
    align: 'center',
    dataIndex: 'latitude',
    width: 80,
    helpMessage: 'IP地址经度',
    sorter: true,
  },
  {
    title: '纬度',
    align: 'center',
    dataIndex: 'longitude',
    width: 80,
    helpMessage: 'IP地址纬度',
    sorter: true,
  },
  {
    title: 'SDK插件版本号',
    align: 'center',
    dataIndex: 'scLibPluginVersion',
    helpMessage: 'SDK插件版本号，SDK插件上报版本号',
    sorter: true,
  },
  {
    title: '最近一次分享时途径',
    align: 'center',
    dataIndex: 'scLatestShareMethod',
    helpMessage: '最近一次分享时途径',
    sorter: true,
  },
  {
    title: '机刷',
    align: 'center',
    dataIndex: 'isMachineBrushTraffic',
    slots: { customRender: 'machineBrushStatus' },
    helpMessage: '是否机刷流量',
    sorter: true,
  },
  {
    title: '埋点项目',
    align: 'center',
    dataIndex: 'project',
    helpMessage: '埋点上报项目地址',
    sorter: true,
  },
  {
    title: '语言',
    align: 'center',
    dataIndex: 'platformLang',
    helpMessage: '访问语言',
    sorter: true,
  },
  {
    title: '客户端',
    align: 'center',
    dataIndex: 'platformType',
    helpMessage: '访问客户端',
    sorter: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '时间',
    field: 'createdAtArr',
    component: 'RangePicker',
    componentProps: {
      valueType: 'DateTime',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      defaultValue: [dayjs().startOf('day').format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')],
    },
    helpMessage: ['请选择事件查询时间'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '客户端',
    field: 'platformType',
    component: 'JDictSelectTag',
    helpMessage: ['请选择埋点客户端'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_client,name,name,1=1 ';
      sqlPreTpl += ' group by name';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '语言',
    field: 'platformLang',
    component: 'JDictSelectTag',
    helpMessage: ['请选择平台语言'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,platform_lang,platform_lang,1=1 ';
      sqlPreTpl += ' group by platform_lang';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '用户唯一编号',
    field: 'distinctId',
    component: 'Input',
    helpMessage: ['请输入用户唯一编号'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: 'USER_ID',
    field: 'loginId',
    component: 'Input',
    helpMessage: ['请输入USER_ID'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '设备编号',
    field: 'anonymousId',
    component: 'Input',
    helpMessage: ['请输入设备编号'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '事件名',
    field: 'event',
    // component: 'JSearchSelect',
    component: 'JDictSelectTag',
    helpMessage: ['请选择事件名称场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_event,max(zh_name),name,1=1 ';
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
    label: 'IP',
    field: 'ip',
    component: 'Input',
    helpMessage: ['请输入客户端IP'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: 'IP所属国家',
    field: 'ipCountryName',
    component: 'Input',
    helpMessage: ['请输入IP所属国家'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: 'IP所属城市',
    field: 'ipCityName',
    component: 'Input',
    helpMessage: ['请输入IP所属城市'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '广告渠道',
    field: 'scLatestUtmSource',
    component: 'Input',
    helpMessage: ['请输入广告流量来源渠道'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '广告名称',
    field: 'scLatestUtmCampaign',
    component: 'Input',
    helpMessage: ['请输入投流excel中配置广告系列名称'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '广告媒介',
    field: 'scLatestUtmMedium',
    component: 'Input',
    helpMessage: ['请输入投流excel中配置广告媒介'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '广告系列关键词',
    field: 'scLatestUtmTerm',
    component: 'Input',
    helpMessage: ['请输入投流excel中配置广告关键词'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '广告系列内容',
    field: 'scLatestUtmContent',
    component: 'Input',
    helpMessage: ['请输入投流excel中配置广告内容'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '最近一次流量来源站外类型',
    field: 'scLatestTrafficSourceType',
    component: 'Input',
    helpMessage: ['请输入流量来源站外类型'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '项目',
    field: 'project',
    component: 'JDictSelectTag',
    helpMessage: ['请选择事件名称场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_platform_site_code,project,project,1=1 ';
      sqlPreTpl += ' group by project';
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
    label: '唯一键',
    field: 'uk',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入唯一键!' }];
    },
    ifShow: false,
  },
  {
    label: '埋点项目名称',
    field: 'project',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入埋点项目名称!' }];
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
    label: '平台类型',
    field: 'platformType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入平台类型!' }];
    },
  },
  {
    label: '用户唯一编号',
    field: 'distinctId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入用户唯一编号!' }];
    },
  },
  {
    label: '时间',
    field: 'createTime',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件发生的实际时间戳!' }];
    },
  },
  {
    label: '事件名',
    field: 'event',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入事件名!' }];
    },
  },
  {
    label: '事件中文名',
    field: 'eventZhName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入事件中文名!' }];
    },
  },
  {
    label: '访问地址',
    field: 'scUrl',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入实际访问链接!' }];
    },
  },
  {
    label: '属性',
    field: 'properties',
    component: 'JCodeEditor',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入属性!' }];
    },
    colProps: {
      span: 24,
    },
  },
  {
    label: 'USER_ID',
    field: 'loginId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入用户id!' }];
    },
  },
  {
    label: '是否机刷',
    field: 'isMachineBrushTraffic',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入是否机刷!' }];
    },
  },
  {
    label: 'IP',
    field: 'ip',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ip地址!' }];
    },
  },
  {
    label: 'IP归属州',
    field: 'ipContinentNames',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ip对应的洲!' }];
    },
  },
  {
    label: 'IP归属国家',
    field: 'ipCountryName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ip对应的国家!' }];
    },
  },
  {
    label: 'IP归属城市',
    field: 'ipCityName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ip对应的城市!' }];
    },
  },
  {
    label: '广告渠道',
    field: 'scLatestUtmSource',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次广告流量来源渠道!' }];
    },
  },
  {
    label: '广告名称',
    field: 'scLatestUtmCampaign',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次广告系列名称!' }];
    },
  },
  {
    label: '广告媒介',
    field: 'scLatestUtmMedium',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次广告系列媒介!' }];
    },
  },
  {
    label: '广告系列内容',
    field: 'scLatestUtmContent',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次广告系列内容!' }];
    },
  },
  {
    label: '广告系列关键词',
    field: 'scLatestUtmTerm',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次广告系列关键词!' }];
    },
  },
  {
    label: '首日访问',
    field: 'scIsFirstDay',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入是否首日访问!' }];
    },
  },
  {
    label: '首次触发事件',
    field: 'scIsFirstTime',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入是否首次触发事件!' }];
    },
  },
  {
    label: '设备编号',
    field: 'anonymousId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入设备编号!' }];
    },
  },
  {
    label: '行为类型',
    field: 'type',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入行为类型!' }];
    },
  },
  {
    label: '事件时长',
    field: 'scEventDuration',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入事件时长!' }];
    },
  },
  {
    label: '页面名称',
    field: 'scScreenName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入页面名称!' }];
    },
  },
  {
    label: '内容标题',
    field: 'scTitle',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入内容标题!' }];
    },
  },
  {
    label: '视区高度',
    field: 'scViewportHeight',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入视区高度!' }];
    },
  },
  {
    label: '视区距顶部的位置',
    field: 'scViewportPosition',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入视区距顶部的位置!' }];
    },
  },
  {
    label: '视区宽度',
    field: 'scViewportWidth',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入视区宽度!' }];
    },
  },
  {
    label: '屏幕高度',
    field: 'scScreenHeight',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入屏幕高度!' }];
    },
  },
  {
    label: '屏幕宽度',
    field: 'scScreenWidth',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入屏幕宽度!' }];
    },
  },
  {
    label: '屏幕方向',
    field: 'scScreenOrientation',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入屏幕方向!' }];
    },
  },
  {
    label: '启动场景',
    field: 'scScene',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入启动场景!' }];
    },
  },
  {
    label: '分享次数',
    field: 'scShareDepth',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入分享次数!' }];
    },
  },
  {
    label: '用户编号',
    field: 'scShareDistinctId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入用户编号!' }];
    },
  },
  {
    label: '分享路径',
    field: 'scShareUrlPath',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入分享路径!' }];
    },
  },
  {
    label: '分享时途径',
    field: 'scShareMethod',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入分享时途径!' }];
    },
  },
  {
    label: '来源应用包名',
    field: 'scSourcePackageName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入来源应用包名!' }];
    },
  },
  {
    label: '页面参数',
    field: 'scUrlQuery',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入页面参数!' }];
    },
  },
  {
    label: '页面路径',
    field: 'scUrlPath',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入页面路径!' }];
    },
  },
  {
    label: '埋点上报的上一个地址链接',
    field: 'referrer',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入埋点上报的上一个地址链接!' }];
    },
  },
  {
    label: '埋点上报的上一个地址链接',
    field: 'scReferrer',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入埋点上报的上一个地址链接!' }];
    },
  },
  {
    label: '埋点上报的上一个地址域名',
    field: 'scReferrerHost',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入埋点上报的上一个地址域名!' }];
    },
  },
  {
    label: '埋点上报的上一个页面标题',
    field: 'scReferrerTitle',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入埋点上报的上一个页面标题!' }];
    },
  },
  {
    label: '埋点上报环境',
    field: 'remark',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入埋点上报环境!' }];
    },
  },
  {
    label: '运营商',
    field: 'scCarrier',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入运营商!' }];
    },
  },
  {
    label: '网络类型',
    field: 'scNetworkType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入网络类型!' }];
    },
  },
  {
    label: '是否wifi',
    field: 'scWifi',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入是否wifi!' }];
    },
  },
  {
    label: '设备品牌',
    field: 'scBrand',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入设备品牌!' }];
    },
  },
  {
    label: '设备制造商',
    field: 'scManufacturer',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入设备制造商!' }];
    },
  },
  {
    label: '机型',
    field: 'scModel',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入机型!' }];
    },
  },
  {
    label: '机型操作系统',
    field: 'scOs',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入机型操作系统!' }];
    },
  },
  {
    label: '操作系统版本',
    field: 'scOsVersion',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入操作系统版本!' }];
    },
  },
  {
    label: 'app编号',
    field: 'scAppId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入app编号!' }];
    },
  },
  {
    label: 'app名称',
    field: 'scAppName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入app名称!' }];
    },
  },
  {
    label: 'app版本',
    field: 'scAppVersion',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入app版本!' }];
    },
  },
  {
    label: '浏览器用户代理ua',
    field: 'scUserAgent',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器用户代理ua!' }];
    },
  },
  {
    label: '浏览器',
    field: 'scBrowser',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器!' }];
    },
  },
  {
    label: '浏览器版本',
    field: 'scBrowserVersion',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器版本!' }];
    },
  },
  {
    label: 'ua',
    field: 'userAgent',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ua!' }];
    },
  },
  {
    label: '浏览器解析平台类型',
    field: 'uaPlatform',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器解析平台类型!' }];
    },
  },
  {
    label: '浏览器解析浏览器',
    field: 'uaBrowser',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器解析浏览器!' }];
    },
  },
  {
    label: '浏览器版本',
    field: 'uaVersion',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器版本!' }];
    },
  },
  {
    label: '浏览器语言',
    field: 'uaLanguage',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入浏览器语言!' }];
    },
  },
  {
    label: '注册国家',
    field: 'registeredCountry',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入注册国家!' }];
    },
  },
  {
    label: '自治系统组织名',
    field: 'autonomousSystemOrganization',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入自治系统组织名!' }];
    },
  },
  {
    label: '经度',
    field: 'latitude',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入经度!' }];
    },
  },
  {
    label: '纬度',
    field: 'longitude',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入纬度!' }];
    },
  },
  {
    label: 'ip运营商',
    field: 'scIpIsp',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入ip运营商!' }];
    },
  },
  {
    label: 'sdk插件版本号',
    field: 'scLibPluginVersion',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入sdk插件版本号!' }];
    },
  },
  {
    label: '广告系列来源',
    field: 'scUtmSource',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入广告系列来源!' }];
    },
  },
  {
    label: '广告系列媒介',
    field: 'scUtmMedium',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入广告系列媒介!' }];
    },
  },
  {
    label: '广告系列名称',
    field: 'scUtmCampaign',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入广告系列名称!' }];
    },
  },
  {
    label: '渠道追踪匹配模式',
    field: 'scUtmMatchingType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入渠道追踪匹配模式!' }];
    },
  },
  {
    label: '广告系列内容',
    field: 'scUtmContent',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入广告系列内容!' }];
    },
  },
  {
    label: '广告系列关键词',
    field: 'scUtmTerm',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入广告系列关键词!' }];
    },
  },
  {
    label: '渠道匹配关键字列表',
    field: 'scMatchingKeyList',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入渠道匹配关键字列表!' }];
    },
  },
  {
    label: '短链目标地址',
    field: 'scShortUrlTarget',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入短链目标地址!' }];
    },
  },
  {
    label: '最近一次流量来源站外类型',
    field: 'scLatestTrafficSourceType',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次流量来源站外类型!' }];
    },
  },
  {
    label: '最近一次站外搜索引擎关键词',
    field: 'scLatestSearchKeyword',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次站外搜索引擎关键词!' }];
    },
  },
  {
    label: '最近一次站外地址',
    field: 'scLatestReferrer',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次站外地址!' }];
    },
  },
  {
    label: '最近一次站外域名',
    field: 'scLatestReferrerHost',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次站外域名!' }];
    },
  },
  {
    label: '最近一次落地页',
    field: 'scLatestLandingPage',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次落地页!' }];
    },
  },
  {
    label: '最近一次启动场景',
    field: 'scLatestScene',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次启动场景!' }];
    },
  },
  {
    label: '最近一次分享时途径',
    field: 'scLatestShareMethod',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入最近一次分享时途径!' }];
    },
  },
  {
    label: '爬虫名称',
    field: 'scBotName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入爬虫名称!' }];
    },
  },

  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'uk',
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
