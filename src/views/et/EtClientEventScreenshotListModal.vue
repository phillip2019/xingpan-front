<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="clientEventScreenshotListModal"
    :width="adaptiveWidth"
    :helpMessage="['添加、修改、查看埋点点位']"
    :placeholder="left"
    destroyOnClose
    title="埋点点位"
  >
    <div>
      <!--引用表格-->
      <BasicTable @register="registerTable" :rowSelection="rowSelection">
        <!--插槽:table标题-->
        <template #tableTitle>
          <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
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
          <a-tooltip placement="topLeft" :title="eventTriggerTiming">
            <a-button @click="handleClipboardCopy(eventName)">{{ eventName }}</a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" :title="eventTriggerTiming">
            <a-button @click="handleClipboardCopy(eventZhName)">{{ eventZhName }}</a-button>
          </a-tooltip>
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
          <div>{{ text }}</div>
        </template>
        <template #fileSlot="{ text }">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
          <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)"
            >下载</a-button
          >
        </template>
      </BasicTable>
      <!-- 表单区域 -->
      <EtClientEventScreenshotModal @register="registerModal" @success="handleSuccess" />
    </div>
  </BasicDrawer>
</template>

<script lang="ts" name="et-etClientEventScreenshot" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicDrawer, DrawerProps, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import EtClientEventScreenshotModal from './components/EtClientEventScreenshotModal.vue';
  import { columns, searchFormSchema, formSchema, getBpmFormSchema } from './EtClientEventScreenshot.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './EtClientEventScreenshot.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { merge } from 'lodash-es';
  import { JEllipsis } from '/@/components/Form';
  import clipboard from 'clipboard';
  import { message } from 'ant-design-vue';
  // step1 引入useDrawerAdaptiveWidth方法
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  // step2 获取到adaptiveWidth
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  const placement = ref<DrawerProps['placement']>('left');
  placement.value = 'left';

  // Emits声明
  const emit = defineEmits(['success', 'register']);
  const eventObj = ref();
  const eventId = ref('');
  const eventName = ref('');
  const eventZhName = ref('');
  const eventTriggerTiming = ref('');
  //父组件向子组件传递参数，初始化子组件
  const [clientEventScreenshotListModal, { setModalProps, closeModal }] = useDrawerInner(async (data) => {
    eventId.value = data.record['id'];
    eventName.value = data.record['name'];
    eventZhName.value = data.record['zhName'];
    eventTriggerTiming.value = data.record['triggerTiming'];
    eventObj.value = data.record;

    placement.value = 'left';
  });

  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '埋点点位编辑',
      api: (params) => {
        const finalParams = Object.assign({ eventId: eventId.value }, params);
        return list(finalParams);
      },
      columns,
      canResize: true,
      // 是否显示边框
      bordered: true,
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
      pagination: {
        current: 1,
        pageSize: 30,
        pageSizeOptions: ['30', '60', '90'],
      },
      beforeFetch: (params) => {
        // 默认以 createTime 降序排序
        merge(params, { column: 'sorted', order: 'asc' });
      },
    },
    exportConfig: {
      name: '埋点点位',
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
    const eventIdStr = eventId.value;
    openModal(true, {
      eventId: eventIdStr,
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
   * 属性成功回调
   */
  function handleClipboardCopy(value) {
    // 使用 clipboard 插件复制值
    clipboard.copy(value);
    message.success('复制成功');
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
</script>

<style scoped></style>
