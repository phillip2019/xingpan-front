<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :loading="loading">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button
          type="primary"
          @click="handleAdd"
          preIcon="ant-design:plus-outlined"
          v-if="hasPermission('org.jeecg.modules.demo:et_bu_project:add')"
        >
          新增</a-button
        >
        <!--
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete" v-if="hasPermission('org.jeecg.modules.demo:et_bu_project:deleteBatch')">
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
    <EtBuProjectModal @register="registerModal" @success="handleSuccess" />
    <!--客户端事件关联抽屉-->
    <EtBuProjectEventRelDrawer @register="buProjectEventRelDrawer" />
  </div>
</template>

<script lang="ts" name="org.jeecg.et-etBuProject" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import EtBuProjectModal from './components/EtBuProjectModal.vue';
  import { columns, searchFormSchema } from './EtBuProject.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './EtBuProject.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import EtBuProjectEventRelDrawer from './components/EtBuProjectEventRelDrawer.vue';
  import { filterObj } from '/@/utils/common/compUtils';
  import { useMethods } from '/@/hooks/system/useMethods';
  import { usePermission } from '/@/hooks/web/usePermission';

  const loading = ref(false);
  const checkedKeys = ref<Array<string | number>>([]);
  const [buProjectEventRelDrawer, { openDrawer: openBuProjectEventRelDrawer }] = useDrawer();
  const { handleExportXls, handleCallbackExportXls, handleImportXls, handleExportZip } = useMethods();
  const { hasPermission } = usePermission();

  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'et_bu_project',
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
      name: 'et_bu_project',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { getForm, reload }, { rowSelection, selectedRowKeys }] = tableContext;

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
        label: '导出',
        onClick: onExportEvent.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:exportXls',
      },
      {
        label: '事件',
        onClick: handleBuProjectEventRelEvent.bind(null, record),
      },
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:edit',
      },
    ];
  }
  /**
   * 关联事件弹窗
   */
  function handleBuProjectEventRelEvent(record) {
    openBuProjectEventRelDrawer(true, { buProjectId: record.id });
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
        auth: 'org.jeecg.modules.demo:et_event:delete',
      },
    ];
  }

  // 导出成功回调方法
  function exportSuccessCal() {
    loading.value = false;
  }

  // 导出埋点文档
  function onExportEvent(record) {
    let realUrl = getExportUrl + '?id=' + record.id;
    loading.value = true;
    let title = record.name + '-埋点文档';
    let params = {};
    //update-begin-author:taoyan date:20220507 for: erp代码生成 子表 导出报错，原因未知-
    let paramsForm = {};
    try {
      paramsForm = getForm().validate();
    } catch (e) {
      console.error(e);
    }
    //update-end-author:taoyan date:20220507 for: erp代码生成 子表 导出报错，原因未知-
    //如果参数不为空，则整合到一起
    //update-begin-author:taoyan date:20220507 for: erp代码生成 子表 导出动态设置mainId
    if (params) {
      Object.keys(params).map((k) => {
        let temp = (params as object)[k];
        if (temp) {
          paramsForm[k] = unref(temp);
        }
      });
    }
    //update-end-author:taoyan date:20220507 for: erp代码生成 子表 导出动态设置mainId
    if (selectedRowKeys.value && selectedRowKeys.value.length > 0) {
      paramsForm['selections'] = selectedRowKeys.value.join(',');
    }
    return handleCallbackExportXls(title as string, realUrl, filterObj(paramsForm), exportSuccessCal);
  }
</script>

<style scoped></style>
