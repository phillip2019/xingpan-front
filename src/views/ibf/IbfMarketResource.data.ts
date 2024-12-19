import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '市场',
    align: 'center',
    sorter: true,
    dataIndex: 'shortMarketId_dictText',
  },
  {
    title: '市场名称',
    align: 'center',
    sorter: true,
    dataIndex: 'shortMarketName_dictText',
  },
  {
    title: '所属年月 yyyy-MM',
    align: 'center',
    sorter: true,
    dataIndex: 'monthCol_dictText',
  },
  {
    title: '间数（商位）',
    align: 'center',
    sorter: true,
    dataIndex: 'boothRoomNumTd',
  },
  {
    title: '间数（配套）',
    align: 'center',
    sorter: true,
    dataIndex: 'matchRoomNumTd',
  },
  {
    title: '已出租间数（商位+配套）',
    align: 'center',
    sorter: true,
    dataIndex: 'boothMatchRentRoomNum1d',
  },
  {
    title: '面积（商位）㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'boothAreaNumTd',
  },
  {
    title: '面积（配套）㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'matchAreaNumTd',
  },
  {
    title: '已出租面积（商位+配套）㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'boothMatchRentAreaNum1d',
  },
  {
    title: '人流（人次）',
    align: 'center',
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1m',
  },
  {
    title: '车流（人次）',
    align: 'center',
    sorter: true,
    dataIndex: 'carEntrNum1m',
  },
  {
    title: '外商（人次）',
    align: 'center',
    sorter: true,
    dataIndex: 'foreignBuyerEntrNum1m',
  },
  {
    title: '开门率 %',
    align: 'center',
    sorter: true,
    dataIndex: 'boothOpeningRate1m',
  },
  {
    title: '市场成交额（亿）',
    align: 'center',
    sorter: true,
    dataIndex: 'marketGmv1m',
  },
  {
    title: '商位转让笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'marketTransferNum1m',
  },
  {
    title: '商位转让均价（元）',
    align: 'center',
    sorter: true,
    dataIndex: 'marketTransferPriceAvg1m',
  },
  {
    title: '商位转租笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'marketRentNum1m',
  },
  {
    title: '商位转租均价（元）',
    align: 'center',
    sorter: true,
    dataIndex: 'marketRentPriceAvg1m',
  },
  {
    title: '商位质押笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'pledgeApplyNum1m',
  },
  {
    title: '商位质押总金额（元）',
    align: 'center',
    sorter: true,
    dataIndex: 'pledgeApplyIncome1m',
  },
  {
    title: '商位普通装修笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'normalRenovationNum1m',
  },
  {
    title: '商位个性化装修笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'specialRenovationNum1m',
  },
  {
    title: '本年招商户数',
    align: 'center',
    sorter: true,
    dataIndex: 'invstHoldsNumSd',
  },
  {
    title: '当前空置户数',
    align: 'center',
    sorter: true,
    dataIndex: 'emptyBoothHoldsNumTd',
  },
  {
    title: '本年入场资格费收入（万）',
    align: 'center',
    sorter: true,
    dataIndex: 'entryQualificationIncomeSd',
  },
  {
    title: '本年续租户数（户）',
    align: 'center',
    sorter: true,
    dataIndex: 'renewLeaseHoldsNumSd',
  },
  {
    title: '本年退租户数（户）',
    align: 'center',
    sorter: true,
    dataIndex: 'surrenderLeaseHoldsNumSd',
  },
  {
    title: '本年到期户数（户）',
    align: 'center',
    sorter: true,
    dataIndex: 'expiredHoldsNumSd',
  },
  {
    title: '本年续租收入（万）',
    align: 'center',
    sorter: true,
    dataIndex: 'renewLeaseIncomeSd',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '修改时间',
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
  {
    title: '修改人',
    align: 'center',
    dataIndex: 'updateBy',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '业务类型，BOSS,OPERATION',
    field: 'businessVersion',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王',
    field: 'shortMarketId',
    component: 'JDictSelectTag',
    componentProps: {},
    colProps: { span: 6 },
  },
  {
    label: '市场名称',
    field: 'shortMarketName',
    component: 'JDictSelectTag',
    componentProps: {},
    colProps: { span: 6 },
  },
  {
    label: '所属年月 yyyy-MM',
    field: 'monthCol',
    component: 'JDictSelectTag',
    componentProps: {},
    colProps: { span: 6 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
  {
    label: '修改时间',
    field: 'updateTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '修改人',
    field: 'updateBy',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王',
    field: 'shortMarketId',
    defaultValue: '1001',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入市场id  1001:一区 1003:二区 1004:三区 1006:四区 1007:五区 1008:篁园 1011:义西 1002:宾王!' }];
    },
  },
  {
    label: '市场名称',
    field: 'shortMarketName',
    defaultValue: '一区',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入市场名称!' }];
    },
  },
  {
    label: '所属年月 yyyy-MM',
    field: 'monthCol',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所属年月 yyyy-MM!' }];
    },
  },
  {
    label: '间数（商位）',
    field: 'boothRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入间数（商位）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '间数（配套）',
    field: 'matchRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入间数（配套）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '已出租间数（商位+配套）',
    field: 'boothMatchRentRoomNum1d',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入已出租间数（商位+配套）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '面积（商位）㎡',
    field: 'boothAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入面积（商位）㎡!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '面积（配套）㎡',
    field: 'matchAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入面积（配套）㎡!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '已出租面积（商位+配套）㎡',
    field: 'boothMatchRentAreaNum1d',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入已出租面积（商位+配套）㎡!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '人流（人次）',
    field: 'marketBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入人流（人次）!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '车流（人次）',
    field: 'carEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入车流（人次）!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '外商（人次）',
    field: 'foreignBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入外商（人次）!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '开门率 %',
    field: 'boothOpeningRate1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入开门率 %!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '市场成交额（亿）',
    field: 'marketGmv1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入市场成交额（亿）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '商位转让笔数',
    field: 'marketTransferNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转让笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '商位转让均价（元）',
    field: 'marketTransferPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转让均价（元）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '商位转租笔数',
    field: 'marketRentNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转租笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '商位转租均价（元）',
    field: 'marketRentPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转租均价（元）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '商位质押笔数',
    field: 'pledgeApplyNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位质押笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '商位质押总金额（元）',
    field: 'pledgeApplyIncome1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位质押总金额（元）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '商位普通装修笔数',
    field: 'normalRenovationNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位普通装修笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '商位个性化装修笔数',
    field: 'specialRenovationNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位个性化装修笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '本年招商户数',
    field: 'invstHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年招商户数!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '当前空置户数',
    field: 'emptyBoothHoldsNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入当前空置户数!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年入场资格费收入（万）',
    field: 'entryQualificationIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年入场资格费收入（万）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本年续租户数（户）',
    field: 'renewLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租户数（户）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年退租户数（户）',
    field: 'surrenderLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年退租户数（户）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年到期户数（户）',
    field: 'expiredHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年到期户数（户）!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年续租收入（万）',
    field: 'renewLeaseIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租收入（万）!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
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
