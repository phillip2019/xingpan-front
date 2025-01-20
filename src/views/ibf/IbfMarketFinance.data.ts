import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { checkUnique } from './IbfMarketFinance.api';
import { message } from 'ant-design-vue';
import { toRaw } from 'vue';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
const loginInfo = toRaw(userStore.getLoginInfo) || {};
const tenantList = loginInfo?.tenantList ?? [];
const shortMarketIdList: { label: string; value: string }[] = [];
for (let item of tenantList as any[]) {
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
  },
  {
    title: '月份',
    align: 'center',
    sorter: true,
    dataIndex: 'monthCol',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'isPublish',
    slots: { customRender: 'isPublish' },
    helpMessage: '大屏发布数据状态，分为3个状态，0 校准, 1 发布，2 已过期；若是发布状态，则当前正在大屏显示中!',
  },
  {
    title: '本期收入',
    helpMessage: '本期收入，单位万元',
    // 数值右对齐
    align: 'right',
    sorter: true,
    dataIndex: 'curPeriodIncome1m',
    customRender: ({ text }) => {
      return `${text}万`;
    },
  },
  {
    title: '本期营收',
    helpMessage: '本期营收，单位万元',
    align: 'right',
    sorter: true,
    dataIndex: 'turnoverIncomeSd',
    customRender: ({ text }) => {
      return `${text}万`;
    },
  },
  {
    title: '本年目标营收',
    helpMessage: '本年目标营收，单位万元',
    align: 'right',
    sorter: true,
    dataIndex: 'targetTurnoverIncomeSd',
    customRender: ({ text }) => {
      return `${text}万`;
    },
  },
  {
    title: '本期利润',
    helpMessage: '本期利润，单位万元',
    align: 'right',
    sorter: true,
    dataIndex: 'accumulateProfitIncomeSd',
    customRender: ({ text }) => {
      return `${text}万`;
    },
  },
  {
    title: '本年目标利润',
    helpMessage: '本年目标利润，单位万元',
    align: 'right',
    sorter: true,
    dataIndex: 'targetProfitIncomeSd',
    customRender: ({ text }) => {
      return `${text}万`;
    },
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
    title: '修改人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
  },
  {
    title: '修改时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectInput',
    componentProps: {
      // dictCode: 'finance_short_market_id',
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
    helpMessage: '创建人，记录创建人',
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
    helpMessage: '创建人，记录更新人',
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
    component: 'JDictSelectTag',
    componentProps: ({ formActionType, formModel }) => {
      const { setFieldsValue } = formActionType;
      return {
        // dictCode: 'finance_short_market_id',
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
    colProps: { span: 12 },
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
              }
            } catch (error) {
              console.error('唯一性校验失败:', error);
            }
          }
        },
      };
    },
    colProps: { span: 12 },
    helpMessage: '所属年月，记录所属年月',
    dynamicRules: () => {
      return [{ required: true, message: '请选择月份，格式为yyyy-MM!' }];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '收入',
    colProps: { span: 24 },
  },
  {
    label: '本期收入',
    field: 'curPeriodIncome1m',
    component: 'InputNumber',
    colProps: { span: 12 },
    helpMessage: [
      '数据口径：',
      '所选自然月起止日发生的收入资金流水。',
      '单位：',
      '万元，精确到2位小数',
      '统计周期：',
      '所属年月的起止日期。其中1月为上月16日至1月31日；12月为12月1日至12月15日。',
      '例：所属年月2024年11月，则只统计2024/11/01-2024/11/30期间发生的收入',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期收入(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本期营收',
    field: 'turnoverIncomeSd',
    component: 'InputNumber',
    colProps: { span: 12 },
    helpMessage: [
      '数据口径：',
      '经确认的营业收入。',
      '单位：',
      '万元，精确到2位小数',
      '统计周期：',
      '所属年月的起止日期。其中1月为上月16日至1月31日；12月为12月1日至12月15日。',
      '例：所属年月2024年11月，则只统计2024/11/01-2024/11/30期间结转的营收。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期营收(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本年目标营收',
    field: 'targetTurnoverIncomeSd',
    component: 'InputNumber',
    colProps: { span: 12 },
    helpMessage: ['数据口径：', '本年目标营业收入，来自于业绩指标合同', '单位：', '万元，精确到2位小数', '统计周期：', '上年12月16日至本年12月15日'],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年目标营收(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本期利润',
    field: 'accumulateProfitIncomeSd',
    component: 'InputNumber',
    colProps: { span: 12 },
    helpMessage: [
      '数据口径：',
      '经确认的利润。',
      '单位：',
      '万元，精确到2位小数',
      '统计周期：',
      '所属年月的起止日期。其中1月为上月16日至1月31日；12月为12月1日至12月15日截止',
      '例：所属年月2024年11月，则只统计2024/11/01-2024/11/30期间产生的利润',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本期利润(万)!' },
        { pattern: /^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '本年目标利润',
    field: 'targetProfitIncomeSd',
    component: 'InputNumber',
    colProps: { span: 12 },
    helpMessage: ['数据口径：', '本年本年目标利润，来自于业绩指标合同', '单位：', '万元，精确到2位小数', '统计周期：', '上年12月16日至本年12月15日'],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入本年目标利润(万)!' },
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
  // 默认和原表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
