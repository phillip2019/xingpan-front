import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { checkUnique } from './IbfMarketResource.api';
import { message } from 'ant-design-vue';
import { useUserStore } from '/@/store/modules/user';
import { toRaw } from 'vue';
const userStore = useUserStore();
const loginInfo = toRaw(userStore.getLoginInfo) || {};
const tenantList = loginInfo?.tenantList ?? [];
const shortMarketIdList: { label: string; value: string }[] = [];
for (const item of tenantList as any[]) {
  const label = item.name;
  const value = item.id;
  shortMarketIdList.push({ label: label, value: value });
}

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
    align: 'right',
    sorter: true,
    dataIndex: 'boothRoomNumTd',
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}间` : ''),
  },
  {
    title: '间数(配套)',
    align: 'right',
    sorter: true,
    dataIndex: 'matchRoomNumTd',
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}间` : ''),
  },
  {
    title: '已出租间数(商位+配套)',
    align: 'right',
    sorter: true,
    dataIndex: 'boothMatchRentRoomNum1d',
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '其中配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末',
      '统计期是上月21日至当月20日',
      '例：所属年月选择了2024/11，则统计11月20日23:59:59这个时间点的数据',
    ],
  },
  {
    title: '面积(商位)㎡',
    align: 'right',
    sorter: true,
    dataIndex: 'boothAreaNumTd',
    helpMessage: [
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}㎡` : ''),
  },
  {
    title: '面积(配套)㎡',
    align: 'right',
    sorter: true,
    dataIndex: 'matchAreaNumTd',
    helpMessage: [
      '数据口径：',
      '配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：㎡，精确到2位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}㎡` : ''),
  },
  {
    title: '已出租面积(商位+配套)㎡',
    align: 'right',
    sorter: true,
    dataIndex: 'boothMatchRentAreaNum1d',
    helpMessage: [
      '数据口径：',
      '其中配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：㎡，精确到2位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '资源统计日期',
    align: 'right',
    sorter: true,
    dataIndex: 'resourceStatisticsDate',
    helpMessage: '资源情况统计日期',
  },
  {
    title: '商位使用权人数',
    align: 'right',
    sorter: true,
    dataIndex: 'boothOwnerNum',
    helpMessage: [
      '数据口径：',
      '按照商位系统使用权人关联表中按照使用权人身份证号去重统计，排除海城市场',
      '单位：',
      '人',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '实际经营人数',
    align: 'center',
    sorter: true,
    dataIndex: 'boothOperatorNum',
    helpMessage: [
      '数据口径：',
      '按照商位系统经营权人经营记录统计 ，按照经营权人身份证号去重统计，排除海城市场',
      '单位：',
      '人',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '商人统计日期',
    align: 'center',
    sorter: true,
    dataIndex: 'merchantStatisticsDate',
    helpMessage: '商人统计日期，格式yyyy-MM-dd',
  },
  {
    title: '本年招商间数',
    align: 'right',
    sorter: true,
    dataIndex: 'invstRoomNumSd',
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位算1,II型商位算0.5）',
      '单位：',
      '间',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}间` : ''),
  },
  {
    title: '当前空置间数',
    align: 'right',
    sorter: true,
    dataIndex: 'emptyBoothRoomNumTd',
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位算1,II型商位算0.5）',
      '单位：',
      '间',
      '统计时间：',
      '在1-10月，按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年10月，即统计本年10月20日最后一秒这个时间点的数据。',
      '在11-12月，都只统计到11月15日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '出租率统计日期',
    align: 'right',
    sorter: true,
    dataIndex: 'remainRentRateStatisticsDate',
    helpMessage: '剩余商位出租率统计日期，格式yyyy-MM-dd',
  },
  {
    title: '续租统计日期',
    align: 'center',
    sorter: true,
    dataIndex: 'renewLeaseRateStatisticsDate',
    helpMessage: '续租完成率统计日期',
  },
  {
    title: '市场成交额',
    align: 'right',
    sorter: true,
    dataIndex: 'marketGmv1m',
    helpMessage: [
      '数据口径：',
      '人工填报，从求实获取',
      '单位：',
      '亿元，精确到2位小数',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日发生的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}亿元` : ''),
  },
  {
    title: '商位转让笔数',
    align: 'right',
    sorter: true,
    dataIndex: 'marketTransferNum1m',
    helpMessage: [
      '数据口径：',
      '市场商位转让商位笔数，不含直系亲属转让、转赠的商位使用权变更的情况',
      '单位：',
      '笔',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    customRender: ({ text }) => (text ? `${text}笔` : ''),
  },
  {
    title: '商位转让均价',
    align: 'right',
    sorter: true,
    dataIndex: 'marketTransferPriceAvg1m',
    helpMessage: [
      '数据口径：',
      '转让总金额/转让总面积',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    customRender: ({ text }) => (text ? `${text}元` : ''),
  },
  {
    title: '商位转租笔数',
    align: 'right',
    sorter: true,
    dataIndex: 'marketRentNum1m',
    helpMessage: [
      '数据口径：',
      '市场商位转租商位笔数',
      '单位：',
      '笔',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
  },
  {
    title: '商位转租均价',
    align: 'right',
    sorter: true,
    dataIndex: 'marketRentPriceAvg1m',
    helpMessage: [
      '数据口径：',
      '转租总金额/转租总面积，排除转租金额为0的数据',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
  },
  {
    title: '商位质押笔数',
    align: 'right',
    sorter: true,
    dataIndex: 'pledgeApplyNum1m',
    helpMessage: [
      '数据口径：',
      '市场商位质押笔数，统计质押申请的。',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月的上月21日至当月20日',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
  },
  {
    title: '商位质押总金额',
    align: 'right',
    sorter: true,
    dataIndex: 'pledgeApplyIncome1m',
    helpMessage: [
      '数据口径：',
      '市场商位质押总金额，统计质押申请的。',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '所属年月的上月21日至当月20日',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
  },
  {
    title: '商位普通装修笔数',
    align: 'right',
    sorter: true,
    dataIndex: 'normalRenovationNum1m',
    helpMessage: [
      '数据口径：',
      '市场商位申请普通装修笔数',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月自然月内起止期内发生的。',
      '//例，所属年月选择了2024/11，则统计11/1-11/30发生的数据。',
    ],
  },
  {
    title: '商位个性化装修笔数',
    align: 'right',
    sorter: true,
    dataIndex: 'specialRenovationNum1m',
    helpMessage: [
      '数据口径：',
      '市场商位申请个性化装修笔数',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月自然月内起止期内发生的。',
      '//例，所属年月选择了2024/11，则统计11/1-11/30发生的数据。',
    ],
  },
  {
    title: '本年招商户数',
    align: 'right',
    sorter: true,
    dataIndex: 'invstHoldsNumSd',
    helpMessage: [
      '数据口径：',
      '招商条目中，A或B摊都算1户，间数大于1的，则按大于1的算户数',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    customRender: ({ text }) => (text ? `${text}户` : ''),
  },
  {
    title: '当前空置户数',
    align: 'right',
    sorter: true,
    dataIndex: 'emptyBoothHoldsNumTd',
    helpMessage: [
      '数据口径：',
      'A或B摊都算1户，间数大于1的，则按大于1的算户数',
      '单位：',
      '户',
      '统计时间：',
      '在1-10月，按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年10月，即统计本年10月20日最后一秒这个时间点的数据。',
      '在11-12月，都只统计到11月15日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '本年入场资格费收入',
    align: 'right',
    sorter: true,
    dataIndex: 'entryQualificationIncomeSd',
    helpMessage: [
      '数据口径：',
      '商位+配套用房，本年新主体入驻商户缴纳的入场资格费和拍卖费合计',
      '单位：',
      '万元，精确到2位小数',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '本年续租户数',
    align: 'right',
    sorter: true,
    dataIndex: 'renewLeaseHoldsNumSd',
    helpMessage: [
      '数据口径：',
      '本年续租户数，续租批次中已完成的户数，若A摊位或B摊位都算1户，若条目中商位间数大于1，则按大于1的间数算户数。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '本年退租户数',
    align: 'right',
    sorter: true,
    dataIndex: 'surrenderLeaseHoldsNumSd',
    helpMessage: [
      '数据口径：',
      '本年退租户数。若A摊位或B摊位都算1户，若条目中商位间数大于1，则按大于1的间数算户数。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '本年到期户数',
    align: 'right',
    sorter: true,
    dataIndex: 'expiredHoldsNumSd',
    helpMessage: [
      '数据口径：',
      '本年租赁费用到期的户数，若A摊或B摊都算1户，若条目中商位间数大于1，则按大于1的间数算户数商位+配套。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '本年续租收入',
    align: 'right',
    sorter: true,
    dataIndex: 'renewLeaseIncomeSd',
    helpMessage: [
      '数据口径：',
      '商位+配套用房，下一轮租赁中完成续租缴费的金额合计',
      '单位：',
      '万元，精确到2位小数',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
    helpMessage: '创建人,记录创建人',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    helpMessage: '创建时间，记录创建时间',
  },
  {
    title: '修改人',
    align: 'center',
    dataIndex: 'updateBy',
    helpMessage: '修改人，记录修改人',
  },
  {
    title: '修改时间',
    align: 'center',
    dataIndex: 'updateTime',
    helpMessage: '修改时间，记录修改时间',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectInput',
    componentProps: {
      // dictCode: 'short_market_id',
      options: (() => {
        return shortMarketIdList;
      })(),
    },
    colProps: { span: 6 },
  },
  {
    label: '月份',
    field: 'monthCol',
    component: 'JDictSelectTag',
    componentProps: {
      options: (() => {
        const now = new Date();
        const months: { label: string; value: string }[] = [];
        for (let i = 0; i <= 24; i++) {
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
    field: 'divider-basic',
    component: 'Divider',
    label: '',
    colProps: { span: 24 },
  },
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectInput',
    componentProps: ({ formActionType, formModel }) => {
      const { setFieldsValue } = formActionType;
      return {
        // dictCode: 'short_market_id',
        options: (() => {
          return shortMarketIdList;
        })(),
        disabled: formModel.id ? true : false,
        onChange: async (e) => {
          if (!e) return;
          // 重置表单数据
          const resetData = {};
          Object.keys(formModel).forEach((key) => {
            if (!['shortMarketId'].includes(key)) {
              resetData[key] = undefined;
            }
          });
          setFieldsValue(resetData);
        },
      };
    },
    helpMessage: '市场，记录市场',
    dynamicRules: () => {
      return [{ required: true, message: '请选择市场!' }];
    },
  },
  {
    label: '月份',
    field: 'monthCol',
    component: 'JDictSelectTag',
    componentProps: ({ formActionType, formModel }) => {
      const { setFieldsValue } = formActionType;
      return {
        disabled: formModel.id ? true : false,
        options: (() => {
          const now = new Date();
          const months = [];
          for (let i = 0; i <= 24; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            months.push({ label: value, value });
          }
          return months;
        })(),
        onChange: async (e) => {
          if (!e) return;
          // 重置表单数据
          const resetData = {};
          Object.keys(formModel).forEach((key) => {
            if (!['shortMarketId', 'monthCol'].includes(key)) {
              resetData[key] = undefined;
            }
          });
          setFieldsValue(resetData);

          // 获取非proxyObject的formModel
          const formModelWithoutProxy = JSON.parse(JSON.stringify(formModel));
          // 只在有市场和月份时进行唯一性校验
          if (
            formModelWithoutProxy.shortMarketId &&
            formModelWithoutProxy.monthCol &&
            typeof formModelWithoutProxy.monthCol === 'string' &&
            typeof formModelWithoutProxy.shortMarketId === 'string'
          ) {
            try {
              const result = await checkUnique(formModelWithoutProxy);
              // 如果返回了数据，说明记录已存在
              if (result && typeof result === 'object') {
                // 使用返回的数据填充表单，包括id字段
                setFieldsValue(result);
                // 提示用户
                message.warning(`该市场在${formModel.monthCol}月份已有记录`);
              } else {
                // 设置日期
                setFieldsValue({
                  resourceStatisticsDate: `${e}-20`,
                  merchantStatisticsDate: `${e}-20`,
                  remainRentRateStatisticsDate: `${e}-20`,
                  renewLeaseRateStatisticsDate: `${e}-20`,
                });
              }
            } catch (error) {
              console.error('唯一性校验失败:', error);
            }
          }
        },
      };
    },
    helpMessage: '所属年月，记录所属年月',
    dynamicRules: () => {
      return [{ required: true, message: '请选择月份，格式为yyyy-MM!' }];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '资源情况',
    colProps: { span: 24 },
  },
  {
    label: '间数(商位)',
    field: 'boothRoomNumTd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '间',
    },
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入间数(商位)!' },
        { pattern: /^-?\d+\.?\d{0,1}$/, message: '请输入数字，最多1位小数!' },
      ];
    },
  },
  {
    label: '间数(配套)',
    field: 'matchRoomNumTd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '间',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入间数(配套)!' },
        { pattern: /^-?\d+\.?\d{0,1}$/, message: '请输入数字，最多1位小数!' },
      ];
    },
  },
  {
    label: '已出租间数',
    field: 'boothMatchRentRoomNum1d',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    colProps: {
      span: 12,
    },
    componentProps: {
      suffix: '间',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位间数大于1的，则按大于1的间数计算；II型商位算0.5）',
      '其中配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末',
      '统计期是上月21日至当月20日',
      '例：所属年月选择了2024/11，则统计11月20日23:59:59这个时间点的数据',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入已出租间数(商位+配套)!' },
        { pattern: /^-?\d+\.?\d{0,1}$/, message: '请输入数字，最多1位小数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '',
    colProps: { span: 12 },
  },
  {
    label: '面积(商位)',
    field: 'boothAreaNumTd',
    slot: 'InputNumberSlot',
    colProps: {
      span: 12,
    },
    component: 'InputNumber',
    componentProps: {
      suffix: '㎡',
      style: { width: '100%' },
    },
    helpMessage: [
      '单位：间，精确到1位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入面积(商位)!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    label: '面积(配套)',
    field: 'matchAreaNumTd',
    slot: 'InputNumberSlot',
    component: 'InputNumber',
    componentProps: {
      suffix: '㎡',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：㎡，精确到2位小数',
      '统计时间：',
      '所属年月在统计意义上的月末。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入面积(配套)!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    label: '已出租面积',
    field: 'boothMatchRentAreaNum1d',
    slot: 'InputNumberSlot',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    componentProps: {
      suffix: '㎡',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '其中配套，包含配套用房系统中的配套用房和配套设施场地',
      '单位：㎡，精确到2位小数',
      '统计时间：',
      '所属年月在统计意义上的月末',
      '统计期是上月21日至当月20日',
      '例：所属年月选择了2024/11，则统计11月20日23:59:59这个时间点的数据',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入已出租面积(商位+配套)!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '商人数量',
    colProps: { span: 24 },
  },
  {
    label: '商位使用权人数',
    field: 'boothOwnerNum',
    slot: 'InputNumberSlot',
    component: 'InputNumber',
    componentProps: {
      suffix: '人',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '按照商位系统使用权人关联表中按照使用权人身份证号去重统计，排除海城市场',
      '单位：',
      '人',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位使用权人数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '实际经营人数',
    field: 'boothOperatorNum',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '人',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '按照商位系统经营权人经营记录统计 ，按照经营权人身份证号去重统计，排除海城市场',
      '单位：',
      '人',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计11月20日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入实际经营人数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '市场招商',
    colProps: { span: 24 },
  },
  {
    label: '本年招商间数',
    field: 'invstRoomNumSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '间',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位算1,II型商位算0.5）',
      '单位：',
      '间',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: () => {
      return [
        { required: true, message: '请输入本年招商间数!' },
        { pattern: /^-?\d+\.?\d{0,1}$/, message: '请输入数字，最多1位小数!' },
      ];
    },
  },
  {
    label: '当前空置间数',
    field: 'emptyBoothRoomNumTd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '间',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      'AB摊算1间（I型商位算1,II型商位算0.5）',
      '单位：',
      '间',
      '统计时间：',
      '在1-10月，按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年10月，即统计本年10月20日最后一秒这个时间点的数据。',
      '在11-12月，都只统计到11月15日最后一秒这个时间点的数据。',
    ],
    dynamicRules: () => {
      return [
        { required: true, message: '请输入当前空置间数!' },
        { pattern: /^-?\d+\.?\d{0,1}$/, message: '请输入数字，最多1位小数!' },
      ];
    },
  },
  {
    label: '本年招商户数',
    field: 'invstHoldsNumSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '户',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '招商条目中，A或B摊都算1户，间数大于1的，则按大于1的算户数',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年招商户数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '当前空置户数',
    field: 'emptyBoothHoldsNumTd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '户',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      'A或B摊都算1户，间数大于1的，则按大于1的算户数',
      '单位：',
      '户',
      '统计时间：',
      '在1-10月，按所属年月在统计意义上的月末进行统计。',
      '统计期是上月21日至当月20日。',
      '//例，所属年月选择了2024年10月，即统计本年10月20日最后一秒这个时间点的数据。',
      '在11-12月，都只统计到11月15日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入当前空置户数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '本年入场资格费',
    field: 'entryQualificationIncomeSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '万元',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '商位+配套用房，本年新主体入驻商户缴纳的入场资格费和拍卖费合计',
      '单位：',
      '万元，精确到2位小数',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年入场资格费收入!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '市场续租',
    colProps: { span: 24 },
  },
  {
    label: '本年续租户数',
    field: 'renewLeaseHoldsNumSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '户',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '本年续租户数，续租批次中已完成的户数，若A摊位或B摊位都算1户，若条目中商位间数大于1，则按大于1的间数算户数。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租户数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '本年退租户数',
    field: 'surrenderLeaseHoldsNumSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '户',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '本年退租户数。若A摊位或B摊位都算1户，若条目中商位间数大于1，则按大于1的间数算户数。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年退租户数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '本年到期户数',
    field: 'expiredHoldsNumSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '户',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '本年租赁费用到期的户数，若A摊或B摊都算1户，若条目中商位间数大于1，则按大于1的间数算户数商位+配套。',
      '单位：',
      '户',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年到期户数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '本年续租收入',
    field: 'renewLeaseIncomeSd',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '万元',
      style: {
        width: '100%',
      },
    },
    helpMessage: [
      '数据口径：',
      '商位+配套用房，下一轮租赁中完成续租缴费的金额合计',
      '单位：万元，精确到2位小数',
      '统计时间：',
      '按所属年月在统计意义上的月末进行统计。',
      '1月是统计本年1月1日至1月20日最后一秒这个时间点的最新数据；',
      '2-11月是统计上月21日至当月20日。',
      '//例，所属年月选择了2024年11月，即统计本年累计至11月20日最后一秒这个时间点的数据。',
      '在12月，按所属年月在自然月意义上的月末进行统计。',
      '//例，所属年月选择了2024年12月，即统计本年累计至12月31日最后一秒这个时间点的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年续租收入!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '商位转租、转让、质押、装修',
    colProps: { span: 24 },
  },
  {
    label: '商位转让笔数',
    field: 'marketTransferNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '笔',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位转让商位笔数，不含直系亲属转让、转赠的商位使用权变更的情况',
      '单位：',
      '笔',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
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
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '万元',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '转让总金额/转让总面积',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转让均价!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    label: '商位转租笔数',
    field: 'marketRentNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '笔',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位转租商位笔数',
      '单位：',
      '笔',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
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
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '万元',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '转租总金额/转租总面积，排除转租金额为0的数据',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '统计意义上的月起止日期',
      '所属年月的上月21日至当月20日。',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入商位转租均价!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    label: '商位质押笔数',
    field: 'pledgeApplyNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '笔',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位质押笔数，统计质押申请的。',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月的上月21日至当月20日',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    dynamicRules: ({ model }) => {
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
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '元',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位质押总金额，统计质押申请的。',
      '单位：',
      '元，精确到2位小数',
      '统计周期：',
      '所属年月的上月21日至当月20日',
      '//例，所属年月选择了2024/11，则11月的统计周期为2024/10/21-2024/11/20。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入商位质押总金额!' },
        { pattern: /^-?\d+\.?\d{0,2}$/, message: '请输入数字，最多2位小数!' },
      ];
    },
  },
  {
    label: '普通装修笔数',
    field: 'normalRenovationNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '笔',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位申请普通装修笔数',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月自然月内起止期内发生的。',
      '//例，所属年月选择了2024/11，则统计11/1-11/30发生的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入商位普通装修笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '个性化装修笔数',
    field: 'specialRenovationNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '笔',
      style: { width: '100%' },
    },
    helpMessage: [
      '数据口径：',
      '市场商位申请个性化装修笔数',
      '单位：',
      '笔',
      '统计周期：',
      '所属年月自然月内起止期内发生的。',
      '//例，所属年月选择了2024/11，则统计11/1-11/30发生的数据。',
    ],
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: '请输入商位个性化装修笔数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
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
  // 默认和原表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
