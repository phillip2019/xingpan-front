<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../MktChannelLink.data';
  import { saveOrUpdate } from '../MktChannelLink.api';
  import { cloneDeep } from 'lodash-es';
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
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    } else {
      if (data.record !== undefined) {
        const copyRecord = cloneDeep(toRaw(data.record));
        copyRecord.id = null;
        console.log('拷贝后的属性值为： ', copyRecord);
        // 复制逻辑，拷贝所有内容
        await setFieldsValue({
          ...copyRecord,
        });
      }
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
      let sourceUrl = values['sourceUrl'];
      var url = new URL(sourceUrl);
      // 使用URL对象的searchParams属性获取URLSearchParams对象
      var params = url.searchParams;
      if (params.size === 0) {
        params = new URLSearchParams();
      }
      console.log('当前请求参数: ', params);

      let utmCampaign = values['utmCampaign'];
      let utmSource = values['utmSource'];
      let utmMedium = values['utmMedium'];
      let utmTerm = values['utmTerm'];
      let utmContent = values['utmContent'];
      let targetUrl = `${sourceUrl}`;
      params.append('utm_campaign', utmCampaign);
      params.append('utm_source', utmSource);
      params.append('utm_medium', utmMedium);
      params.append('utm_term', utmTerm);
      params.append('utm_content', utmContent);
      url.search = params.toString();

      // 若为pc，则参数不需要转码
      targetUrl = url.href;
      values['targetUrl'] = targetUrl;
      console.log('待提交参数值： ', values);
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
