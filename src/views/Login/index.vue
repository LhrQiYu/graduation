<template>
  <article class="login-page">
    <el-card class="login-card">
      <h3 class="login-title">急救卡后台管理系统</h3>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form">
        <el-form-item prop="account" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="loginForm.account" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="login-submit">
          <el-button type="primary" class="login-btn" :loading="loginLoading" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </article>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { ElMessage } from "element-plus";
import { login } from "@/http/request";
const router = useRouter();
const loginForm = reactive({
  account: "",
  password: "",
  type: "0",
});
const loginLoading = ref(false);
const userInfo = useUserStore();
const loginFormRef = ref(null);
const loginRules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loginLoading.value = true;
      login(loginForm)
        .then(({ code, user, data, message = null }) => {
          if (code !== 200) {
            ElMessage.error(message || "用户名或密码错误");
          } else {
            userInfo.dispatchChangeUserInfo({ data, user });
            localStorage.setItem("token", data);
            localStorage.setItem("user", JSON.stringify(user));
            ElMessage.success("登录成功");
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          }
        })
        .finally(() => {
          setTimeout(() => {
            loginLoading.value = false;
          }, 500);
        });
    } else {
      return false;
    }
  });
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background: url("../../assets/school_end.jpeg") no-repeat;
  background-size: 90%;
  background-position: center;
}

.login-card {
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  background: #e2eef3;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-submit {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
  border-radius: 20px;
}
</style>