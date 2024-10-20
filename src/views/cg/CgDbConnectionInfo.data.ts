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
    dataIndex: 'buName_dictText',
    slots: { customRender: 'copySlot' },
    helpMessage: '该数据源所归属业务线',
  },
  {
    title: '系统',
    align: 'center',
    sorter: true,
    dataIndex: 'sys',
    slots: { customRender: 'copySlot' },
    helpMessage: '该数据源所归属系统',
  },
  {
    title: 'Conn ID',
    align: 'center',
    sorter: true,
    width: 200,
    dataIndex: 'connectionId',
    slots: { customRender: 'copySlot' },
    helpMessage: '数据源Con ID，英文名，唯一连接编号',
  },
  {
    title: '连接状态',
    align: 'center',
    sorter: true,
    dataIndex: 'connectStatus',
    slots: { customRender: 'connectStatus' },
    helpMessage: '数据源连接状态，正常、异常',
  },
  {
    title: '数据源类型',
    align: 'center',
    sorter: true,
    dataIndex: 'connectionType',
    helpMessage: '数据源应用名称',
  },
  {
    title: '引擎版本',
    align: 'center',
    sorter: true,
    dataIndex: 'connectionTypeVersion',
    helpMessage: '数据源',
    defaultHidden: false,
  },
  {
    title: 'Host',
    align: 'center',
    sorter: true,
    dataIndex: 'host',
    slots: { customRender: 'copySlot' },
    helpMessage: '数据源主机地址',
  },
  {
    title: 'Schema',
    align: 'center',
    sorter: true,
    dataIndex: 'schemaName',
    slots: { customRender: 'copySlot' },
    helpMessage: '数据源SCHEMA，数据库名称',
  },
  {
    title: 'UserName',
    align: 'center',
    sorter: true,
    slots: { customRender: 'copySlot' },
    dataIndex: 'login',
    defaultHidden: true,
  },
  {
    title: 'Port',
    align: 'center',
    sorter: true,
    dataIndex: 'port',
    defaultHidden: false,
  },
  {
    title: '备注',
    align: 'center',
    sorter: true,
    dataIndex: 'description',
    helpMessage: '数据源备注',
    defaultHidden: true,
  },
  {
    title: '创建人',
    align: 'center',
    sorter: true,
    dataIndex: 'createBy',
    helpMessage: '数据源创建人',
    defaultHidden: true,
  },
  {
    title: '创建时间',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 20 ? text.substr(0, 20) : text;
    },
    helpMessage: '数据源创建时间',
    defaultHidden: false,
  },
  {
    title: '更新人',
    align: 'center',
    sorter: true,
    dataIndex: 'updateBy',
    helpMessage: '数据源更新人',
    defaultHidden: true,
  },
  {
    title: '更新时间',
    align: 'center',
    sorter: true,
    dataIndex: 'updateTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 20 ? text.substr(0, 20) : text;
    },
    helpMessage: '数据源更新时间',
    defaultHidden: false,
  },
  {
    title: '版本',
    align: 'center',
    sorter: true,
    dataIndex: 'version',
    defaultHidden: true,
  },
  {
    title: '状态',
    align: 'center',
    sorter: true,
    dataIndex: 'status',
    slots: { customRender: 'status' },
    helpMessage: '数据源状态，有效、无效',
    defaultHidden: true,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: 'Schema',
    field: 'schemaName',
    component: 'JSelectMultiple',
    colProps: { span: 4 },
    helpMessage: '该数据源Schema',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = "cg_db_connection_info,schema_name,schema_name,1=1 and schema_name != '' and status = 1 ";
      if (formModel.buName) {
        sqlPreTpl = sqlPreTpl + " and bu_name = '" + formModel.buName + "'";
      }
      if (formModel.sys) {
        sqlPreTpl = sqlPreTpl + " and sys = '" + formModel.sys + "'";
      }
      sqlPreTpl += 'group by schema_name';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: 'Host',
    field: 'host',
    component: 'JSelectMultiple',
    colProps: { span: 4 },
    helpMessage: '该数据源HOST',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = "cg_db_connection_info,host,host,1=1 and host != '' and status = 1 ";
      if (formModel.buName) {
        sqlPreTpl = sqlPreTpl + " and bu_name = '" + formModel.buName + "'";
      }
      if (formModel.sys) {
        sqlPreTpl = sqlPreTpl + " and sys = '" + formModel.sys + "'";
      }
      sqlPreTpl += 'group by host';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: '业务线',
    field: 'buName',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'bu_name',
    },
    colProps: { span: 4 },
    helpMessage: '该数据源所归属业务线，下拉搜索',
  },
  {
    label: '系统',
    field: 'sys',
    component: 'JSelectMultiple',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = "cg_db_connection_info,sys,sys,1=1 and sys != '' and status = 1 ";
      if (formModel.buName) {
        sqlPreTpl = sqlPreTpl + " and bu_name = '" + formModel.buName + "'";
      }
      sqlPreTpl += 'group by sys';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 4 },
    helpMessage: '该数据源所归属系统，下拉搜索',
  },
  {
    label: 'Conn ID',
    field: 'connectionId',
    component: 'JSelectMultiple',
    colProps: { span: 6 },
    helpMessage: '该数据源连接ID，支持模糊搜索',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = "cg_db_connection_info,connection_id,connection_id,1=1 and connection_id != '' and status = 1 ";
      if (formModel.buName) {
        sqlPreTpl = sqlPreTpl + " and bu_name = '" + formModel.buName + "'";
      }
      if (formModel.sys) {
        sqlPreTpl = sqlPreTpl + " and sys = '" + formModel.sys + "'";
      }
      sqlPreTpl += 'group by connection_id';
      return {
        dictCode: sqlPreTpl,
      };
    },
  },
  {
    label: '连接状态',
    field: 'connectStatus',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    componentProps: {
      dictCode: 'connect_status',
    },
    helpMessage: '该数据源连接状态，例如用户名错误，密码错误，数据库拓机等',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    colProps: { span: 6 },
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
    },
    helpMessage: '该数据源状态',
  },
  {
    label: '数据源类型',
    field: 'connectionType',
    component: 'JDictSelectTag',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'cg_db_connection_info,connection_type,connection_type,1=1 and status = 1 ';
      sqlPreTpl += 'group by connection_type';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
    helpMessage: '该数据源类型，例如mysql',
  },
  {
    label: '版本',
    field: 'version',
    component: 'JInput',
    colProps: { span: 6 },
    helpMessage: '该数据源连接信息版本',
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
    helpMessage: '数据源系统所属业务线，例如ChinaGoods、采购宝、互金、市场、会展...',
  },
  {
    label: '系统',
    field: 'sys',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接归属系统!' }];
    },
    helpMessage: '数据源系统所属系统，例如ChinaGoods、拨浪鼓系统',
  },
  {
    label: 'Conn ID',
    field: 'connectionId',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入数据库连接ID(英文名)!' },
        { ...rules.duplicateCheckRule('cg_db_connection_info', 'connection_id', model, schema)[0] },
      ];
    },
    helpMessage: '数据源定义唯一数据库连接英文名称',
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: '1',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'valid_status',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态!' }];
    },
    helpMessage: '数据源状态，有效、无效',
  },
  {
    label: '连接状态',
    field: 'connectStatus',
    defaultValue: '1',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'connect_status',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请选择连接状态!' }];
    },
    helpMessage: '数据源连接状态，当前能否正常连接与否',
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
        http: 443,
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
    helpMessage: '数据源类型、例如mysql、oracle、sqlserver...',
  },
  {
    label: 'WEB系统',
    field: 'webUrlArr',
    component: 'InputTextArea',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '该数据源数据库系统的URL地址，多个以逗号分隔!' }];
    },
    helpMessage: '该数据源数据库系统的URL地址，多个以逗号分隔',
  },
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接描述内容!' }];
    },
    helpMessage: '该数据源或者系统备注',
  },
  {
    label: 'Host',
    field: 'host',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入数据库连接主机!' }];
    },
    helpMessage: '该数据源主机名或者连接域名地址',
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
    helpMessage: '该数据源连接端口',
  },
  {
    label: 'Schema',
    field: 'schemaName',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入数据库连接DB!' }];
    },
    helpMessage: '该数据源连接数据库Schema',
  },
  {
    label: 'Schema缩写',
    field: 'dbAbbreviation',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '数据库缩写名称，提供给入数仓使用!' }];
    },
    helpMessage: '数据源缩写名称，提供给入数仓使用',
  },
  {
    label: 'UserName',
    field: 'login',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入用户名!' }];
    },
    helpMessage: '数据源连接用户名',
  },
  {
    label: '密码',
    field: 'password',
    component: 'InputPassword',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入密码!' }];
    },
    helpMessage: '数据源连接密码',
  },
  {
    label: '额外连接信息',
    field: 'extra',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false, message: '请输入额外连接信息!' }];
    },
    helpMessage: '数据源额外连接信息',
  },
  {
    label: '版本',
    field: 'version',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      disabled: true,
    },
    helpMessage: '数据源版本，若编辑一次，则版本+1',
  },
  {
    label: '连接超时',
    field: 'connectionTimeout',
    component: 'InputNumber',
    helpMessage: '数据源连接超时时间，原样传递给数据源引擎',
  },
  {
    label: '查询超时',
    field: 'queryTimeout',
    component: 'InputNumber',
    helpMessage: '数据源查询超时时间，原样传递给数据源引擎',
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
