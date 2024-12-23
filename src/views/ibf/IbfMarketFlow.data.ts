import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '市场',
    align:"center",
    helpMessage: '市场，记录市场',
    sorter: true,
    dataIndex: 'shortMarketId_dictText'
   },
   {
    title: '日期',
    align:"center",
    sorter: true,
    dataIndex: 'dateCol',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '日人流量',
    align:"center",
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1d',
    helpMessage: '日人流量，记录日人流量，单位人次',
   },
   {
    title: '日车流量',
    align:"center",
    sorter: true,
    dataIndex: 'carEntrNum1d',
    helpMessage: '日车流量，记录日车流量，单位车次',
   },
   {
    title: '日开门率',
    align:"center",
    sorter: true,
    dataIndex: 'boothOpeningRate1d',
    helpMessage: '日开门率，记录日开门率开门的商位数/出租的商位数，按照商位号去重，AB摊位算1个',
   },
   {
    title: '创建时间',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
   },
   {
    title: '修改时间',
    align:"center",
    sorter: true,
    dataIndex: 'updateTime'
   },
   {
    title: '创建人',
    align:"center",
    sorter: true,
    dataIndex: 'createBy'
   },
   {
    title: '修改人',
    align:"center",
    sorter: true,
    dataIndex: 'updateBy'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "市场",
      field: 'shortMarketId',
      component: 'JSelectMultiple',
      helpMessage: '市场，记录市场，请选择市场',
      componentProps:{
        dictCode: 'short_market_id',
      },
      colProps: {span: 6},
 	},
	{
      label: "日期",
      field: 'dateCol',
      helpMessage: '日期，记录日期，格式yyyy-MM-dd',
      component: 'DatePicker',
      colProps: {span: 6},
 	},
   {
    label: "创建人",
    field: 'createBy',
    component: 'JInput',
    colProps: {span: 6},
 },
	{
      label: "创建时间",
      field: 'createTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
   {
    label: "修改人",
    field: 'updateBy',
    component: 'JInput',
    colProps: {span: 6},
 },
	{
      label: "修改时间",
      field: 'updateTime',
      component: 'DatePicker',
      componentProps: {
         showTime:true,
         valueFormat: 'YYYY-MM-DD HH:mm:ss'
       },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JDictSelectTag',
    defaultValue: '1001',
    helpMessage: '市场，记录市场，请选择市场',
    componentProps:{
        dictCode:"short_market_id"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择市场!'},
          ];
     },
  },
  {
    label: '日期',
    field: 'dateCol',
    component: 'DatePicker',
    helpMessage: '日期，记录日期，格式yyyy-MM-dd',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入日期 yyyy-MM-dd!'},
          ];
     },
  },
  {
    label: '日人流量',
    field: 'marketBuyerEntrNum1d',
    component: 'InputNumber',
    helpMessage: [
      '数据口径：',
      '当日人次，市场摄像头监测',
      '单位：',
      '人次',
      '统计周期：',
      '当日自然日内'
    ],
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入日人流量!'},
        { pattern: /^-?\d+$/, message: '请输入整数!'},
      ];
    },
  },
  {
    label: '日车流量',
    field: 'carEntrNum1d',
    component: 'InputNumber',
    helpMessage: [
      '数据口径：',
      '当日车次，按车辆进入次数统计',
      '单位：',
      '车次',
      '统计周期：',
      '当日自然日内'
    ],
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入日车流量!'},
        { pattern: /^-?\d+$/, message: '请输入整数!'},
      ];
    },
  },
  {
    label: '日开门率',
    field: 'boothOpeningRate1d',
    component: 'InputNumber',
    helpMessage: [
      '数据口径：',
      '开门率=有用电的商位总数/各市场去重的有使用权人的商位数(AB摊位算一间商位)。',
      '单位：',
      '% ，精确到2位小数',
      '统计周期：',
      '当日自然日内'
    ],
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入日开门率!'},
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!'},
      ];
    },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
  {
    label: '',
    field: 'businessVersion',
    component: 'Input',
    show: false,
  },
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}