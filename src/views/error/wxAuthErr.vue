<template>
  <div class="authErr">
    <svg-icon name="error" style="height: 100px; height: 100px"/>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-else>微信授权失败，请退出后重新进入!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: this.$route.query.errorMessage,
    };
  },
};
</script>

<style scoped lang="less">
.authErr {
  text-align: center;
  padding-top: 80px;

  p {
    padding: 0px;
    margin-top: 50px;
  }
}
</style>
