import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { formatTSToDateTime } from '/@/utils/dateUtil';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '用户标识',
    align: 'center',
    sorter: true,
    width: 120,
    dataIndex: 'distinctId',
    helpMessage: '用户标识，若用户登录，则此标识为用户编号，否则则为设备编号',
  },
  {
    title: 'SDK',
    align: 'center',
    sorter: true,
    dataIndex: 'lib',
    width: 50,
    helpMessage: '上报包名，SDK名称',
  },
  {
    title: '事件',
    align: 'center',
    sorter: true,
    dataIndex: 'event',
    width: 100,
    helpMessage: '事件名称，埋点事件名称',
  },
  {
    title: '时间',
    align: 'center',
    sorter: true,
    width: 150,
    dataIndex: 'createdAt',
    customRender: ({ value }) => {
      if (!value) {
        return '';
      }

      return !value ? '' : formatTSToDateTime(Number(value));
    },
  },
  {
    title: '采集类别',
    align: 'center',
    sorter: true,
    dataIndex: 'type',
    width: 80,
  },
  {
    title: '属性内容',
    align: 'center',
    sorter: true,
    dataIndex: 'allJson',
    width: 120,
  },
  {
    title: 'IP',
    align: 'center',
    sorter: true,
    dataIndex: 'ip',
    width: 80,
  },
  {
    title: 'IP归属城市',
    align: 'center',
    sorter: true,
    dataIndex: 'ipCity',
    width: 80,
    customRender: ({ value }) => {
      if (!value) {
        return '';
      }
      const ipCityJson = JSON.parse(value).city;
      const ipCityName = !ipCityJson ? '' : ipCityJson.names['zh-CN'];
      return !ipCityName ? '' : ipCityName;
    },
  },
  {
    title: '上一个页面地址',
    align: 'center',
    sorter: true,
    dataIndex: 'referrer',
    width: 120,
  },
  {
    title: '上报备注',
    align: 'center',
    sorter: true,
    dataIndex: 'remark',
    width: 80,
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '创建时间',
    field: 'createdAtArr',
    component: 'RangePicker',
    componentProps: {
      valueType: 'DateTime',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    helpMessage: ['请选择事件时间'],
    show: true,
    colProps: {
      span: 30,
    },
  },
  {
    label: '用户编号',
    field: 'distinctId',
    component: 'Input',
    helpMessage: ['请输入用户编号'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '事件',
    field: 'event',
    component: 'Input',
    helpMessage: ['请输入埋点事件名称'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: 'IP',
    field: 'ip',
    component: 'Input',
    helpMessage: ['请输入客户端IP'],
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '客户端',
    field: 'platformType',
    component: 'JDictSelectTag',
    helpMessage: ['请选择埋点客户端'],
    defaultValue: 'pc',
    componentProps: {
      dictCode: 'et_platform_type',
    },
    show: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: '环境',
    field: 'env',
    component: 'JDictSelectTag',
    helpMessage: ['请选择埋点环境，必选字段'],
    defaultValue: 'test',
    componentProps: {
      dictCode: 'et_env',
    },
    show: true,
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    label: '项目',
    field: 'project',
    component: 'JDictSelectTag',
    helpMessage: ['请选择项目，必选字段'],
    defaultValue: 'chinagoods',
    componentProps: {
      dictCode: 'et_project',
    },
    show: true,
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    label: '消息批量大小',
    field: 'batchSize',
    component: 'Input',
    defaultValue: 10000,
    helpMessage: ['消息批量大小'],
    show: true,
    colProps: {
      span: 12,
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '用户标识',
    field: 'distinctId',
    component: 'Input',
  },
  {
    label: '上报包',
    field: 'lib',
    component: 'Input',
  },
  {
    label: '事件',
    field: 'event',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'et_event_name',
    },
  },
  {
    label: '采集类别',
    field: 'type',
    component: 'Input',
  },
  {
    label: 'IP',
    field: 'ip',
    component: 'Input',
  },
  {
    label: 'ipCity',
    field: 'ipCity',
    component: 'Input',
  },
  {
    label: '上一个页面地址',
    field: 'referrer',
    component: 'Input',
  },
  {
    label: '上报备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '时间',
    field: 'createdAt',
    component: 'Input',
  },
  {
    label: '项目',
    field: 'project',
    component: 'Input',
    show: false,
  },
  {
    label: '属性内容',
    field: 'allJson',
    component: 'JCodeEditor',
    colProps: {
      span: 24,
    },
  },
];

export const teSearchSchemas: FormSchema[] = [
  {
    label: '项目名',
    field: 'buProjectNameId',
    // component: 'JSearchSelect',
    component: 'JDictSelectTag',
    helpMessage: ['请选择项目'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_bu_project,name,max(id),1=1 ';
      sqlPreTpl += ' group by `name`';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '场景',
    field: 'scene',
    component: 'JDictSelectTag',
    helpMessage: ['请选择事件场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_event,scene,scene,1=1 ';
      sqlPreTpl += ' group by scene';
      return {
        dictCode: sqlPreTpl,
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '事件名',
    field: 'name',
    // component: 'JSearchSelect',
    component: 'JSelectMultiple',
    helpMessage: ['请选择事件名称场景'],
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      let sqlPreTpl = 'et_event,name,name,1=1 ';
      if (formModel.scene) {
        sqlPreTpl = sqlPreTpl + " and scene = '" + formModel.scene + "'";
      }
      sqlPreTpl += ' group by name';
      return {
        dictCode: sqlPreTpl,
        // dict: 'et_event,name,name',
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '用户编号',
    field: 'distinctId',
    component: 'Input',
    helpMessage: '请输入用户编号',
  },
  {
    label: '设备编号',
    field: 'anonymousId',
    component: 'Input',
    helpMessage: '请输入设备编号',
  },
  {
    label: 'IP',
    field: 'ip',
    component: 'Input',
    helpMessage: '请输入IP地址进行查询，若想查询本机ip地址，请打开浏览器，输入https://ip138.com/',
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

export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
      });
    }
    return arr;
  })();
  return data;
}
