<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="this.$route.path" background-color="#a022ca" text-color="#fff" active-text-color="#fff" router>
          <el-menu-item index="/home/admin">
            <el-icon>
              <User />
            </el-icon>
            <span>管理员首页</span>
          </el-menu-item>
          <el-menu-item index="/home/emergency">
            <el-icon>
              <FullScreen />
            </el-icon>
            <span>急救卡</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-avatar :size="50" :src="profile.avatar" />
          <span>{{profile.userInfo.account}}</span>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store";
import { reactive } from "vue";
let { userInfo } = useUserStore();
const profile = reactive({
  avatar:
    "https://www.shicimingju.com/upload/images/xiaz/2022/0218/1645148300461.jpg",
  userInfo: Object.keys(userInfo).length
    ? userInfo
    : JSON.parse(localStorage.getItem("user")),
});
</script>

<style scoped>
.common-layout {
  height: 100vh;
}
.el-container {
  height: inherit;
}
.el-header {
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 10px;
  min-height: 80px;
  padding: 10px 20px 10px 10px;
  border: 1px solid #eaeaea;
}
.el-menu {
  overflow: hidden;
  height: 100%;
}
.el-menu-item.is-active {
  background: var(--el-menu-hover-bg-color);
}
.el-menu > li:not(:last-of-type) {
  margin-top: 30px;
}
</style>