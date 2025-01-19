import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '年份',
    align: 'center',
    dataIndex: 'year',
    helpMessage: '大屏发布数据所属年份',
  },
  {
    title: '月份',
    align: 'center',
    dataIndex: 'monthCol',
    helpMessage: '大屏发布数据所属月份',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'isPublish',
    slots: { customRender: 'isPublish' },
    helpMessage: '大屏发布数据状态，分为3个状态，0 校准, 1 发布，2 已过期；若是发布状态，则当前正在大屏显示中!',
  },
  {
    title: '统计开始日期',
    align: 'center',
    dataIndex: 'statStartDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '统计结束日期',
    align: 'center',
    dataIndex: 'statEndDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
    helpMessage: '统计结束日期',
  },

  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    helpMessage: '大屏发布数据备注',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
    helpMessage: '创建人，记录创建人',
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
    label: '状态',
    field: 'isPublish',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'is_publish',
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
    label: '年份',
    field: 'year',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入年份!' }];
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
    label: '统计开始日期',
    field: 'statStartDate',
    component: 'DatePicker',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入统计开始日期!' }];
    },
  },
  {
    label: '统计结束日期',
    field: 'statEndDate',
    component: 'DatePicker',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入统计结束日期!' }];
    },
  },
  {
    label: '发布状态',
    field: 'isPublish',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'is_publish',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入发布状态: 0 校准中, 1 已发布!' }];
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
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
