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
          v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:add')"
        >
          新增</a-button
        >
        <a-button
          type="primary"
          preIcon="ant-design:export-outlined"
          @click="onExportXls"
          v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:exportXls')"
        >
          导出</a-button
        >
        <j-upload-button
          type="primary"
          preIcon="ant-design:import-outlined"
          @click="onImportXls"
          v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:importExcel')"
          >导入</j-upload-button
        >
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:deleteBatch')">
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
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--状态显示栏-->
      <template #status="{ record, text }">
        <a-tag color="pink" v-if="record.status == 0">无效</a-tag>
        <a-tag color="#87d068" v-if="record.status == 1">有效</a-tag>
      </template>
      <!--连接状态显示栏-->
      <template #connectStatus="{ record, text }">
        <a-tag color="pink" v-if="record.connectStatus == 0">异常</a-tag>
        <a-tag color="#87d068" v-if="record.connectStatus == 1">正常</a-tag>
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
    <CgDbConnectionInfoModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="cg-cgDbConnectionInfo" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import CgDbConnectionInfoModal from './components/CgDbConnectionInfoModal.vue';
  import { columns, searchFormSchema } from './CgDbConnectionInfo.data';
  import { list, deleteOne, saveOrUpdate, batchDelete, getImportUrl, getExportUrl, testConnection, updateConnectStatus } from './CgDbConnectionInfo.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { notification } = useMessage();

  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'CG数据库连接信息',
      api: list,
      columns,
      canResize: false,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
    },
    exportConfig: {
      name: 'CG数据库连接信息',
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
   * 测试连接事件
   */
  async function handleTestConnection(record: Recordable) {
    await testConnection(record.id)
      .then((res) => {
        updateConnectStatus(record.id, 1);
      })
      .catch(() => {
        // 单独更新此ID的连接状态
        updateConnectStatus(record.id, 0);
      });
    handleSuccess();
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
        auth: 'org.jeecg.modules.demo:cg_db_connection_info:edit',
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    const menuList = [
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
        auth: 'org.jeecg.modules.demo:cg_db_connection_info:delete',
      },
    ];
    // 若数据源数据类型为http， 则不显示测试按钮
    if (record.connectionType !== 'http') {
      // 头插入测试按钮
      menuList.unshift({
        label: '测试',
        onClick: handleTestConnection.bind(null, record),
      });
    }
    return menuList;
  }
</script>

<style scoped></style>
