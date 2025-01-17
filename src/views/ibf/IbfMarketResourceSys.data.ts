import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '市场ID缩写',
    align:"center",
    dataIndex: 'shortMarketId'
   },
   {
    title: '市场名称',
    align:"center",
    dataIndex: 'shortMarketName'
   },
   {
    title: '所属年月 yyyy-MM',
    align:"center",
    dataIndex: 'monthCol'
   },
   {
    title: '间数（商位）',
    align:"center",
    dataIndex: 'boothRoomNumTd'
   },
   {
    title: '间数（配套）',
    align:"center",
    dataIndex: 'matchRoomNumTd'
   },
   {
    title: '已出租间数（商位+配套）',
    align:"center",
    dataIndex: 'boothMatchRentRoomNum1d'
   },
   {
    title: '面积（商位）㎡',
    align:"center",
    dataIndex: 'boothAreaNumTd'
   },
   {
    title: '面积（配套）㎡',
    align:"center",
    dataIndex: 'matchAreaNumTd'
   },
   {
    title: '已出租面积（商位+配套）㎡',
    align:"center",
    dataIndex: 'boothMatchRentAreaNum1d'
   },
   {
    title: '资源情况统计日期 yyyy-MM-dd',
    align:"center",
    dataIndex: 'resourceStatisticsDate'
   },
   {
    title: '商位使用权人',
    align:"center",
    dataIndex: 'boothOwnerNum'
   },
   {
    title: '实际经营人',
    align:"center",
    dataIndex: 'boothOperatorNum'
   },
   {
    title: '商人统计日期 yyyy-MM-dd',
    align:"center",
    dataIndex: 'merchantStatisticsDate'
   },
   {
    title: '人流（人次）',
    align:"center",
    dataIndex: 'marketBuyerEntrNum1m'
   },
   {
    title: '车流（人次）',
    align:"center",
    dataIndex: 'carEntrNum1m'
   },
   {
    title: '外商（人次）',
    align:"center",
    dataIndex: 'foreignBuyerEntrNum1m'
   },
   {
    title: '开门率 %',
    align:"center",
    dataIndex: 'boothOpeningRate1m'
   },
   {
    title: '市场成交额（亿）',
    align:"center",
    dataIndex: 'marketGmv1m'
   },
   {
    title: '商位转让笔数',
    align:"center",
    dataIndex: 'marketTransferNum1m'
   },
   {
    title: '商位转让均价（元）',
    align:"center",
    dataIndex: 'marketTransferPriceAvg1m'
   },
   {
    title: '商位转租笔数',
    align:"center",
    dataIndex: 'marketRentNum1m'
   },
   {
    title: '商位转租均价（元）',
    align:"center",
    dataIndex: 'marketRentPriceAvg1m'
   },
   {
    title: '商位质押笔数',
    align:"center",
    dataIndex: 'pledgeApplyNum1m'
   },
   {
    title: '商位质押总金额（元）',
    align:"center",
    dataIndex: 'pledgeApplyIncome1m'
   },
   {
    title: '商位普通装修笔数',
    align:"center",
    dataIndex: 'normalRenovationNum1m'
   },
   {
    title: '商位个性化装修笔数',
    align:"center",
    dataIndex: 'specialRenovationNum1m'
   },
   {
    title: '本年招商户数',
    align:"center",
    dataIndex: 'invstHoldsNumSd'
   },
   {
    title: '本年招商间数',
    align:"center",
    dataIndex: 'invstRoomNumSd'
   },
   {
    title: '当前空置户数',
    align:"center",
    dataIndex: 'emptyBoothHoldsNumTd'
   },
   {
    title: '当前空置间数',
    align:"center",
    dataIndex: 'emptyBoothRoomNumTd'
   },
   {
    title: '本年入场资格费收入（万）',
    align:"center",
    dataIndex: 'entryQualificationIncomeSd'
   },
   {
    title: '剩余商位出租率统计日期 yyyy-MM-dd',
    align:"center",
    dataIndex: 'remainRentRateStatisticsDate'
   },
   {
    title: '本年续租户数（户）',
    align:"center",
    dataIndex: 'renewLeaseHoldsNumSd'
   },
   {
    title: '本年退租户数（户）',
    align:"center",
    dataIndex: 'surrenderLeaseHoldsNumSd'
   },
   {
    title: '本年到期户数（户）',
    align:"center",
    dataIndex: 'expiredHoldsNumSd'
   },
   {
    title: '本年续租收入（万）',
    align:"center",
    dataIndex: 'renewLeaseIncomeSd'
   },
   {
    title: '续租完成率统计日期 yyyy-MM-dd',
    align:"center",
    dataIndex: 'renewLeaseRateStatisticsDate'
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createdAt',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场ID缩写',
    field: 'shortMarketId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入市场ID缩写!'},
          ];
     },
  },
  {
    label: '市场名称',
    field: 'shortMarketName',
    component: 'Input',
  },
  {
    label: '所属年月 yyyy-MM',
    field: 'monthCol',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入所属年月 yyyy-MM!'},
          ];
     },
  },
  {
    label: '间数（商位）',
    field: 'boothRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入间数（商位）!'},
          ];
     },
  },
  {
    label: '间数（配套）',
    field: 'matchRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入间数（配套）!'},
          ];
     },
  },
  {
    label: '已出租间数（商位+配套）',
    field: 'boothMatchRentRoomNum1d',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入已出租间数（商位+配套）!'},
          ];
     },
  },
  {
    label: '面积（商位）㎡',
    field: 'boothAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入面积（商位）㎡!'},
          ];
     },
  },
  {
    label: '面积（配套）㎡',
    field: 'matchAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入面积（配套）㎡!'},
          ];
     },
  },
  {
    label: '已出租面积（商位+配套）㎡',
    field: 'boothMatchRentAreaNum1d',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入已出租面积（商位+配套）㎡!'},
          ];
     },
  },
  {
    label: '资源情况统计日期 yyyy-MM-dd',
    field: 'resourceStatisticsDate',
    component: 'Input',
  },
  {
    label: '商位使用权人',
    field: 'boothOwnerNum',
    component: 'InputNumber',
  },
  {
    label: '实际经营人',
    field: 'boothOperatorNum',
    component: 'InputNumber',
  },
  {
    label: '商人统计日期 yyyy-MM-dd',
    field: 'merchantStatisticsDate',
    component: 'Input',
  },
  {
    label: '人流（人次）',
    field: 'marketBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入人流（人次）!'},
          ];
     },
  },
  {
    label: '车流（人次）',
    field: 'carEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入车流（人次）!'},
          ];
     },
  },
  {
    label: '外商（人次）',
    field: 'foreignBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入外商（人次）!'},
          ];
     },
  },
  {
    label: '开门率 %',
    field: 'boothOpeningRate1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入开门率 %!'},
          ];
     },
  },
  {
    label: '市场成交额（亿）',
    field: 'marketGmv1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入市场成交额（亿）!'},
          ];
     },
  },
  {
    label: '商位转让笔数',
    field: 'marketTransferNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位转让笔数!'},
          ];
     },
  },
  {
    label: '商位转让均价（元）',
    field: 'marketTransferPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位转让均价（元）!'},
          ];
     },
  },
  {
    label: '商位转租笔数',
    field: 'marketRentNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位转租笔数!'},
          ];
     },
  },
  {
    label: '商位转租均价（元）',
    field: 'marketRentPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位转租均价（元）!'},
          ];
     },
  },
  {
    label: '商位质押笔数',
    field: 'pledgeApplyNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位质押笔数!'},
          ];
     },
  },
  {
    label: '商位质押总金额（元）',
    field: 'pledgeApplyIncome1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位质押总金额（元）!'},
          ];
     },
  },
  {
    label: '商位普通装修笔数',
    field: 'normalRenovationNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位普通装修笔数!'},
          ];
     },
  },
  {
    label: '商位个性化装修笔数',
    field: 'specialRenovationNum1m',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商位个性化装修笔数!'},
          ];
     },
  },
  {
    label: '本年招商户数',
    field: 'invstHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年招商户数!'},
          ];
     },
  },
  {
    label: '本年招商间数',
    field: 'invstRoomNumSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年招商间数!'},
          ];
     },
  },
  {
    label: '当前空置户数',
    field: 'emptyBoothHoldsNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入当前空置户数!'},
          ];
     },
  },
  {
    label: '当前空置间数',
    field: 'emptyBoothRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入当前空置间数!'},
          ];
     },
  },
  {
    label: '本年入场资格费收入（万）',
    field: 'entryQualificationIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年入场资格费收入（万）!'},
          ];
     },
  },
  {
    label: '剩余商位出租率统计日期 yyyy-MM-dd',
    field: 'remainRentRateStatisticsDate',
    component: 'Input',
  },
  {
    label: '本年续租户数（户）',
    field: 'renewLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年续租户数（户）!'},
          ];
     },
  },
  {
    label: '本年退租户数（户）',
    field: 'surrenderLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年退租户数（户）!'},
          ];
     },
  },
  {
    label: '本年到期户数（户）',
    field: 'expiredHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年到期户数（户）!'},
          ];
     },
  },
  {
    label: '本年续租收入（万）',
    field: 'renewLeaseIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入本年续租收入（万）!'},
          ];
     },
  },
  {
    label: '续租完成率统计日期 yyyy-MM-dd',
    field: 'renewLeaseRateStatisticsDate',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createdAt',
    component: 'DatePicker',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
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