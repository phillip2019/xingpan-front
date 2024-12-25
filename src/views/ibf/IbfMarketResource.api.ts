import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/ibf/ibfMarketResource/list',
  save = '/ibf/ibfMarketResource/add',
  edit = '/ibf/ibfMarketResource/edit',
  delete = '/ibf/ibfMarketResource/delete',
  deleteBatch = '/ibf/ibfMarketResource/deleteBatch',
  importExcel = '/ibf/ibfMarketResource/importExcel',
  exportXls = '/ibf/ibfMarketResource/exportXls',
  checkUnique = '/ibf/ibfMarketResource/checkUnique',
}

/**
 * 导出api
 * @param businessVersion 业务版本号
 */
export const getExportUrl = (businessVersion: string) => {
  return `${Api.exportXls}?businessVersion=${businessVersion}`;
};

/**
 * 导入api
 */
export const getImportUrl = (businessVersion: string) => {
  return `${Api.importExcel}?businessVersion=${businessVersion}`;
};

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => {
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
    content: '确定删除选中的记录吗?',
    title: '提示', 
    okText: '确定',
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
 * 唯一性检查
 * @param params
 */
export const checkUnique = (params) => {
  return defHttp.get({ url: Api.checkUnique, params });
};
