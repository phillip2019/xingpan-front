import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useUserStore } from '/@/store/modules/user';
import { message } from 'ant-design-vue';
import { checkUnique } from './IbfMarketFinance.api';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
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
    title: '确认人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
  },
  {
    title: '确认时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'isPublish',
    slots: { customRender: 'isPublish' },
    helpMessage: '大屏发布数据状态，分为3个状态，0 校准, 1 发布，2 已过期；若是发布状态，则当前正在大屏显示中!',
  },
  {
    title: '人流',
    align: 'right',
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1m',
    helpMessage: [
      '数据口径：',
      '当月的日均人次，市场摄像头监测',
      '单位：',
      '人次',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
  },
  {
    title: '车流',
    align: 'right',
    sorter: true,
    dataIndex: 'carEntrNum1m',
    helpMessage: [
      '数据口径：',
      '当月的日均，按车辆进入次数统计',
      '单位：',
      '车次',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
  },
  {
    title: '外商',
    align: 'right',
    sorter: true,
    dataIndex: 'foreignBuyerEntrNum1m',
    helpMessage: [
      '数据口径：',
      '当月的日均人数，市场采样统计',
      '单位：',
      '人',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
  },
  {
    title: '开门率',
    align: 'right',
    sorter: true,
    dataIndex: 'boothOpeningRate1m',
    helpMessage: [
      '数据口径：',
      '=有用电的商位总数/各市场去重的有使用权人的商位数(AB摊位算一间商位)。',
      '单位：',
      '% ，精确到4位小数',
      '//例，99.99%，请填写0.9999',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
    customRender: ({ text }) => {
      if (!text && text !== 0) return '';
      return `${text.toFixed(2)}%`;
    },
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    helpMessage: '创建时间，记录创建时间',
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
        dictCode: 'short_market_id',
        // options: (() => {
        //   return shortMarketIdList;
        // })(),
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
    colProps: {
      span: 12,
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
    colProps: {
      span: 12,
    },
    helpMessage: '所属年月，记录所属年月',
    dynamicRules: () => {
      return [{ required: true, message: '请选择月份，格式为yyyy-MM!' }];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '流量情况',
    colProps: { span: 24 },
  },
  {
    label: '人流',
    field: 'marketBuyerEntrNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '人次',
      style: {
        width: '100%',
      },
    },
    colProps: {
      span: 12,
    },
    helpMessage: [
      '数据口径：',
      '当月的日均人次，市场摄像头监测',
      '单位：',
      '人次',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
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
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '车次',
      style: {
        width: '100%',
      },
    },
    colProps: {
      span: 12,
    },
    helpMessage: [
      '数据口径：',
      '当月的日均，按车辆进入次数统计',
      '单位：',
      '车次',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入车流(车次)!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '外商',
    field: 'foreignBuyerEntrNum1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '人',
    },
    colProps: {
      span: 12,
    },
    helpMessage: [
      '数据口径：',
      '当月的日均人数，市场采样统计',
      '单位：',
      '人',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入外商人数!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '开门率',
    colProps: { span: 24 },
  },
  {
    label: '开门率',
    field: 'boothOpeningRate1m',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      step: 0.01,
      suffix: '%',
    },
    colProps: {
      span: 12,
    },
    helpMessage: [
      '数据口径：',
      '=有用电的商位总数/各市场去重的有使用权人的商位数(AB摊位算一间商位)。',
      '单位：',
      '% ，精确到4位小数',
      '//例，99.99%，请填写99.99',
      '统计周期：',
      '所属年月自然月的起止日期',
      '//例，所属年月选择了2024年11月，即统计11月1日至11月30日范围的数据。',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入开门率!' },
        {
          pattern: /^(0|[0-9]{1,2}(\.\d{1,4})?|100)$/,
          message: '请输入1-100之间的数字，最多4位小数!',
        },
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
