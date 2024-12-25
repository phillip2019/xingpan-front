<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" @formValuesChange="handleFormValuesChange"/>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../IbfMarketResource.data';
  import { saveOrUpdate } from '../IbfMarketResource.api';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
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
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    } else {
      //新增时，使用传入的business_version
      await setFieldsValue({
        businessVersion: data.business_version,
      });
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      // 若id为空，则新增
      let isUpdateFlag = false;
      if (values.id) {
        isUpdateFlag = true;
      }
      //提交表单
      await saveOrUpdate(values, isUpdateFlag);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  // 处理表单值变化
  function handleFormValuesChange(changedValues: Recordable) {
    // 当月份发生变化时
    if ('monthCol' in changedValues) {
      const monthCol = changedValues.monthCol;
      if (monthCol) {
        // 设置所有统计日期为当月20号
        const statisticsDate = `${monthCol}-20`;
        setFieldsValue({
          resourceStatisticsDate: statisticsDate,
          merchantStatisticsDate: statisticsDate,
          remainRentRateStatisticsDate: statisticsDate,
          renewLeaseRateStatisticsDate: statisticsDate,
        });
      }
    }
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
