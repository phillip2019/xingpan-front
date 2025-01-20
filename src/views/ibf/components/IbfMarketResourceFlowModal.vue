<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <PageWrapper title="">
      <Alert message="注：系统已自动计算指标数值，若与实际不符，请直接修改；对于无计算结果的，请直接填写。" show-icon />
      <BasicForm autoFocusFirstItem @register="registerForm" :actionColOptions="{ span: 24 }" :labelCol="{ span: 8 }" :labelAlign="'left'">
        <template #InputNumberSlot="{ model, field, values, schema, formModel, formActionType }">
          <InputNumber
            v-model:value="model[field]"
            :suffix="schema.componentProps?.suffix"
            :style="{ width: '100%' }"
            :addonAfter="schema.componentProps?.suffix"
          />
          <div class="calcu-value" v-if="modelClcu[field] !== undefined" @click="copyCalcuValue(modelClcu[field])">
            <span class="calcu-label">系统计算结果： </span>
            <span class="calcu-number">{{ modelClcu[field] }}</span>
          </div>
        </template>
      </BasicForm>
    </PageWrapper>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../IbfMarketResourceFlow.data';
  import { PageWrapper } from '/@/components/Page';
  import { Alert } from 'ant-design-vue';
  import { InputNumber } from 'ant-design-vue';
  import { saveOrUpdate } from '../IbfMarketResourceFlow.api';
  import { getSys } from '../IbfMarketResourceSys.api';
  import { message } from 'ant-design-vue';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);

  const modelClcu = ref({});
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
    if (unref(isUpdate)) {
      // 系统计算值
      modelClcu.value = await getSys({ monthCol: data?.record?.monthCol, shortMarketId: data?.record?.shortMarketId });
      //表单赋值
      await setFieldsValue({
        ...data.record,
        businessVersion: data?.business_version,
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

  // 复制计算值到剪贴板
  async function copyCalcuValue(value: string | number) {
    try {
      await navigator.clipboard.writeText(String(value));
      message.success('复制成功');
    } catch (err) {
      message.error('复制失败');
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

  .calcu-value {
    margin-top: 4px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
    }

    .calcu-label {
      color: #999;
    }

    // .calcu-number {
    // }
  }
</style>
