<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="eventPropertyListModal"
    :width="2 * adaptiveWidth"
    :helpMessage="['添加、修改、查看事件属性']"
    destroyOnClose
    title="事件属性和点位"
  >
    <a-row>
      <a-col :span="12">
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
        <EtEventPropertyModal @register="registerModal" @success="handleSuccess" />
      </a-col>
      <a-col :span="12">
        <!--引用表格-->
        <BasicTable @register="registerScreenshotTable" :rowSelection="rowSelectionScreenshot">
          <!--插槽:table标题-->
          <template #tableTitle>
            <a-button type="primary" @click="handleAddScreenshot" preIcon="ant-design:plus-outlined"> 新增</a-button>
            <a-dropdown v-if="selectedRowKeysScreenshot.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDeleteScreenshot">
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
            <TableAction :actions="getTableActionScreenshot(record)" :dropDownActions="getDropDownActionScreenshot(record)" />
          </template>
          <!--状态显示栏-->
          <template #status="{ record, text }">
            <a-tag color="green" v-if="text === 1">初始化</a-tag>
            <a-tag color="#87d068" v-if="text == 2">上线</a-tag>
            <a-tag color="pink" v-if="text == 3">下线</a-tag>
            <a-tag color="red" v-if="text == 4">异常</a-tag>
          </template>
          <!--可复制插槽: copySlot-->
          <template #copySlot="{ text }">
            <JEllipsis :value="text" :length="20" @click="handleClipboardCopy(text)" />
          </template>
          <!--截图插槽: screenshot-->
          <template #screenshot="{ text }">
            <Image :src="getFileAccessHttpUrl(text)" shape="square" :width="40" style="marginright: '1px'"/>
          </template>
          <!--字段回显插槽-->
          <template #htmlSlot="{ text }">
            <div>{{ text }}</div>
          </template>
          <template #fileSlot="{ text }">
            <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
            <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFileScreenshot(text)"
              >下载</a-button
            >
          </template>
        </BasicTable>
        <!-- 表单区域 -->
        <EtClientEventScreenshotModal @register="registerModalScreenshot" @success="handleSuccessScreenshot" />
      </a-col>
    </a-row>
  </BasicDrawer>
</template>

<script lang="ts" name="et-etEventProperty" setup>
  import { ref, computed, unref, Ref } from 'vue';
  import { Image, Tag, Tooltip, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import EtEventPropertyModal from './components/EtEventPropertyModal.vue';
  import { columns, searchFormSchema, formSchema, getBpmFormSchema } from './EtEventProperty.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './EtEventProperty.api';
  import { list as listClient } from './EtClient.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import { merge } from 'lodash-es';
  import { FormSchema, JEllipsis } from '/@/components/Form';
  import clipboard from 'clipboard';

  import EtClientEventScreenshotModal from './components/EtClientEventScreenshotModal.vue';
  import {
    columns as columnsScreenshot,
    searchFormSchema as searchFormSchemaScreenshot,
    formSchema as formSchemaScreenshot,
    getBpmFormSchema as getBpmFormSchemaScreenshot,
  } from './EtClientEventScreenshot.data';
  import {
    list as listScreenshot,
    deleteOne as deleteOneScreenshot,
    batchDelete as batchDeleteScreenshot,
    getImportUrl as getImportUrlScreenshot,
    getExportUrl as getExportUrlScreenshot,
  } from './EtClientEventScreenshot.api';

  // step1 引入useDrawerAdaptiveWidth方法
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { bool } from 'vue-types';
  // step2 获取到adaptiveWidth
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  // Emits声明
  const emit = defineEmits(['success', 'register']);
  const previewVisible = ref(false);
  const previewImage = ref('');
  const eventObj = ref();
  const eventId = ref('');
  const eventName = ref('');
  const eventZhName = ref('');
  const eventTriggerTiming = ref('');
  const clientList = ref([]) as Ref<Object[]>;
  const clientIdOptionsRef = ref([]);
  const searchFormSchemaScreenshotRef: FormSchema[] = searchFormSchemaScreenshot(clientIdOptionsRef);
  let clientIdOptionsDataSource = [];

  //父组件向子组件传递参数，初始化子组件
  const [eventPropertyListModal, { setModalProps, closeModal }] = useDrawerInner(async (data) => {
    eventId.value = data.record['id'];
    eventName.value = data.record['name'];
    eventZhName.value = data.record['zhName'];
    eventTriggerTiming.value = data.record['triggerTiming'];
    eventObj.value = data.record;

    // TODO 完成后续上传埋点点位功能
    // 传入event_id，获取客户端对应事件的client列表
    let eventListRsp = await listClient({ eventId: eventId.value });
    clientList.value = eventListRsp.records;
    const clientNameAndClientIdList: any = [];
    for (const clientObj of eventListRsp.records) {
      let url = clientObj.url ? clientObj.url : '';
      clientNameAndClientIdList.push({
        label: clientObj.name + `[${url}]`,
        value: clientObj.clientEventId,
      });
    }
    clientIdOptionsRef.value = clientNameAndClientIdList;
    clientIdOptionsDataSource = clientNameAndClientIdList;
  });

  const checkedKeys = ref<Array<string | number>>([]);
  const checkedKeysScreenshot = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '事件属性编辑',
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
        pageSize: 50,
        pageSizeOptions: ['30', '60', '90'],
      },
      beforeFetch: (params) => {
        // 默认以 createTime 降序排序
        merge(params, { column: 'sorted', order: 'asc' });
      },
    },
    exportConfig: {
      name: '事件属性',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  const [registerModalScreenshot, { openModal: openModalScreenshot }] = useModal();
  //注册table数据
  const {
    prefixCls: prefixClsScreenshot,
    tableContext: tableContextScreenshot,
    onExportXls: onExportXlsScreenshot,
    onImportXls: onImportXlsScreenshot,
  } = useListPage({
    tableProps: {
      title: '埋点点位编辑',
      api: (params) => {
        const finalParams = Object.assign({ eventId: eventId.value }, params);
        return listScreenshot(finalParams);
      },
      columns: columnsScreenshot,
      canResize: true,
      // 是否显示边框
      bordered: true,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchemaScreenshotRef,
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
      // beforeFetch: (params) => {
      //   // 默认以 createTime 降序排序
      //   merge(params, { column: 'sorted', order: 'asc' });
      // },
    },
    exportConfig: {
      name: '埋点点位',
      url: getExportUrlScreenshot,
    },
    importConfig: {
      url: getImportUrlScreenshot,
      success: handleSuccess,
    },
  });

  const [
    registerScreenshotTable,
    { reload: reloadScreenshot },
    { rowSelection: rowSelectionScreenshot, selectedRowKeys: selectedRowKeysScreenshot },
  ] = tableContextScreenshot;

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

  /**
   * 新增事件
   */
  function handleAddScreenshot() {
    const eventIdStr = eventId.value;
    openModalScreenshot(true, {
      eventId: eventIdStr,
      isUpdate: false,
      showFooter: true,
      clientIdOptions: clientIdOptionsRef.value,
    });
  }
  /**
   * 编辑事件
   */
  function handleEditScreenshot(record: Recordable) {
    openModalScreenshot(true, {
      record,
      isUpdate: true,
      showFooter: true,
      clientIdOptions: clientIdOptionsRef.value,
    });
  }
  /**
   * 详情
   */
  function handleDetailScreenshot(record: Recordable) {
    openModalScreenshot(true, {
      record,
      isUpdate: true,
      showFooter: false,
      clientIdOptions: clientIdOptionsRef.value,
    });
  }
  /**
   * 删除事件
   */
  async function handleDeleteScreenshot(record) {
    await deleteOneScreenshot({ id: record.id }, handleSuccessScreenshot);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDeleteScreenshot() {
    await batchDeleteScreenshot({ ids: selectedRowKeysScreenshot.value }, handleSuccessScreenshot);
  }
  /**
   * 成功回调
   */
  function handleSuccessScreenshot() {
    (selectedRowKeysScreenshot.value = []) && reloadScreenshot();
  }
  /**
   * 操作栏
   */
  function getTableActionScreenshot(record) {
    return [
      {
        label: '编辑',
        onClick: handleEditScreenshot.bind(null, record),
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownActionScreenshot(record) {
    return [
      {
        label: '详情',
        onClick: handleDetailScreenshot.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDeleteScreenshot.bind(null, record),
        },
      },
    ];
  }
</script>

<style scoped></style>
