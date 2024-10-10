import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/cg/cgDbConnectionInfo/list',
  save = '/cg/cgDbConnectionInfo/add',
  edit = '/cg/cgDbConnectionInfo/edit',
  deleteOne = '/cg/cgDbConnectionInfo/delete',
  deleteBatch = '/cg/cgDbConnectionInfo/deleteBatch',
  importExcel = '/cg/cgDbConnectionInfo/importExcel',
  exportXls = '/cg/cgDbConnectionInfo/exportXls',
  queryById = '/cg/cgDbConnectionInfo/queryById',
  testConnection = '/cg/cgDbConnectionInfo/testConnection',
  testConnection2 = '/cg/cgDbConnectionInfo/testConnection2',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params: any) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 */
export const deleteOne = (params: { id: any; }, handleSuccess: { (): void; (): void; }) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params: { ids: any[]; }, handleSuccess: { (): void; (): void; }) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params: Recordable<any>, isUpdate: boolean) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

export const updateConnectStatus = (id: string, connectStatus: number) => {
  const params = { id: id, connectStatus: connectStatus };
  return defHttp.post({ url: Api.edit, params });
};

/**
 * 查询某一个
 * @param id
 */
export const queryById = (id: string) => {
  const url = Api.queryById + '?id=' + id;
  // 拼接id参数进入url中
  return defHttp.get({ url: url });
};

/**
 * post形式，测试是否连接成功
 * @param id 拼接到url中
 */
export const testConnection = (id: string) => {
  const url = Api.testConnection + '?id=' + id;
  return defHttp.post({ url: url });
};

/**
 * post形式，测试是否连接成功2
 * @param params
 */
export const testConnection2 = (params: any) => {
  const url = Api.testConnection2;
  return defHttp.post({ url: url, params });
};
