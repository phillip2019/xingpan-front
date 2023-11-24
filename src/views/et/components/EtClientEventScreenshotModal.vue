<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" @paste="handlePaste" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../EtClientEventScreenshot.data';
  import { saveOrUpdate } from '../EtClientEventScreenshot.api';
  import { message } from 'ant-design-vue';
  import { uploadFile, uploadUrl } from '/@/api/common/api';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const clientIdOptionsRef = ref([]);
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: formSchema(clientIdOptionsRef),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const clientIdOptionsData = toRaw(data.clientIdOptions);

    console.log('客户端id选项: ', clientIdOptionsData);
    clientIdOptionsRef.value = clientIdOptionsData;
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
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

  // 监听粘贴操作
  function handlePaste(event) {
    console.log('监听粘贴操作');
    const items = (event.clipboardData || window.clipboardData).items;
    // 获取文件
    // console.dir(event.clipboardData.files);
    // 获取文本
    // console.dir(event.clipboardData.getData('text'));
    let file = null;
    if (!items || items.length === 0) {
      message.error('当前浏览器不支持本地');
      return;
    }
    // 搜索剪切板items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        // console.log('获取微信截图内容', items[i].getAsFile);
        file = items[i].getAsFile();
        break;
      }
    }
    if (!file) {
      message.error('粘贴内容非图片');
      return;
    }
    //   // 此时file就是我们的剪切板中的图片对象
    // 如果需要预览，可以执行下面代码
    // const reader = new FileReader();
    // reader.onload = event => {
    //     preview.innerHTML = `<img src="${event.target.result}">`;
    //   };
    //   reader.readAsDataURL(file);
    //   this.file = file;
    // },
    const uploadSuccess = (res) => {
      if (res.success) {
        if (res.message == 'local') {
          const img = 'data:image/jpeg;base64,' + file?.base64();
        } else {
          let imgPath = res.message;
          setFieldsValue({
            screenshot: imgPath,
          });
          message.info('图片上传成功');
          // let img = getFileAccessHttpUrl(res.message);
          // 更新form上传图片地址
        }
      }
    };
    // 上传文件，获取上传文件路径
    uploadFile(
      {
        file: file,
        biz: 'temp',
      },
      uploadSuccess
    );
    // //上传文件成功后回调
    //  uploadPlans() {
    //   let file = this.file;
    //   if (!file) {
    //     this.$message.error("请粘贴图片后上传");
    //     return;
    //   }
    //   this.loading = true;
    //   let form = new FormData();
    //   form.append("file", file);
    //   form.append("type", this.type);
    // //uploadCertificate是封装的axios请求，自己根据需求传参
    //   uploadCertificate(form).then(data => {
    //       if (data.data && data.data.success) {
    //         this.certificate_pic = data.data.data.source;
    //         this.$message.success(this.name + "上传成功！");
    //       } else {
    //         this.$message.error(this.name + "上传失败！");
    //       }
    //     }).catch(() => {});
    // }
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

function success(img: string) {
  throw new Error('Function not implemented.');
}

function success(img: any) {
  throw new Error('Function not implemented.');
}
