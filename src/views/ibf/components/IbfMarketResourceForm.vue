<template>
  <div style="height: 400px">
    <BasicForm @register="registerForm" />
    <div style="width: 100%; text-align: center" v-if="!formDisabled">
      <a-button @click="submitForm" pre-icon="ant-design:check" type="primary">提 交</a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { computed, defineComponent } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { propTypes } from '/@/utils/propTypes';
  import { getBpmFormSchema } from '../IbfMarketResource.data';
  import { saveOrUpdate } from '../IbfMarketResource.api';

  export default defineComponent({
    name: 'IbfMarketResourceForm',
    components: {
      BasicForm,
    },
    props: {
      formData: propTypes.object.def({}),
      formBpm: propTypes.bool.def(true),
    },
    setup(props) {
      const [registerForm, { setFieldsValue, setProps, getFieldsValue }] = useForm({
        labelWidth: 150,
        schemas: getBpmFormSchema(props.formData),
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
      });

      const formDisabled = computed(() => {
        if (props.formData.disabled === false) {
          return false;
        }
        return true;
      });

      let formData = {};
      const queryByIdUrl = '/ibf/ibfMarketResource/queryById';
      async function initFormData() {
        let params = { id: props.formData.dataId };
        const data = await defHttp.get({ url: queryByIdUrl, params });
        formData = { ...data };
        console.log('formData.................', formData);
        //设置表单的值
        await setFieldsValue(formData);
        //默认是禁用
        await setProps({ disabled: formDisabled.value });
      }

      async function submitForm() {
        let data = getFieldsValue();
        let params = Object.assign({}, formData, data);
        console.log('表单数据', params);
        await saveOrUpdate(params, true);
      }

      initFormData();

      return {
        registerForm,
        formDisabled,
        submitForm,
      };
    },
  });
</script>
