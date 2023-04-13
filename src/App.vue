<template>
  <router-view/>
</template>

<script>
import { listenerCodeChange } from '@/utils/scan-code-listener';

export default {
  mounted() {
    listenerCodeChange((val) => {
      console.log('-------', val);
    });
  },
};
</script>

<style lang="less">
</style>
