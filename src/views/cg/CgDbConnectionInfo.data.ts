import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { on } from 'events';
import { watch } from 'fs';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '业务线',
    align: 'center',
    sorter: true,
    dataIndex: 'buName',
  },
  {
    title: 'Conn_ID',
    align: 'center',
    sorter: true,
    dataIndex: 'connectionId',
  },
  {
    title: '数据源类型',
    align: 'center',
    sorter: true,
    dataIndex: 'connectionType',
  },
  {
    title: 'Host',
    align: 'center',
    sorter: true,
    dataIndex: 'host',
  },
  {
    title: 'DB',
    align: 'center',
    sorter: true,
    dataIndex: 'schemaName',
  },
  {
    title: 'UserName',
    align: 'center',
    sorter: true,
    dataIndex: 'login',
  },
  {
    title: 'Port',
    align: 'center',
    sorter: true,
    dataIndex: 'port',
  },
  {
    title: '版本',
    align: 'center',
    sorter: true,
    dataIndex: 'version',
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '备注',
    align: 'center',
    sorter: true,
    dataIndex: 'description',
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
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '更新人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
  },
  {
    title: '更新时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '业务线',
    field: 'buName',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'cg_db_connection_info,bu_name,bu_name,1=1 ';
      sqlPreTpl += 'group by bu_name';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: 'Conn_ID',
    field: 'connectionId',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    label: '数据源类型',
    field: 'connectionType',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'cg_db_connection_info,connection_type,connection_type,1=1 ';
      sqlPreTpl += 'group by connection_type';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: 'Host',
    field: 'host',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: 'DB',
    field: 'schemaName',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: 'UserName',
    field: 'login',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: 'Port',
    field: 'port',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '版本',
    field: 'version',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '业务线',
    field: 'buName',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'bu_name',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入业务线名称!' }];
    },
  },
  {
    label: 'Conn_ID',
    field: 'connectionId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入数据库连接ID(英文名)!' },
        { ...rules.duplicateCheckRule('cg_db_connection_info', 'connection_id', model, schema)[0] },
      ];
    },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      options: [
        { label: '失效', value: 0 },
        { label: '正常', value: 1 },
      ],
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态!' }];
    },
  },
  {
    label: '数据源类型',
    field: 'connectionType',
    component: 'JDictSelectTag',
    componentProps: ({ formModel }) => {
      const DEFULT_CONNECTION_TYPE_PORT = {
        oracle: 1521,
        sqlserver: 1433,
        mysql: 3306,
        postgresql: 5432,
        redis: 6379,
      };
      return {
        dictCode: 'connection_type',
        onChange: (val, option) => {
          if (val) {
            formModel.port = DEFULT_CONNECTION_TYPE_PORT[val];
          }
        },
        onDeselect: () => {
          formModel.port = null;
          if (formModel.hasOwnProperty('port')) {
            formModel.port = null;
          }
        },
      };
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接类型!' }];
    },
  },
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入数据库连接描述内容!' }];
    },
  },
  {
    label: 'Host',
    field: 'host',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接主机!' }];
    },
  },
  {
    label: 'Port',
    field: 'port',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入数据库连接端口!' },
        { pattern: /^-?\d+$/, message: '请输入整数!' },
      ];
    },
  },
  {
    label: 'DB',
    field: 'schemaName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接DB!' }];
    },
  },
  {
    label: 'UserName',
    field: 'login',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入用户名!' }];
    },
  },
  {
    label: '密码',
    field: 'password',
    component: 'InputPassword',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入密码!' }];
    },
  },
  {
    label: '额外连接信息',
    field: 'extra',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入额外连接信息!' }];
    },
  },
  {
    label: '版本',
    field: 'version',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '连接超时',
    field: 'connectionTimeout',
    component: 'InputNumber',
  },
  {
    label: '查询超时',
    field: 'queryTimeout',
    component: 'InputNumber',
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
