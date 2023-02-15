import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '指标名称',
    align: 'center',
    sorter: true,
    dataIndex: 'deptIndexId',
  },
  {
    title: '填报值',
    align: 'center',
    sorter: true,
    dataIndex: 'indexValue',
  },
  {
    title: '指标周期起始日期',
    align: 'center',
    sorter: true,
    dataIndex: 'beginDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '指标周期结束日期',
    align: 'center',
    sorter: true,
    dataIndex: 'endDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '备注',
    align: 'center',
    sorter: true,
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '指标名称',
    field: 'deptIndexId',
    component: 'JDictSelectTag',
    helpMessage: ['请选择填报指标'],
    componentProps: {
      dictCode: 'cg_dept_index,index_name_zh,id,1=1 order by create_time',
    },
    colProps: { span: 6 },
  },
  {
    label: '指标值',
    field: 'indexValue',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '开始日期',
    field: 'beginDate',
    component: 'DatePicker',
    colProps: { span: 6 },
  },
  {
    label: '结束日期',
    field: 'endDate',
    component: 'DatePicker',
    colProps: { span: 6 },
  },
  {
    label: '创建人',
    field: 'createBy',
    component: 'Input',
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
    label: '更新人',
    field: 'updateBy',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '更新时间',
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
    label: '指标部门',
    field: 'deptId',
    component: 'JTreeSelect',
    helpMessage: ['请选择填报部门'],
    componentProps: {
      dict: 'sys_category,name,id,1=1 order by create_time',
      pidField: 'pid',
      pidValue: '1625117453522718721',
      placeholder: '请选择部门',
      converIsLeafVal: 1,
      multiple: false,
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择部门!' }];
    },
  },
  {
    label: '指标名称',
    field: 'deptIndexId',
    component: 'JDictSelectTag',
    helpMessage: ['请选择填报指标'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      console.log(formModel.deptId);
      // console.log(formActionType);
      let sqlPreTpl = 'cg_dept_index,index_name_zh,id,1=1 ';
      if (formModel.deptId) {
        sqlPreTpl = sqlPreTpl + " and dept_id = '" + formModel.deptId + "'";
        return {
          dictCode: "cg_dept_index,index_name_zh,id,1=1 and dept_id='" + formModel.deptId + "' order by create_time",
        };
      }
      sqlPreTpl += ' order by create_time';
      return {
        dictCode: sqlPreTpl,
      };
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入部门指标编号!' }];
    },
  },
  {
    label: '指标值',
    field: 'indexValue',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入部门值!' },
        { pattern: /^-?\d+\.?\d*$/, message: '请输入数字!' },
      ];
    },
  },
  {
    label: '开始日期',
    field: 'beginDate',
    component: 'DatePicker',
  },
  {
    label: '结束日期',
    field: 'endDate',
    component: 'DatePicker',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
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
