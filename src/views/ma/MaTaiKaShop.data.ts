import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '活动编号',
    align:"center",
    dataIndex: 'activeId'
   },
   {
    title: '店铺所属市场',
    align:"center",
    dataIndex: 'marketName'
   },
   {
    title: '店铺编号',
    align:"center",
    dataIndex: 'shopId'
   },
   {
    title: '店铺名称',
    align:"center",
    dataIndex: 'shopName'
   },
   {
    title: '商铺编号数组，逗号分隔',
    align:"center",
    dataIndex: 'boothIdArr'
   },
   {
    title: '商铺号数组，逗号分隔',
    align:"center",
    dataIndex: 'boothNoArr'
   },
   {
    title: '店铺台卡微信二维码ticket',
    align:"center",
    dataIndex: 'qrCodeTicket'
   },
   {
    title: '店铺台卡微信二维码链接',
    align:"center",
    dataIndex: 'qrCodeUrl'
   },
   {
    title: '微信公众号带参数二维码实际指向地址',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: '台卡状态',
    align:"center",
    dataIndex: 'status'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '活动编号',
    field: 'activeId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入活动编号!'},
          ];
     },
  },
  {
    label: '店铺所属市场',
    field: 'marketName',
    component: 'Input',
  },
  {
    label: '店铺编号',
    field: 'shopId',
    component: 'Input',
  },
  {
    label: '店铺名称',
    field: 'shopName',
    component: 'Input',
  },
  {
    label: '商铺编号数组，逗号分隔',
    field: 'boothIdArr',
    component: 'Input',
  },
  {
    label: '商铺号数组，逗号分隔',
    field: 'boothNoArr',
    component: 'Input',
  },
  {
    label: '店铺台卡微信二维码ticket',
    field: 'qrCodeTicket',
    component: 'Input',
  },
  {
    label: '店铺台卡微信二维码链接',
    field: 'qrCodeUrl',
    component: 'Input',
  },
  {
    label: '微信公众号带参数二维码实际指向地址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '台卡状态',
    field: 'status',
    component: 'InputNumber',
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