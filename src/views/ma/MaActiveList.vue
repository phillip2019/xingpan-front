<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
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
      <!--操作栏-->
      <template #action="{ record }">
        <a-menu>
          <a-menu-item key="1">
            <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="function importYLBXls(file) {return onImportYLBXls(file, record)}"
              >导入活动易拉宝物料
            </j-upload-button>
          </a-menu-item>
          <a-menu-item key="2">
            <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
          </a-menu-item>
        </a-menu>
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <MaActiveModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="ma-maActive" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import MaActiveModal from './components/MaActiveModal.vue';
  import { columns, searchFormSchema } from './MaActive.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, getImportYLBUrl } from './MaActive.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls, handleImportXls} = useListPage({
    tableProps: {
      title: '活动',
      api: list,
      columns,
      canResize: true,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 240,
        fixed: 'right',
      },
    },
    exportConfig: {
      name: '活动',
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
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  // 导入易拉宝excel
  function onImportYLBXls(file, record) {
    // TODO 上传excel文件
    // TODO 生成微信公众号二维码图片

    let url = getImportYLBUrl;
    // 透传活动编号
    url = url + '?id=' + record.id;
    console.log(record);
    //update-begin-author:taoyan date:20220507 for: erp代码生成 子表 导入地址是动态的
    let realUrl = typeof url === 'function' ? url() : url;
    if (realUrl) {
      return handleImportXls(file, realUrl, true || reload);
      //update-end-author:taoyan date:20220507 for: erp代码生成 子表 导入地址是动态的
    } else {
      $message.createMessage.warn('没有传递 importConfig.url 参数');
      return Promise.reject();
    }
  }
</script>

<style scoped></style>
