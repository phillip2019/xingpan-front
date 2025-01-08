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
          v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:add')"
        >
          新增</a-button
        >
        <a-button
          type="primary"
          preIcon="ant-design:export-outlined"
          @click="onExportXls"
          v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:exportXls')"
        >
          导出</a-button
        >
        <j-upload-button
          type="primary"
          preIcon="ant-design:import-outlined"
          @click="onImportXls"
          v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:importExcel')"
          >导入</j-upload-button
        >
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:deleteBatch')">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleOffline" v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:updateBatch')">
                <Icon icon="ant-design:offline-outlined" />
                下线
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleOnline" v-if="hasPermission('org.jeecg.modules.demo:mkt_channel_link:updateBatch')">
                <Icon icon="ant-design:online-outlined" />
                上线
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
      <!--二维码插槽: pcQrCode-->
      <template #pcQrCode="{ record, text }">
        <QrCode v-if="text !== null" :value="text" :width="200" ref="pcQrRef" shape="square" style="marginright: '1px'" :logo="LogoImg" />
      </template>
      <!--二维码插槽: wapQrCode-->
      <template #wapQrCode="{ record, text }">
        <QrCode v-if="text !== null" :value="text" :width="200" ref="wapQrRef" shape="square" style="marginright: '1px'" :logo="LogoImg" />
      </template>
      <!--状态显示栏-->
      <template #status="{ record, text }">
        <a-tag color="gray" v-if="text == 0">初始化</a-tag>
        <a-tag color="#87d068" v-if="text == 1">上线</a-tag>
        <a-tag color="pink" v-if="text == 2">下线</a-tag>
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
    <MktChannelLinkModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="mkt-mktChannelLink" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import MktChannelLinkModal from './components/MktChannelLinkModal.vue';
  import { columns, searchFormSchema } from './MktChannelLink.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, saveOrUpdate, batchUpdate } from './MktChannelLink.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { QrCode, QrCodeActionType } from '/@/components/Qrcode/index';
  import { Row, message } from 'ant-design-vue';
  import clipboard from 'clipboard';
  import LogoImg from '/@/assets/images/ccc-logo.png';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { cloneDeep } from 'lodash-es';

  const { hasPermission } = usePermission();
  const checkedKeys = ref<Array<string | number>>([]);
  const pcQrRef = ref<Nullable<QrCodeActionType>>(null);
  const wapQrRef = ref<Nullable<QrCodeActionType>>(null);

  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '营销渠道链接',
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
        fieldMapToTime: [
          ['createTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD HH:mm:ss'],
          ['updateTime', ['updateTime_begin', 'updateTime_end'], 'YYYY-MM-DD HH:mm:ss'],
        ],
      },
      pagination: {
        pageSize: 10,
        defaultPageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
        defaultCurrent: 1,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      actionColumn: {
        width: 240,
        fixed: 'right',
      },
    },
    exportConfig: {
      name: '营销渠道链接',
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
   * 下线事件
   */
  function handleOffline(record: Recordable) {
    // 下线
    record.status = 2;
    saveOrUpdate(record, true);
    handleSuccess();
  }
  /**
   * 上线事件
   */
  function handleOnline(record: Recordable) {
    // 下线
    record.status = 1;
    saveOrUpdate(record, true);
    handleSuccess();
  }
  /**
   * 复制目标地址事件
   */
  function handleCopyPCTargetUrl(record: Recordable) {
    record.pcTargetUrl && clipboard.copy(record.pcTargetUrl);
    message.success('复制成功');
  }
  /**
   * 复制wap端目标地址事件
   */
  function handleCopyWAPTargetUrl(record: Recordable) {
    record.wapTargetUrl && clipboard.copy(record.wapTargetUrl);
    message.success('复制成功');
  }
  /**
   * 复制目标地址事件
   */
  function handleCopy(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: false,
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
   * 批量下线事件
   */
  async function batchHandleOffline() {
    await batchUpdate({ ids: selectedRowKeys.value, status: 2 }, handleSuccess);
  }
  /**
   * 批量上线事件
   */
  async function batchHandleOnline() {
    await batchUpdate({ ids: selectedRowKeys.value, status: 1 }, handleSuccess);
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
        label: 'PC链复制',
        onClick: handleCopyPCTargetUrl.bind(null, record),
      },
      {
        label: 'M链复制',
        onClick: handleCopyWAPTargetUrl.bind(null, record),
      },
      {
        label: '复制',
        onClick: handleCopy.bind(null, record),
      },
    ];
  }

  function handleWAPDownload(record: any) {
    const qrEl = unref(wapQrRef);
    if (!qrEl) return;
    const qrCodeFileName = `${record.utmCampaign}-${record.utmTerm}-${record.utmContent}_wap.png`;
    qrEl.download(qrCodeFileName);
  }

  function handlePCDownload(record: any) {
    const qrEl = unref(pcQrRef);
    if (!qrEl) return;
    const qrCodeFileName = `${record.utmCampaign}-${record.utmTerm}-${record.utmContent}_pc.png`;
    qrEl.download(qrCodeFileName);
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'org.jeecg.modules.demo:mkt_channel_link:edit',
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'WAP二维码',
        onClick: handleWAPDownload.bind(null, record),
      },
      {
        label: 'PC二维码',
        onClick: handlePCDownload.bind(null, record),
      },
      {
        label: '下线',
        onClick: handleOffline.bind(null, record),
        auth: 'org.jeecg.modules.demo:mkt_channel_link:edit',
      },
      {
        label: '上线',
        onClick: handleOnline.bind(null, record),
        auth: 'org.jeecg.modules.demo:mkt_channel_link:edit',
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
        auth: 'org.jeecg.modules.demo:mkt_channel_link:delete',
      },
    ];
  }
</script>

<style scoped></style>
