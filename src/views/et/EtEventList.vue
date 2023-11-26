<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @row-dbClick="doubleClick">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined" v-if="hasPermission('org.jeecg.modules.demo:et_event:add')">
          新增</a-button
        >
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button
          type="primary"
          preIcon="ant-design:import-outlined"
          v-if="hasPermission('org.jeecg.modules.demo:et_event:importExcel')"
          @click="onImportXls"
          >导入
        </j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleUpdateOnline" v-if="hasPermission('org.jeecg.modules.demo:et_event:updateBatch')">
                <Icon icon="ant-design:delete-outlined" />
                上线
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleUpdateOffline" v-if="hasPermission('org.jeecg.modules.demo:et_event:updateBatch')">
                <Icon icon="ant-design:delete-outlined" />
                下线
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleUpdateScene" v-if="hasPermission('org.jeecg.modules.demo:et_event:updateBatch')">
                <Icon icon="ant-design:delete-outlined" />
                更改场景名称
              </a-menu-item>
              <a-menu-item key="1" @click="batchHandleDelete" v-if="hasPermission('org.jeecg.modules.demo:et_event:deleteBatch')">
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
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyDistinctFunc">复制用户编号</a-button>
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyAnonymousIdFunc">复制设备编号</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--状态显示栏-->
      <template #status="{ record, text }">
        <a-tag color="gray" v-if="text == 0">未知</a-tag>
        <a-tag color="white" v-if="text == 1">初始化</a-tag>
        <a-tag color="#87d068" v-if="text == 2">上线</a-tag>
        <a-tag color="pink" v-if="text == 3">下线</a-tag>
        <a-tag color="red" v-if="text == 1">异常</a-tag>
      </template>
      <!--客户端显示栏-->
      <template #clientNameTag="{ record, text }">
        <a-tag color="green" v-if="text?.includes('pc')">pc</a-tag>
        <a-tag color="blue" v-if="text?.includes('wap')">wap</a-tag>
        <a-tag color="grey" v-if="text?.includes('Android')">Android</a-tag>
        <a-tag color="red" v-if="text?.includes('ios')">ios</a-tag>
        <a-tag color="pink" v-if="text?.includes('h5')">h5</a-tag>
        <a-tag color="yellow" v-if="text?.includes('mini_programs')">mini_programs</a-tag>
      </template>
      <!--可复制插槽: copySlot-->
      <template #copySlot="{ text }">
        <JEllipsis :value="text" :length="20" @click="handleClipboardCopy(text)" />
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
      <!--截图插槽: screenshot-->
      <template #screenshot="{ text }">
        <Image :preview="{ visible: false }" shape="square" :src="getFileAccessHttpUrl(text[0]?.screenshot)" @click="visible = true" />
        <div style="display: none">
          <ImagePreviewGroup :preview="{ visible, onVisibleChange: (vis) => (visible = vis) }">
            <!--迭代text对象数组，以便循环展示图片-->
            <Image v-for="(item, index) in text" :key="index" :src="getFileAccessHttpUrl(item.screenshot)" />
            <!-- <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" /> -->
          </ImagePreviewGroup>
        </div>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <EtEventModal @register="registerModal" @success="handleSuccess" />
    <!-- 表单属性区域 -->
    <EtEventPropertyListModal @register="eventPropertyListModal" @success="handleEventPropertyListSuccess" ref="refEventPropertyListModal" />
    <!--事件图片区域-->
    <!-- <EtClientEventScreenshotListModal
      @register="clientEventScreenshotListModal"
      @success="handleClientEventScreenshotListSuccess"
      ref="refClientEventScreenshotListModal"
    /> -->
    <!--修改场景弹窗-->
    <ChangeSceneModal @register="changeEventSceneModal" @success="reload" />
  </div>
</template>

<script lang="ts" name="et-etEvent" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Image, ImagePreviewGroup, Tag, Tooltip, message } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import EtEventModal from './components/EtEventModal.vue';
  import { useDrawer } from '/@/components/Drawer';
  import EtEventPropertyListModal from './EtEventPropertyListModal.vue';
  import ChangeSceneModal from './ChangeSceneModal.vue';
  import { columns, searchFormSchema } from './EtEvent.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, batchUpdate } from './EtEvent.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { JEllipsis } from '/@/components/Form';
  import clipboard from 'clipboard';
  import { copyDistinct, copyAnonymousId } from '/@/utils/sa/tools';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';

  const copyDistinctFunc = copyDistinct;
  const copyAnonymousIdFunc = copyAnonymousId;

  const visible = ref(false);
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal: openEventModal }] = useModal();
  //修改场景名model
  const [changeEventSceneModal, { openModal: openChangeSceneModal }] = useModal();
  //注册model
  const [eventPropertyListModal, { openDrawer: openEventPropertyListModal }] = useDrawer();

  const [clientEventScreenshotListModal, { openDrawer: openClientEventScreenshotListModal }] = useDrawer();
  const { hasPermission } = usePermission();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '埋点事件表',
      api: list,
      columns,
      canResize: true,
      formConfig: {
        //labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 180,
        fixed: 'right',
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

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  // function onSelectionChange(selectedRowKeys) {
  //   console.log('选择的列键值为: ', selectedRowKeys);
  //   // 过滤掉不可选择的行
  //   selectedRowKeys = selectedRowKeys.filter((r) => r.isPresetEvent !== 0);
  // }

  /**
   * 新增事件
   */
  function handleAdd() {
    openEventModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openEventModal(true, {
      record,
      isUpdate: true,
      isCopy: false,
      showFooter: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openEventModal(true, {
      record,
      isUpdate: true,
      isCopy: false,
      showFooter: false,
    });
  }

  /**
   * 复制
   */
  function handleCopy(record: Recordable) {
    openEventModal(true, {
      record,
      isUpdate: true,
      isCopy: true,
      showFooter: true,
    });
  }

  /**
   * 查看事件属性侧边栏
   */
  function handleEventPropertyModal(record: Recordable) {
    openEventPropertyListModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 查看埋点点位侧边栏
   */
  function handleClientEventScreenshotModal(record: Recordable) {
    openClientEventScreenshotListModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
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
   * 批量上线
   */
  async function batchHandleUpdateOnline() {
    await batchUpdate({ ids: selectedRowKeys.value, status: 2 }, handleSuccess);
  }
  /**
   * 批量下线
   */
  async function batchHandleUpdateOffline() {
    await batchUpdate({ ids: selectedRowKeys.value, status: 3 }, handleSuccess);
  }
  /**
   * 批量更改场景名称
   */
  async function batchHandleUpdateScene() {
    const sceneSet = new Set();
    for (let rowItem of rowSelection.selectedRows) {
      sceneSet.add(rowItem.scene);
    }
    const sceneStr = [...sceneSet].join(',');
    if (sceneSet.size > 1) {
      message.error('批量场景名称不相同，批量修改场景名称必须相同! 当前场景名称为： ' + sceneStr);
      return;
    }
    const ids = [...selectedRowKeys.value].join(',');
    openChangeSceneModal(true, { ids: ids, oldScene: sceneStr });
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 属性成功回调
   */
  function handleEventPropertyListSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 埋点点位成功回调
   */
  function handleClientEventScreenshotListSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    // 若为预置属性，则不允许更新
    if (record.isPresetEvent === 1) {
      return [];
    }
    return [
      {
        label: '复制',
        onClick: handleCopy.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:edit',
      },
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'org.jeecg.modules.demo:et_event:edit',
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
    const retArr = [
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
    if (record.isPresetEvent === 1) {
      retArr.pop();
    }
    return retArr;
  }

  /**
   * 双击查看事件属性
   */
  function doubleClick(record, index) {
    handleEventPropertyModal(record);
    // 打开查看埋点点位侧边栏
    // handleClientEventScreenshotModal(record);
  }
</script>

<style scoped></style>
