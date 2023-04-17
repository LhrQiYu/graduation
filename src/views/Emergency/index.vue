<template>
  <el-table :data="cardList.tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="bloodType" label="血型" />
    <el-table-column prop="medications" label="服药情况" />
    <el-table-column prop="IDNumber" label="身份证号" />
    <el-table-column label="头像">
      <template #default="{row}">
        <el-image style="width: 50px; height: 50px" :src="row.avatar" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column label="是否为器官捐献者">
      <template #default="{row}">
        <span>{{+(row.isOrganDonation) & 1 ? "是" : "否"}}</span>
      </template>
    </el-table-column>
    <el-table-column label="紧急联系人电话号码" width="200">
      <template #default="{row}">
        <div v-for="(item,index) of row.betweens" :key="index" class="otherInfos">
          <span>{{item.label}}</span>
          -
          <span>{{item.phone}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="修改时间" :formatter="timeFormatter" width="200" />
    <!-- <el-table-column label="操作">
      <template #default="{row}">
        <el-button type="primary" @click="handleGetUserInfo(row.id)">修改</el-button>
        <el-button type="danger" @click="handleRemoveUserInfo(row.id)">删除</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";
import { getEmergencyCardList } from "@/http/request";
const cardList = reactive({
  tableData: [],
});
/**
 * @description 请求急救卡列表 并将数据赋值给响应式的tableData
 */
getEmergencyCardList().then((res) => {
  cardList.tableData = res;
});
/**
 * @description 将时间戳转换为年月日 时分秒 的格式
 */
const timeFormatter = (row) => dayjs(row.time).format("YYYY-MM-DD HH:mm:ss");
</script>

<style scoped>
.otherInfos {
  display: flex;
}
.otherInfos > span:nth-child(1) {
  color: cornflowerblue;
}
.otherInfos > span:nth-child(2) {
  color: orangered;
}
</style>