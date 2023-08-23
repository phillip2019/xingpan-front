import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/et/etBuProject/list',
  save = '/et/etBuProject/add',
  edit = '/et/etBuProject/edit',
  deleteOne = '/et/etBuProject/delete',
  deleteBatch = '/et/etBuProject/deleteBatch',
  importExcel = '/et/etBuProject/importExcel',
  exportXls = '/et/etBuProject/exportXls',
  queryTreeListForBuProject = '/et/etBuProject/queryTreeList',
  queryBuProjectEvent = '/et/etEvent/queryBuProjectEvent',
  saveBuProjectEvent = '/et/etEvent/saveBuProjectEvent',
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
 * 根据角色查询树信息
 */
export const queryTreeListForBuProject = () => defHttp.get({ url: Api.queryTreeListForBuProject });
/**
 * 查询角色权限
 */
export const queryBuProjectEvent = (params) => defHttp.get({ url: Api.queryBuProjectEvent, params });
/**
 * 保存角色权限
 */
export const saveBuProjectEvent = (params) => defHttp.post({ url: Api.saveBuProjectEvent, params });
