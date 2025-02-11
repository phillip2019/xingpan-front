<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined" v-auth="'org.jeecg.modules.demo:ibf_reporting_summary:add'">
          新增</a-button
        >
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-auth="'org.jeecg.modules.demo:ibf_reporting_summary:deleteBatch'">
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
      <template #isPublish="{ record, text }">
        <a-tag color="blue" v-if="text === 0">可确认</a-tag>
        <a-tag color="#87d068" v-if="text === 1">发布</a-tag>
        <a-tag color="pink" v-if="text === 2">下线</a-tag>
        <a-tag color="gray" v-if="text === 3">过期</a-tag>
      </template>
      <!--可见状态显示栏-->
      <template #isVisible="{ record, text }">
        <a-tag color="#87d068" v-if="text === 1">可见</a-tag>
        <a-tag color="pink" v-if="text === 0">不可见</a-tag>
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
    <IbfReportingSummaryModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="ibf-ibfReportingSummary" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import IbfReportingSummaryModal from './components/IbfReportingSummaryModal.vue';
  import { columns, searchFormSchema } from './IbfReportingSummary.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
    copyRecord,
    publishRecord,
    getResourceUrl,
    getFinanceUrl,
  } from './IbfReportingSummary.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { message } from 'ant-design-vue';

  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '填报发布汇总',
      api: list,
      columns,
      canResize: false,
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
      actionColumn: {
        width: 300,
        fixed: 'right',
      },
    },
    exportConfig: {
      name: '填报发布汇总',
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
   * 复制事件
   */
  async function handleCopy(record) {
    await copyRecord({ id: record.id }, handleSuccess);
  }
  /**
   * 发布事件
   */
  async function handlePublish(record) {
    await publishRecord({ id: record.id }, handleSuccess);
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
    const actionArr: any[] = [];

    // 若记录是发布状态且未拷贝，则显示复制按钮
    // TODO 先隐藏复制按钮，避免解释成本
    if (record.isPublish === 1 && record.isCopy === 0 && record.isVisible === 1) {
      actionArr.push({
        label: '复制',
        auth: 'org.jeecg.modules.demo:ibf_reporting_summary:copy',
        onClick: handleCopy.bind(null, record),
      });
    }
    // 若记录为待发布状态，且flag为1，则显示发布按钮，可以进行发布
    // 12月特殊，12月是本月， flag为0且当前日期大于26号, 可以发布
    if (record.isPublish === 0 && record.isCopy === 1) {
      actionArr.push({
        label: '发布',
        auth: 'org.jeecg.modules.demo:ibf_reporting_summary:publish',
        onClick: handlePublish.bind(null, record),
      });
    }

    let resourceReportName = '预览资源';
    let financeReportName = '预览财务';
    // 若记录是核准状态，则显示资源总览预览
    if (record.isVisible === 1) {
      if (record.isPublish === 1) {
        resourceReportName = '资源总览';
        financeReportName = '财务总览';
      }
      actionArr.push({
        label: resourceReportName,
        onClick: handleResourceUrl.bind(null, record),
        auth: 'org.jeecg.modules.demo:ibf_reporting_summary:preview_resource',
      });

      actionArr.push({
        label: financeReportName,
        onClick: handleFinanceUrl.bind(null, record),
        auth: 'org.jeecg.modules.demo:ibf_reporting_summary:preview_finance',
      });
    }
    // actionArr.push({
    //   label: '编辑',
    //   onClick: handleEdit.bind(null, record),
    //   auth: 'org.jeecg.modules.demo:ibf_reporting_summary:edit',
    // });
    return actionArr;
  }
  /**
   * 获取资源总览链接
   */
  async function handleResourceUrl(record) {
    const res = await getResourceUrl();
    console.log('资源总览链接为...', res);
    // 打开新页面
    window.open(res + '&isPublish=' + record.isPublish + '&flag=' + record.flag, '_blank');
  }

  /**
   * 获取财务总览链接
   */
  async function handleFinanceUrl(record) {
    const res = await getFinanceUrl();
    console.log('财务总览链接为...', res);
    // 打开新页面
    window.open(res + '&isPublish=' + record.isPublish + '&flag=' + record.flag, '_blank');
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    const actionArr: any[] = [];
    actionArr.push({
      label: '详情',
      onClick: handleDetail.bind(null, record),
    });
    // 若记录状态为核准状态，且创建人不是系统，则显示删除按钮
    if (record.isPublish === 0 && record.createBy !== 'system') {
      actionArr.push({
        label: '删除',
        popConfirm: {
          title: '是否确认删除和待校准的数据记录',
          auth: 'org.jeecg.modules.demo:ibf_reporting_summary:delete',
          confirm: handleDelete.bind(null, record),
        },
      });
    }
    return actionArr;
  }
</script>

<style scoped></style>
