import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '点位ID',
    align:"center",
    sorter: true,
    dataIndex: 'positionId_dictText'
   },
   {
    title: '点位编号',
    align:"center",
    sorter: true,
    dataIndex: 'positionNo_dictText'
   },
   {
    title: '店铺编号',
    align:"center",
    sorter: true,
    dataIndex: 'shopId_dictText'
   },
   {
    title: '店铺名称',
    align:"center",
    sorter: true,
    dataIndex: 'shopName_dictText'
   },
   {
    title: '店铺主图链接',
    align:"center",
    dataIndex: 'shopCover'
   },
   {
    title: '店铺主营商品数组',
    align:"center",
    dataIndex: 'mainGoodsArr'
   },
   {
    title: '店铺位置',
    align:"center",
    dataIndex: 'shopLocation'
   },
   {
    title: '店铺介绍',
    align:"center",
    dataIndex: 'shopIntroduction'
   },
   {
    title: '点位店铺微信二维码ticket',
    align:"center",
    dataIndex: 'qrCodeTicket'
   },
   {
    title: '点位店铺微信二维码链接',
    align:"center",
    dataIndex: 'qrCodeUrl'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "创建人",
      field: 'createBy',
      component: 'Input',
      colProps: {span: 6},
 	},
     {
      label: "创建时间",
      field: "createTime",
      component: 'RangePicker',
      colProps: {span: 6},
	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '点位ID',
    field: 'positionId',
    component: 'JSearchSelect',
    componentProps:{
       dict:"ma_position,id,id"
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入点位ID!'},
          ];
     },
  },
  {
    label: '点位编号',
    field: 'positionNo',
    component: 'JSearchSelect',
    componentProps:{
       dict:"ma_position,position_no,position_no"
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入点位编号!'},
          ];
     },
  },
  {
    label: '店铺编号',
    field: 'shopId',
    component: 'JSearchSelect',
    componentProps:{
       dict:""
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入店铺编号!'},
          ];
     },
  },
  {
    label: '店铺名称',
    field: 'shopName',
    component: 'JSearchSelect',
    componentProps:{
       dict:""
    },
  },
  {
    label: '店铺主图链接',
    field: 'shopCover',
    component: 'Input',
  },
  {
    label: '店铺主营商品数组',
    field: 'mainGoodsArr',
    component: 'Input',
  },
  {
    label: '店铺位置',
    field: 'shopLocation',
    component: 'Input',
  },
  {
    label: '店铺介绍',
    field: 'shopIntroduction',
    component: 'Input',
  },
  {
    label: '点位店铺微信二维码ticket',
    field: 'qrCodeTicket',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入点位店铺微信二维码ticket!'},
          ];
     },
  },
  {
    label: '点位店铺微信二维码链接',
    field: 'qrCodeUrl',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入点位店铺微信二维码链接!'},
          ];
     },
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