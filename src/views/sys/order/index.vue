<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('新增订单') }} </a-button>
        <a-button type="primary" class="my-4" @click="send"> 打开弹窗并传递数据 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <OrderDrawer @register="registerDrawer" @success="handleSuccess" />
    <OrderModal @register="register4" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent } from 'vue';
  // import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import OrderDrawer from './OrderDrawer.vue';
  import OrderModal  from './Modal.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './order.data';
  import { getOrderList } from '/@/api/sys/order';
  import { useModal } from '/@/components/Modal';


  const { t } = useI18n();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [register4, { openModal: openModal4 }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: t('产品列表'),
    api: getOrderList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 30,
      title: t('common.action'),
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  function send() {
    openModal4(true, {
      data: 'content',
      info: 'Info',
    });
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSuccess() {
    reload();
  }

  // export default defineComponent({
  //   name: 'UserManagement',
  //   components: { BasicTable, OrderDrawer, TableAction },
  //   setup() {
  //     const { t } = useI18n();
  //     const [registerDrawer, { openDrawer }] = useDrawer();
  //     const [register4, { openModal: openModal4 }] = useModal();
  //     const [registerTable, { reload }] = useTable({
  //       title: t('产品列表'),
  //       api: getOrderList,
  //       columns,
  //       formConfig: {
  //         labelWidth: 120,
  //         schemas: searchFormSchema,
  //       },
  //       useSearchForm: true,
  //       showTableSetting: true,
  //       bordered: true,
  //       showIndexColumn: false,
  //       actionColumn: {
  //         width: 30,
  //         title: t('common.action'),
  //         dataIndex: 'action',
  //         fixed: undefined,
  //       },
  //     });
  //
  //     function send() {
  //       openModal4(true, {
  //         data: 'content',
  //         info: 'Info',
  //       });
  //     }
  //
  //     function handleCreate() {
  //       openDrawer(true, {
  //         isUpdate: false,
  //       });
  //     }
  //
  //     function handleEdit(record: Recordable) {
  //       openDrawer(true, {
  //         record,
  //         isUpdate: true,
  //       });
  //     }
  //
  //     function handleSuccess() {
  //       reload();
  //     }
  //
  //     return {
  //       t,
  //       registerTable,
  //       registerDrawer,
  //       handleCreate,
  //       handleEdit,
  //       handleSuccess,
  //       send,
  //       register4,
  //       OrderModal,
  //     };
  //   },
  // });
</script>
