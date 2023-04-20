<template>
  <div class="container">
    <div class="header">
      <svg-icon name="MaskGroup" style="width: 100%; height: 100%"/>
      <span class="header-laber-1">欢迎登录</span>
      <span class="header-laber-2">盘古项目模板～</span>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.account"
          name="username"
          @blur="accountBlur"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="userInfo.deptName"
          placeholder="请选择科室"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择科室' }]"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="userInfo.passwd"
          type="password"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <div class="form-button">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getDeptByAccount } from '@/api/user';

export default {
  name: 'LoginView',
  data() {
    return {
      showPicker: false,
      userInfo: {
        account: '',
        passwd: '',
        deptCode: null,
        deptName: null,
      },
      columns: [],
    };
  },
  methods: {
    ...mapActions(['Login']),
    onSubmit() {
      this.Login(this.userInfo).then(() => {
        this.$router.replace({ path: '/' });
      });
    },
    onConfirm(value) {
      this.userInfo.deptName = value.name;
      this.userInfo.deptCode = value.code;
      this.showPicker = false;
    },
    accountBlur() {
      console.log(this.userInfo.account);
      this.columns = [];
      this.userInfo.deptCode = null;
      this.userInfo.deptName = null;
      if (this.userInfo.account) {
        getDeptByAccount({ account: this.userInfo.account }).then((res) => {
          if (res.success) {
            if (res.result.length > 0) {
              this.columns = res.result.map((item) => ({ ...item, text: item.name, value: item.code }));
              this.userInfo.deptCode = res.result[0].code;
              this.userInfo.deptName = res.result[0].name;
            }
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;

  .header {
    width: 100%;
    height: 258px;
    position: relative;

    span {
      color: #2D3752;
      font-size: 22px;
      font-weight: 500;
      line-height: 20px;
      position: absolute;
    }

    .header-laber-1 {
      left: 30px;
      top: 190px;
    }

    .header-laber-2 {
      left: 30px;
      top: 230px;
    }
  }

  .form {
    padding: 0 18px;
    margin-top: 25px;

    .form-button {
      margin: 50px 20px 0 20px;
    }
  }
}

/deep/ .van-cell {
  height: 60px;
  box-sizing: border-box;
}

/deep/ .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
}
</style>
