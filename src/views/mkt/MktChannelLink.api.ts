import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { genAdvUrl } from '/@/utils/common/compUtils';

const { createConfirm } = useMessage();

enum Api {
  list = '/mkt/mktChannelLink/list',
  save = '/mkt/mktChannelLink/add',
  edit = '/mkt/mktChannelLink/edit',
  deleteOne = '/mkt/mktChannelLink/delete',
  deleteBatch = '/mkt/mktChannelLink/deleteBatch',
  importExcel = '/mkt/mktChannelLink/importExcel',
  exportXls = '/mkt/mktChannelLink/exportXls',
  updateBatch = '/mkt/mktChannelLink/updateBatch',
  updateBatch2 = '/mkt/mktChannelLink/updateBatch2',
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
export const list = (params) => {
  return new Promise((resolve) => {
    defHttp.get({ url: Api.list, params }).then(async (res) => {
      // 处理pc、wap带参链接
      // console.log('原始参数为： ', res.records);
      // 遍历返回数据，将pc、wap带参链接替换成直接链接
      res.records.forEach((item) => {
        const pcSourceUrl = item['pcSourceUrl'];
        const wapSourceUrl = item['wapSourceUrl'];
        const pcTargetUrl = genAdvUrl(pcSourceUrl, item, true);
        const wapTargetUrl = genAdvUrl(wapSourceUrl, item, false);

        item['pcTargetUrl'] = pcTargetUrl;
        item['wapTargetUrl'] = wapTargetUrl;
      });
      // console.log('拼装处理之后参数为： ', res.records);
      // 批量更新请求渠道链接
      await defHttp.put({ url: Api.updateBatch2, data: res.records });
      resolve(res.records);
    });
  });
};

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
      return defHttp.put({ url: Api.updateBatch, data: params }).then(() => {
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
