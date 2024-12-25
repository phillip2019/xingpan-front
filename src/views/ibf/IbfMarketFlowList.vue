<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button v-auth="'org.jeecg.modules.demo:ibf_market_flow:add'" type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button v-auth="'org.jeecg.modules.demo:ibf_market_flow:exportXls'" type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button v-auth="'org.jeecg.modules.demo:ibf_market_flow:importExcel'" type="primary" preIcon="ant-design:import-outlined" :customRequest="customRequest" accept=".xls,.xlsx">导入</j-upload-button>
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
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
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
    <IbfMarketFlowModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="ibf-ibfMarketFlow" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import IbfMarketFlowModal from './components/IbfMarketFlowModal.vue';
  import { columns, searchFormSchema } from './IbfMarketFlow.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './IbfMarketFlow.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { useRoute } from 'vue-router';
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  // 获取路由实例
  const route = useRoute();
  // 获取business_version参数，如果URL中没有则默认为'BOSS'
  const businessVersion = computed(() => {
    const version = route.query.business_version as string;
    return version || 'BOSS';
  });
  //注册table数据
  const {
    prefixCls,
    tableContext,
    onExportXls,
    onImportXls: baseImportXls,
  } = useListPage({
    tableProps: {
      title: '业财一体-每日填报市场流量',
      api: (params) => {
        // 合并请求参数，添加business_version
        return list({
          ...params,
          businessVersion: businessVersion.value,
        });
      },
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
      name: '业财一体-每日填报市场流量',
      url: () => getExportUrl(businessVersion.value),
      params: {
        businessVersion: businessVersion.value,
      },
    },
    importConfig: {
      url: () => getImportUrl(businessVersion.value),
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
      business_version: businessVersion.value,
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
        auth: 'org.jeecg.modules.demo:ibf_market_flow:edit',
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
        auth: 'org.jeecg.modules.demo:ibf_market_flow:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  /**
   * 自定义上传请求
   */
  function customRequest(options) {
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('businessVersion', businessVersion.value);
    baseImportXls(formData);
  }
</script>

<style scoped></style>
