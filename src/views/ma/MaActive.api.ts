import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/ma/active/list',
  save = '/ma/active/add',
  edit = '/ma/active/edit',
  deleteOne = '/ma/active/delete',
  deleteBatch = '/ma/active/deleteBatch',
  importExcel = '/ma/active/importExcel',
  exportXls = '/ma/active/exportXls',
  importYLBExcel = '/ma/active/importYLBExcel',
  exportYLBQrCode = '/ma/active/exportYLBQrCode',
  importTaiKaExcel = '/ma/active/importTaiKaExcel',
  prepareExportTaiKaQrCode = '/ma/active/prepareExportTaiKaQrCode',
  exportTaiKaQrCode = '/ma/active/exportTaiKaQrCode',
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
 * 导入易拉宝物料api
 */
export const getImportYLBUrl = Api.importYLBExcel;

/**
 * 导出易拉宝物料二维码
 */
export const getExportYLBQrCode = Api.exportYLBQrCode;
/**
 * 导入商铺台卡物料api
 */
export const getImportTaiKaUrl = Api.importTaiKaExcel;

/**
 * 准备导出商铺台卡店铺物料二维码
 */
export const prepareExportTaiKaQrCode = Api.prepareExportTaiKaQrCode;
/**
 * 导出商铺台卡店铺物料二维码
 */
export const getExportTaiKaQrCode = Api.exportTaiKaQrCode;
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
 * 准备导出微信二维码接口
 * 下载微信二维码到本地并且压缩二维码
 * @param params
 */
export const prepareExportTaiKaQrCodeApi = (params) => defHttp.get({ url: Api.prepareExportTaiKaQrCode, params });
