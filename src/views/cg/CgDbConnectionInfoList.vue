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
              <a-menu-item key="1" @click="batchHandleTestConnection" v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:edit')">
                <Icon icon="ant-design:delete-outlined" />
                测试
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleCheckEngineVersion" v-if="hasPermission('org.jeecg.modules.demo:cg_db_connection_info:edit')">
                <Icon icon="ant-design:delete-outlined" />
                检测引擎版本
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
      <!--可复制插槽: copySlot-->
      <template #copySlot="{ text }">
        <JEllipsis :value="text" :length="20" @click="handleClipboardCopy(text)" />
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
  import { Image, ImagePreviewGroup, Tag, Tooltip, message } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { cloneDeep } from 'lodash-es';
  import { useListPage } from '/@/hooks/system/useListPage';
  import CgDbConnectionInfoModal from './components/CgDbConnectionInfoModal.vue';
  import { columns, searchFormSchema } from './CgDbConnectionInfo.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
    testConnection,
    updateConnectStatus,
    getJdbcURI,
    syncAirflowConnection,
    batchTestConnection,
    batchUpdateConnectionVersion,
  } from './CgDbConnectionInfo.api';
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
      title: 'CG数据库连接信息',
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
   * 复制
   */
  function handleCopy(record: Recordable) {
    // 拷贝record记录，排除ID字段
    const recordCopy = cloneDeep(record);
    recordCopy.id = '';
    recordCopy.password = '';
    recordCopy.connectionId = `${recordCopy.connectionId}_copy`;
    openModal(true, {
      record: recordCopy,
      isUpdate: true,
      isCopy: true,
      showFooter: true,
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
   * 复制JDBC URI事件
   */
  async function handleJdbcUrl(record) {
    const jdbcURI = await getJdbcURI(record.id);
    clipboard.copy(jdbcURI);
  }

  /**
   * 同步airflow连接事件
   */
  async function handleSyncAirflowConnection(record) {
    await syncAirflowConnection(record.id);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 批量连通性测试事件
   */
  async function batchHandleTestConnection() {
    await batchTestConnection({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 批量检查数据库版本事件
   */
  async function batchHandleCheckEngineVersion() {
    await batchUpdateConnectionVersion({ ids: selectedRowKeys.value }, handleSuccess);
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
        label: '复制',
        onClick: handleCopy.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:edit',
      },
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'org.jeecg.modules.demo:cg_db_connection_info:edit',
      },
    ];
    // 若数据源数据类型为http， 则不显示测试按钮
    if (record.connectionType !== 'http') {
      // 头插入测试按钮
      menuList.unshift({
        label: '测试',
        onClick: handleTestConnection.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:edit',
      });
    }
    return menuList;
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
    // 若不为http、redis、mongodb，则插入JDBC URI按钮
    if (record.connectionType !== 'http' && record.connectionType !== 'redis' && record.connectionType !== 'mongodb') {
      menuList.push({
        label: 'JDBC URI',
        onClick: handleJdbcUrl.bind(null, record),
      });
      menuList.push({
        label: '同步Airflow',
        onClick: handleSyncAirflowConnection.bind(null, record),
      });
    }
    return menuList;
  }

  /**
   * 属性成功回调
   */
  function handleClipboardCopy(value) {
    // 使用 clipboard 插件复制值
    // 若是字符串，则直接拷贝
    // 若是number，则转换成字符串，再进行拷贝
    clipboard.copy(typeof value === 'string' ? value : String(value));
    message.success('复制成功');
  }
</script>

<style scoped></style>
