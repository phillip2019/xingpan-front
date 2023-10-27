<template>
  <div class="p-4">
    <!--用户编号、设备编号、ip地址查询框，点击开始验证按钮开始验证-->
    <CollapseContainer title="查询区" :canExpan="true">
      <BasicForm
        autoFocusFirstItem
        :labelWidth="200"
        :schemas="teSearchSchemas"
        :actionColOptions="{ span: 24 }"
        :labelCol="{ span: 8 }"
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
    />
  </div>
</template>
<script lang="ts" name="et-teUaeChinagoods">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTable, TableActionType } from '/@/components/Table';
  import { columns, searchFormSchema, getBasicData, teSearchSchemas } from './UaeChinagoods.data';
  import { store } from '/@/store';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm } from '/@/components/Form';

  export default defineComponent({
    components: { BasicTable, CollapseContainer, BasicForm },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const dataList = ref<any[]>([]);
      const websock = ref<any>();
      const striped = ref(true);
      const border = ref(true);
      const { createMessage } = useMessage();

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

      function initWebSocket() {
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        var userId = store.getters.userInfo.id;
        var url = window._CONFIG['domianURL'].replace('https://', 'ws://').replace('http://', 'ws://') + '/websocket/' + userId;
        websock.value = new WebSocket(url);
        websock.value.onopen = websocketonopen;
        websock.value.onerror = websocketonerror;
        websock.value.onmessage = websocketonmessage;
        websock.value.onclose = websocketclose;
      }

      function websocketonopen() {
        console.log('WebSocket连接成功');
      }

      function websocketonerror(e) {
        console.log('WebSocket连接发生错误');
      }
      function websocketonmessage(e) {
        var data = eval('(' + e.data + ')');
        console.log(`websocket data: ${data}`);
        //处理订阅信息
        if (data.cmd == 'topic') {
          //TODO 系统通知
          console.log(data);
        } else if (data.cmd == 'user') {
          //TODO 用户消息
          console.log(data);
        }
      }
      function websocketclose(e) {
        console.log('connection closed (' + e.code + ')');
      }

      return {
        tableRef,
        websock: websock,
        data: getBasicData(),
        columns: columns,
        striped,
        border,
        teSearchSchemas,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          showAdvancedButton: true,
          fieldMapToNumber: [],
          fieldMapToTime: [],
        },
        changeLoading,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
      };
    },
    onMounted() {},
    onUnmounted() {},
  });
</script>
