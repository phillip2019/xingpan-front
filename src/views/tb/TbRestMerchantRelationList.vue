<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button
          type="primary"
          @click="handleAdd"
          preIcon="ant-design:plus-outlined"
          v-if="hasPermission('org.jeecg.modules.demo:tb_rest_merchant_relation:add')"
        >
          新增</a-button
        >
        <a-button
          type="primary"
          preIcon="ant-design:export-outlined"
          @click="onExportXls"
          v-if="hasPermission('org.jeecg.modules.demo:tb_rest_merchant_relation:exportXls')"
        >
          导出</a-button
        >
        <j-upload-button
          type="primary"
          preIcon="ant-design:import-outlined"
          @click="onImportXls"
          v-if="hasPermission('org.jeecg.modules.demo:tb_rest_merchant_relation:importExcel')"
          >导入</j-upload-button
        >
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-if="hasPermission('org.jeecg.modules.demo:tb_rest_merchant_relation:deleteBatch')">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
             </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
     </BasicTable>
    <!-- 表单区域 -->
    <TbRestMerchantRelationModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="tb-TbRestMerchantRelation" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Image, ImagePreviewGroup, Tag, Tooltip, message } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { cloneDeep } from 'lodash-es';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TbRestMerchantRelationModal from './components/TbRestMerchantRelationModal.vue';
  import { columns, searchFormSchema } from './TbRestMerchantRelation.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
  } from './TbRestMerchantRelation.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { JEllipsis } from '/@/components/Form';
  import clipboard from 'clipboard';
  const { hasPermission } = usePermission();
  const { notification } = useMessage();

  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '食堂档口关系表列表页面',
      api: list,
      columns,
      canResize: false,
      striped: true,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 200,
        fixed: 'right',
      },
    },
    exportConfig: {
      name: '食堂档口关系表导出数据',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    const menuList = [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'org.jeecg.modules.demo:tb_rest_merchant_relation:edit',
      },
       {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
        auth: 'org.jeecg.modules.demo:tb_rest_merchant_relation:delete',
      }
    ];
    return menuList;
  }
</script>

<style scoped></style>
