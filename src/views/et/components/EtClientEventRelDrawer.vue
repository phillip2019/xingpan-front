<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="客户端事件关联" width="650px" destroyOnClose showFooter>
    <BasicTree
      ref="treeRef"
      checkable
      toolbar
      :treeData="treeData"
      :checkedKeys="checkedKeys"
      :expandedKeys="allTreeKeys"
      :selectedKeys="selectedKeys"
      :checkStrictly="true"
      :clickRowToExpand="false"
      title="客户端所关联的事件"
      @check="onCheck"
      @select="onTreeNodeSelect"
    >
      <template #title="{ slotTitle, ruleFlag }">
        {{ slotTitle }}
        <Icon v-if="ruleFlag" icon="ant-design:align-left-outlined" style="margin-left: 5px; color: red" />
      </template>
    </BasicTree>
    <!--右下角按钮-->
    <template #footer>
      <PopConfirmButton
        title="确定放弃编辑？"
        @confirm="closeDrawer"
        okText="确定"
        cancelText="取消"
        v-if="hasPermission('org.jeecg.modules.demo:et_event:saveClientEvent')"
        >取消</PopConfirmButton
      >
      <a-button
        @click="handleSubmit(false)"
        type="primary"
        :loading="loading"
        ghost
        style="margin-right: 0.8rem"
        v-if="hasPermission('org.jeecg.modules.demo:et_event:saveClientEvent')"
        >仅保存</a-button
      >
      <a-button @click="handleSubmit(true)" type="primary" :loading="loading" v-if="hasPermission('org.jeecg.modules.demo:et_event:saveClientEvent')"
        >保存并关闭</a-button
      >
    </template>

    <!-- 选择相应节点，展示节点相应抽屉-->
    <!-- <RoleDataRuleDrawer @register="registerDrawer1" /> -->
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicDrawer, useDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTree, TreeItem } from '/src/components/Tree';
  import { PopConfirmButton } from '/@/components/Button';
  // import RoleDataRuleDrawer from './RoleDataRuleDrawer.vue';
  // import { queryTreeListForRole, queryRolePermission, saveRolePermission } from '../role.api';
  import { queryTreeListForClient, queryClientEvent, saveClientEvent } from '../EtClient.api';
  import { usePermission } from '/@/hooks/web/usePermission';

  const { hasPermission } = usePermission();
  const emit = defineEmits(['register']);
  //树的信息
  const treeData = ref<TreeItem[]>([]);
  //树的全部节点信息
  const allTreeKeys = ref([]);
  //树的选择节点信息
  const checkedKeys = ref([]);
  const defaultCheckedKeys = ref([]);
  //树的选中的节点信息
  const selectedKeys = ref([]);
  const clientId = ref('');
  //树的实例
  const treeRef = ref(null);
  const loading = ref(false);

  // const [registerDrawer1, { openDrawer: openDataRuleDrawer }] = useDrawer();
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await reset();
    setDrawerProps({ confirmLoading: false, loading: true });
    clientId.value = data.clientId;
    //初始化数据
    const clientResult = await queryTreeListForClient();
    treeData.value = clientResult.treeList;
    allTreeKeys.value = clientResult.ids;
    //初始化客户端事件数据
    const eventResult = await queryClientEvent({ clientId: unref(clientId) });
    checkedKeys.value = eventResult;
    defaultCheckedKeys.value = eventResult;
    setDrawerProps({ loading: false });
  });
  /**
   * 点击选中
   */
  function onCheck(o) {
    checkedKeys.value = o.checked ? o.checked : o;
  }
  /**
   * 选中节点，打开数据权限抽屉
   */
  function onTreeNodeSelect(key) {
    if (key && key.length > 0) {
      selectedKeys.value = key;
    }
    // openDataRuleDrawer(true, { functionId: unref(selectedKeys)[0], clientId: unref(clientId) });
  }
  /**
   * 数据重置
   */
  function reset() {
    treeData.value = [];
    allTreeKeys.value = [];
    checkedKeys.value = [];
    defaultCheckedKeys.value = [];
    selectedKeys.value = [];
    clientId.value = '';
  }
  /**
   * 获取tree实例
   */
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  /**
   * 提交
   */
  async function handleSubmit(exit) {
    let params = {
      clientId: unref(clientId),
      eventIds: unref(getTree().getCheckedKeys()).join(','),
      lastEventIds: unref(defaultCheckedKeys).join(','),
    };
    loading.value = true;
    await saveClientEvent(params);
    loading.value = false;
    exit && closeDrawer();
  }
</script>

<style lang="less" scoped>
  /** 固定操作按钮 */
  .jeecg-basic-tree {
    position: absolute;
    width: 618px;
  }
</style>
