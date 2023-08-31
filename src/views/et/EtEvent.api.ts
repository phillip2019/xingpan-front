import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/et/etEvent/list',
  save = '/et/etEvent/add',
  edit = '/et/etEvent/edit',
  copy = '/et/etEvent/copy',
  deleteOne = '/et/etEvent/delete',
  deleteBatch = '/et/etEvent/deleteBatch',
  updateBatch = '/et/etEvent/updateBatch',
  importExcel = '/et/etEvent/importExcel',
  exportXls = '/et/etEvent/exportXls',
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
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
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
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 复制新增
 * @param params
 */
export const copy = (params) => {
  const url = Api.copy;
  return defHttp.post({ url: url, params });
};

/**
 * 批量更新
 * @param params
 */
export const batchUpdate = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认更新',
    content: '是否更新选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.put({ url: Api.updateBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 同步批量更新
 * @param params
 */
export const syncBatchUpdate = (params) => {
  return defHttp.put({ url: Api.updateBatch, data: params }, { joinParamsToUrl: true });
};
