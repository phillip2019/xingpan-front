import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/et/etClientEventScreenshot/list',
  save = '/et/etClientEventScreenshot/add',
  edit = '/et/etClientEventScreenshot/edit',
  deleteOne = '/et/etClientEventScreenshot/delete',
  deleteBatch = '/et/etClientEventScreenshot/deleteBatch',
  importExcel = '/et/etClientEventScreenshot/importExcel',
  exportXls = '/et/etClientEventScreenshot/exportXls',
  screenshotUnique = '/et/etClientEventScreenshot/screenshotUnique',
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
 * 检查客户端事件截图唯一性
 * @param params
 */
export const checkClientEventScreenshotUnique = (params) => {
  return defHttp.post({ url: Api.screenshotUnique, params });
};
