import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/ibf/ibfReportingSummary/list',
  save = '/ibf/ibfReportingSummary/add',
  edit = '/ibf/ibfReportingSummary/edit',
  copy = '/ibf/ibfReportingSummary/copy',
  publish = '/ibf/ibfReportingSummary/publish',
  resourceUrl = '/ibf/ibfReportingSummary/resourceUrl',
  financeUrl = '/ibf/ibfReportingSummary/financeUrl',
  deleteOne = '/ibf/ibfReportingSummary/delete',
  deleteBatch = '/ibf/ibfReportingSummary/deleteBatch',
  importExcel = '/ibf/ibfReportingSummary/importExcel',
  exportXls = '/ibf/ibfReportingSummary/exportXls',
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
 * 获取资源总览链接
 */
export const getResourceUrl = () => {
  return defHttp.get({ url: Api.resourceUrl });
};

/**
 * 获取财务总览链接
 */
export const getFinanceUrl = () => {
  return defHttp.get({ url: Api.financeUrl });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据和待校准的数据记录',
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
 * 复制
 */
export const copyRecord = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认复制',
    content: '是否复制选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.copy, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 发布
 */
export const publishRecord = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认发布',
    content: '是否重新发布此月份数据，此操作会覆盖当前大屏数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.post({ url: Api.publish, data: params }, { joinParamsToUrl: true }).then(() => {
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
