import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '点位编号',
    align: 'center',
    sorter: true,
    dataIndex: 'positionNo',
  },
  {
    title: '类型',
    align: 'center',
    sorter: true,
    dataIndex: 'positionType',
    customRender: ({ text }) => filterDictTextByCache('position_type', text),
  },
  {
    title: '点位序号',
    align: 'center',
    sorter: true,
    dataIndex: 'seqNo',
  },
  {
    title: '活动编号',
    align: 'center',
    sorter: true,
    dataIndex: 'activeId',
  },
  {
    title: '市场',
    align: 'center',
    sorter: true,
    dataIndex: 'marketName',
  },
  {
    title: '楼层',
    align: 'center',
    sorter: true,
    dataIndex: 'floor',
  },
  {
    title: '二维码',
    align: 'center',
    dataIndex: 'qrCodeUrl',
    customRender: render.renderBigImage,
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    slots: { customRender: 'status' },
    dataIndex: 'status',
  },
  {
    title: '管理员账号',
    align: 'center',
    sorter: true,
    dataIndex: 'ownerAccount',
  },
  {
    title: '管理员姓名',
    align: 'center',
    sorter: true,
    dataIndex: 'ownerName',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '市场',
    field: 'marketName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'market_name',
      placeholder: '请选择市场',
      stringToNumber: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '楼层',
    field: 'floor',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'floor',
      placeholder: '请选择市场类型',
      stringToNumber: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '点位编号',
    field: 'positionNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位类型',
    field: 'positionType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'position_type',
      placeholder: '请选择点位类型',
      stringToNumber: false,
    },
    colProps: { span: 6 },
  },
  {
    label: '点位序号',
    field: 'seqNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '活动编号',
    field: 'activeId',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位管理员账号',
    field: 'ownerAccount',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位管理员姓名',
    field: 'ownerName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '点位状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '点位编号',
    field: 'positionNo',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位编号!' }];
    },
  },
  {
    label: '点位类型',
    field: 'positionType',
    defaultValue: 'ylb',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'position_type',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位类型!' }];
    },
  },
  {
    label: '点位序号',
    field: 'seqNo',
    component: 'Input',
  },
  {
    label: '活动编号',
    field: 'activeId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入活动编号!' }];
    },
  },
  {
    label: '点位所属市场',
    field: 'marketName',
    component: 'Input',
  },
  {
    label: '点位所属楼层',
    field: 'floor',
    component: 'Input',
  },
  {
    label: '点位管理员账号',
    field: 'ownerAccount',
    component: 'Input',
  },
  {
    label: '点位管理员姓名',
    field: 'ownerName',
    component: 'Input',
  },
  {
    label: '点位微信二维码ticket',
    field: 'qrCodeTicket',
    component: 'Input',
  },
  {
    label: '点位微信二维码链接',
    field: 'qrCodeUrl',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '点位状态',
    field: 'status',
    defaultValue: 'enable',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入点位状态!' }];
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'DatePicker',
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
