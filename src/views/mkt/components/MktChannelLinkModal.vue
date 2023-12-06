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

  function genAdvUrl(sourceUrl: string, record: any, isPc: boolean) {
    // 校验源地址是否是https或http开头，若不是，则添加上https或http开头
    if (!sourceUrl.startsWith('https://') && !sourceUrl.startsWith('http://')) {
      sourceUrl = 'https://' + sourceUrl;
    }
    var url = new URL(sourceUrl);
    var params = url.searchParams;
    if (params.size === 0) {
      params = new URLSearchParams();
    }

    let utmCampaign = record['utmCampaign'];
    let utmSource = record['utmSource'];
    let utmMedium = record['utmMedium'];
    let utmTerm = record['utmTerm'];
    let utmContent = record['utmContent'];
    params.append('utm_campaign', utmCampaign);
    params.append('utm_source', utmSource);
    params.append('utm_medium', utmMedium);
    params.append('utm_term', utmTerm);
    params.append('utm_content', utmContent);
    url.search = params.toString();
    return url.href;
  }

  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      let pcSourceUrl = values['pcSourceUrl'];
      let wapSourceUrl = values['wapSourceUrl'];
      let pcTargetUrl = genAdvUrl(pcSourceUrl, values, true);
      let wapTargetUrl = genAdvUrl(wapSourceUrl, values, false);

      values['pcTargetUrl'] = pcTargetUrl;
      values['wapTargetUrl'] = wapTargetUrl;
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
