<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <template #centerFooter="">
      <a-button type="dashed" @click="handleTestConnection" v-if="recordData?.connectionType !== 'http'">测试</a-button>
    </template>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../TbRestMerchantRelation.data';
  import { queryById, saveOrUpdate, testConnection2 } from '../TbRestMerchantRelation.api';
  import { message } from 'ant-design-vue';

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isCopy = ref(false);
  const recordData = ref({ id: '', connectionType: '' });
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    isCopy.value = !!data?.isCopy;
    if (unref(isUpdate)) {
      recordData.value = data.record;
      let record = data.record;
      record = await queryById(data.record.id);
      //表单赋值
      await setFieldsValue({
        ...record,
      });
    } else if (unref(isCopy)) {
      recordData.value = data.record;
      let record = data.record;
      //表单赋值
      await setFieldsValue({
        ...record,
      });
    } else {
      recordData.value = { id: '', connectionType: '' };
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => {
    if (unref(isCopy)) {
      return '复制';
    }
    return !unref(isUpdate) ? '新增' : '编辑';
  });

  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /**
   * 测试连接事件
   */
  async function handleTestConnection() {
    let values = await validate();
    // 先将连接状态置为0：异常
    setFieldsValue({ ...{ connectStatus: '0' } });
    await testConnection2(values)
      .then((_) => {
        setFieldsValue({ ...{ connectStatus: '1' } });
        values.connectStatus = 1;
      })
      .catch(() => {
        setFieldsValue({ ...{ connectStatus: '0' } });
      });
    // handleSuccess();
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
