import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";
import { Modal } from 'ant-design-vue';

const { createConfirm } = useMessage();

enum Api {
  list = '/ibf/ibfMarketFinance/list',
  save='/ibf/ibfMarketFinance/add',
  edit='/ibf/ibfMarketFinance/edit',
  deleteOne = '/ibf/ibfMarketFinance/delete',
  deleteBatch = '/ibf/ibfMarketFinance/deleteBatch',
  importExcel = '/ibf/ibfMarketFinance/importExcel',
  exportXls = '/ibf/ibfMarketFinance/exportXls',
  checkUnique = '/ibf/ibfMarketFinance/checkUnique',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = (businessVersion: string) => 
  `${Api.importExcel}?businessVersion=${businessVersion}`;
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
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
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
 * 唯一性校验
 */
export const checkUnique = async (params) => {
  try {
    const result = await defHttp.get({
      url: Api.checkUnique,
      params: {
        shortMarketId: params.shortMarketId,
        monthCol: params.monthCol,
        businessVersion: params.businessVersion
      }
    });
    
    if (result?.success && result.result) {
      // 存在记录，回填数据
      Object.keys(result.result).forEach(key => {
        if (params.hasOwnProperty(key)) {
          params[key] = result.result[key];
        }
      });
      Modal.warning({
        title: '提示',
        content: '该记录已存在，已自动回填数据',
      });
    }
    return result;
  } catch (error) {
    console.error('唯一性校验失败:', error);
    return null;
  }
};
