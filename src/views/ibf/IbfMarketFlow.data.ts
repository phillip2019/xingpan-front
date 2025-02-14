import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { checkUnique } from './IbfMarketFlow.api';
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
    helpMessage: '市场，记录市场',
    sorter: true,
    dataIndex: 'shortMarketId_dictText',
  },
  {
    title: '日期',
    align: 'center',
    sorter: true,
    dataIndex: 'dateCol',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
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
    title: '日人流量',
    align: 'right',
    sorter: true,
    dataIndex: 'marketBuyerEntrNum1d',
    helpMessage: '日人流量，记录日人流量，单位人次',
  },
  {
    title: '日车流量',
    align: 'right',
    sorter: true,
    dataIndex: 'carEntrNum1d',
    helpMessage: '日车流量，记录日车流量，单位车次',
  },
  {
    title: '日开门率',
    align: 'right',
    sorter: true,
    dataIndex: 'boothOpeningRate1d',
    helpMessage: '日开门率，记录日开门率开门的商位数/出租的商位数，按照商位号去重，AB摊位算1个',
    customRender: ({ text }) => {
      if (!text && text !== 0) return '';
      return `${text.toFixed(2)}%`;
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
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'shortMarketId',
    component: 'JSelectInput',
    helpMessage: '市场，记录市场，请选择市场',
    componentProps: {
      // dictCode: 'short_market_id',
      options: (() => {
        return shortMarketIdList;
      })(),
    },
    colProps: { span: 6 },
  },
  {
    label: '日期',
    field: 'dateCol',
    helpMessage: '日期，记录日期，格式yyyy-MM-dd',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      valueFormat: 'YYYY-MM-DD',
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
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
    colProps: { span: 12 },
    helpMessage: '市场，记录市场',
    dynamicRules: () => {
      return [{ required: true, message: '请选择市场!' }];
    },
  },
  {
    label: '日期',
    field: 'dateCol',
    component: 'DatePicker',
    componentProps: ({ formActionType, formModel }) => {
      if (!formActionType) return;
      const { setFieldsValue } = formActionType;
      return {
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        disabled: formModel.id ? true : false,
        onChange: async (dateCol) => {
          // console.log(formModel);
          // 添加日志查看选择的日期
          console.log('选择的日期:', dateCol);
          if (!dateCol) return;
          // 获取非proxyObject的formModel
          const formModelWithoutProxy = JSON.parse(JSON.stringify(formModel));
          formModelWithoutProxy.dateCol = dateCol;
          console.log(formModelWithoutProxy);
          // 只在有市场和日期时进行唯一性校验
          if (
            formModelWithoutProxy.shortMarketId &&
            formModelWithoutProxy.dateCol &&
            typeof formModelWithoutProxy.dateCol === 'string' &&
            typeof formModelWithoutProxy.shortMarketId === 'string'
          ) {
            try {
              const result = await checkUnique(formModelWithoutProxy);
              // 如果返回了数据，说明记录已存在
              if (result && typeof result === 'object') {
                // 使用返回的数据填充表单，包括id字段
                setFieldsValue(result);
                // 提示用户
                message.warning(`该市场在${formModelWithoutProxy.dateCol}已有记录`);
              }
            } catch (error) {
              console.error('唯一性校验失败:', error);
            }
          }
        },
      };
    },
    colProps: { span: 12 },
    helpMessage: '日期，记录日期，格式yyyy-MM-dd',
    dynamicRules: () => {
      return [{ required: true, message: '请输入日期 yyyy-MM-dd!' }];
    },
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '每日数据',
    colProps: { span: 24 },
  },
  {
    label: '日人流量',
    field: 'marketBuyerEntrNum1d',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '人次',
      style: {
        width: '100%',
      },
    },
    colProps: { span: 12 },
    helpMessage: ['数据口径：', '当日人次，市场摄像头监测', '单位：', '人次', '统计周期：', '当日自然日内'],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入日人流量!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '日车流量',
    field: 'carEntrNum1d',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '车次',
      style: {
        width: '100%',
      },
    },
    colProps: { span: 12 },
    helpMessage: ['数据口径：', '当日车次，按车辆进入次数统计', '单位：', '车次', '统计周期：', '当日自然日内'],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入日车流量!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: '日开门率',
    field: 'boothOpeningRate1d',
    component: 'InputNumber',
    slot: 'InputNumberSlot',
    componentProps: {
      suffix: '%',
      style: {
        width: '100%',
      },
    },
    colProps: { span: 12 },
    helpMessage: [
      '数据口径：',
      '开门率=有用电的商位总数/各市场去重的有使用权人的商位数(AB摊位算一间商位)。',
      '单位：',
      '% ，精确到4位小数',
      '//例，99.99%，请填写99.99',
      '统计周期：',
      '当日自然日内',
    ],
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入日开门率!' },
        {
          pattern: /^(0|[0-9]{1,2}(\.\d{1,4})?|100)$/,
          message: '请输入0-100之间的数字，最多4位小数!',
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
