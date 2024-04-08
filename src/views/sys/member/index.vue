<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('sys.user.addUser') }} </a-button>

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

    <Modal1 @register="register1" :minHeight="100" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useUserStore } from '/@/store/modules/user';

  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './user.data';
  import { getMemberList } from '/@/api/sys/member';

  import { useModal } from '/@/components/Modal';
  import Modal1 from './Modal1.vue';
  export default defineComponent({
    name: 'UserManagement',
    components: { BasicTable, TableAction,Modal1 },
    setup() {
      const userStore = useUserStore();
      console.log('userStore', userStore.userInfo);

      const { t } = useI18n();

      const [register1, { openModal: openModal1 }] = useModal();
      // get role data

      const [registerTable, {reload}] = useTable({
        title: '会员列表',
        api: getMemberList,
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

      function handleCreate() {
        openModal1(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        // openDrawer(true, {
        //   record,
        //   isUpdate: true,
        // });

        openModal1(true, {
          record,
          isUpdate: true,
        });

      }


      function handleSuccess() {
        reload();
      }

      function openModalLoading() {
        openModal1(true, {
          data: 'content',
          info: 'Info',
        });
        // setModalProps({ loading: true });
        // setTimeout(() => {
        //   setModalProps({ loading: false });
        // }, 2000);
      }

      return {
        t,
        registerTable,
        handleCreate,
        handleEdit,
        handleSuccess,
        openModalLoading,
        register1,
        openModal1,
      };
    },
  });
</script>
