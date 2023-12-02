<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-dbClick="doubleClick">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <a-button type="primary" preIcon="ant-design:search-outlined" href="/et/teUaeChinagoodsList" target="_blank">埋点验证</a-button>
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyDistinctFunc">复制用户编号</a-button>
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyAnonymousIdFunc">复制设备编号</a-button>
        <!-- <a-button type="primary" preIcon="ant-design:export-outlined" v-if="anonymousId !== ''">设备编号</a-button> -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div>{{ text }}</div>
      </template>

      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <UaeChinagoodsModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="et-uaeChinagoods" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useDrawer } from '/@/components/Drawer';
  import UaeChinagoodsModal from './components/UaeChinagoodsModal.vue';
  import { columns, searchFormSchema } from './UaeChinagoods.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './UaeChinagoods.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { copyDistinct, copyAnonymousId } from '/@/utils/sa/tools';

  const copyDistinctFunc = copyDistinct;
  const copyAnonymousIdFunc = copyAnonymousId;

  //注册model
  const [registerModal, { openDrawer: openModal }] = useDrawer();
  //注册table数据
  const { tableContext, onExportXls } = useListPage({
    tableProps: {
      title: '埋点',
      api: list,
      columns,
      rowKey: 'trackId',
      canResize: false,
      striped: true,
      clickToRowSelect: false,
      showIndexColumn: false,
      formConfig: {
        labelWidth: 80,
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
      pagination: {
        current: 1,
        pageSize: 100,
        pageSizeOptions: ['50', '100', '200'],
      },
    },
    exportConfig: {
      name: '埋点事件',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { selectedRowKeys, rowSelection }] = tableContext;
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 双击查看详情
   */
  function doubleClick(record: Recordable<any>, index: any) {
    handleDetail(record);
  }
  /**
   * 成功回调
   */
  function handleSuccess(): void {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record: any) {
    return [
      {
        label: '查看',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }
</script>

<style scoped></style>
