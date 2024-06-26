<template>
  <div class="p-4">
    <!--用户编号、设备编号、ip地址查询框，点击开始验证按钮开始验证-->
    <CollapseContainer title="查询区" :canExpan="true">
      <BasicForm
        autoFocusFirstItem
        @register="registerForm"
        :labelWidth="250"
        :schemas="teSearchSchemas"
        :actionColOptions="{ span: 8 }"
        :labelCol="{ span: 8 }"
        :showResetButton="false"
        @submit="handleSubmit"
      />
    </CollapseContainer>
    <BasicTable
      :canResize="true"
      title="生产埋点验证"
      titleHelpMessage="生产环境埋点验证，无需手动刷新，后台自动将埋点数据推送到前端"
      :useSearchForm="false"
      ref="tableRef"
      :columns="columns"
      :dataSource="data"
      rowKey="id"
      :striped="striped"
      :bordered="border"
      showTableSetting
      :rowSelection="{ type: 'checkbox' }"
      :pagination="{ pageSize: 100 }"
      @row-dbClick="doubleClick"
    >
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyDistinctFunc">复制用户编号</a-button>
        <a-button type="primary" preIcon="ant-design:copy-outlined" @click="copyAnonymousIdFunc">复制设备编号</a-button>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <UaeChinagoodsModal @register="registerModal" />
  </div>
</template>
<script lang="ts">
  import { BasicTable, TableActionType } from '/@/components/Table';
  import { columns, teSearchSchemas } from './UaeChinagoods.data';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import UaeChinagoodsModal from './components/UaeChinagoodsModal.vue';
  import { defineComponent, ref, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useUserStore } from '/@/store/modules/user';
  import { useDrawer } from '/@/components/Drawer';
  import { getToken } from '/@/utils/auth';
  import { copyDistinct, copyAnonymousId } from '/@/utils/sa/tools';
  import md5 from 'crypto-js/md5';

  export default defineComponent({
    name: 'TeUaeChinagoodsList',
    components: { BasicTable, CollapseContainer, BasicForm, UaeChinagoodsModal },
    emits: ['next', 'prev'],
    setup(_, {}) {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const dataList = ref<any[]>([]);
      const websock = ref<any>();
      const striped = ref(true);
      const border = ref(true);
      const isLoadingFlag = ref(false);
      const { createMessage } = useMessage();
      const userStore = useUserStore();
      const glob = useGlobSetting();
      const submitButtonOptions = ref({
        text: '验证',
        loading: false,
        style: {
          float: 'left', // 设置按钮靠左对齐
          marginLeft: 0, // 如果需要进一步调整左边距，可以在这里设置
        },
      });

      //注册model
      const [registerModal, { openDrawer: openModal }] = useDrawer();

      const [registerForm] = useForm({
        labelWidth: 100,
        schemas: teSearchSchemas,
        baseColProps: {
          span: 6,
        },
        actionColOptions: {
          span: 8,
        },
        submitButtonOptions: submitButtonOptions,
      });

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }
      function changeLoading() {
        getTableAction().setLoading(true);
        setTimeout(() => {
          getTableAction().setLoading(false);
        }, 1000);
      }

      // 假设有一个urlBuilder组件
      function urlBuilder(baseURL, params) {
        // 在组件内部处理参数对象
        const queryString = Object.keys(params)
          .filter((key) => params[key] !== undefined)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join('&');

        // 构建最终的URL链接
        const finalURL = baseURL + (queryString.length > 0 ? `?${queryString}` : '');

        return finalURL;
      }

      function initWebSocket(formValues) {
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        // var userId = store.getters.userInfo.id;
        let token = getToken();
        let wsClientId = md5(token);
        let userId = unref(userStore.getUserInfo).id + '_' + wsClientId;
        // console.log('请求搜索参数为: ')
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        let url = glob.domainUrl?.replace('https://', 'wss://').replace('http://', 'ws://') + '/et/ws/' + userId;
        url = urlBuilder(url, formValues);

        websock.value = new WebSocket(url);
        websock.value.onopen = websocketonopen;
        websock.value.onerror = websocketonerror;
        if (websock.value) {
          websock.value.onmessage = websocketonmessage;
          websock.value.onclose = websocketclose;
        }
      }

      function websocketonopen() {
        console.log('WebSocket连接成功');
        createMessage.info('埋点验证已开启，请开始埋点验证，访问需要验证的埋点点位，此处自动会推送埋点内容!!!');
      }

      function websocketonerror(e) {
        console.log('WebSocket连接发生错误', e);
        createMessage.error('埋点验证开启失败，请重新开始埋点验证!!!');
        submitButtonOptions.value.text = '验证';
      }
      function websocketonmessage(e) {
        JSON.parse(e.data).forEach((data: any) => {
          dataList.value.unshift(data);
        });
      }
      function websocketclose(e) {
        if (unref(websock)) {
          // 关闭WebSocket连接并提供关闭代码和关闭原因
          console.log('触发websocket连接关闭，用户自动断开连接!!!');
          // 发送自定义的关闭消息
          const closeMessage = {
            type: 'close_connection',
            reason: 'User requested disconnect',
          };
          websock.value.send(JSON.stringify(closeMessage));

          if (e && (e.code === 1006 || e.code === 1000) && e.readyState !== 1) {
            websock.value.close(1000, '用户主动断开连接');
          }
        }
        console.log('connection closed (' + e + ')');
      }

      /**
       * 详情
       */
      function handleDetail(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          showFooter: true,
        });
      }

      return {
        registerForm,
        tableRef,
        websock: websock,
        data: dataList,
        columns: columns,
        striped,
        border,
        teSearchSchemas: teSearchSchemas,
        formConfig: {
          labelWidth: 80,
          schemas: teSearchSchemas,
          autoSubmitOnEnter: true,
          showAdvancedButton: true,
          fieldMapToNumber: [],
          fieldMapToTime: [],
        },
        registerModal,
        changeLoading,
        copyDistinctFunc: copyDistinct,
        copyAnonymousIdFunc: copyAnonymousId,
        handleSubmit: (values: any) => {
          if (!isLoadingFlag.value) {
            // 校验values的值，若values的值为空，则消息提示，必须填写一个参数值
            const queryParams = Object.keys(values).filter((key) => values[key] !== undefined);
            if (queryParams.length === 0) {
              createMessage.error('请求参数必填其一，埋点验证请填写任何一个参数!!!');
              return;
            }

            submitButtonOptions.value.loading = false;
            submitButtonOptions.value.text = '停止';
            isLoadingFlag.value = true;
            // createMessage.success('click search,values:' + JSON.stringify(values));

            // 初始化websocket
            initWebSocket(values);
            // 清空
            dataList.value = [];
            // 打开websocket连接
            // websock.value.onopen();
            return;
          }
          submitButtonOptions.value.loading = false;
          submitButtonOptions.value.text = '验证';
          isLoadingFlag.value = false;
          websock.value && websock.value.onclose();
        },
        doubleClick: (record, index) => {
          handleDetail(record);
        },
      };
    },
  });
</script>
