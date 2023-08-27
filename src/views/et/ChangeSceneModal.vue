<template>
  <BasicModal v-bind="$attrs" @register="changeSceneModal" title="修改事件场景" :height="200" @ok="handleSubmit">
    <BasicForm @register="registerForm" :height="200" />
  </BasicModal>
</template>
<script lang="ts" name="ChangeSceneModal" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { changeSceneSchema } from './EtEvent.data';
  import { batchUpdate, syncBatchUpdate } from './EtEvent.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const ids = ref('');
  const oldScene = ref('');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: changeSceneSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [changeSceneModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //获取事件id
    ids.value = data.ids;
    oldScene.value = data.oldScene;
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    //表单赋值
    await setFieldsValue({ ...data });
  });
  //表单提交事件
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await syncBatchUpdate(values);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
