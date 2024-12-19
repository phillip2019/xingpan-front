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
    helpMessage: '市场，记录市场',
  },
  {
    title: '月份',
    align: 'center',
    sorter: true,
    dataIndex: 'monthCol',
    helpMessage: '月份，记录月份，格式yyyy-MM',
  },
  {
    title: '间数(商位)',
    align: 'center',
    sorter: true,
    dataIndex: 'boothRoomNumTd',
    helpMessage: '间数(商位)，记录间数(商位)，单位间',
  },
  {
    title: '间数(配套)',
    align: 'center',
    sorter: true,
    dataIndex: 'matchRoomNumTd',
    helpMessage: '间数(配套)，记录间数(配套)，单位间',
  },
  {
    title: '已出租间数(商位+配套)',
    align: 'center',
    sorter: true,
    dataIndex: 'boothMatchRentRoomNum1d',
    helpMessage: '已出租间数(商位+配套)，记录已出租间数(商位+配套)，单位间',
  },
  {
    title: '面积(商位)㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'boothAreaNumTd',
    helpMessage: '面积(商位)，记录面积(商位)，单位㎡',
  },
  {
    title: '面积(配套)㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'matchAreaNumTd',
    helpMessage: '面积(配套)，记录面积(配套)，单位㎡',
  },
  {
    title: '已出租面积(商位+配套)㎡',
    align: 'center',
    sorter: true,
    dataIndex: 'boothMatchRentAreaNum1d',
    helpMessage: '已出租面积(商位+配套)，记录已出租面积(商位+配套)，单位㎡',
  },
  {
    title: '人流',
    align: 'center',
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1m',
    helpMessage: '人流(人次)，记录人流(人次)，单位人次',
  },
  {
    title: '车流',
    align: 'center',
    sorter: true,
    dataIndex: 'carEntrNum1m',
    helpMessage: '车流(人次)，记录车流(人次)，单位人次',
  },
  {
    title: '外商',
    align: 'center',
    sorter: true,
    dataIndex: 'foreignBuyerEntrNum1m',
    helpMessage: '外商(人次)，记录外商(人次)，单位人次',
  },
  {
    title: '开门率',
    align: 'center',
    sorter: true,
    dataIndex: 'boothOpeningRate1m',
    helpMessage: '开门率，记录开门率',
    // 添加*100， 添加%，显示2位小数
    customRender: ({ record }) => `${(record.boothOpeningRate1m * 100).toFixed(2)}%`,
  },
  {
    title: '市场成交额',
    align: 'center',
    sorter: true,
    dataIndex: 'marketGmv1m',
    helpMessage: '记录市场成交额(亿元)，单位亿元',
  },
  {
    title: '商位转让笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'marketTransferNum1m',
    helpMessage: '记录商位转让笔数，单位笔',
  },
  {
    title: '商位转让均价(元)',
    align: 'center',
    sorter: true,
    dataIndex: 'marketTransferPriceAvg1m',
    helpMessage: '记录商位转让均价(元)，单位元',
  },
  {
    title: '商位转租笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'marketRentNum1m',
    helpMessage: '记录商位转租笔数，单位笔',
  },
  {
    title: '商位转租均价',
    align: 'center',
    sorter: true,
    dataIndex: 'marketRentPriceAvg1m',
    helpMessage: '记录商位转租均价(万元)，单位万元',
  },
  {
    title: '商位质押笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'pledgeApplyNum1m',
    helpMessage: '商位质押笔数，记录商位质押笔数，单位笔',
  },
  {
    title: '商位质押总金额',
    align: 'center',
    sorter: true,
    dataIndex: 'pledgeApplyIncome1m',
    helpMessage: '记录商位质押总金额(万元)，单位万元',
  },
  {
    title: '商位普通装修笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'normalRenovationNum1m',
    helpMessage: '记录商位普通装修笔数，单位笔',
  },
  {
    title: '商位个性化装修笔数',
    align: 'center',
    sorter: true,
    dataIndex: 'specialRenovationNum1m',
    helpMessage: '记录商位个性化装修笔数，单位笔',
  },
  {
    title: '本年招商户数',
    align: 'center',
    sorter: true,
    dataIndex: 'invstHoldsNumSd',
    helpMessage: '记录本年招商户数，单位户',
  },
  {
    title: '当前空置户数',
    align: 'center',
    sorter: true,
    dataIndex: 'emptyBoothHoldsNumTd',
    helpMessage: '记录当前空置户数，单位户',
  },
  {
    title: '本年入场资格费收入',
    align: 'center',
    sorter: true,
    dataIndex: 'entryQualificationIncomeSd',
    helpMessage: '记录本年入场资格费收入(万元)，单位万元',
  },
  {
    title: '本年续租户数',
    align: 'center',
    sorter: true,
    dataIndex: 'renewLeaseHoldsNumSd',
    helpMessage: '记录本年续租户数，单位户',
  },
  {
    title: '本年退租户数',
    align: 'center',
    sorter: true,
    dataIndex: 'surrenderLeaseHoldsNumSd',
    helpMessage: '记录本年退租户数，单位户',
  },
  {
    title: '本年到期户数',
    align: 'center',
    sorter: true,
    dataIndex: 'expiredHoldsNumSd',
    helpMessage: '记录本年到期户数，单位户',
  },
  {
    title: '本年续租收入',
    align: 'center',
    sorter: true,
    dataIndex: 'renewLeaseIncomeSd',
    helpMessage: '记录本年续租收入(亿元)，单位亿元',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    helpMessage: '创建时间，记录创建时间',
  },
  {
    title: '修改时间',
    align: 'center',
    dataIndex: 'updateTime',
    helpMessage: '修改时间，记录修改时间',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
    helpMessage: '创建人,记录创建人',
  },
  {
    title: '修改人',
    align: 'center',
    dataIndex: 'updateBy',
    helpMessage: '修改人，记录修改人',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'short_market_id',
    },
    colProps: { span: 6 },
  },
  {
    label: '月份',
    field: 'monthCol',
    component: 'JDictSelectTag',
    defaultValue: '2024-11',
    componentProps: {
      options: (() => {
        const now = new Date();
        const months = [];
        for (let i = 1; i <= 24; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          months.push({ label: value, value });
        }
        return months;
      })(),
    },
    colProps: { span: 6 },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'JInput',
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
    label: '修改人',
    field: 'updateBy',
    component: 'JInput',
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
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    defaultValue: '1001',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'short_market_id',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择市场' }];
    },
  },
  {
    label: '月份',
    field: 'monthCol',
    component: 'JDictSelectTag',
    defaultValue: '2024-11',
    componentProps: {
      options: (() => {
        const now = new Date();
        const months = [];
        for (let i = 1; i <= 24; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          months.push({ label: value, value });
        }
        return months;
      })(),
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择月份!' }];
    },
  },
  {
    label: '间数(商位)',
    field: 'boothRoomNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入间数(商位)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '间数(配套)',
    field: 'matchRoomNumTd',
    component: 'InputNumber',
    dynamicRules: () => {
      return [
        { required: true, message: '请输入间数(配套)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '已出租间数(商位+配套)',
    field: 'boothMatchRentRoomNum1d',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入已出租间数(商位+配套)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '面积(商位)㎡',
    field: 'boothAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入面积(商位)㎡!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '面积(配套)㎡',
    field: 'matchAreaNumTd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入面积(配套)㎡!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '已出租面积(商位+配套)㎡',
    field: 'boothMatchRentAreaNum1d',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入已出租面积(商位+配套)㎡!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '人流',
    field: 'marketBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入人流(人次)!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '车流',
    field: 'carEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入车流(人次)!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '外商',
    field: 'foreignBuyerEntrNum1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入外商(人次)!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '开门率',
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
    label: '市场成交额',
    field: 'marketGmv1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入市场成交额(亿)!' },
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
    label: '商位转让均价',
    field: 'marketTransferPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转让均价(万元)!' },
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
    label: '商位转租均价',
    field: 'marketRentPriceAvg1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转租均价(万元)!' },
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
    label: '商位质押总金额',
    field: 'pledgeApplyIncome1m',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位质押总金额(万元)!' },
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
    label: '本年入场资格费收入',
    field: 'entryQualificationIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年入场资格费收入(万元)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本年续租户数',
    field: 'renewLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租户数(户)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年退租户数',
    field: 'surrenderLeaseHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年退租户数(户)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年到期户数',
    field: 'expiredHoldsNumSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年到期户数(户)!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '本年续租收入',
    field: 'renewLeaseIncomeSd',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租收入(万元)!' },
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
