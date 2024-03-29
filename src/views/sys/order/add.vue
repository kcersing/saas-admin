<template>
  <PageWrapper title="Tab详情页面">
    <div>{{ index }} - 详情页内容在此</div>
    <div>11111111111111</div>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { useTabs } from '/@/hooks/web/useTabs';
import { useRoute } from 'vue-router';


const route = useRoute();
const index = route.params?.id ?? -1;
const { setTitle } = useTabs();

// 设置标识
setTitle('添加订单');
</script>
