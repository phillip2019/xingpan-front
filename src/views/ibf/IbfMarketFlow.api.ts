import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/ibf/ibfMarketFlow/list',
  save='/ibf/ibfMarketFlow/add',
  edit='/ibf/ibfMarketFlow/edit',
  deleteOne = '/ibf/ibfMarketFlow/delete',
  deleteBatch = '/ibf/ibfMarketFlow/deleteBatch',
  importExcel = '/ibf/ibfMarketFlow/importExcel',
  exportXls = '/ibf/ibfMarketFlow/exportXls',
  checkUnique = '/ibf/ibfMarketFlow/checkUnique',
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
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({content: '确定删除选中的记录吗?', 
    iconType: 'warning',
    title: '提示',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    },
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

/**
 * 唯一性检查
 * @param params
 */
export const checkUnique = (params) => {
  return defHttp.get({url: Api.checkUnique, params});
}
