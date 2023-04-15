<template>
  <el-table :data="state.tableData" style="width: 100%">
    <el-table-column prop="account" label="用户名称" />
    <el-table-column prop="password" label="密码" />
    <el-table-column label="用户昵称">
      <template #default="{row}">
        <span>{{row.name || "-"}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="用户ID" />
    <el-table-column prop="id" label="用户性别">
      <template #default="{row}">
        <span>{{+(row.type ) ? "男孩" : "女孩"}}</span>
      </template>
    </el-table-column>
    <el-table-column label="简述">
      <template #default="{row}">
        <span>{{row.describe || "-"}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="修改时间" :formatter="timeFormatter" />
  </el-table>
</template>

<script setup>
import { reactive } from "vue";
import { getUserList } from "@/http/request";
import dayjs from "dayjs";
let state = reactive({
  tableData: [],
});
const handleGetUserList = () => {
  getUserList().then((res) => {
    state.tableData = res;
  });
};
handleGetUserList();
const timeFormatter = (row) => dayjs(row.time).format("YYYY-MM-DD HH:mm:ss");
</script>

<style scoped>
</style>