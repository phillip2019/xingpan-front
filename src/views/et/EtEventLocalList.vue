<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-dbClick="doubleClick">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!--<a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>-->
        <!--<a-dropdown v-if="selectedRowKeys.length > 0">
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--可复制插槽: copySlot-->
      <template #copySlot="{ text }">
        <span @click="handleClipboardCopy(text)">{{ text }}</span>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <!--状态显示栏-->
      <template #status="{ record, text }">
        <a-tag color="#87d068" v-if="text === 'true'">是</a-tag>
        <a-tag color="pink" v-if="text === 'false' || text === ''">否</a-tag>
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <EtEventLocalModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="et-etEventLocal" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  import EtEventLocalModal from './components/EtEventLocalModal.vue';
  import { columns, searchFormSchema } from './EtEventLocal.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './EtEventLocal.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import clipboard from 'clipboard';
  import { message } from 'ant-design-vue';

  const checkedKeys = ref<Array<string | number>>([]);

  const [registerModal, { openDrawer: openModal }] = useDrawer();

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'CK中实时埋点事件',
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
      name: 'CK中实时埋点事件',
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

  /**
   * 属性成功回调
   */
  function handleClipboardCopy(value) {
    // 使用 clipboard 插件复制值
    clipboard.copy(value);
    message.success('复制成功');
  }

  /**
   * 属性成功回调
   */
  function handleEventPropertyListSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 双击查看事件属性
   */
  function doubleClick(record, index) {
    handleDetail(record);
  }
</script>

<style scoped></style>
